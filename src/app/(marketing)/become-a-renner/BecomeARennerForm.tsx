"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  isValidNameInput,
  normalizeNameInput,
} from "@/lib/displayName";
import { createClient } from "@/lib/supabase/client";
import { TASK_CATEGORIES } from "@/lib/types";

export function BecomeARennerForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function toggleCategory(category: string) {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValidNameInput(firstName) || !isValidNameInput(lastName)) {
      setError(
        "First and last name may only contain letters, hyphens, and apostrophes.",
      );
      return;
    }
    if (categories.length === 0) {
      setError("Pick at least one category you want to work in.");
      return;
    }
    if (!consent) {
      setError("Please consent to a background check to continue.");
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
          role: "renner",
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
        role: "renner",
        categories,
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      <div>
        <label className="input-label">Categories you can work in</label>
        <div className="flex flex-wrap gap-2">
          {TASK_CATEGORIES.map((c) => {
            const selected = categories.includes(c);
            return (
              <button
                type="button"
                key={c}
                onClick={() => toggleCategory(c)}
                style={{
                  padding: "8px 14px",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily:
                    "var(--font-work-sans), ui-sans-serif, system-ui",
                  borderRadius: "999px",
                  border: selected
                    ? "1px solid #0d0f12"
                    : "1px solid #cad1d8",
                  backgroundColor: selected ? "#0d0f12" : "#fbfbfc",
                  color: selected ? "#fbfbfc" : "#0d0f12",
                  cursor: "pointer",
                  transition:
                    "background-color 120ms ease, border-color 120ms ease",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "14px 16px",
          border: "1px solid #cad1d8",
          borderRadius: "10px",
          backgroundColor: "#fbfbfc",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ marginTop: "3px" }}
        />
        <span
          style={{
            fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
            fontSize: "13px",
            color: "#0d0f12",
            lineHeight: 1.55,
          }}
        >
          <strong style={{ fontWeight: 600 }}>
            I agree to a background check.
          </strong>{" "}
          <span style={{ color: "#647589" }}>
            Renner requires a background check for all tasks. By signing
            up, you consent to a background check through our verification
            partner.
          </span>
        </span>
      </label>

      {error && (
        <p style={{ color: "#c0392b", fontSize: "13px", margin: 0 }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn-dark"
        disabled={submitting}
        style={{ marginTop: "8px" }}
      >
        {submitting ? (
          <LoadingSpinner size={18} tone="light" />
        ) : (
          "Create account"
        )}
      </button>

      <p
        style={{
          fontSize: "13px",
          color: "#647589",
          marginTop: "12px",
          textAlign: "center",
        }}
      >
        Already have an account?{" "}
        <Link
          href="/signin"
          className="text-link"
          style={{ color: "#0d0f12", fontWeight: 500 }}
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
