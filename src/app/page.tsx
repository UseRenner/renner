import Link from "next/link";
import { TASK_CATEGORIES } from "@/lib/types";

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
            { href: "/post", label: "Post a task" },
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
            Become a Renner
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
        padding: "112px 32px 96px",
        backgroundColor: "#f6f7f9",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div
          className="grid gap-12 items-center"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          }}
        >
          <div>
            <h1
              className="font-display-tight"
              style={{
                fontSize: "clamp(56px, 8vw, 96px)",
                lineHeight: 0.95,
                color: "#0d0f12",
                letterSpacing: "-0.04em",
                marginBottom: "24px",
              }}
            >
              Keep real estate{" "}
              <span className="headline-em">running.</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "17px",
                color: "#647589",
                lineHeight: 1.5,
                marginBottom: "36px",
              }}
            >
              Real estate errands. Nearby Renners.
            </p>

            <form
              action="/post"
              method="get"
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: "8px",
                backgroundColor: "#fbfbfc",
                border: "1px solid #cad1d8",
                borderRadius: "12px",
                padding: "8px",
                maxWidth: "560px",
                marginBottom: "20px",
              }}
            >
              <input
                name="title"
                placeholder="What do you need done?"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "10px 12px",
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "15px",
                  backgroundColor: "transparent",
                }}
              />
              <button
                type="submit"
                aria-label="Post a task"
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

            <div
              className="flex flex-wrap gap-2"
              style={{ maxWidth: "640px" }}
            >
              {["Sign work", "Lockbox", "Courier", "Prep", "Showing"].map(
                (chip) => (
                  <Link
                    key={chip}
                    href={`/post?category=${encodeURIComponent(chip)}`}
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
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

          <SampleTaskCard />
        </div>
      </div>
    </section>
  );
}

function SampleTaskCard() {
  return (
    <div
      aria-hidden
      style={{
        backgroundColor: "#fbfbfc",
        border: "1px solid #dce0e5",
        borderRadius: "16px",
        padding: "28px",
        boxShadow: "0 12px 32px rgba(13, 15, 18, 0.08)",
        maxWidth: "380px",
        justifySelf: "center",
        width: "100%",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "18px" }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#eaedf0",
            color: "#4d5b6a",
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "4px 8px",
            borderRadius: "3px",
          }}
        >
          Sign work
        </span>
        <span
          className="font-display"
          style={{
            fontSize: "26px",
            fontWeight: 500,
            color: "#0d0f12",
            lineHeight: 1,
          }}
        >
          $45
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "16px",
          fontWeight: 500,
          color: "#0d0f12",
          lineHeight: 1.35,
          marginBottom: "8px",
        }}
      >
        Install rider sign at 4821 Olive St
      </h3>
      <p
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "13px",
          color: "#647589",
          marginBottom: "20px",
        }}
      >
        RiNo, Denver  ·  Today by 3:00 PM
      </p>
      <div
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          backgroundColor: "#0d0f12",
          color: "#fbfbfc",
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "14px",
          fontWeight: 500,
          padding: "11px 16px",
          borderRadius: "6px",
        }}
      >
        View task
      </div>
    </div>
  );
}

function TrustSignals() {
  const items = [
    {
      icon: <ShieldIcon />,
      title: "Vetted Renners",
      body: "Every Renner is background-checked.",
    },
    {
      icon: <LockIcon />,
      title: "Secure payments",
      body: "Payment held until the task is complete.",
    },
    {
      icon: <CameraIcon />,
      title: "Photo proof",
      body: "Completion photo with every task.",
    },
    {
      icon: <BadgeIcon />,
      title: "Licensed showings",
      body: "Showings limited to licensed Renners.",
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
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
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
      title: "Post",
      body: "What you need, when, where, and what it pays.",
    },
    {
      number: "02",
      title: "Review",
      body: "Vetted Renners apply. Check ratings and history.",
    },
    {
      number: "03",
      title: "Confirm",
      body: "Completion photo submitted. Approve to release payment.",
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
          Book a Renner
        </h2>
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
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
                <h3
                  className="font-display"
                  style={{
                    fontSize: "26px",
                    color: "#0d0f12",
                    marginBottom: "8px",
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
                    lineHeight: 1.55,
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

const CATEGORY_BLURBS: Record<string, string> = {
  "Sign work": "Place, swap, or pull yard signs.",
  Lockbox: "Install, swap, or retrieve lockboxes.",
  Courier: "Hand-deliver contracts, keys, checks.",
  Prep: "Light staging, cleaning, photo-ready setup.",
  Photos: "Property photos and walkthrough video.",
  "Property access": "Meet inspectors and contractors.",
  "Guest access": "Let in repair crews and approved guests.",
  Showing: "Licensed Renners host showings.",
  "Open house": "Licensed Renners host open houses.",
  Other: "Anything else real estate needs.",
};

function Categories() {
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
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {TASK_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/post?category=${encodeURIComponent(cat)}`}
              className="card"
              style={{
                padding: "24px",
                backgroundColor: "#fbfbfc",
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: "20px",
                  color: "#0d0f12",
                  marginBottom: "6px",
                }}
              >
                {cat}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "13px",
                  color: "#647589",
                  lineHeight: 1.55,
                }}
              >
                {CATEGORY_BLURBS[cat] ?? ""}
              </p>
            </Link>
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
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
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
              Post an errand
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "15px",
                color: "#cad1d8",
                lineHeight: 1.6,
                marginBottom: "28px",
                maxWidth: "420px",
              }}
            >
              Vetted Renners. Errands handled.
            </p>
            <Link
              href="/post"
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
              Post a task
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
              Run it
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "15px",
                color: "#cad1d8",
                lineHeight: 1.6,
                marginBottom: "28px",
                maxWidth: "420px",
              }}
            >
              Set your schedule. Get paid when the task is confirmed.
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
              Become a Renner
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
    a: "Payment is held until the task is complete. Approve to release, or it auto-releases after 48 hours.",
  },
  {
    q: "How are Renners verified?",
    a: "Every Renner is background-checked. Showing tasks require a verified license.",
  },
  {
    q: "What if a task goes wrong?",
    a: "Open a dispute within 48 hours. Funds stay held while we review.",
  },
  {
    q: "Am I a Renner employee?",
    a: "No. Renner is a marketplace. Renners are independent.",
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
          Common <span className="headline-em">questions</span>.
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
                  lineHeight: 1.6,
                  marginTop: "12px",
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
          More on the{" "}
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
            marginBottom: "32px",
          }}
        >
          Get something done.
        </h2>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link
            href="/post"
            className="btn-dark"
            style={{
              width: "auto",
              padding: "13px 28px",
              textDecoration: "none",
            }}
          >
            Post a task
          </Link>
          <Link
            href="/signup"
            className="btn-light"
            style={{
              width: "auto",
              padding: "13px 28px",
              textDecoration: "none",
            }}
          >
            Become a Renner
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
        { href: "/post", label: "Post a task" },
        { href: "/how-it-works", label: "How it works" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/signup", label: "Become a Renner" },
        { href: "/signin", label: "Sign in" },
        { href: "mailto:hello@renner.app", label: "Contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/terms", label: "Terms" },
        { href: "/privacy", label: "Privacy" },
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
          style={{ gridTemplateColumns: "1.4fr repeat(3, 1fr)" }}
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
                lineHeight: 1.55,
                marginTop: "16px",
                maxWidth: "300px",
              }}
            >
              Real estate errands. Nearby Renners.
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
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#7d8da0",
          }}
        >
          © 2026 Renner
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
