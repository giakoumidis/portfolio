"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import URDFLoader, { type URDFRobot } from "urdf-loader";

const CYAN = 0x00f0ff;
const MAGENTA = 0xff2bd6;
const VIOLET = 0x8b5cff;
const AMBER = 0xffb347;
const GREEN = 0x39ff8c;
const PINK = 0xff4d9e;
const ORANGE = 0xff6a00;
const YELLOW = 0xf0ff3d;
const RED = 0xff1744;
const BLUE = 0x3d8bff;

/** Seconds each robot holds the stage before the next one fades in. */
const CYCLE_SECONDS = 10;
/** Max yaw / pitch from cursor position (desktop, fine pointer). */
const POINTER_YAW = Math.PI * 0.715;
const POINTER_PITCH = 0.585;
const POINTER_LERP = 0.1;
/** Continuous turntable spin on touch / no-hover devices (rad/s). */
const AUTO_YAW_SPEED = 0.32;
/** Soft pitch breath while auto-rotating on phones. */
const AUTO_PITCH = 0.12;
const AUTO_PITCH_SPEED = 0.35;

type Annotation = {
  link: string;
  label: string;
  /** 1 = label to the right of the part, -1 = to the left. */
  side: 1 | -1;
  /** Pixels the label floats above the anchor. */
  lift: number;
};

/** Per-robot neon duo so the fleet reads retro-arcade, not monochrome. */
type Palette = {
  /** Base shell colour. */
  body: number;
  /** Colour for accent-matched parts. */
  accent: number;
  /** Wireframe overlay colour on accent parts. */
  accentWire: number;
  /** CSS colours for the HUD leader lines and anchor dots. */
  lineCss: string;
  dotCss: string;
  /** Tailwind text class for the banner spec line. */
  specClass: string;
};

/** Extra palette hits on named links — checked before the accent regex. */
type ColorZone = {
  match: RegExp;
  color: number;
  wire?: number;
  emissive?: number;
};

type RobotSpec = {
  id: string;
  urdf: string;
  title: string;
  spec: string;
  /** Parts matching this pattern get the palette accent treatment. */
  accent: RegExp;
  /** Parts rendered as solid dark hardware (tires, rubber) with a glow rim. */
  dark?: RegExp;
  /** Optional per-link colours from the extended neon set. First match wins. */
  zones?: ColorZone[];
  palette: Palette;
  baseYaw: number;
  pose?: Record<string, number>;
  animate?: (robot: URDFRobot, t: number) => void;
  annotations: Annotation[];
};

const SPOT_POSE: Record<string, number> = {
  fl_hx: 0.05, fr_hx: -0.05, hl_hx: 0.05, hr_hx: -0.05,
  fl_hy: 0.72, fr_hy: 0.72, hl_hy: 0.78, hr_hy: 0.78,
  fl_kn: -1.4, fr_kn: -1.4, hl_kn: -1.45, hr_kn: -1.45,
};

const G1_POSE: Record<string, number> = {
  left_hip_pitch_joint: -0.15,
  right_hip_pitch_joint: -0.15,
  left_knee_joint: 0.32,
  right_knee_joint: 0.32,
  left_ankle_pitch_joint: -0.17,
  right_ankle_pitch_joint: -0.17,
  left_shoulder_roll_joint: 0.22,
  right_shoulder_roll_joint: -0.22,
  left_shoulder_pitch_joint: 0.25,
  right_shoulder_pitch_joint: 0.25,
  left_elbow_joint: 0.75,
  right_elbow_joint: 0.75,
};

const IIWA_POSE: Record<string, number> = {
  joint_1: 0.15,
  joint_2: -0.55,
  joint_3: 0.25,
  joint_4: 1.05,
  joint_5: -0.1,
  joint_6: 0.35,
  joint_7: 0,
};

const M100_POSE: Record<string, number> = {
  gimbal_roll_joint: 0.08,
  gimbal_pitch_joint: -0.32,
  gimbal_yaw_joint: 0.15,
};

