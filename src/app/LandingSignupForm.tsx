"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { isValidNameInput, normalizeNameInput } from "@/lib/displayName";
import { createClient } from "@/lib/supabase/client";

export function LandingSignupForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValidNameInput(firstName) || !isValidNameInput(lastName)) {
      setError(
        "First and last name may only contain letters, hyphens, and apostrophes.",
      );
      return;
    }

    const cleanFirst = normalizeNameInput(firstName);
    const cleanLast = normalizeNameInput(lastName);

    setSubmitting(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: cleanFirst,
          last_name: cleanLast,
          role: "client",
        },
      },
    });
    if (signUpError) {
      setError(signUpError.message);
      setSubmitting(false);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase.from("users").upsert({
        id: userId,
        first_name: cleanFirst,
        last_name: cleanLast,
        display_name: `${cleanFirst} ${cleanLast.charAt(0)}.`,
        role: "client",
      });
      if (profileError) {
        setError(profileError.message);
        setSubmitting(false);
        return;
      }
    }

    router.push("/profile-setup");
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "380px",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
          fontSize: "20px",
          fontWeight: 600,
          color: "#0d0f12",
          marginBottom: "6px",
          letterSpacing: "-0.01em",
        }}
      >
        Get started
      </h2>
      <p
        style={{
          fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
          fontSize: "13px",
          color: "#647589",
          marginBottom: "28px",
          lineHeight: 1.5,
        }}
      >
        Sign up to hire a Renner.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="input-label" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              className="input"
              value={firstName}
              onChange={(e) =>
                setFirstName(normalizeNameInput(e.target.value))
              }
              required
              autoComplete="given-name"
            />
          </div>
          <div className="flex-1">
            <label className="input-label" htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              className="input"
              value={lastName}
              onChange={(e) =>
                setLastName(normalizeNameInput(e.target.value))
              }
              required
              autoComplete="family-name"
            />
          </div>
        </div>

        <div>
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>

        {error && (
          <p style={{ color: "#c0392b", fontSize: "13px", marginTop: "-2px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-dark"
          disabled={submitting}
          style={{ marginTop: "8px" }}
        >
          {submitting ? <LoadingSpinner size={18} tone="light" /> : "Sign up"}
        </button>
      </form>

      <div
        className="flex items-center"
        style={{
          gap: "12px",
          margin: "20px 0",
          color: "#a7b2be",
          fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
        aria-hidden
      >
        <span style={{ flex: 1, height: "1px", backgroundColor: "#eaedf0" }} />
        <span>Or</span>
        <span style={{ flex: 1, height: "1px", backgroundColor: "#eaedf0" }} />
      </div>

      <Link
        href="/become-a-renner"
        className="btn-light"
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          padding: "11px 16px",
          fontSize: "14px",
          textDecoration: "none",
        }}
      >
        Become a Renner
      </Link>
    </div>
  );
}
