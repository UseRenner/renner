import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "Design system preview · Renner",
  robots: { index: false, follow: false },
};

const SANS = "var(--font-source-sans), ui-sans-serif, system-ui";
const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";

const STEEL = {
  black: "#0d0f12",
  ink: "#1a1d22",
  graphite: "#2a2f36",
  slate: "#4d5b6a",
  steel: "#647589",
  fog: "#7d8da0",
  mist: "#cad1d8",
  cloud: "#dce0e5",
  paper: "#eaedf0",
  bone: "#f0f2f5",
  white: "#fbfbfc",
};

export default function DesignSystemPreview() {
  return (
    <div className="mx-auto" style={{ maxWidth: "1100px" }}>
      <div className="micro-label" style={{ marginBottom: "12px" }}>
        Design system · proposed v2
      </div>
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "48px",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: STEEL.black,
          marginBottom: "16px",
        }}
      >
        Tokens, type, and components.
      </h1>
      <p
        style={{
          fontFamily: SANS,
          fontSize: "15px",
          color: STEEL.steel,
          lineHeight: 1.65,
          marginBottom: "64px",
          maxWidth: "640px",
        }}
      >
        Preview of the proposed Renner design system. Inline styles only — this
        page does not affect global styles. Compare directly against any live
        page in another tab.
      </p>

      <Section title="Brand lockup">
        <Row>
          <TokenLabel>Logo 22 · Wordmark 22 · gap 10</TokenLabel>
          <BrandLockup tone="dark" />
        </Row>
        <Row>
          <TokenLabel>tone=&quot;light&quot;</TokenLabel>
          <div
            style={{
              backgroundColor: STEEL.black,
              padding: "16px 20px",
              borderRadius: 8,
              display: "inline-flex",
            }}
          >
            <BrandLockup tone="light" />
          </div>
        </Row>
      </Section>

      <Section title="Display type — Source Serif 4 · weight 400">
        <DisplaySample
          token="display-1 · 64 / 1.05 / -0.025em"
          size={64}
          tracking="-0.025em"
          line={1.05}
        >
          Keep real estate <Em>running.</Em>
        </DisplaySample>
        <DisplaySample
          token="display-2 (.page-title) · 36 / 1.1 / -0.022em"
          size={36}
          tracking="-0.022em"
          line={1.1}
        >
          How Renner <Em>works</Em>
        </DisplaySample>
        <DisplaySample
          token="display-3 (section / CTA) · 24 / 1.2 / -0.018em"
          size={24}
          tracking="-0.018em"
          line={1.2}
        >
          Ready to <Em>run?</Em>
        </DisplaySample>
        <DisplaySample
          token="display-4 (step / card) · 18 / 1.3 / -0.01em"
          size={18}
          tracking="-0.01em"
          line={1.3}
        >
          Create your profile.
        </DisplaySample>
      </Section>

      <Section title="UI type — Source Sans 3">
        <UISample token="body · 15 / 1.6 / 400" size={15} line={1.6} weight={400}>
          Background-checked Renners in your area see your task and apply.
          Review their profile, ratings, and experience. Pick the right fit.
        </UISample>
        <UISample
          token="body-s · 14 / 1.5 / 400"
          size={14}
          line={1.5}
          weight={400}
        >
          Your Renner handles it. You get confirmation with completion photos.
        </UISample>
        <UISample
          token="caption · 13 / 1.5 / 400"
          size={13}
          line={1.5}
          weight={400}
          color={STEEL.steel}
        >
          12 tasks completed · 4.9★ · Denver, CO
        </UISample>
        <UISample
          token="helper · 12 / 1.45 / 400"
          size={12}
          line={1.45}
          weight={400}
          color={STEEL.fog}
        >
          We&rsquo;ll never share your email.
        </UISample>
        <Row>
          <TokenLabel>micro · 11 / 1 / 500 · 0.14em uppercase</TokenLabel>
          <span
            style={{
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: STEEL.fog,
            }}
          >
            What you get
          </span>
        </Row>
        <Row>
          <TokenLabel>nav · 14 / 1 / 500</TokenLabel>
          <span
            style={{
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 500,
              color: STEEL.black,
            }}
          >
            Browse · My tasks · Messages
          </span>
        </Row>
        <Row>
          <TokenLabel>button · 14 / 1 / 500 · 0.01em</TokenLabel>
          <span
            style={{
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: STEEL.black,
            }}
          >
            Sign up · Become a Renner · Apply
          </span>
        </Row>
        <Row>
          <TokenLabel>input · 15 / 1.5 / 400</TokenLabel>
          <span style={{ fontFamily: SANS, fontSize: 15, color: STEEL.black }}>
            you@example.com
          </span>
        </Row>
      </Section>

      <Section title="Spacing scale (4px base)">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontFamily: SANS,
            fontSize: 13,
            color: STEEL.steel,
          }}
        >
          {[4, 8, 12, 16, 24, 32, 48, 64, 96].map((s) => (
            <div
              key={s}
              style={{ display: "flex", alignItems: "center", gap: 16 }}
            >
              <code
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                  fontSize: 12,
                  color: STEEL.fog,
                  width: 56,
                }}
              >
                {String(s).padStart(2, "0")}px
              </code>
              <div
                style={{
                  height: 12,
                  width: s,
                  backgroundColor: STEEL.black,
                  borderRadius: 2,
                }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Layout">
        <Spec label="content max-width (forms / prose)" value="880px" />
        <Spec label="content max-width (header / browse)" value="1200px" />
        <Spec label="page top padding" value="56 desktop · 32 mobile" />
        <Spec label="page bottom padding" value="80 desktop · 48 mobile" />
        <Spec label="section gap (between major blocks)" value="64" />
        <Spec label="heading → body gap" value="24" />
        <Spec label="within-section item gap" value="12" />
      </Section>

      <Section title="Color — steel monochrome">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 12,
          }}
        >
          {Object.entries(STEEL).map(([name, hex]) => (
            <Swatch key={name} name={name} hex={hex} />
          ))}
        </div>
      </Section>

      <Section title="Buttons">
        <Row>
          <TokenLabel>btn-dark · 44h · pad 12×22 · radius 6</TokenLabel>
          <Btn variant="dark">Sign up</Btn>
        </Row>
        <Row>
          <TokenLabel>btn-light · 44h · pad 12×22 · radius 6</TokenLabel>
          <Btn variant="light">Message</Btn>
        </Row>
        <Row>
          <TokenLabel>btn-outline-dark · 44h · pad 12×22 · radius 6</TokenLabel>
          <Btn variant="outline">Become a Renner</Btn>
        </Row>
      </Section>

      <Section title="Inputs">
        <div style={{ maxWidth: 360 }}>
          <label
            style={{
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: STEEL.fog,
              display: "block",
              marginBottom: 8,
            }}
          >
            Email
          </label>
          <input
            type="text"
            defaultValue="you@example.com"
            style={{
              fontFamily: SANS,
              fontSize: 15,
              color: STEEL.black,
              height: 44,
              padding: "12px 14px",
              border: `1px solid ${STEEL.cloud}`,
              borderRadius: 6,
              width: "100%",
              outline: "none",
            }}
          />
          <div
            style={{
              fontFamily: SANS,
              fontSize: 12,
              color: STEEL.fog,
              marginTop: 6,
            }}
          >
            We&rsquo;ll never share your email.
          </div>
        </div>
      </Section>

      <Section title="Cards">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <SampleCard />
          <SampleCard />
        </div>
      </Section>

      <Section title="Chips / pills">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Signs", "Lockbox", "Courier", "Visuals", "Showing"].map((c) => (
            <span
              key={c}
              style={{
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 500,
                color: STEEL.black,
                padding: "8px 14px",
                borderRadius: 999,
                backgroundColor: STEEL.bone,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Avatars">
        <Row>
          <TokenLabel>sm · 32 · 12px text</TokenLabel>
          <Avatar size={32} fontSize={12}>
            JD
          </Avatar>
        </Row>
        <Row>
          <TokenLabel>md · 44 · 14px text</TokenLabel>
          <Avatar size={44} fontSize={14}>
            JD
          </Avatar>
        </Row>
      </Section>

      <Section title="Ghost numerals">
        <Row>
          <TokenLabel>88 / 0.85 / 5% black</TokenLabel>
          <div style={{ display: "flex", gap: 32 }}>
            {["01", "02", "03"].map((n) => (
              <span
                key={n}
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 88,
                  lineHeight: 0.85,
                  letterSpacing: "-0.04em",
                  color: "rgba(13, 15, 18, 0.05)",
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </Row>
      </Section>

      <Section title="Radii & rules">
        <Spec label="radius small" value="4" />
        <Spec label="radius default" value="6" />
        <Spec label="radius card" value="8" />
        <Spec label="radius pill" value="999" />
        <Spec label="border default" value="1px #eaedf0" />
        <Spec label="border on muted gray" value="1px #dce0e5" />
        <Spec label="hover transition" value="150ms ease" />
      </Section>

      <Section title="Composition — proposed page heading + step + CTA">
        <div
          style={{
            border: `1px solid ${STEEL.paper}`,
            borderRadius: 8,
            padding: "56px 48px",
            backgroundColor: STEEL.white,
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 36,
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
              color: STEEL.black,
              margin: 0,
              marginBottom: 40,
            }}
          >
            How Renner <Em>works</Em>
          </h2>

          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 32,
              marginBottom: 48,
            }}
          >
            {[
              {
                n: "01",
                t: "Create your profile.",
                b: "Sign up, verify your identity, and pass a background check. Set your service area.",
              },
              {
                n: "02",
                t: "Browse and apply.",
                b: "See tasks posted by agents and brokers in your area. Apply to the ones that fit.",
              },
              {
                n: "03",
                t: "Get it done.",
                b: "Complete the task, upload photos, and get paid securely through the platform.",
              },
            ].map((step) => (
              <li key={step.n}>
                <div
                  aria-hidden
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 400,
                    fontSize: 88,
                    lineHeight: 0.85,
                    color: "rgba(13, 15, 18, 0.05)",
                    marginBottom: 8,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {step.n}
                </div>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 400,
                    fontSize: 18,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    color: STEEL.black,
                    marginBottom: 8,
                  }}
                >
                  {step.t}
                </h3>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: STEEL.slate,
                    margin: 0,
                    maxWidth: 640,
                  }}
                >
                  {step.b}
                </p>
              </li>
            ))}
          </ol>

          <div
            style={{
              borderTop: `1px solid ${STEEL.paper}`,
              paddingTop: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 24,
                lineHeight: 1.2,
                letterSpacing: "-0.018em",
                color: STEEL.black,
                margin: 0,
              }}
            >
              Ready to <Em>run?</Em>
            </h2>
            <Btn variant="dark">Become a Renner</Btn>
          </div>
        </div>
      </Section>

      <div style={{ marginTop: 64, marginBottom: 24 }}>
        <Link
          href="/examples"
          style={{
            fontFamily: SANS,
            fontSize: 13,
            color: STEEL.steel,
            textDecoration: "none",
          }}
        >
          ← Back to examples
        </Link>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 80 }}>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: STEEL.fog,
          marginBottom: 24,
          paddingBottom: 12,
          borderBottom: `1px solid ${STEEL.paper}`,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {children}
      </div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        alignItems: "center",
        gap: 24,
      }}
    >
      {children}
    </div>
  );
}

