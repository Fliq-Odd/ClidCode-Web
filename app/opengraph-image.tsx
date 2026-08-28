import { ImageResponse } from "next/og";

export const alt = "CLIQ Code AI coding agent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#050505",
        color: "#F3F4F6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        width: "100%",
        height: "100%",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ color: "#00FFA2", fontSize: 28, letterSpacing: 8 }}>CLIQ CODE</div>
      <div style={{ fontSize: 72, fontWeight: 700, marginTop: 28 }}>AI coding agent</div>
      <div style={{ color: "#8B8B99", fontSize: 32, marginTop: 20 }}>C++ performance. Python intelligence. Terminal control.</div>
    </div>,
    size,
  );
}