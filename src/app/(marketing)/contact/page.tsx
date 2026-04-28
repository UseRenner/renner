import { ContactForm } from "./ContactForm";

export const metadata = { title: "Contact · Renner" };

export default function ContactPage() {
  return (
    <main className="pt-10 pb-24 px-6">
      <div className="mx-auto" style={{ maxWidth: "560px" }}>
        <h1 className="page-title" style={{ marginBottom: "24px" }}>
          Get in touch
        </h1>
        <ContactForm />
      </div>
    </main>
  );
}
