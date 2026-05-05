import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { PlateBody } from "../plate/PlateBody";

export const metadata = { title: "How it works · Plate · Profile Card · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const INK = "var(--c-text, #0d0f12)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}

// Typographic profile card — hairline-bordered, no portrait.
// Same shape as Renner's other Mini cards in the system (TaskCard,
// ApplicantCard, etc.) but the content is profile-as-typography:
// kicker, italic name, mono location, verification footer.
function VerifiedProfileCard() {
  return (
    <article style={{ border: `1px solid ${STEEL_300}`, backgroundColor: PAPER, display: "flex", flexDirection: "column", width: "100%", maxWidth: 240, minHeight: 180 }}>
      <div style={{ padding: "10px 14px", borderBottom: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 8, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
        Verified profile
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
          James M.
        </div>
        <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: STEEL_500 }}>
          Denver, CO
        </div>
        <div style={{ marginTop: "auto", paddingTop: 10, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column", gap: 4, fontFamily: MONO, fontSize: 8, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_500 }}>
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
      <PlateBody showCta={showCta} audiencePrompt="How to —" audienceUpright step1Illustration={<VerifiedProfileCard />} />
    </PageShell>
  );
}
