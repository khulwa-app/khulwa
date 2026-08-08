import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 42,
          background: "#08110E",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 10, height: 24, borderRadius: 999, background: "#C8D3CD" }} />
          <div style={{ width: 10, height: 56, borderRadius: 999, background: "#C8D3CD" }} />
          <div style={{ width: 10, height: 88, borderRadius: 999, background: "#7FA08D" }} />
          <div style={{ width: 10, height: 56, borderRadius: 999, background: "#C8D3CD" }} />
          <div style={{ width: 10, height: 24, borderRadius: 999, background: "#C8D3CD" }} />
        </div>
      </div>
    ),
    size,
  );
}
