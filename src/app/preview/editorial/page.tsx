import Link from "next/link";

export const metadata = {
  title: "Renner · A field journal for real estate",
  robots: { index: false, follow: false },
};

const INK = "#1a1a1a";
const IVORY = "#f6f3ed";
const RULE = "#1a1a1a";
const STEEL = "#647589";
const MUTED = "#9b9486";
const OXBLOOD = "#7a2c2c";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const BRIEFS = [
  {
    kicker: "SIGNS · DENVER",
    title: "Install sign rider",
    meta: "80205 · TODAY 14:00–17:00 · $45",
    body: "Standard rider on a corner lot in RiNo. Bring a 6 ft ladder. Photographic confirmation on completion.",
    byline: "Posted by Sarah K., Cherry Creek",
  },
  {
    kicker: "SHOWING · CHICAGO",
    title: "Show property to buyer",
    meta: "60614 · TOMORROW 11:00 · $75",
    body: "Out-of-state client touring three units in Lincoln Park. Active CO+IL license preferred. One-hour window.",
    byline: "Posted by Marcus T., Lincoln Park",
  },
  {
    kicker: "VISUALS · LOS ANGELES",
    title: "Walkthrough photography",
    meta: "90069 · FRI 09:00–11:00 · $75",
    body: "Pre-listing walkthrough. Twelve-photo brief — hero exterior shot, two interiors per room. DSLR or mirrorless equivalent.",
    byline: "Posted by Chen L., West Hollywood",
  },
  {
    kicker: "COURIER · NEW YORK",
    title: "Deliver closing documents",
    meta: "10013 · MON 10:00 · $45",
    body: "Pick-up at SoHo title office, drop at buyer's residence in Tribeca. Photographic confirmation on both ends.",
    byline: "Posted by Aisha R., SoHo",
  },
];

const STEPS = [
  {
    n: "I",
    title: "Post a task.",
    body: (
      <>
        Describe what you need — a sign install, a lockbox swap, a property
        walkthrough, a showing. Set the location, the window, the price.
      </>
    ),
  },
  {
    n: "II",
    title: "A vetted Renner applies.",
    body: (
      <>
        Background-checked Renners in your area see the brief and apply. Read
        their bio, their tenure, their reviews. Pick the right fit for the
        work.
      </>
    ),
  },
  {
    n: "III",
    title: (
      <>
        It gets <i style={{ fontWeight: 300, color: STEEL }}>done.</i>
      </>
    ),
    body: (
      <>
        Your Renner handles it. You receive completion photos and a written
        confirmation. Payment releases through Stripe. The brief closes.
      </>
    ),
  },
];

const COLOPHON = [
  ["FOUNDED", "Denver, 2026"],
  ["MEMBERS", "Real-estate professionals across the U.S."],
  ["FREQUENCY", "Continuous"],
  ["DELIVERY", "Instant"],
];

export default function EditorialPreview() {
  return (
    <div
      style={{
        backgroundColor: IVORY,
        color: INK,
        minHeight: "100vh",
        fontFamily: SANS,
      }}
    >
      <Header />
      <Masthead />
      <FromTheField />
      <HowItWorks />
      <Colophon />
    </div>
  );
}

function Header() {
  return (
    <header
      style={{
        borderBottom: `1px solid ${RULE}`,
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: INK,
        }}
      >
        Vol. I · No. 1
      </span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: INK,
        }}
      >
        Tuesday, April 28, 2026
      </span>
      <Link
        href="#"
        style={{
          fontFamily: SANS,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: INK,
          textDecoration: "none",
        }}
      >
        Sign in →
      </Link>
    </header>
  );
}

function Masthead() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "96px 24px 80px",
        borderBottom: `1px solid ${RULE}`,
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: STEEL,
          marginBottom: 20,
        }}
      >
        A field journal for real estate
      </div>

      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontVariationSettings: '"opsz" 144',
          fontSize: "clamp(96px, 18vw, 220px)",
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          margin: 0,
          marginBottom: 48,
          color: INK,
        }}
      >
        Renner
      </h1>

      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(20px, 2.4vw, 28px)",
          lineHeight: 1.4,
          color: INK,
          maxWidth: 720,
          margin: "0 auto 56px",
        }}
      >
        A network of background-checked Renners running tasks for agents,
        brokers, and property managers — by the hour, by the task.{" "}
        <i style={{ fontWeight: 300, color: STEEL }}>Underway.</i>
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <Hairline width={120} />
        <Link
          href="#"
          style={{
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: OXBLOOD,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Become a member →
        </Link>
        <Hairline width={120} />
      </div>
    </section>
  );
}

