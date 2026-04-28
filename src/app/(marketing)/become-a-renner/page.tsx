import { BecomeARennerForm } from "./BecomeARennerForm";

export const metadata = { title: "Become a Renner · Renner" };

export default function BecomeARennerPage() {
  return (
    <main className="pt-10 pb-24 px-6">
      <div className="mx-auto" style={{ maxWidth: "560px" }}>
        <h1 className="page-title" style={{ marginBottom: "8px" }}>
          Become a Renner
        </h1>
        <p
          style={{
            fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
            fontSize: "15px",
            color: "#647589",
            lineHeight: 1.55,
            marginBottom: "24px",
          }}
        >
          Sign up to complete tasks in your area.
        </p>
        <BecomeARennerForm />
      </div>
    </main>
  );
}
