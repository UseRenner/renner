"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SAMPLE_TASKS, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, MONO, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;
const RULE = "var(--c-rule, #eaedf0)";

const TASKS = [SAMPLE_TASKS[0]!, SAMPLE_TASKS[5]!, SAMPLE_TASKS[2]!];

// PIVOT · TRIO — Pivot's bisecting spine carrying Trio's hero
// tasks. Hero row at top, three task rows alternating sides
// around the spine (kicker on one side, italic title + location
// stamp on the other), signup row at the bottom. The spine
// separates label from specifics. Rule weights are parameterised
// so each variant can dial structural temperature uniformly.

export type PivotTrioRuleTone = "ink" | "steel" | "rule" | "none";

export type PivotTrioRules = {
  spine?: Exclude<PivotTrioRuleTone, "none">;
  rows?: PivotTrioRuleTone;
  caps?: PivotTrioRuleTone;
};

const TONE_TO_COLOR: Record<PivotTrioRuleTone, string> = {
  ink: INK,
  steel: STEEL_300,
  rule: RULE,
  none: "transparent",
};

function ruleBorder(tone: PivotTrioRuleTone): string {
  return tone === "none" ? "none" : `1px solid ${TONE_TO_COLOR[tone]}`;
}

export function BureauPivotTrioBody({
  tone,
  rules,
  uprightSignupHeading,
  uprightTextWeight,
}: {
  tone: ShellTone;
  rules?: PivotTrioRules;
  uprightSignupHeading?: boolean;
  uprightTextWeight?: number;
}) {
  const spineTone: Exclude<PivotTrioRuleTone, "none"> = rules?.spine ?? "ink";
  const rowsTone: PivotTrioRuleTone = rules?.rows ?? "rule";
  const capsTone: PivotTrioRuleTone = rules?.caps ?? "none";
  const rowBorder = ruleBorder(rowsTone);
  const capBorder = ruleBorder(capsTone);

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
        <div className="pivot-spine" style={{ maxWidth: 1280, margin: "0 auto", position: "relative", borderTop: capBorder, borderBottom: capBorder }}>
          {/* Hero row */}
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
              <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.7vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14', maxWidth: "32ch", fontWeight: uprightTextWeight }}>
                {SHORT_DEK}
              </p>
            </div>
          </div>

          {/* Three task rows alternating sides — kicker (label) on
              one side, italic title + location stamp (content) on
              the other. The spine separates label from specifics. */}
          {TASKS.map((task, i) => {
            const labelOnLeft = i % 2 === 0;
            const kicker = (
              <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
                {task.category}
              </span>
            );
            const content = (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(22px, 2.4vw, 30px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.012em",
                    color: INK,
                    margin: 0,
                    maxWidth: "24ch",
                    fontVariationSettings: '"opsz" 60',
                  }}
                >
                  {task.title}
                </h3>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_500 }}>
                  {task.location}
                </span>
              </div>
            );
            return (
              <div
                key={task.title}
                className="pivot-row"
                style={{ paddingTop: "clamp(28px, 3.5vw, 44px)", paddingBottom: "clamp(28px, 3.5vw, 44px)", borderTop: rowBorder, alignItems: "center" }}
              >
                {labelOnLeft ? (
                  <>
                    <div className="pivot-left" style={{ textAlign: "right", paddingRight: "clamp(28px, 3.5vw, 56px)" }}>{kicker}</div>
                    <div className="pivot-right" style={{ textAlign: "left", paddingLeft: "clamp(28px, 3.5vw, 56px)" }}>{content}</div>
                  </>
                ) : (
                  <>
                    <div className="pivot-left" style={{ textAlign: "right", paddingRight: "clamp(28px, 3.5vw, 56px)", display: "flex", justifyContent: "flex-end" }}>{content}</div>
                    <div className="pivot-right" style={{ textAlign: "left", paddingLeft: "clamp(28px, 3.5vw, 56px)" }}>{kicker}</div>
                  </>
                )}
              </div>
            );
          })}

          {/* Signup row */}
          <div className="pivot-row" style={{ paddingTop: "clamp(36px, 4.5vw, 56px)", paddingBottom: "clamp(40px, 5vw, 64px)", borderTop: rowBorder }}>
            <div className="pivot-left" style={{ textAlign: "right", paddingRight: "clamp(28px, 3.5vw, 56px)" }}>
              <SignupHeading style={{ marginBottom: 0, whiteSpace: "nowrap", fontSize: "clamp(18px, 1.7vw, 22px)", fontStyle: uprightSignupHeading ? "normal" : "italic", fontWeight: uprightTextWeight }} />
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
