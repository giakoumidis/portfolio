// Viewer from the Hagios Spyridon reality-modelling pipeline (three.js + three-mesh-bvh), restyled for the portfolio.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { computeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree; THREE.Mesh.prototype.raycast = acceleratedRaycast;

const $ = id => document.getElementById(id);
const Q = new URLSearchParams(location.search), BASE = './', STATE = 'present';
const status = t => $('status').textContent = t;
const touch = matchMedia('(hover: none)').matches;
if (touch || innerWidth < 640) $('ui').classList.add('min');

// ---------- click to load (the model is ~6 MB over the wire) ----------
$('gate').classList.add('busy');
const bar = $('bar').firstElementChild;
const progress = (base, span) => e => { if (e.lengthComputable) bar.style.width = `${(base + span * e.loaded / e.total) * 100}%`; };

const meta = await (await fetch(BASE + 'viewer_site.json')).json();
const toGL = ([x, y, z]) => new THREE.Vector3(x, z, -y);              // project frame -> glTF Y-up
const fp = meta.footprint;
const inside = (x, y) => { let c = false; for (let i = 0, j = fp.length - 1; i < fp.length; j = i++) { const [xi, yi] = fp[i], [xj, yj] = fp[j];
  if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: Q.has('shot') });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(innerWidth, innerHeight); document.body.prepend(renderer.domElement);
renderer.domElement.setAttribute('aria-label', 'Interactive 3D model of Hagios Spyridon, Rhodes'); renderer.domElement.tabIndex = 0;
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0b0a1c);
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.05, 600); camera.rotation.order = 'YXZ';
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });

// ---------- exposure ----------
const LOOK = Object.assign({ key: 0.11, adapt: 0.6, albedo_scale: 0.7 }, meta.look || {});
const evGap = meta.exposure_ev.outside - meta.exposure_ev.inside;
const expOut = LOOK.key / Math.pow(2, meta.exposure_ev.outside), expIn = expOut * Math.pow(2, LOOK.adapt * evGap);