function TokenLabel({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        fontSize: 11,
        color: STEEL.fog,
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </code>
  );
}

function DisplaySample({
  token,
  size,
  tracking,
  line,
  children,
}: {
  token: string;
  size: number;
  tracking: string;
  line: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        alignItems: "baseline",
        gap: 24,
      }}
    >
      <TokenLabel>{token}</TokenLabel>
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: size,
          lineHeight: line,
          letterSpacing: tracking,
          color: STEEL.black,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function UISample({
  token,
  size,
  line,
  weight,
  color,
  children,
}: {
  token: string;
  size: number;
  line: number;
  weight: number;
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        alignItems: "baseline",
        gap: 24,
      }}
    >
      <TokenLabel>{token}</TokenLabel>
      <p
        style={{
          fontFamily: SANS,
          fontSize: size,
          lineHeight: line,
          fontWeight: weight,
          color: color ?? STEEL.black,
          margin: 0,
          maxWidth: 640,
        }}
      >
        {children}
      </p>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        alignItems: "center",
        gap: 24,
        fontFamily: SANS,
        fontSize: 14,
        color: STEEL.black,
      }}
    >
      <code
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: 11,
          color: STEEL.fog,
        }}
      >
        {label}
      </code>
      <span>{value}</span>
    </div>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL.steel }}>
      {children}
    </span>
  );
}

