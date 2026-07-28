import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — Robotics, AI and Autonomous Systems`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card echoing the hero: neon name on a dark perspective grid. Drawn with
 * plain gradients because Satori (the renderer behind ImageResponse) supports
 * neither canvas nor text-shadow.
 */
export default function OpenGraphImage() {
  const horizon = 250;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#05040F",
          position: "relative",
          padding: "0 72px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Ground haze below the horizon. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: horizon,
            bottom: 0,
            background:
              "linear-gradient(180deg, #1A0A28 0%, #120818 55%, #05040F 100%)",
          }}
        />

        {/* Spot silhouette on the horizon — cyan/magenta stand-in for the URDF. */}
        <div
          style={{
            position: "absolute",
            left: 820,
            top: horizon - 150,
            width: 280,
            height: 150,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 150,
              height: 70,
              bottom: 48,
              borderRadius: 12,
              background:
                "linear-gradient(180deg, rgba(0,240,255,0.35) 0%, rgba(0,240,255,0.85) 100%)",
            }}
          />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 40 + i * 50,
                bottom: 0,
                width: 18,
                height: 70,
                borderRadius: 4,
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg, rgba(0,240,255,0.7) 0%, rgba(255,43,214,0.85) 100%)"
                    : "linear-gradient(180deg, rgba(255,106,0,0.75) 0%, rgba(139,92,255,0.9) 100%)",
              }}
            />
          ))}
        </div>

        {/* Receding grid lines, spaced so they compress toward the horizon. */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const t = (i + 1) / 8;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: horizon + (630 - horizon) * t * t,
                height: 1 + t * 2,
                background: `rgba(0,240,255,${0.15 + t * 0.5})`,
              }}
            />
          );
        })}

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: horizon,
            height: 2,
            background: "#00F0FF",
          }}
        />

        {/* Scrim so the grid never strikes through the headline. Satori needs
            explicit offsets; it ignores the `inset` shorthand. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: size.width,
            height: size.height,
            background:
              "linear-gradient(100deg, rgba(5,4,15,0.97) 0%, rgba(5,4,15,0.92) 42%, rgba(5,4,15,0.35) 72%, rgba(5,4,15,0) 100%)",
          }}
        />

        {/* Last in document order so it paints over the grid; Satori has no z-index. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: "#00F0FF",
              marginBottom: 20,
            }}
          >
            {profile.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#E8ECF8",
              lineHeight: 1.05,
            }}
          >
            NIKOLAOS GIAKOUMIDIS
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#8A93B5",
              marginTop: 22,
            }}
          >
            {profile.currentRole.title} · NYU Abu Dhabi
          </div>
        </div>
      </div>
    ),
    size,
  );
}
