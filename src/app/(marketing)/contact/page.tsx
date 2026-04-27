import { MarketingCTA } from "@/components/MarketingCTA";
import { ContactForm } from "./ContactForm";

export const metadata = { title: "Contact · Renner" };

export default function ContactPage() {
  return (
    <>
      <main className="pt-16 pb-32 px-6">
        <div className="mx-auto" style={{ maxWidth: "560px" }}>
          <h1
            className="font-display-tight"
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0d0f12",
              marginBottom: "12px",
            }}
          >
            Contact
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "15px",
              color: "#647589",
              lineHeight: 1.55,
              marginBottom: "40px",
            }}
          >
            Questions, feedback, or support.
          </p>
          <ContactForm />
        </div>
      </main>
      <MarketingCTA />
    </>
  );
}
