import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <PublicNav />
      <Hero />
      <TrustSignals />
      <HowItWorks />
      <Categories />
      <DarkSplit />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

function PublicNav() {
  return (
    <header
      style={{
        backgroundColor: "#fbfbfc",
        borderBottom: "1px solid #dce0e5",
        padding: "16px 32px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="flex items-center justify-between mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        <Link
          href="/"
          className="wordmark"
          style={{ fontSize: "26px", textDecoration: "none" }}
        >
          Renner
        </Link>
        <div className="flex items-center gap-2">
          {[
            { href: "/how-it-works", label: "How it works" },
            { href: "/browse", label: "Browse tasks" },
            { href: "/signin", label: "Sign in" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "13px",
                fontWeight: 500,
                color: "#647589",
                padding: "8px 12px",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "13px",
              fontWeight: 500,
              color: "#0d0f12",
              padding: "9px 16px",
              border: "1px solid #cad1d8",
              borderRadius: "6px",
              textDecoration: "none",
              backgroundColor: "#fbfbfc",
              marginLeft: "4px",
            }}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      style={{
        padding: "96px 32px 80px",
        backgroundColor: "#f6f7f9",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <h1
          className="font-display-tight"
          style={{
            fontSize: "clamp(64px, 9vw, 108px)",
            lineHeight: 0.95,
            color: "#0d0f12",
            letterSpacing: "-0.04em",
            marginBottom: "28px",
            maxWidth: "900px",
          }}
        >
          Keep real estate{" "}
          <span className="headline-em" style={{ fontStyle: "italic" }}>
            running.
          </span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "18px",
            color: "#4d5b6a",
            lineHeight: 1.6,
            maxWidth: "560px",
            marginBottom: "40px",
          }}
        >
          The task marketplace built for real estate. Verified Renners, secure
          escrow, photo-proof completion. Post a sign run, a lockbox swap, or
          a licensed showing in minutes.
        </p>

        <form
          action="/browse"
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: "8px",
            backgroundColor: "#fbfbfc",
            border: "1px solid #cad1d8",
            borderRadius: "12px",
            padding: "8px",
            maxWidth: "560px",
            marginBottom: "24px",
          }}
        >
          <input
            name="q"
            placeholder="Find a task near you…"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "10px 12px",
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "15px",
              backgroundColor: "transparent",
            }}
          />
          <button
            type="submit"
            aria-label="Search"
            style={{
              backgroundColor: "#0d0f12",
              color: "#fbfbfc",
              border: "none",
              borderRadius: "8px",
              width: "44px",
              height: "44px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            →
          </button>
        </form>

        <div className="flex flex-wrap gap-2" style={{ maxWidth: "640px" }}>
          {["Sign work", "Lockbox", "Delivery", "Property prep", "Showing"].map(
            (chip) => (
              <Link
                key={chip}
                href="/browse"
                style={{
                  fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#0d0f12",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1px solid #cad1d8",
                  backgroundColor: "#fbfbfc",
                  textDecoration: "none",
                }}
              >
                {chip}
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function TrustSignals() {
  const items = [
    {
      icon: <ShieldIcon />,
      title: "Background-verified Renners",
      body: "Every Renner clears a Checkr background check before accepting work.",
    },
    {
      icon: <LockIcon />,
      title: "Secure payments",
      body: "Stripe holds your payment in escrow until the work is approved.",
    },
    {
      icon: <CameraIcon />,
      title: "Photo proof of completion",
      body: "Renners submit a completion photo. Approve or dispute in 48 hours.",
    },
    {
      icon: <BadgeIcon />,
      title: "Licensed for showings",
      body: "Showing-required tasks are gated to Renners with a verified license.",
    },
  ];
  return (
    <section
      style={{
        padding: "56px 32px",
        backgroundColor: "#fbfbfc",
        borderTop: "1px solid #eaedf0",
        borderBottom: "1px solid #eaedf0",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: "#f6f7f9",
                  border: "1px solid #eaedf0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0d0f12",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0d0f12",
                    marginBottom: "4px",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "13px",
                    color: "#647589",
                    lineHeight: 1.55,
                  }}
                >
                  {item.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Post a task",
      body: "Pick a category, describe the work, set a flat-rate price. We collect payment up front and hold it in Stripe escrow.",
    },
    {
      number: "02",
      title: "Book a verified Renner",
      body: "Background-checked applicants apply. Review their ratings, licenses, and history, then book the right one in a tap.",
    },
    {
      number: "03",
      title: "Approve & pay",
      body: "Your Renner submits a completion photo. Approve to release payment, or open a dispute — all without leaving Renner.",
    },
  ];
  return (
    <section
      style={{
        padding: "96px 32px",
        backgroundColor: "#f6f7f9",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div className="micro-label" style={{ marginBottom: "12px" }}>
          How it works
        </div>
        <h2
          className="font-display-tight"
          style={{
            fontSize: "56px",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "56px",
            maxWidth: "720px",
          }}
        >
          Three steps from <span className="headline-em">posted</span> to{" "}
          <span className="headline-em">paid</span>.
        </h2>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                position: "relative",
                paddingTop: "16px",
              }}
            >
              <div
                aria-hidden
                className="font-display-tight"
                style={{
                  position: "absolute",
                  top: "-8px",
                  left: 0,
                  fontSize: "120px",
                  fontWeight: 400,
                  color: "rgba(13, 15, 18, 0.05)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  pointerEvents: "none",
                }}
              >
                {step.number}
              </div>
              <div style={{ position: "relative" }}>
                <div className="micro-label" style={{ marginBottom: "12px" }}>
                  Step {step.number}
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "26px",
                    color: "#0d0f12",
                    marginBottom: "10px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "15px",
                    color: "#4d5b6a",
                    lineHeight: 1.65,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const categories = [
    {
      title: "Sign work",
      body: "Place, swap, or pull yard signs and riders.",
    },
    {
      title: "Document courier",
      body: "Hand-deliver contracts, keys, or earnest checks.",
    },
    {
      title: "Property prep",
      body: "Light staging, cleaning, lockbox swaps, photo-ready setup.",
    },
    {
      title: "Showing",
      body: "Licensed Renners host showings and open houses on your behalf.",
    },
  ];
  return (
    <section
      style={{
        padding: "96px 32px",
        backgroundColor: "#fbfbfc",
        borderTop: "1px solid #eaedf0",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div className="micro-label" style={{ marginBottom: "12px" }}>
          What Renners do
        </div>
        <h2
          className="font-display-tight"
          style={{
            fontSize: "56px",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "48px",
            maxWidth: "720px",
          }}
        >
          The work that keeps a deal{" "}
          <span className="headline-em">moving</span>.
        </h2>
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="card"
              style={{
                padding: "28px",
                backgroundColor: "#fbfbfc",
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: "22px",
                  color: "#0d0f12",
                  marginBottom: "8px",
                }}
              >
                {cat.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "14px",
                  color: "#647589",
                  lineHeight: 1.6,
                }}
              >
                {cat.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DarkSplit() {
  return (
    <section
      style={{
        padding: "96px 32px",
        backgroundColor: "#0d0f12",
        color: "#fbfbfc",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div
          className="grid gap-12"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#a7b2be",
                marginBottom: "12px",
              }}
            >
              For Renners
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: "40px",
                lineHeight: 1.1,
                color: "#fbfbfc",
                marginBottom: "16px",
              }}
            >
              Complete tasks.{" "}
              <span style={{ color: "#a7b2be", fontStyle: "italic", fontWeight: 300 }}>
                Get paid.
              </span>
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "15px",
                color: "#cad1d8",
                lineHeight: 1.7,
                marginBottom: "28px",
                maxWidth: "440px",
              }}
            >
              Set your own schedule. Browse open tasks, apply with a tap, and
              get paid through Stripe within 1–2 business days of approval. We
              handle background checks, license verification, and dispute
              support.
            </p>
            <Link
              href="/signup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "14px",
                fontWeight: 500,
                color: "#0d0f12",
                backgroundColor: "#fbfbfc",
                padding: "12px 22px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Become a Renner →
            </Link>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#a7b2be",
                marginBottom: "12px",
              }}
            >
              For Clients
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: "40px",
                lineHeight: 1.1,
                color: "#fbfbfc",
                marginBottom: "16px",
              }}
            >
              Post tasks.{" "}
              <span style={{ color: "#a7b2be", fontStyle: "italic", fontWeight: 300 }}>
                Approve with proof.
              </span>
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "15px",
                color: "#cad1d8",
                lineHeight: 1.7,
                marginBottom: "28px",
                maxWidth: "440px",
              }}
            >
              Stop chasing the favor economy. Post a task, book a verified
              Renner, and approve the work with photo proof — funds release
              instantly. License-required tasks only reach licensed Renners.
            </p>
            <Link
              href="/signup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "14px",
                fontWeight: 500,
                color: "#fbfbfc",
                backgroundColor: "transparent",
                padding: "12px 22px",
                borderRadius: "6px",
                border: "1px solid #4d5b6a",
                textDecoration: "none",
              }}
            >
              Post your first task →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "How do payments work?",
    a: "When a Client books a Renner, the Client's card is charged and the funds are held in Stripe escrow. After the Renner submits proof of completion, the Client has 48 hours to approve. Approved funds release immediately to the Renner; if no action is taken, payment auto-releases after the window.",
  },
  {
    q: "How does the background check work?",
    a: "Every Renner runs a Checkr background check before accepting tasks. Most checks finish in 24–72 hours. Once cleared, a small Background Verified badge appears next to your name on every task you apply to.",
  },
  {
    q: "What if I feel unsafe on a task?",
    a: "Confirm property addresses, lockbox details, and showing windows in-app before you go. Renners working on-property have priority access to our trust & safety team and can flag any task as a problem with one tap.",
  },
  {
    q: "What happens during a dispute?",
    a: "Either party can open a dispute during the 48-hour review window. Funds stay in escrow while a Renner support specialist reviews photos, notes, and the message thread, then issues an outcome — release, refund, or partial split.",
  },
  {
    q: "Am I a Renner employee?",
    a: "No. Renner is a marketplace, not an employer. Renners are independent contractors who choose which tasks to accept. We don't direct how the work is done — just verify Renners, hold payment, and resolve disputes.",
  },
];

