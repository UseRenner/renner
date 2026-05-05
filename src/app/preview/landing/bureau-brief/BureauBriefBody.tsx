"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { CATEGORY_STRIP_SHORT, HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, MONO, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;
const RULE = "var(--c-rule, #eaedf0)";

// BRIEF — triptych. A single rule-weight frame contains three
// equal panels divided by internal vertical hairlines. Panel 1:
// headline + dek. Panel 2: categories. Panel 3: signup. Reads as
// a museum exhibit case — three contained pieces in one breath.
// The DNA of how-it-works Brief translated to a sign-up wall.

export function BureauBriefBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main
        style={{
          flex: 1,
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          paddingLeft: "clamp(24px, 4vw, 64px)",
          paddingRight: "clamp(24px, 4vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <section
          className="brief-triptych"
          style={{
            width: "100%",
            maxWidth: 1280,
            border: `1px solid ${RULE}`,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
          {/* Panel 1 — headline + dek */}
          <article
            style={{
              borderRight: `1px solid ${RULE}`,
              padding: "clamp(36px, 4.5vw, 56px) clamp(24px, 3vw, 40px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 2vw, 24px)",
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
              Lede
            </div>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(32px, 3.6vw, 52px)",
                lineHeight: 0.98,
                letterSpacing: "-0.022em",
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {HEADLINE_LEAD}{" "}
              <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
            </h1>
            <p style={{ fontFamily: SERIF, fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
              {SHORT_DEK}
            </p>
          </article>

          {/* Panel 2 — categories */}
          <article
            style={{
              borderRight: `1px solid ${RULE}`,
              padding: "clamp(36px, 4.5vw, 56px) clamp(24px, 3vw, 40px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 2vw, 24px)",
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
              What we run
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {CATEGORY_STRIP_SHORT.map((c) => (
                <li
                  key={c.id}
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(17px, 1.6vw, 20px)",
                    lineHeight: 1.4,
                    color: INK,
                    fontVariationSettings: '"opsz" 36',
                  }}
                >
                  {c.title}
                </li>
              ))}
            </ul>
          </article>

          {/* Panel 3 — signup */}
          <article
            style={{
              padding: "clamp(36px, 4.5vw, 56px) clamp(24px, 3vw, 40px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 2vw, 24px)",
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
              Sign up
            </div>
            <SignupHeading style={{ marginBottom: 0 }} />
            <SignupForm maxWidth={420} />
            <ComplianceLine style={{ whiteSpace: "normal" }} />
          </article>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @media (max-width: 900px) {
          .brief-triptych {
            grid-template-columns: 1fr !important;
          }
          .brief-triptych :global(article) {
            border-right: none !important;
            border-bottom: 1px solid ${RULE};
          }
          .brief-triptych :global(article:last-child) {
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  );
}
