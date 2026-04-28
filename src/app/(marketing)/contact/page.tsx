import { ContactForm } from "./ContactForm";

export const metadata = { title: "Contact · Renner" };

export default function ContactPage() {
  return (
    <main className="pt-10 pb-24 px-6">
      <div className="mx-auto" style={{ maxWidth: "560px" }}>
        <h1 className="page-title" style={{ marginBottom: "8px" }}>
          Contact
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "15px",
            color: "#647589",
            lineHeight: 1.55,
            marginBottom: "24px",
          }}
        >
          Get in touch.
        </p>
        <ContactForm />
      </div>
    </main>
  );
}