// ---------- baked material + section cut ----------
// albedo (sRGB) x irradiance (log2 in 8 bits) -> exposure -> ACES -> sRGB. Fragments above `cut` are discarded;
// back faces seen through the cut are drawn as flat poché.
const EV0 = meta.lightmap.ev_min.toFixed(3), EVR = (meta.lightmap.ev_max - meta.lightmap.ev_min).toFixed(3);
const U = { exposure: { value: 1 }, cut: { value: 1e4 }, local: { value: 0 }, cap: { value: new THREE.Color(0x1c1640) } };
const lmMaterials = [];
const lmMaterial = (alb, light) => { const an = renderer.capabilities.getMaxAnisotropy();
  alb.colorSpace = THREE.SRGBColorSpace; alb.anisotropy = an; light.colorSpace = THREE.NoColorSpace; light.anisotropy = an;
  const m = new THREE.ShaderMaterial({ uniforms: { albedo: { value: alb }, light: { value: light }, ...U },
    vertexShader: 'varying vec2 vUv; varying vec3 vW; void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: `uniform sampler2D albedo; uniform sampler2D light; uniform float exposure, cut, local; uniform vec3 cap; varying vec2 vUv; varying vec3 vW;
      vec3 aces(vec3 x){ return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0.0, 1.0); }
      void main(){
        if (vW.y > cut) discard;
        if (!gl_FrontFacing) { gl_FragColor = vec4(cap, 1.0); return; }
        vec3 lv = texture2D(light, vUv).rgb * ${EVR} + ${EV0};
        float lum = dot(lv, vec3(0.2126, 0.7152, 0.0722));
        float gain = exp2(local * ${(meta.look && meta.look.cutaway_adapt || 0.9).toFixed(3)} * clamp(${meta.exposure_ev.outside.toFixed(3)} - lum, 0.0, ${evGap.toFixed(3)}));
        vec3 L = texture2D(albedo, vUv).rgb * ${LOOK.albedo_scale.toFixed(3)} * exp2(lv);
        gl_FragColor = vec4(pow(aces(L * exposure * gain), vec3(1.0/2.2)), 1.0); }` });
  lmMaterials.push(m); return m; };

// ---------- load ----------
const loader = new GLTFLoader();
status('Loading model');
const church = await loader.loadAsync(BASE + `church_${STATE}.glb`, progress(0, 0.85));
const bbox = new THREE.Box3();
church.scene.traverse(o => { if (!o.isMesh) return;
  if (o.material.map && o.material.emissiveMap) o.material = lmMaterial(o.material.map, o.material.emissiveMap);
  if (!/^ctx_/.test(o.name)) bbox.expandByObject(o); });
scene.add(church.scene);
status('Loading collision');
const coll = await loader.loadAsync(BASE + `collision_${STATE}.glb`, progress(0.85, 0.15)); const colliders = [];
coll.scene.traverse(o => { if (o.isMesh) { o.geometry.computeBoundsTree(); o.visible = false; colliders.push(o); } }); scene.add(coll.scene);

const EYE = meta.eye_height_m, ray = new THREE.Raycaster(); ray.firstHitOnly = true;
const groundAt = (p, from = 1.0) => { ray.set(new THREE.Vector3(p.x, p.y + from, p.z), new THREE.Vector3(0, -1, 0)); ray.far = 80;
  const h = ray.intersectObjects(colliders, false)[0]; return h ? h.point.y : null; };
const center = bbox.getCenter(new THREE.Vector3()), size = bbox.getSize(new THREE.Vector3());
const R = Math.max(size.x, size.z) / 2, topY = bbox.max.y;

// panorama stations -> eye positions on the collision floor
const stations = {};
for (const [k, v] of Object.entries(meta.spawns)) { const s = toGL(v), g = groundAt(s, 0.5);
  stations[k] = new THREE.Vector3(s.x, g !== null ? g + EYE : s.y, s.z); }
const isIn = p => inside(p.x, -p.z);
const inFloors = Object.values(stations).filter(isIn).map(p => p.y - EYE).sort((a, b) => a - b);
const floorY = inFloors.length ? inFloors[Math.floor(inFloors.length / 2)] : bbox.min.y;
const fpC = fp.reduce((a, [x, y]) => [a[0] + x / fp.length, a[1] + y / fp.length], [0, 0]);
const naveC = new THREE.Vector3(fpC[0], floorY + EYE, -fpC[1]);
const stationLabel = k => k === 'pano_kripti' ? 'Crypt (below the north aisle)' : `Panorama station ${k.replace(/^pano_?/, '')}`;

// ---------- views ----------
const views = [];
const aerial = (name, ex, ny, extra = {}, dist = 2.7, up = 1.5) => { const d = new THREE.Vector3(ex, 0, -ny).normalize();
  views.push({ name, pos: center.clone().addScaledVector(d, R * dist).add(new THREE.Vector3(0, R * up, 0)), target: extra.target || center.clone(), kind: 'ext', ...extra }); };
aerial('Aerial — north-east', 1, 1); aerial('Aerial — north-west', -1, 1); aerial('Aerial — south-west (minaret)', -1, -1); aerial('Aerial — south-east', 1, -1);
{ const p = center.clone().add(new THREE.Vector3(0, 0, -R * 2.4)); const g = groundAt(new THREE.Vector3(p.x, topY + 5, p.z), 0);
  p.y = (g !== null ? g : floorY) + EYE; views.push({ name: 'Street — north side', pos: p, target: new THREE.Vector3(center.x, p.y + 2.5, center.z), kind: 'ext' }); }
aerial('Cutaway — roof removed', 1, -0.6, { roof: false, target: new THREE.Vector3(center.x, floorY, center.z) }, 1.5, 1.9);
views.push({ name: 'Plan — roof removed', pos: center.clone().add(new THREE.Vector3(0, R * 4.2, 0.01)), target: new THREE.Vector3(center.x, floorY, center.z), kind: 'ext', roof: false });
const lookFrom = p => { const t = new THREE.Vector3(naveC.x, p.y, naveC.z); if (t.distanceTo(p) < 1.5) t.set(p.x + 3, p.y, p.z); return t; };
const stNames = Object.keys(stations).sort((a, b) => (isIn(stations[b]) - isIn(stations[a])) || a.localeCompare(b));
for (const k of stNames) { const p = stations[k], interior = isIn(p);
  views.push({ name: stationLabel(k), pos: p.clone(), target: lookFrom(p), kind: interior ? 'int' : 'st', roof: interior ? true : undefined, station: k }); }

const vsel = $('view'), groups = { ext: 'Overview', int: 'Inside · panorama stations', st: 'Outside · panorama stations' }, og = {};
for (const [g, label] of Object.entries(groups)) { og[g] = document.createElement('optgroup'); og[g].label = label; vsel.appendChild(og[g]); }
views.forEach((v, i) => og[v.kind].appendChild(new Option(v.name, i)));

// ---------- section cut ----------
const cutIn = $('cut'); cutIn.min = (floorY - 1.5).toFixed(2); cutIn.max = (topY + 0.5).toFixed(2);
const roofCutY = meta.roof_cut_height != null ? meta.roof_cut_height : floorY + 3.0;
let roofOff = false, cutY = roofCutY;
function setCut(on, y = cutY) { roofOff = on; cutY = Math.min(Math.max(y, +cutIn.min), +cutIn.max); cutIn.value = cutY;
  U.cut.value = on ? cutY : 1e4; $('cutv').textContent = `${cutY.toFixed(2)} m`;
  $('roof').classList.toggle('on', on); $('roof').textContent = on ? 'Roof removed' : 'Remove roof';
  for (const m of lmMaterials) m.side = on ? THREE.DoubleSide : THREE.FrontSide; }
$('roof').onclick = () => setCut(!roofOff);
cutIn.oninput = () => setCut(true, +cutIn.value);
setCut(false);

// ---------- controls ----------
const orbit = new OrbitControls(camera, renderer.domElement); orbit.enableDamping = true; orbit.dampingFactor = 0.08;
orbit.maxPolarAngle = Math.PI * 0.495; orbit.minDistance = 0.3; orbit.maxDistance = 150; orbit.target.copy(center);
const plc = new PointerLockControls(camera, renderer.domElement);
let mode = 'orbit';
const HELP = {
  orbit: touch ? 'Drag to rotate · two fingers to pan and zoom. Pick a view to jump inside.' : 'Drag to rotate · right-drag to pan · wheel to zoom. Pick a view, or switch to Fly / Walk to roam from here.',
  fly: 'Click the view, then mouse to look · WASD move · E / Space up · Q / C down · Shift fast · wheel speed · Esc release.',
  walk: 'Click the view, then mouse to look · WASD / arrows walk · Shift run · Esc release. Collides with walls, follows floors and steps.' };
if (touch) document.querySelectorAll('#modes .btn:not([data-m=orbit])').forEach(b => b.style.display = 'none');
const fwd = () => camera.getWorldDirection(new THREE.Vector3());
function setMode(m) {
  if (m === mode) return; stopTour(); const prev = mode; mode = m;
  if (prev === 'orbit') camera.rotation.setFromQuaternion(camera.quaternion, 'YXZ');
  if (m === 'orbit') { plc.unlock(); ray.set(camera.position, fwd()); ray.far = 40; const h = ray.intersectObjects(colliders, false)[0];
    orbit.target.copy(camera.position).addScaledVector(fwd(), h ? h.distance : 8); }
  if (m === 'walk') placeWalker();
  if (m !== 'orbit') camera.rotation.z = 0;
  orbit.enabled = m === 'orbit'; vy = 0;
  document.querySelectorAll('#modes .btn').forEach(b => b.classList.toggle('on', b.dataset.m === m));
  $('help').textContent = HELP[m]; $('flyspeed').style.display = m === 'fly' ? '' : 'none'; }
document.querySelectorAll('#modes .btn').forEach(b => b.onclick = () => setMode(b.dataset.m));
function placeWalker() {      // drop to the floor below the camera if close to it, else go to the nearest station
  const g = groundAt(camera.position, 0);
  if (g !== null && camera.position.y - g < 3.5) { camera.position.y = g + EYE; }
  else { let best = null, bd = 1e9; for (const p of Object.values(stations)) { const d = Math.hypot(p.x - camera.position.x, p.z - camera.position.z); if (d < bd) { bd = d; best = p; } }
    camera.position.copy(best); }
  camera.rotation.set(0, camera.rotation.y, 0); }
renderer.domElement.addEventListener('click', () => { if (mode !== 'orbit') plc.lock(); });
plc.addEventListener('lock', () => $('cross').style.display = 'block');
plc.addEventListener('unlock', () => $('cross').style.display = 'none');
let flySpeed = 4; const spd = $('spd'); spd.oninput = () => { flySpeed = +spd.value; $('spdv').textContent = `${flySpeed} m/s`; };
renderer.domElement.addEventListener('wheel', e => { if (mode !== 'fly') return; e.preventDefault();
  spd.value = Math.min(20, Math.max(0.5, flySpeed * (e.deltaY < 0 ? 1.25 : 0.8))); spd.oninput(); }, { passive: false });

const keys = {};
addEventListener('keydown', e => { if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
  keys[e.code] = true; if (tour && !e.repeat) { stopTour(); return; }
  if (e.code === 'KeyR') setCut(!roofOff); else if (e.code === 'KeyT') startTour(); else if (e.code === 'KeyH') $('ui').classList.toggle('min');
  else if (e.code === 'Digit1') setMode('orbit'); else if (e.code === 'Digit2') setMode('fly'); else if (e.code === 'Digit3') setMode('walk'); });
addEventListener('keyup', e => keys[e.code] = false);
$('hide').onclick = () => $('ui').classList.toggle('min');

// ---------- camera moves between views ----------
let anim = null; const tmpCam = new THREE.PerspectiveCamera();
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
function goView(v, dur = 2.5) {
  if (reduced) dur = 0;
  if (v.roof === false) setCut(true, roofCutY);
  if (mode === 'walk' && v.kind === 'ext') setMode('orbit');
  tmpCam.position.copy(v.pos); tmpCam.lookAt(v.target);
  anim = { p0: camera.position.clone(), q0: camera.quaternion.clone(), p1: v.pos.clone(), q1: tmpCam.quaternion.clone(), t: 0, dur, v };
  if (dur <= 0) stepAnim(1); }
function stepAnim(dt) {
  const a = anim; a.t = a.dur > 0 ? Math.min(1, a.t + dt / a.dur) : 1; const e = ease(a.t);
  camera.position.lerpVectors(a.p0, a.p1, e); camera.quaternion.slerpQuaternions(a.q0, a.q1, e);
  if (a.t >= 1) { anim = null; const v = a.v; if (v.roof === true) setCut(false);
    camera.rotation.setFromQuaternion(camera.quaternion, 'YXZ');
    orbit.target.copy(v.kind === 'ext' ? v.target : camera.position.clone().addScaledVector(fwd(), 0.5)); orbit.update(); vy = 0; } }
vsel.onchange = () => { stopTour(); goView(views[+vsel.value]); };

// tour: overview -> cutaway -> plan -> down into the church and the crypt
let tour = null;
const tourList = () => { const ext = views.filter(v => v.kind === 'ext'); const ints = views.filter(v => v.kind === 'int');
  const near = [...ints].sort((a, b) => a.pos.distanceTo(naveC) - b.pos.distanceTo(naveC)).slice(0, 3);
  const low = ints.reduce((m, v) => (!m || v.pos.y < m.pos.y) ? v : m, null);
  return [...ext, ...near, ...(low && !near.includes(low) ? [low] : [])]; };
function startTour() { if (mode !== 'orbit') setMode('orbit'); orbit.enabled = false; tour = { list: tourList(), i: -1, hold: 0 };
  $('tour').classList.add('on'); $('tour').textContent = '■ Stop tour'; }
function stopTour() { if (!tour) return; tour = null; anim = null; orbit.enabled = mode === 'orbit';
  camera.rotation.setFromQuaternion(camera.quaternion, 'YXZ'); orbit.target.copy(camera.position).addScaledVector(fwd(), camInside() ? 0.5 : 8); orbit.update();
  $('tour').classList.remove('on'); $('tour').textContent = '▶ Start tour'; }
$('tour').onclick = () => tour ? stopTour() : startTour();
renderer.domElement.addEventListener('pointerdown', () => stopTour());
function stepTour(dt) { if (anim) return; tour.hold -= dt; if (tour.hold > 0) return;
  tour.i++; if (tour.i >= tour.list.length) { stopTour(); return; }
  const v = tour.list[tour.i]; vsel.value = views.indexOf(v); status(`Tour ${tour.i + 1}/${tour.list.length}`);
  goView(v, tour.i === 0 ? 2.5 : 4.0); tour.hold = 2.5; }

// ---------- movement ----------
let vy = 0; const clock = new THREE.Clock();
function blocked(pos, dir, dist) { for (const h of [0.35, 1.1]) { ray.set(new THREE.Vector3(pos.x, pos.y - EYE + h, pos.z), dir); ray.far = dist + 0.25;
  if (ray.intersectObjects(colliders, false).length) return true; } return false; }
function walk(dt) {
  const f = fwd(); f.y = 0; f.normalize(); const r = new THREE.Vector3().crossVectors(f, camera.up);
  const mv = new THREE.Vector3(); if (keys.KeyW || keys.ArrowUp) mv.add(f); if (keys.KeyS || keys.ArrowDown) mv.sub(f); if (keys.KeyD || keys.ArrowRight) mv.add(r); if (keys.KeyA || keys.ArrowLeft) mv.sub(r);
  if (mv.lengthSq()) { mv.normalize().multiplyScalar((keys.ShiftLeft || keys.ShiftRight ? 3.2 : 1.4) * dt);
    for (const m of [mv, new THREE.Vector3(mv.x, 0, 0), new THREE.Vector3(0, 0, mv.z)]) {        // slide along walls
      if (m.lengthSq() && !blocked(camera.position, m.clone().normalize(), m.length())) { camera.position.add(m); break; } } }
  const g = groundAt(camera.position, -EYE + 0.45);                                              // step-up limit 0.45 m
  if (g !== null && camera.position.y - EYE <= g + 0.02) { camera.position.y = g + EYE; vy = 0; } else { vy -= 9.8 * dt; camera.position.y += vy * dt;
    if (g !== null && camera.position.y - EYE < g) { camera.position.y = g + EYE; vy = 0; } } }
function fly(dt) {
  const f = fwd(), r = new THREE.Vector3().crossVectors(f, camera.up).normalize(), mv = new THREE.Vector3();
  if (keys.KeyW || keys.ArrowUp) mv.add(f); if (keys.KeyS || keys.ArrowDown) mv.sub(f); if (keys.KeyD || keys.ArrowRight) mv.add(r); if (keys.KeyA || keys.ArrowLeft) mv.sub(r);
  if (keys.KeyE || keys.Space) mv.y += 1; if (keys.KeyQ || keys.KeyC) mv.y -= 1;
  if (mv.lengthSq()) camera.position.addScaledVector(mv.normalize(), flySpeed * (keys.ShiftLeft || keys.ShiftRight ? 3 : 1) * dt); }

// ---------- frame ----------
let exposure = expOut, userEV = +(Q.get('ev') || 0);
const evIn = $('ev'); evIn.value = userEV;
evIn.oninput = () => { userEV = +evIn.value; $('evv').textContent = `${userEV > 0 ? '+' : ''}${userEV} EV`; }; evIn.oninput();
function camInside() { const p = camera.position; return isIn(p) && p.y < (roofOff ? cutY : topY) && p.y > bbox.min.y - 1; }
function updateExposure(dt) { const ins = camInside();
  const tE = ins ? expIn : expOut, tL = roofOff && !ins ? 1 : 0, k = Math.min(1, dt * 1.2);
  exposure += (tE - exposure) * k; U.local.value += (tL - U.local.value) * k; U.exposure.value = exposure * Math.pow(2, userEV); }
function frame(dt) {
  if (tour) stepTour(dt);
  if (anim) stepAnim(dt);
  else if (mode === 'orbit') { orbit.maxPolarAngle = camInside() ? Math.PI * 0.97 : Math.PI * 0.495; orbit.update(); }
  else if (plc.isLocked && mode === 'walk') walk(dt);
  else if (plc.isLocked && mode === 'fly') fly(dt);
  updateExposure(dt); }

// initial view: ?view=<name or index>, ?station=, ?roof=0, ?cut=<m>
mode = 'none'; setMode('orbit');
const qv = Q.get('view'), qs = Q.get('station');
const startV = qs ? views.find(v => v.station === qs) : qv != null ? (views.find(v => v.name === qv) || views[+qv]) : views[0];
if (startV) { vsel.value = views.indexOf(startV); goView(startV, 0); }
if (qs && (Q.has('yaw') || Q.has('pitch'))) { camera.rotation.set(THREE.MathUtils.degToRad(+(Q.get('pitch') || 0)), THREE.MathUtils.degToRad(+(Q.get('yaw') || 0)), 0, 'YXZ'); }
if (Q.has('roof') || Q.has('cut')) setCut(Q.get('roof') === '0' || Q.has('cut'), Q.has('cut') ? +Q.get('cut') : roofCutY);
exposure = camInside() ? expIn : expOut; U.local.value = roofOff && !camInside() ? 1 : 0;
status(`Ready · ${views.length} views`);
$('gate').classList.add('done');
renderer.setAnimationLoop(() => { frame(Math.min(clock.getDelta(), 0.05)); renderer.render(scene, camera); });
if (Q.has('shot')) { updateExposure(0); renderer.render(scene, camera); document.title = 'READY'; }