const ROBOTS: RobotSpec[] = [
  {
    id: "spot",
    urdf: "/models/spot/spot.urdf",
    title: "SPOT",
    spec: "QUADRUPED · 12 DOF · 32.9 KG",
    accent: /hip|lleg/i,
    zones: [
      { match: /uleg/i, color: MAGENTA, wire: PINK },
      { match: /body/i, color: CYAN, wire: BLUE },
    ],
    // Nod to the real robot's yellow shell: cyan body, hot orange actuators.
    palette: {
      body: CYAN,
      accent: AMBER,
      accentWire: AMBER,
      lineCss: "rgb(0 240 255)",
      dotCss: "rgb(255 179 71)",
      specClass: "text-amber",
    },
    baseYaw: 0.6,
    pose: SPOT_POSE,
    animate: (robot, t) => {
      const breathe = Math.sin(t * 1.1) * 0.03;
      for (const leg of ["fl", "fr", "hl", "hr"]) {
        robot.setJointValue(`${leg}_hy`, SPOT_POSE[`${leg}_hy`] + breathe);
        robot.setJointValue(`${leg}_kn`, SPOT_POSE[`${leg}_kn`] - breathe * 0.7);
      }
    },
    annotations: [
      { link: "body", label: "CHASSIS // COMPUTE + IMU", side: 1, lift: 72 },
      { link: "fl_uleg", label: "QDD HIP ACTUATOR", side: -1, lift: 40 },
      { link: "hr_lleg", label: "COMPOSITE LOWER LEG", side: 1, lift: -8 },
    ],
  },
  {
    id: "husky",
    urdf: "/models/husky/husky.urdf",
    title: "HUSKY A200",
    spec: "UGV · 4WD DIFF DRIVE · 75 KG PAYLOAD",
    accent: /bumper|rail/i,
    dark: /wheel/i,
    zones: [
      { match: /top_plate|top_chassis|user_rail/i, color: CYAN, wire: BLUE },
      { match: /base/i, color: GREEN, wire: YELLOW },
    ],
    // Field-rover green with the Clearpath-yellow bumpers gone neon orange.
    palette: {
      body: GREEN,
      accent: AMBER,
      accentWire: AMBER,
      lineCss: "rgb(57 255 140)",
      dotCss: "rgb(255 179 71)",
      specClass: "text-green",
    },
    baseYaw: 0.9,
    animate: (robot, t) => {
      const angle = t * 1.4;
      for (const wheel of [
        "front_left_wheel_joint",
        "front_right_wheel_joint",
        "rear_left_wheel_joint",
        "rear_right_wheel_joint",
      ]) {
        robot.setJointValue(wheel, angle);
      }
    },
    annotations: [
      { link: "top_plate_link", label: "SENSOR DECK / PAYLOAD", side: 1, lift: 64 },
      { link: "front_bumper_link", label: "ALU BUMPER", side: -1, lift: 26 },
      { link: "front_left_wheel", label: "\u00d8330 MM AT TIRES", side: -1, lift: -34 },
    ],
  },
  {
    id: "g1",
    urdf: "/models/g1/g1.urdf",
    title: "UNITREE G1",
    spec: "HUMANOID · 23 DOF · 1.32 M",
    accent: /shoulder|elbow|wrist/i,
    dark: /hand|rubber/i,
    zones: [
      { match: /head/i, color: CYAN, wire: MAGENTA },
      { match: /hip|knee|ankle/i, color: AMBER, wire: ORANGE },
      { match: /torso|pelvis|waist|logo/i, color: VIOLET, wire: MAGENTA },
    ],
    // Violet shell + hot pink actuators — pulls the extended neon set so G1
    // doesn't share Spot's cyan body.
    palette: {
      body: VIOLET,
      accent: PINK,
      accentWire: MAGENTA,
      lineCss: "rgb(139 92 255)",
      dotCss: "rgb(255 77 158)",
      specClass: "text-pink",
    },
    baseYaw: 0.45,
    pose: G1_POSE,
    animate: (robot, t) => {
      // Idle humanoid: weight shift + arm reach + wrist roll — same
      // continuous presence as Husky wheels / IIWA reach, but softer.
      const breathe = Math.sin(t * 0.9) * 0.04;
      const reach = Math.sin(t * 0.7) * 0.1;
      const twist = Math.sin(t * 0.45) * 0.12;
      const roll = Math.sin(t * 0.85) * 0.06;

      robot.setJointValue("waist_yaw_joint", twist);

      // Legs — opposite-phase weight shift (knees/ankles track hips).
      robot.setJointValue(
        "left_hip_pitch_joint",
        G1_POSE.left_hip_pitch_joint + breathe,
      );
      robot.setJointValue(
        "right_hip_pitch_joint",
        G1_POSE.right_hip_pitch_joint - breathe,
      );
      robot.setJointValue(
        "left_knee_joint",
        G1_POSE.left_knee_joint - breathe * 0.8,
      );
      robot.setJointValue(
        "right_knee_joint",
        G1_POSE.right_knee_joint + breathe * 0.8,
      );
      robot.setJointValue(
        "left_ankle_pitch_joint",
        G1_POSE.left_ankle_pitch_joint - breathe * 0.5,
      );
      robot.setJointValue(
        "right_ankle_pitch_joint",
        G1_POSE.right_ankle_pitch_joint + breathe * 0.5,
      );

      // Arms — opposing reach + elbow + shoulder roll, like the IIWA chain.
      robot.setJointValue(
        "left_shoulder_pitch_joint",
        G1_POSE.left_shoulder_pitch_joint + reach,
      );
      robot.setJointValue(
        "right_shoulder_pitch_joint",
        G1_POSE.right_shoulder_pitch_joint - reach,
      );
      robot.setJointValue(
        "left_shoulder_roll_joint",
        G1_POSE.left_shoulder_roll_joint + roll,
      );
      robot.setJointValue(
        "right_shoulder_roll_joint",
        G1_POSE.right_shoulder_roll_joint - roll,
      );
      robot.setJointValue(
        "left_elbow_joint",
        G1_POSE.left_elbow_joint - reach * 0.7,
      );
      robot.setJointValue(
        "right_elbow_joint",
        G1_POSE.right_elbow_joint + reach * 0.7,
      );

      // Wrists — continuous roll so hands stay alive like spinning wheels.
      robot.setJointValue("left_wrist_roll_joint", Math.sin(t * 1.2) * 0.35);
      robot.setJointValue("right_wrist_roll_joint", Math.sin(t * 1.2 + 1.2) * 0.35);
    },
    annotations: [
      { link: "head_link", label: "LIDAR + DEPTH HEAD", side: 1, lift: 48 },
      { link: "torso_link", label: "TORSO // BATTERY + COMPUTE", side: -1, lift: 30 },
      { link: "left_wrist_roll_rubber_hand", label: "DEX-READY WRIST", side: 1, lift: -6 },
    ],
  },
  {
    id: "iiwa14",
    urdf: "/models/iiwa14/iiwa14.urdf",
    title: "KUKA IIWA 14",
    spec: "COLLAB ARM · 7 DOF · 14 KG PAYLOAD",
    accent: /$^/, // every segment has its own zone below
    zones: [
      { match: /^base_link$/i, color: VIOLET, wire: MAGENTA },
      { match: /^link_1$/i, color: CYAN, wire: BLUE },
      { match: /^link_2$/i, color: MAGENTA, wire: PINK },
      { match: /^link_3$/i, color: GREEN, wire: YELLOW },
      { match: /^link_4$/i, color: AMBER, wire: ORANGE },
      { match: /^link_5$/i, color: PINK, wire: MAGENTA },
      { match: /^link_6$/i, color: ORANGE, wire: RED },
      { match: /^link_7$/i, color: YELLOW, wire: CYAN },
    ],
    // Rainbow 7-DOF chain — one neon colour per link + base.
    palette: {
      body: AMBER,
      accent: CYAN,
      accentWire: CYAN,
      lineCss: "rgb(255 179 71)",
      dotCss: "rgb(0 240 255)",
      specClass: "text-amber",
    },
    baseYaw: 0.75,
    pose: IIWA_POSE,
    animate: (robot, t) => {
      const reach = Math.sin(t * 0.7) * 0.08;
      robot.setJointValue("joint_2", IIWA_POSE.joint_2 + reach);
      robot.setJointValue("joint_4", IIWA_POSE.joint_4 - reach * 0.6);
      robot.setJointValue("joint_6", IIWA_POSE.joint_6 + Math.sin(t * 1.1) * 0.05);
    },
    annotations: [
      { link: "base_link", label: "TORQUE-SENSED BASE", side: -1, lift: 36 },
      { link: "link_4", label: "ELBOW // 7-DOF CHAIN", side: 1, lift: 24 },
      { link: "link_7", label: "FLANGE // EEF MOUNT", side: 1, lift: -12 },
    ],
  },
  {
    id: "m100",
    urdf: "/models/m100/m100.urdf",
    title: "DJI MATRICE 100",
    spec: "QUAD · 4 ROTORS · 2.4 KG",
    accent: /rotor/i,
    zones: [
      { match: /base/i, color: GREEN, wire: CYAN },
      { match: /gimbal/i, color: MAGENTA, wire: PINK },
    ],
    palette: {
      body: GREEN,
      accent: ORANGE,
      accentWire: AMBER,
      lineCss: "rgb(57 255 140)",
      dotCss: "rgb(0 240 255)",
      specClass: "text-green",
    },
    baseYaw: 0.55,
    pose: M100_POSE,
    animate: (robot, t) => {
      const spin = t * 12;
      robot.setJointValue("rotor_0_joint", spin);
      robot.setJointValue("rotor_1_joint", spin);
      robot.setJointValue("rotor_2_joint", -spin);
      robot.setJointValue("rotor_3_joint", -spin);
      const sway = Math.sin(t * 0.6) * 0.06;
      robot.setJointValue(
        "gimbal_pitch_joint",
        M100_POSE.gimbal_pitch_joint + sway,
      );
      robot.setJointValue(
        "gimbal_yaw_joint",
        M100_POSE.gimbal_yaw_joint + Math.sin(t * 0.45) * 0.04,
      );
    },
    annotations: [
      { link: "base_link", label: "FC + IMU // ONBOARD SDK", side: 1, lift: 52 },
      { link: "rotor_0", label: "BRUSHLESS MOTOR ×4", side: -1, lift: 18 },
      { link: "gimbal_yaw_link", label: "3-DOF GIMBAL BAY", side: 1, lift: -10 },
    ],
  },
];

