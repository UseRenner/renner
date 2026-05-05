"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { CATEGORY_STRIP_SHORT, HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;
const CHALK = "var(--c-panel, #eaedf0)";

// PLATE — three banded horizontal cards stacked vertically on a
// chalk page. Each band is a paper card containing one piece of
// the wall: headline+dek, categories, signup. The banding makes
// each section a distinct contained unit — the DNA of the
// how-it-works Plate variant translated to a sign-up wall.

export function BureauPlateBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), backgroundColor: CHALK, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main
        style={{
          flex: 1,
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          paddingLeft: "clamp(20px, 3vw, 48px)",
          paddingRight: "clamp(20px, 3vw, 48px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px, 2.4vw, 32px)",
          alignItems: "center",
        }}
      >
        <Plate>
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
        </Plate>

        <Plate>
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
        </Plate>

        <Plate>
          <SignupHeading />
          <SignupForm maxWidth={520} />
          <ComplianceLine style={{ marginTop: "clamp(20px, 2.4vw, 28px)" }} />
        </Plate>
      </main>
      <Footer />
    </div>
  );
}

function Plate({ children }: { children: React.ReactNode }) {
  return (
    <article
      style={{
        backgroundColor: PAPER,
        border: `1px solid ${STEEL_300}`,
        width: "100%",
        maxWidth: 880,
        padding: "clamp(36px, 4.5vw, 56px) clamp(28px, 3.5vw, 56px)",
      }}
    >
      {children}
    </article>
  );
}
