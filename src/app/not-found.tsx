import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "Page not found · Renner",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        backgroundColor: "#fbfbfc",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "440px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            marginBottom: "24px",
          }}
        >
          <Logo size={48} fill="#0d0f12" slotColor="#fbfbfc" />
        </div>
        <h1
          className="font-display"
          style={{
            fontSize: "32px",
            color: "#0d0f12",
            margin: "0 0 8px",
            lineHeight: 1.15,
          }}
        >
          Page not found.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
            fontSize: "14px",
            color: "#647589",
            margin: "0 0 32px",
            lineHeight: 1.55,
          }}
        >
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Link
          href="/"
          className="btn-dark"
          style={{
            width: "auto",
            padding: "11px 24px",
            textDecoration: "none",
            display: "inline-flex",
          }}
        >
          Back to Renner
        </Link>
      </div>
    </main>
  );
}
