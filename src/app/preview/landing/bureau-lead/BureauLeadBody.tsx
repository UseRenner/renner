"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { CATEGORY_STRIP_SHORT, HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;

// LEAD — hero side-by-side at top (headline+dek LEFT, an empty
// editorial card RIGHT), then a single linear horizontal row
// for the categories (table-like, scannable in one sweep), with
// the form anchored below at the same flat baseline. The DNA of
// how-it-works Lead translated to a sign-up wall.

export function BureauLeadBody({ tone }: { tone: ShellTone }) {
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
          flexDirection: "column",
          gap: "clamp(40px, 5vw, 64px)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: "clamp(40px, 5vw, 64px)" }}>
          {/* Hero: headline+dek left, decorative card right. */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: "clamp(40px, 5vw, 80px)", alignItems: "center" }}>
            <div>
              <h1
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(40px, 5.4vw, 80px)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.024em",
                  color: INK,
                  margin: 0,
                  marginBottom: "clamp(20px, 2.4vw, 28px)",
                  maxWidth: "16ch",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                {HEADLINE_LEAD}{" "}
                <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
              </h1>
              <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.7vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: 0, whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14' }}>
                {SHORT_DEK}
              </p>
            </div>
            <div aria-hidden style={{ minHeight: "clamp(180px, 24vw, 320px)", border: `1px solid ${STEEL_300}` }} />
          </div>

          {/* Categories — single horizontal row, like a table line. */}
          <div style={{ paddingTop: "clamp(20px, 2.4vw, 28px)", paddingBottom: "clamp(20px, 2.4vw, 28px)", borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", justifyContent: "space-between", columnGap: "clamp(8px, 1.2vw, 16px)", rowGap: 8 }}>
              {CATEGORY_STRIP_SHORT.map((c) => (
                <li
                  key={c.id}
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(15px, 1.4vw, 18px)",
                    lineHeight: 1.4,
                    color: INK,
                    fontVariationSettings: '"opsz" 14',
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Form anchored below at the same flat baseline. */}
          <div>
            <SignupHeading />
            <SignupForm maxWidth={520} />
            <ComplianceLine style={{ marginTop: "clamp(20px, 2.4vw, 28px)" }} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