function BrandLockup({ tone }: { tone: "dark" | "light" }) {
  const fill = tone === "light" ? STEEL.white : STEEL.black;
  const slot = tone === "light" ? STEEL.black : STEEL.white;
  const word = tone === "light" ? STEEL.white : STEEL.black;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        color: word,
      }}
    >
      <Logo size={22} fill={fill} slotColor={slot} />
      <span
        style={{
          fontFamily: SERIF,
          fontWeight: 500,
          fontSize: 22,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: word,
        }}
      >
        Renner
      </span>
    </span>
  );
}

function Btn({
  variant,
  children,
}: {
  variant: "dark" | "light" | "outline";
  children: React.ReactNode;
}) {
  const base = {
    fontFamily: SANS,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.01em",
    height: 44,
    padding: "0 22px",
    borderRadius: 6,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  } as const;
  if (variant === "dark") {
    return (
      <button
        type="button"
        style={{
          ...base,
          backgroundColor: STEEL.black,
          color: STEEL.white,
          border: `1px solid ${STEEL.black}`,
        }}
      >
        {children}
      </button>
    );
  }
  if (variant === "light") {
    return (
      <button
        type="button"
        style={{
          ...base,
          backgroundColor: STEEL.bone,
          color: STEEL.black,
          border: `1px solid ${STEEL.cloud}`,
        }}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type="button"
      style={{
        ...base,
        backgroundColor: "transparent",
        color: STEEL.black,
        border: `1px solid ${STEEL.black}`,
      }}
    >
      {children}
    </button>
  );
}

function Avatar({
  size,
  fontSize,
  children,
}: {
  size: number;
  fontSize: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        backgroundColor: STEEL.black,
        color: STEEL.white,
        fontFamily: SANS,
        fontSize,
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  const dark = ["black", "ink", "graphite", "slate"].includes(name);
  return (
    <div
      style={{
        border: `1px solid ${STEEL.paper}`,
        borderRadius: 6,
        overflow: "hidden",
        backgroundColor: STEEL.white,
      }}
    >
      <div style={{ height: 56, backgroundColor: hex }} />
      <div style={{ padding: "10px 12px" }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 13,
            fontWeight: 500,
            color: STEEL.black,
          }}
        >
          {name}
          {dark ? " ✓" : ""}
        </div>
        <code
          style={{
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            fontSize: 11,
            color: STEEL.fog,
          }}
        >
          {hex}
        </code>
      </div>
    </div>
  );
}

function SampleCard() {
  return (
    <div
      style={{
        backgroundColor: STEEL.white,
        border: `1px solid ${STEEL.paper}`,
        borderRadius: 8,
        padding: 24,
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: STEEL.fog,
          marginBottom: 12,
        }}
      >
        Signs
      </div>
      <h3
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
          color: STEEL.black,
          margin: 0,
          marginBottom: 8,
        }}
      >
        Install sign rider
      </h3>
      <p
        style={{
          fontFamily: SANS,
          fontSize: 14,
          lineHeight: 1.5,
          color: STEEL.slate,
          margin: 0,
          marginBottom: 16,
        }}
      >
        RiNo Denver 80205 · Today 2:00 – 5:00 PM
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: 24,
            color: STEEL.black,
            letterSpacing: "-0.018em",
          }}
        >
          $45
        </span>
        <Btn variant="dark">Apply</Btn>
      </div>
    </div>
  );
}
