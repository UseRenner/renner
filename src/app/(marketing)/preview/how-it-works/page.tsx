import { getViewer } from "@/lib/role";
import { EditorialTabs, SectionRule } from "./EditorialTabs";

export const metadata = {
  title: "How it works · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What is Renner?",
    a: "Renner is a marketplace built specifically for real-estate task work. Clients post short jobs — sign placement, document delivery, property prep, guest check-ins, showings — and background-checked Renners apply, get booked, and get paid through the platform.",
  },
  {
    q: "How much does it cost?",
    a: "Renner adds a 10% service fee for clients. Renners keep 90% of the task pay. Both numbers are shown to both parties before a booking is confirmed — no hidden charges.",
  },
  {
    q: "Who can become a Renner?",
    a: "Independent contractors who can pass a background check. Every Renner clears a Checkr background check before booking any task — licensed or not. Showings and other license-required tasks additionally require a verified real-estate license.",
  },
  {
    q: "Are Renners employees?",
    a: "No. Renner is a marketplace and Renners are independent contractors. They set their own schedule, choose which tasks to apply to, and aren't directed in how the work gets done.",
  },
  {
    q: "What types of tasks can I post?",
    a: "Anything real estate — sign installs, lockbox swaps, courier runs, property prep, photo-ready setup, guest check-ins, host assistance, property access for inspectors and contractors, showings, open houses, and more. If it's a short, location-based job tied to a listing or property, it fits.",
  },
  {
    q: "How do payments work?",
    a: "When you book a Renner, your card is charged and the funds are held in escrow by Stripe. After the Renner submits proof of completion, you have 48 hours to confirm or open a dispute. Confirmed funds release immediately to the Renner; if the 48 hours pass with no action, payment auto-releases.",
  },
  {
    q: "What if something is damaged or stolen during a task?",
    a: "Document the damage with photos and file a report within 48 hours. The Renner has 48 hours to accept, counter, or dispute the claim. We facilitate resolution using completion photos and the message thread as evidence; unresolved claims escalate to Renner support.",
  },
  {
    q: "What if I need to cancel a task?",
    a: "Clients can cancel before the Renner starts — full refund, task reopens. After the Renner starts, the task pay is split 50/50. Renners can cancel before starting with no penalty; after starting the same 50/50 split applies regardless of reason.",
  },
];

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const SLATE = "#2a2f36";
const FOG = "#7d8da0";
const RULE = "#eaedf0";
const RULE_STRONG = "#dce0e5";

export default async function PreviewHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <main className="pt-10 pb-24 px-6">
      <div className="mx-auto" style={{ maxWidth: "880px" }}>
        <EditorialTabs showCta={showCta} />

        {/* ─── FAQ ─── */}
        <div style={{ marginTop: 96 }}>
          <SectionRule label="FAQ · common questions" />
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 36,
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
              color: INK,
              margin: 0,
              marginBottom: 40,
              fontVariationSettings: '"opsz" 72',
            }}
          >
            Common questions
          </h2>

          <div>
            {FAQS.map((item, idx) => (
              <details
                key={item.q}
                className="faq-item"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(80px, 96px) 1fr",
                  gap: 32,
                  padding: "24px 0",
                  borderBottom:
                    idx === FAQS.length - 1 ? "none" : `1px solid ${RULE}`,
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    color: FOG,
                    paddingTop: 6,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div>
                  <summary
                    style={{
                      cursor: "pointer",
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontWeight: 400,
                        fontSize: 19,
                        lineHeight: 1.35,
                        color: INK,
                        letterSpacing: "-0.005em",
                        fontVariationSettings: '"opsz" 14',
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      className="faq-toggle"
                      style={{
                        fontFamily: SANS,
                        fontSize: 18,
                        color: FOG,
                        transition: "transform 120ms ease",
                        flexShrink: 0,
                      }}
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontSize: 16,
                      color: SLATE,
                      lineHeight: 1.6,
                      marginTop: 16,
                      marginBottom: 0,
                      maxWidth: 620,
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
