import { ImageResponse } from "next/og";

export const alt = "Renner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          backgroundColor: "#0d0f12",
          color: "#fbfbfc",
          fontFamily: "Georgia, serif",
        }}
      >
        <svg width="220" height="220" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#fbfbfc" />
          <g transform="rotate(12 10 10)">
            <rect x="8" y="1" width="4" height="18" rx="2" fill="#0d0f12" />
          </g>
        </svg>
        <div
          style={{
            fontSize: "84px",
            fontWeight: 500,
            letterSpacing: "-0.03em",
          }}
        >
          Renner
        </div>
      </div>
    ),
    { ...size },
  );
}
