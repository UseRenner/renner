"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MarketingHeader } from "@/components/MarketingHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  isValidNameInput,
  normalizeNameInput,
} from "@/lib/displayName";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
    <>
      <MarketingHeader />
      <main className="flex flex-col items-center justify-start pt-16 px-6 pb-16">
      <div className="w-full max-w-[440px]">
        <div
          className="card"
          style={{ padding: "40px" }}
        >
          <h1
            className="font-display"
            style={{
              fontSize: "28px",
              lineHeight: 1.1,
              marginBottom: "24px",
              color: "#0d0f12",
            }}
          >
            Create your account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <p
                style={{
                  color: "#c0392b",
                  fontSize: "13px",
                  marginTop: "-4px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-dark"
              disabled={submitting}
              style={{ marginTop: "8px" }}
            >
              {submitting ? <LoadingSpinner size={18} tone="light" /> : "Create account"}
            </button>
          </form>

          <p
            style={{
              fontSize: "13px",
              color: "#647589",
              marginTop: "24px",
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

          <p
            style={{
              fontSize: "11px",
              color: "#7d8da0",
              marginTop: "20px",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            By creating an account, you agree to Renner&apos;s{" "}
            <Link
              href="/terms"
              className="text-link"
              style={{ color: "#647589" }}
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-link"
              style={{ color: "#647589" }}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      </main>
      <SiteFooter />
    </>
  );
}
