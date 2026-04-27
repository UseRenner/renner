import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
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
          backgroundColor: "#0d0f12",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#fbfbfc" />
          <g transform="rotate(12 10 10)">
            <rect x="8" y="1" width="4" height="18" rx="2" fill="#0d0f12" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
