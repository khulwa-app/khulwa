import { ImageResponse } from "next/og";

export const alt = "Khulwa — a quiet focus space for deep work";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function QuietSignalMark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 12, height: 30, borderRadius: 999, background: "#C8D3CD" }} />
      <div style={{ width: 12, height: 70, borderRadius: 999, background: "#C8D3CD" }} />
      <div style={{ width: 12, height: 110, borderRadius: 999, background: "#7FA08D" }} />
      <div style={{ width: 12, height: 70, borderRadius: 999, background: "#C8D3CD" }} />
      <div style={{ width: 12, height: 30, borderRadius: 999, background: "#C8D3CD" }} />
    </div>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08110E",
          color: "#F7F2FF",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <QuietSignalMark />
          <div style={{ fontSize: 54, fontWeight: 700, letterSpacing: -2 }}>Khulwa.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ color: "#AFC6BA", fontSize: 28, fontWeight: 700, letterSpacing: 8, textTransform: "uppercase" }}>
            Quiet focus space
          </div>
          <div style={{ maxWidth: 900, fontSize: 82, fontWeight: 800, lineHeight: 0.95, letterSpacing: -5 }}>
            Pick one thing. Stay with it.
          </div>
          <div style={{ maxWidth: 780, color: "#C8D3CD", fontSize: 30, lineHeight: 1.35 }}>
            Tasks, timer, ambience, and progress in one calm workspace for deep work.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
