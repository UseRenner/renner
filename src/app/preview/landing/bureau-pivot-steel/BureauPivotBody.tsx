"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { CATEGORY_STRIP_SHORT, HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, MONO, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;
const RULE = "var(--c-rule, #eaedf0)";

// PIVOT — a single 1px spine bisects the page top-to-bottom.
// Three rows alternate which side hosts content. The rule
// weights are parameterised so each Pivot variant can dial
// the page's structural temperature: spine weight, the two
// horizontals (above categories, above signup), or none.

export type PivotRuleTone = "ink" | "steel" | "rule" | "none";

export type PivotRules = {
  spine?: Exclude<PivotRuleTone, "none">;
  aboveCategories?: PivotRuleTone;
  aboveSignup?: PivotRuleTone;
};

const TONE_TO_COLOR: Record<PivotRuleTone, string> = {
  ink: INK,
  steel: STEEL_300,
  rule: RULE,
  none: "transparent",
};

function ruleBorder(tone: PivotRuleTone): string {
  return tone === "none" ? "none" : `1px solid ${TONE_TO_COLOR[tone]}`;
}

export function BureauPivotBody({ tone, rules }: { tone: ShellTone; rules?: PivotRules }) {
  const spineTone: Exclude<PivotRuleTone, "none"> = rules?.spine ?? "ink";
  const aboveCategoriesTone: PivotRuleTone = rules?.aboveCategories ?? "rule";
  const aboveSignupTone: PivotRuleTone = rules?.aboveSignup ?? "rule";

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
        }}
      >
        <div className="pivot-spine" style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          {/* Row 1 — headline left, dek right */}
          <div className="pivot-row" style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
            <div className="pivot-left" style={{ textAlign: "right", paddingRight: "clamp(28px, 3.5vw, 56px)" }}>
              <h1
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(40px, 5.4vw, 80px)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.024em",
                  color: INK,
                  margin: 0,
                  marginLeft: "auto",
                  maxWidth: "16ch",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                {HEADLINE_LEAD}{" "}
                <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
              </h1>
            </div>
            <div className="pivot-right" style={{ textAlign: "left", paddingLeft: "clamp(28px, 3.5vw, 56px)", display: "flex", alignItems: "flex-end" }}>
              <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.7vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14', maxWidth: "32ch", fontWeight: 375 }}>
                {SHORT_DEK}
              </p>
            </div>
          </div>

          {/* Row 2 — kicker left, categories right */}
          <div className="pivot-row" style={{ paddingTop: "clamp(36px, 4.5vw, 56px)", paddingBottom: "clamp(36px, 4.5vw, 56px)", borderTop: ruleBorder(aboveCategoriesTone) }}>
            <div className="pivot-left" style={{ textAlign: "right", paddingRight: "clamp(28px, 3.5vw, 56px)" }}>
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
                Things handled
              </span>
            </div>
            <div className="pivot-right" style={{ textAlign: "left", paddingLeft: "clamp(28px, 3.5vw, 56px)" }}>
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
            </div>
          </div>

          {/* Row 3 — signup heading left, form right */}
          <div className="pivot-row" style={{ paddingTop: "clamp(36px, 4.5vw, 56px)", paddingBottom: "clamp(40px, 5vw, 64px)", borderTop: ruleBorder(aboveSignupTone) }}>
            <div className="pivot-left" style={{ textAlign: "right", paddingRight: "clamp(28px, 3.5vw, 56px)" }}>
              <SignupHeading style={{ marginBottom: 0, whiteSpace: "nowrap", fontSize: "clamp(18px, 1.7vw, 22px)", fontStyle: "normal", fontWeight: 375 }} />
            </div>
            <div className="pivot-right" style={{ textAlign: "left", paddingLeft: "clamp(28px, 3.5vw, 56px)" }}>
              <SignupForm maxWidth={520} />
              <ComplianceLine style={{ marginTop: "clamp(20px, 2.4vw, 28px)" }} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .pivot-spine::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: ${TONE_TO_COLOR[spineTone]};
          pointer-events: none;
        }
        .pivot-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: start;
        }
        @media (max-width: 720px) {
          .pivot-spine::before {
            left: 0;
          }
          .pivot-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .pivot-row :global(.pivot-left),
          .pivot-row :global(.pivot-right) {
            text-align: left !important;
            padding-left: 20px !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