function FromTheField() {
  return (
    <section style={{ padding: "80px 0 24px" }}>
      <SectionRule label="From the field · 12 listings" />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {BRIEFS.map((b, i) => (
          <article
            key={b.title}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(160px, 200px) 1fr",
              gap: 32,
              padding: "40px 0",
              borderBottom:
                i === BRIEFS.length - 1 ? "none" : `1px solid ${RULE}`,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: OXBLOOD,
                  marginBottom: 12,
                }}
              >
                {b.kicker}
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 12,
                  color: STEEL,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                {b.byline}
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 60',
                  fontSize: 32,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: INK,
                  margin: 0,
                  marginBottom: 12,
                }}
              >
                {b.title}
              </h2>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  color: STEEL,
                  marginBottom: 16,
                }}
              >
                {b.meta}
              </div>
              <p
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: INK,
                  margin: 0,
                  maxWidth: 620,
                }}
              >
                {b.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 32,
          paddingTop: 32,
          borderTop: `1px solid ${RULE}`,
        }}
      >
        <Link
          href="#"
          style={{
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: OXBLOOD,
            textDecoration: "none",
          }}
        >
          See all listings →
        </Link>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ padding: "80px 0 24px" }}>
      <SectionRule label="How it works · in brief" />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 56,
        }}
      >
        {STEPS.map((s) => (
          <div key={s.n}>
            <div
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: 36,
                color: OXBLOOD,
                marginBottom: 16,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {s.n}.
            </div>
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                fontVariationSettings: '"opsz" 14',
                fontSize: 20,
                lineHeight: 1.25,
                color: INK,
                margin: 0,
                marginBottom: 12,
                letterSpacing: "-0.005em",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 16,
                lineHeight: 1.6,
                color: INK,
                margin: 0,
              }}
            >
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Colophon() {
  return (
    <footer
      style={{
        marginTop: 96,
        borderTop: `1px solid ${RULE}`,
        padding: "64px 32px 40px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gap: 56,
            marginBottom: 64,
          }}
          className="colophon-grid"
        >
          <div>
            <div
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontVariationSettings: '"opsz" 144',
                fontSize: 56,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: INK,
                marginBottom: 16,
              }}
            >
              Renner
            </div>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 15,
                lineHeight: 1.55,
                color: INK,
                margin: 0,
                maxWidth: 360,
              }}
            >
              A field journal for real estate. Issued continuously from{" "}
              <i style={{ fontWeight: 300, color: STEEL }}>Denver</i>, with
              members in every market.
            </p>
          </div>

          <dl style={{ margin: 0 }}>
            {COLOPHON.map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 16,
                  padding: "10px 0",
                  borderBottom: `1px solid ${MUTED}33`,
                  alignItems: "baseline",
                }}
              >
                <dt
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: STEEL,
                  }}
                >
                  {label}
                </dt>
                <dd
                  style={{
                    fontFamily: SERIF,
                    fontSize: 15,
                    color: INK,
                    margin: 0,
                  }}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <nav>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {[
                ["Field Notes", "How it works"],
                ["Membership", "Become a member"],
                ["Correspondence", "Contact"],
                ["Terms", "Terms"],
                ["Privacy", "Privacy"],
              ].map(([label, sub]) => (
                <li key={label}>
                  <Link
                    href="#"
                    style={{
                      fontFamily: SERIF,
                      fontSize: 16,
                      color: INK,
                      textDecoration: "none",
                      lineHeight: 1.3,
                    }}
                  >
                    {label}
                    <span
                      style={{
                        fontFamily: SANS,
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: STEEL,
                        marginLeft: 8,
                      }}
                    >
                      / {sub}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          style={{
            paddingTop: 24,
            borderTop: `1px solid ${RULE}`,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: STEEL,
            }}
          >
            © 2026 Renner · All rights reserved
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: STEEL,
            }}
          >
            Set in Source Serif 4 · Source Sans 3 · Source Code Pro
          </span>
        </div>
      </div>
    </footer>
  );
}

function SectionRule({ label }: { label: string }) {
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto 48px",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <span style={{ flex: 1, height: 1, backgroundColor: RULE }} />
      <span
        style={{
          fontFamily: SANS,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: INK,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span style={{ flex: 1, height: 1, backgroundColor: RULE }} />
    </div>
  );
}

function Hairline({ width }: { width: number }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width,
        height: 1,
        backgroundColor: RULE,
      }}
    />
  );
}
