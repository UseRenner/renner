import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { PlateBody } from "../plate/PlateBody";

export const metadata = { title: "How it works · Plate · Profile Card · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const INK = "var(--c-text, #0d0f12)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";
const DISC_BG = "var(--ill-disc-bg, #cad1d8)";
const DISC_TEXT = "var(--ill-disc-text, #0d0f12)";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}

// Typographic profile card with a JM initials disc — matches the
// existing Mini illustrations elsewhere in the system. Kicker
// identifies the role (CLIENT or RENNER) so the visitor sees
// their own side's verified profile based on the active audience
// toggle.
function VerifiedProfileCard({ role }: { role: "Client" | "Renner" }) {
  return (
    <article style={{ border: `1px solid ${STEEL_300}`, backgroundColor: PAPER, display: "flex", flexDirection: "column", width: "100%", maxWidth: 240 }}>
      <div style={{ padding: "8px 12px", borderBottom: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 8, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
        {role}
      </div>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            aria-hidden
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: DISC_BG,
              color: DISC_TEXT,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: SANS,
              fontSize: 12,
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            JM
          </span>
          <div>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16, lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
              James M.
            </div>
            <div style={{ marginTop: 2, fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: STEEL_500 }}>
              Denver, CO
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 8, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column", gap: 3, fontFamily: MONO, fontSize: 8, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_500 }}>
          <div>ID-verified</div>
          <div>Background-checked</div>
        </div>
      </div>
    </article>
  );
}

export default async function PlateProfileCardHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="plate-profile-card" showCta={showCta} tone={tone}>
      <PlateBody
        showCta={showCta}
        audiencePrompt="How to —"
        audienceUpright
        step1IllustrationClient={<VerifiedProfileCard role="Client" />}
        step1IllustrationRenner={<VerifiedProfileCard role="Renner" />}
      />
    </PageShell>
  );
}
