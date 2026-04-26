import { KeyIcon } from "@/components/KeyIcon";

// TEMPORARY page for reviewing the KeyIcon at multiple sizes.
// Delete this file once the icon is approved.
//
// The icon is now ONE continuous closed path traced around the
// entire silhouette: bow + shaft + two identical teeth, all
// connected with no gaps, no inner cutout, no separate pieces.
// Both states fill this same path with a single color.

const SIZES = [16, 24, 32, 48] as const;

export default function TestKeyPage() {
  return (
    <main
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        padding: "64px 32px",
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
        color: "#0d0f12",
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-source-serif), Georgia, serif",
            fontVariationSettings: '"opsz" 144',
            fontSize: "32px",
            fontWeight: 400,
            letterSpacing: "-0.035em",
            color: "#0d0f12",
            marginBottom: "8px",
          }}
        >
          Key icon preview
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "#647589",
            marginBottom: "16px",
          }}
        >
          One continuous closed path traced around the whole key — bow,
          shaft, and two identical teeth fused into a single silhouette
          with no internal gaps. Unsaved fills with #a7b2be, saved fills
          with #0d0f12. The 24&times;16 viewBox keeps the icon wide so
          it sits naturally inline.
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "#647589",
            marginBottom: "48px",
          }}
        >
          Inline next to a name:&nbsp;
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 500,
              color: "#0d0f12",
            }}
          >
            Marcus King
            <KeyIcon filled={false} size={16} />
          </span>
          &nbsp;·&nbsp;
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 500,
              color: "#0d0f12",
            }}
          >
            Marcus King
            <KeyIcon filled size={16} />
          </span>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "1px solid #eaedf0",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Column label="Unsaved (#a7b2be)" filled={false} />
          <Column label="Saved (#0d0f12)" filled borderLeft />
        </div>
      </div>
    </main>
  );
}

function Column({
  label,
  filled,
  borderLeft,
}: {
  label: string;
  filled: boolean;
  borderLeft?: boolean;
}) {
  return (
    <div
      style={{
        padding: "32px 24px",
        borderLeft: borderLeft ? "1px solid #eaedf0" : undefined,
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#7d8da0",
          marginBottom: "32px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {SIZES.map((size) => (
          <div
            key={size}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "84px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <KeyIcon filled={filled} size={size} />
            </div>
            <span
              style={{
                fontSize: "13px",
                color: "#647589",
              }}
            >
              {size}&nbsp;px tall &middot; {Math.round(size * 1.5)}&nbsp;px wide
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