function FAQ() {
  return (
    <section
      style={{
        padding: "96px 32px",
        backgroundColor: "#f6f7f9",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "780px" }}>
        <div className="micro-label" style={{ marginBottom: "12px" }}>
          FAQ
        </div>
        <h2
          className="font-display-tight"
          style={{
            fontSize: "48px",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "32px",
          }}
        >
          Common <span className="headline-em">questions</span>
        </h2>
        <div className="card" style={{ padding: "8px 0" }}>
          {FAQS.map((item, idx) => (
            <details
              key={item.q}
              className="faq-item"
              style={{
                padding: "20px 28px",
                borderBottom:
                  idx === FAQS.length - 1 ? "none" : "1px solid #eaedf0",
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
        <p
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "13px",
            color: "#647589",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          See the full list on the{" "}
          <Link
            href="/how-it-works"
            style={{ color: "#0d0f12", textDecoration: "underline" }}
          >
            How it works
          </Link>{" "}
          page.
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      style={{
        padding: "112px 32px",
        backgroundColor: "#fbfbfc",
        borderTop: "1px solid #eaedf0",
        textAlign: "center",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "780px" }}>
        <h2
          className="font-display-tight"
          style={{
            fontSize: "clamp(48px, 6vw, 72px)",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "20px",
          }}
        >
          Ready when you are.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "17px",
            color: "#4d5b6a",
            lineHeight: 1.6,
            marginBottom: "36px",
            maxWidth: "560px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Sign up free. Post your first task or apply to one near you in
          minutes.
        </p>
        <div
          className="flex justify-center gap-3 flex-wrap"
        >
          <Link
            href="/signup"
            className="btn-dark"
            style={{
              width: "auto",
              padding: "13px 28px",
              textDecoration: "none",
            }}
          >
            Get started
          </Link>
          <Link
            href="/how-it-works"
            className="btn-light"
            style={{
              width: "auto",
              padding: "13px 28px",
              textDecoration: "none",
            }}
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const columns = [
    {
      title: "Product",
      links: [
        { href: "/browse", label: "Browse tasks" },
        { href: "/post", label: "Post a task" },
        { href: "/how-it-works", label: "How it works" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/signup", label: "Get started" },
        { href: "/signin", label: "Sign in" },
        { href: "mailto:hello@renner.app", label: "Contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/terms", label: "Terms of Service" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/acceptable-use", label: "Acceptable Use" },
      ],
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#0d0f12",
        color: "#cad1d8",
        padding: "72px 32px 32px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div
          className="grid gap-10"
          style={{
            gridTemplateColumns: "1.4fr repeat(3, 1fr)",
          }}
        >
          <div>
            <Link
              href="/"
              className="wordmark"
              style={{
                fontSize: "26px",
                color: "#fbfbfc",
                textDecoration: "none",
              }}
            >
              Renner
            </Link>
            <p
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#a7b2be",
                lineHeight: 1.6,
                marginTop: "16px",
                maxWidth: "320px",
              }}
            >
              The trust-forward task marketplace built for real estate.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7d8da0",
                  marginBottom: "16px",
                }}
              >
                {col.title}
              </div>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily:
                          "var(--font-inter), ui-sans-serif, system-ui",
                        fontSize: "14px",
                        color: "#cad1d8",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "56px",
            paddingTop: "20px",
            borderTop: "1px solid #272d35",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#7d8da0",
          }}
        >
          <span>© {new Date().getFullYear()} Renner. All rights reserved.</span>
          <span>Built for real estate. Made for trust.</span>
        </div>
      </div>
    </footer>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h3l2-2h8l2 2h3v12H3z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" />
      <path d="m9 13-1 8 4-3 4 3-1-8" />
    </svg>
  );
}
