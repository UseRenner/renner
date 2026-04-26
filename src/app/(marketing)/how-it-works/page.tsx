export const metadata = { title: "How it works · Renner" };

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What is Renner?",
    a: "Renner is a marketplace built specifically for real-estate task work. Clients post short jobs — sign placement, document delivery, property prep, showings — and verified Renners apply, get booked, and get paid through Stripe.",
  },
  {
    q: "How do payments work?",
    a: "When a Client books a Renner, the Client's card is charged and the funds are held in escrow by Stripe. After the Renner submits proof of completion, the Client has 48 hours to confirm the task is complete or open a dispute. Confirmed funds release immediately to the Renner. If the 48-hour window passes with no dispute, payment auto-releases.",
  },
  {
    q: "What is the platform fee?",
    a: "Renner charges a flat platform fee on each booked task. The exact percentage is shown to both parties at the time of booking and covers payment processing, background-check infrastructure, dispute support, and ongoing platform operations.",
  },
  {
    q: "Do I need a real estate license?",
    a: "Only for tasks that require one. Clients can mark a task as license-required when posting; those tasks are gated to Renners who have a valid license number and state on file. All other tasks (signs, documents, prep work) are open to any background-verified Renner.",
  },
  {
    q: "How does the background check work?",
    a: "Every Renner runs a background check through our verification partner, Checkr, before accepting tasks. Most checks finish in 24–72 hours. Once verified, a small badge appears next to your name so Clients know you've cleared.",
  },
  {
    q: "What happens if there's a dispute?",
    a: "Either party can open a dispute during the 48-hour review window. Funds stay in escrow while a Renner support specialist reviews photos, notes, and the message thread, then issues a fair outcome — releasing the payment, refunding the Client, or splitting the difference.",
  },
  {
    q: "How quickly does payment release?",
    a: "After the Client confirms the task is complete, Stripe transfers the funds to the Renner's connected account within 1–2 business days. If the Client doesn't act, payment auto-releases 48 hours after the Renner submits the work.",
  },
  {
    q: "Who pays the platform fee?",
    a: "The fee is split transparently between Client and Renner. Both parties see exactly what they pay or receive before they confirm a booking — no hidden surcharges.",
  },
  {
    q: "Can I cancel a task?",
    a: "Open tasks can be canceled by the Client at any time. Once a Renner is booked, cancellations within 24 hours of the scheduled date may incur a small fee, paid to the Renner for the time blocked off.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="pt-12 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <div className="micro-label" style={{ marginBottom: "12px" }}>
          How it works
        </div>
        <h1
          className="font-display-tight"
          style={{
            fontSize: "48px",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "16px",
          }}
        >
          Frequently asked <span className="headline-em">questions</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "15px",
            color: "#647589",
            lineHeight: 1.65,
            marginBottom: "40px",
          }}
        >
          The short version: Clients post tasks, Renners apply, Stripe holds
          payment until the client confirms the task is complete. Below are
          the details.
        </p>

        <div className="card" style={{ padding: "8px 0" }}>
          {FAQS.map((item, idx) => (
            <details
              key={item.q}
              className="faq-item"
              style={{
                padding: "20px 28px",
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
                    fontSize: "20px",
                    color: "#0d0f12",
                    lineHeight: 1.3,
                  }}
                >
                  {item.q}
                </span>
                <span
                  className="faq-toggle"
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
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
                    "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "15px",
                  color: "#4d5b6a",
                  lineHeight: 1.7,
                  marginTop: "14px",
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
