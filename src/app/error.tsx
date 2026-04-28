"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          Something went wrong.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
            fontSize: "14px",
            color: "#647589",
            margin: "0 0 32px",
            lineHeight: 1.55,
          }}
        >
          We&rsquo;re working on it. Please try again.
        </p>
        <div
          className="flex justify-center gap-3 flex-wrap"
        >
          <button
            type="button"
            onClick={reset}
            className="btn-dark"
            style={{ width: "auto", padding: "11px 24px" }}
          >
            Try again
          </button>
          <Link
            href="/"
            className="btn-light"
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
      </div>
    </main>
  );
}
