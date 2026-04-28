import { getViewer } from "@/lib/role";
import { HowItWorksTabs } from "./HowItWorksTabs";

export const metadata = { title: "How it works · Renner" };
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

export default async function HowItWorksPage() {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <main className="pt-10 pb-24 px-6">
      <div className="mx-auto" style={{ maxWidth: "880px" }}>
        <HowItWorksTabs showCta={showCta} />

        <div
          style={{
            marginTop: "56px",
            paddingTop: "40px",
            borderTop: "1px solid #eaedf0",
          }}
        >
          <div className="micro-label" style={{ marginBottom: "12px" }}>
            FAQ
          </div>
          <h2 className="page-title" style={{ marginBottom: "24px" }}>
            Common questions
          </h2>
          <div>
            {FAQS.map((item, idx) => (
              <details
                key={item.q}
                className="faq-item"
                style={{
                  padding: "18px 0",
                  borderBottom:
                    idx === FAQS.length - 1
                      ? "none"
                      : "1px solid #eaedf0",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: "18px",
                      color: "#0d0f12",
                      lineHeight: 1.35,
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="faq-toggle"
                    style={{
                      fontFamily:
                        "var(--font-source-sans), ui-sans-serif, system-ui",
                      fontSize: "20px",
                      color: "#7d8da0",
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
                    fontFamily:
                      "var(--font-source-sans), ui-sans-serif, system-ui",
                    fontSize: "15px",
                    color: "#4d5b6a",
                    lineHeight: 1.65,
                    marginTop: "12px",
                    maxWidth: "720px",
                  }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