type StagedRobot = {
  spec: RobotSpec;
  robot: URDFRobot;
  group: THREE.Group;
  /** Every material carries `userData.baseOpacity` for the crossfade. */
  materials: THREE.Material[];
  /** Fitted camera distance and look-at height for this robot. */
  dist: number;
  lookY: number;
  fade: number;
};

function applySiteMaterials(
  root: THREE.Object3D,
  accent: RegExp,
  palette: Palette,
  dark?: RegExp,
  zones?: ColorZone[],
) {
  const materials: StagedRobot["materials"] = [];
  /** Closest URDF link — avoids upstream links (e.g. link_1) tinting downstream segments. */
  const linkName = (obj: THREE.Object3D): string | null => {
    for (let o: THREE.Object3D | null = obj; o; o = o.parent) {
      if ("isURDFLink" in o && o.isURDFLink && o.name) return o.name;
    }
    return null;
  };
  const matches = (obj: THREE.Object3D, re: RegExp): boolean => {
    const name = linkName(obj);
    return name ? re.test(name) : false;
  };

  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const isDark = dark ? matches(obj, dark) : false;

    let color = palette.body;
    let wire = palette.body;
    let emissiveIntensity = 0.62;
    let isAccent = false;

    if (!isDark) {
      const zone = zones?.find((z) => matches(obj, z.match));
      if (zone) {
        color = zone.color;
        wire = zone.wire ?? zone.color;
        emissiveIntensity = zone.emissive ?? 0.55;
      } else if (matches(obj, accent)) {
        color = palette.accent;
        wire = palette.accentWire;
        emissiveIntensity = 0.5;
        isAccent = true;
      }
    }

    const mat = isDark
      ? // Solid dark rubber/hardware with an accent rim — translucent neon
        // turns knobby tire meshes into scribble.
        new THREE.MeshStandardMaterial({
          color: 0x131a2e,
          emissive: palette.accent,
          emissiveIntensity: 0.12,
          metalness: 0.3,
          roughness: 0.55,
          transparent: true,
          opacity: 1,
        })
      : new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity,
          metalness: isAccent ? 0.45 : 0.42,
          roughness: 0.24,
          transparent: true,
          opacity: 0.92,
        });
    mat.userData.baseOpacity = mat.opacity;
    obj.material = mat;
    materials.push(mat);

    if (isDark) return;

    // Neon wireframe silhouette on top of the shaded surface. Dense meshes
    // (tires, organic decimated shells) turn into scribble — skip them.
    const triangles = (obj.geometry.index?.count ??
      obj.geometry.attributes.position.count) / 3;
    if (triangles <= 4000) {
      const lineMat = new THREE.LineBasicMaterial({
        color: wire,
        transparent: true,
        opacity: 0.2,
      });
      lineMat.userData.baseOpacity = 0.2;
      const line = new THREE.LineSegments(
        new THREE.EdgesGeometry(obj.geometry, 40),
        lineMat,
      );
      line.raycast = () => {};
      obj.add(line);
      materials.push(lineMat);
    }
  });
  return materials;
}

