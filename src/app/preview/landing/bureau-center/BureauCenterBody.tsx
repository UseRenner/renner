"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { CATEGORY_STRIP_SHORT, HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;

// CENTER — procession. A horizontal procession of three equal
// sections sitting flat in a single row: headline+dek, then
// categories, then signup. Same flex template, equal gaps,
// no connectors — three pieces standing in line. The DNA of
// how-it-works Center translated to a sign-up wall.

export function BureauCenterBody({ tone }: { tone: ShellTone }) {
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
          className="center-procession"
          style={{
            width: "100%",
            maxWidth: 1280,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(28px, 3.5vw, 56px)",
            alignItems: "start",
          }}
        >
          {/* Card 1 — headline + dek */}
          <article style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 24px)" }}>
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

          {/* Card 2 — categories */}
          <article style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 24px)" }}>
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

          {/* Card 3 — signup */}
          <article style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 24px)" }}>
            <SignupHeading style={{ marginBottom: 0 }} />
            <SignupForm maxWidth={420} />
            <ComplianceLine style={{ whiteSpace: "normal" }} />
          </article>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @media (max-width: 900px) {
          .center-procession {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
