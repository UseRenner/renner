"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { CATEGORY_STRIP_SHORT, HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;
const CHALK = "var(--c-panel, #eaedf0)";

// SCENE — alternating left/right panels create a zigzag rhythm
// down the page. Headline+dek anchors top-LEFT (chalk panel on
// the right balances). Categories sits top-RIGHT (chalk panel
// on the left). Form anchors bottom-LEFT. The flip-flip-flip
// of card placement is the DNA of how-it-works Scene.

export function BureauSceneBody({ tone }: { tone: ShellTone }) {
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
          <SceneRow side="left">
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(40px, 5.4vw, 72px)",
                lineHeight: 0.98,
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
          </SceneRow>

          <SceneRow side="right">
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
          </SceneRow>

          <SceneRow side="left">
            <SignupHeading />
            <SignupForm maxWidth={520} />
            <ComplianceLine style={{ marginTop: "clamp(20px, 2.4vw, 28px)" }} />
          </SceneRow>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SceneRow({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(40px, 5vw, 80px)", alignItems: "start" }}>
      {side === "left" ? (
        <>
          <div>{children}</div>
          <div aria-hidden style={{ minHeight: "clamp(120px, 16vw, 240px)", backgroundColor: CHALK, border: `1px solid ${STEEL_300}` }} />
        </>
      ) : (
        <>
          <div aria-hidden style={{ minHeight: "clamp(120px, 16vw, 240px)", backgroundColor: CHALK, border: `1px solid ${STEEL_300}` }} />
          <div>{children}</div>
        </>
      )}
    </div>
  );
}