function loadObjMesh(
  path: string,
  manager: THREE.LoadingManager,
  material: THREE.Material,
  onComplete: (mesh: THREE.Object3D, err?: Error) => void,
) {
  new OBJLoader(manager).load(
    path,
    (group) => {
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material = material;
      });
      onComplete(group);
    },
    undefined,
    (err) =>
      onComplete(
        new THREE.Object3D(),
        err instanceof Error ? err : new Error(String(err)),
      ),
  );
}

/**
 * The robot stage: URDF models from real robotics packages (Spot, Husky,
 * Unitree G1, KUKA iiwa 14, DJI Matrice 100) cycling in the hero sky band.
 * On desktop the model follows the cursor (yaw / pitch); on phones it
 * auto-rotates. HUD leader lines call out hardware.
 *
 * @see https://github.com/rai-opensource/spot_description
 * @see https://github.com/husky/husky
 * @see https://github.com/unitreerobotics/unitree_ros
 * @see https://github.com/kroshu/kuka_robot_descriptions
 * @see https://github.com/dji-m100-ros/dji_m100_description
 */
export default function RobotStage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGPolylineElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  const [active, setActive] = useState(0);
  const [loadedIds, setLoadedIds] = useState<string[]>([]);
  const activeRef = useRef(0);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // The staged robots live in a ref so the render loop never re-binds.
  const stagedRef = useRef<Map<string, StagedRobot>>(new Map());

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    // Wheel/leg meshes repeat across links; cache so each file loads once.
    THREE.Cache.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 60);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    host.prepend(renderer.domElement);

    const key = new THREE.DirectionalLight(CYAN, 1.3);
    key.position.set(2.5, 3.5, 1.5);
    const rim = new THREE.DirectionalLight(MAGENTA, 0.9);
    rim.position.set(-2.2, 1.4, -1.8);
    const fill = new THREE.PointLight(VIOLET, 0.5, 14);
    fill.position.set(0, 1.4, 2.6);
    // Hemisphere keeps undersides and shadow-side panels from going black.
    const hemi = new THREE.HemisphereLight(0x8890ff, 0x0d0a22, 0.55);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4), key, rim, fill, hemi);

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let disposed = false;
    /** Camera framing eases between robots of very different sizes. */
    let camDist = 3;
    let camLookY = 0.5;
    /** Pointer-driven yaw / pitch (desktop). Targets lerp toward current. */
    let pointerYawTarget = 0;
    let pointerPitchTarget = 0;
    let pointerYaw = 0;
    let pointerPitch = 0;
    /** Fine pointer + hover → cursor steering; otherwise slow auto-spin. */
    const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    let usePointer = pointerMq.matches;
    const onPointerMode = () => {
      usePointer = pointerMq.matches;
      if (!usePointer) {
        pointerYawTarget = 0;
        pointerPitchTarget = 0;
      }
    };

    const staged = stagedRef.current;
    const tmp = new THREE.Vector3();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width < 2 || height < 2) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
    };

    const steerFromClient = (clientX: number, clientY: number) => {
      if (reduced || !usePointer) {
        pointerYawTarget = 0;
        pointerPitchTarget = 0;
        return;
      }
      const nx = (clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = (clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
      // Left → yaw left, right → yaw right; top → tip back, bottom → tip forward.
      pointerYawTarget = nx * POINTER_YAW;
      pointerPitchTarget = ny * POINTER_PITCH;
    };

    // Window-wide so hero copy / scrim still steer the robot.
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") steerFromClient(e.clientX, e.clientY);
    };
    const onMouseMove = (e: MouseEvent) => {
      steerFromClient(e.clientX, e.clientY);
    };

    /** Push the robot right of centre on wide screens, clear of the headline. */
    const worldXOffset = (r: StagedRobot) =>
      width >= 1024 ? r.dist * 0.38 : width >= 640 ? r.dist * 0.2 : r.dist * 0.08;

    const updateAnnotations = (r: StagedRobot, fade: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      r.spec.annotations.forEach((a, i) => {
        const label = labelRefs.current[i];
        const line = lineRefs.current[i];
        const dot = dotRefs.current[i];
        if (!label || !line || !dot) return;

        const link = r.robot.links[a.link];
        if (!link) return;
        link.getWorldPosition(tmp).project(camera);
        const px = ((tmp.x + 1) / 2) * width;
        const py = ((1 - tmp.y) / 2) * height;
        let lx = px + a.side * Math.min(Math.max(width * 0.085, 70), 130);
        // Right-side labels flip to grow leftward once they would slide
        // under the model banner; left-side ones stay on screen.
        const flip = a.side === 1 && lx > width - 360;
        if (flip) lx = Math.min(lx, width - 360);
        if (a.side === -1) lx = Math.max(lx, 210);
        const ly = py - a.lift;

        label.style.opacity = String(fade);
        label.style.transform = `translate(${lx}px, ${ly}px) translate(${
          a.side === 1 && !flip ? "4px" : "calc(-100% - 4px)"
        }, -50%)`;
        line.setAttribute(
          "points",
          `${px},${py} ${lx - a.side * 12},${ly} ${lx},${ly}`,
        );
        line.style.opacity = String(fade * 0.65);
        dot.setAttribute("cx", String(px));
        dot.setAttribute("cy", String(py));
        dot.style.opacity = String(fade);
      });
    };

    const frame = (now: number) => {
      if (!visible || disposed) {
        raf = 0;
        return;
      }
      const t = now * 0.001;
      const activeSpec = ROBOTS[activeRef.current];

      for (const r of staged.values()) {
        const isActive = r.spec.id === activeSpec.id;
        const target = isActive ? 1 : 0;
        r.fade += (target - r.fade) * 0.12;
        if (r.fade < 0.015 && !isActive) {
          r.group.visible = false;
          continue;
        }
        r.group.visible = true;
        for (const m of r.materials) {
          m.opacity = m.userData.baseOpacity * r.fade;
        }

        if (isActive) {
          let yaw = r.spec.baseYaw;
          let pitch = 0;
          if (!reduced) {
            if (usePointer) {
              pointerYaw += (pointerYawTarget - pointerYaw) * POINTER_LERP;
              pointerPitch +=
                (pointerPitchTarget - pointerPitch) * POINTER_LERP;
              yaw += pointerYaw;
              pitch = pointerPitch;
            } else {
              // Turntable spin + soft pitch for touch / coarse pointers.
              yaw += t * AUTO_YAW_SPEED;
              pitch = Math.sin(t * AUTO_PITCH_SPEED) * AUTO_PITCH;
            }
          }
          r.group.rotation.y = yaw;
          r.group.rotation.x = pitch;
          r.group.position.x = worldXOffset(r);
          if (!reduced) r.spec.animate?.(r.robot, t);

          camDist += (r.dist - camDist) * 0.06;
          camLookY += (r.lookY - camLookY) * 0.06;
        } else {
          r.group.rotation.x = 0;
        }
      }

      camera.position.set(
        camDist * 0.16,
        camLookY + camDist * 0.26,
        camDist,
      );
      // Looking slightly above centre pushes the robot down onto the horizon.
      camera.lookAt(0, camLookY + camDist * 0.055, 0);

      renderer.render(scene, camera);

      const activeStaged = staged.get(activeSpec.id);
      if (activeStaged) updateAnnotations(activeStaged, activeStaged.fade);

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf) return;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const stageRobot = (spec: RobotSpec, robot: URDFRobot) => {
      // ROS Z-up → three.js Y-up, then ground and centre on the turntable.
      robot.rotation.x = -Math.PI / 2;
      if (spec.pose) robot.setJointValues(spec.pose);
      const materials = applySiteMaterials(
        robot,
        spec.accent,
        spec.palette,
        spec.dark,
        spec.zones,
      );

      const group = new THREE.Group();
      group.add(robot);
      group.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(robot);
      const center = box.getCenter(new THREE.Vector3());
      robot.position.set(-center.x, -box.min.y, -center.z);

      const size = box.getSize(new THREE.Vector3());
      const radius = 0.5 * Math.hypot(size.x, size.y, size.z);
      const dist = (radius / Math.tan((camera.fov * Math.PI) / 360)) * 1.1;

      const entry: StagedRobot = {
        spec,
        robot,
        group,
        materials,
        dist,
        lookY: size.y * 0.5,
        fade: 0,
      };
      group.visible = false;
      scene.add(group);
      staged.set(spec.id, entry);

      if (staged.size === 1) {
        camDist = dist;
        camLookY = entry.lookY;
      }
      setLoadedIds((ids) => [...ids, spec.id]);
      if (visible) start();
    };

    // Load sequentially: Spot first so something appears immediately, then
    // the rest stream in behind it. The URDF callback fires when the XML is
    // parsed, but meshes arrive later — stage only once the manager drains,
    // otherwise the camera fit sees an empty bounding box.
    const loadNext = (i: number) => {
      if (disposed || i >= ROBOTS.length) return;
      const spec = ROBOTS[i];
      const manager = new THREE.LoadingManager();
      const loader = new URDFLoader(manager);
      loader.packages = "";
      loader.parseCollision = false;
      loader.loadMeshCb = (path, mgr, material, done) => {
        if (/\.obj$/i.test(path)) loadObjMesh(path, mgr, material, done);
        else loader.defaultMeshLoader(path, mgr, material, done);
      };

      let robot: URDFRobot | null = null;
      let finished = false;
      const finish = () => {
        if (disposed || finished || !robot) return;
        finished = true;
        stageRobot(spec, robot);
        loadNext(i + 1);
      };
      manager.onLoad = finish;
      manager.onError = (url) => console.warn(`Mesh failed: ${url}`);

      loader.load(
        spec.urdf,
        (r) => {
          robot = r;
        },
        undefined,
        (err) => {
          console.warn(`URDF failed: ${spec.id}`, err);
          loadNext(i + 1);
        },
      );
    };
    loadNext(0);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    pointerMq.addEventListener("change", onPointerMode);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(host);

    return () => {
      disposed = true;
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      pointerMq.removeEventListener("change", onPointerMode);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      staged.clear();
      renderer.domElement.remove();
    };
  }, []);

  // Rotate the stage through whatever has finished loading.
  useEffect(() => {
    if (loadedIds.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => {
        for (let step = 1; step <= ROBOTS.length; step++) {
          const next = (i + step) % ROBOTS.length;
          if (loadedIds.includes(ROBOTS[next].id)) return next;
        }
        return i;
      });
    }, CYCLE_SECONDS * 1000);
    return () => clearInterval(id);
  }, [loadedIds]);

  const spec = ROBOTS[active];
  const ready = loadedIds.includes(spec.id);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[12%] h-[52%]"
      style={{
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 76%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 76%, transparent 100%)",
      }}
    >
      {/* Leader lines — drawn over the WebGL canvas, under the labels. */}
      <svg
        ref={svgRef}
        className="absolute inset-0 hidden h-full w-full lg:block"
      >
        {ready &&
          spec.annotations.map((a, i) => (
            <g key={`${spec.id}-${i}`}>
              <polyline
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                fill="none"
                stroke={spec.palette.lineCss}
                strokeWidth="1"
              />
              <circle
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                r="2.5"
                fill={spec.palette.dotCss}
                stroke={spec.palette.lineCss.replace(")", " / 0.5)")}
              />
            </g>
          ))}
      </svg>

      {/* Part callouts. */}
      <div className="absolute inset-0 hidden lg:block">
        {ready &&
          spec.annotations.map((a, i) => (
            <div
              key={`${spec.id}-${a.link}`}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="label-mono absolute top-0 left-0 border border-grid-dim bg-panel px-2 py-1 text-[0.6rem] whitespace-nowrap text-cyan backdrop-blur-sm"
              style={{ opacity: 0 }}
            >
              {a.label}
            </div>
          ))}
      </div>
    </div>
  );
}
