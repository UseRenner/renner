"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { CATEGORY_STRIP_SHORT, HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;

// FOLIO — descent. A vertical column of three sections — headline,
// categories, signup — each centered on the page, separated by a
// thin vertical hairline that acts as the eye-guide between them.
// The column descent reads as one continuous downward motion:
// section → spacer → section. The DNA of how-it-works Folio
// translated to a sign-up wall.

export function BureauFolioBody({ tone }: { tone: ShellTone }) {
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
          alignItems: "center",
        }}
      >
        <section style={{ width: "100%", maxWidth: 640, textAlign: "center" }}>
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
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {HEADLINE_LEAD}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.7vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: "0 auto", maxWidth: "40ch", fontVariationSettings: '"opsz" 14' }}>
            {SHORT_DEK}
          </p>
        </section>

        <span aria-hidden style={{ display: "block", width: 1, height: "clamp(48px, 6vw, 72px)", marginTop: "clamp(36px, 4.5vw, 56px)", marginBottom: "clamp(36px, 4.5vw, 56px)", backgroundColor: STEEL_300 }} />

        <section style={{ width: "100%", maxWidth: 640, textAlign: "center" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {CATEGORY_STRIP_SHORT.map((c) => (
              <li
                key={c.id}
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(20px, 2vw, 24px)",
                  lineHeight: 1.4,
                  color: INK,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {c.title}
              </li>
            ))}
          </ul>
        </section>

        <span aria-hidden style={{ display: "block", width: 1, height: "clamp(48px, 6vw, 72px)", marginTop: "clamp(36px, 4.5vw, 56px)", marginBottom: "clamp(36px, 4.5vw, 56px)", backgroundColor: STEEL_300 }} />

        <section style={{ width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SignupHeading style={{ textAlign: "center" }} />
          <SignupForm maxWidth={520} />
          <ComplianceLine style={{ marginTop: "clamp(20px, 2.4vw, 28px)", textAlign: "center" }} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
