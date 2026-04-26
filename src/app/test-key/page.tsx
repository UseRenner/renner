import { KeyIcon } from "@/components/KeyIcon";

// TEMPORARY page for reviewing the KeyIcon at multiple sizes.
// Delete this file once the icon is approved.

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
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily:
              "var(--font-source-serif), Georgia, serif",
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
            marginBottom: "48px",
          }}
        >
          Outlined (#a7b2be) at rest, filled (#0d0f12) when saved. Each
          column shows the icon at 16, 24, 32, and 48&nbsp;px.
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
          <Column label="Unsaved (outlined)" filled={false} />
          <Column
            label="Saved (filled)"
            filled
            borderLeft
          />
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
              gap: "16px",
              color: filled ? "#0d0f12" : "#a7b2be",
            }}
          >
            <div
              style={{
                width: "64px",
                display: "flex",
                justifyContent: "center",
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
              {size}&nbsp;px
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
