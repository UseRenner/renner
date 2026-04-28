"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MarketingHeader } from "@/components/MarketingHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { createClient } from "@/lib/supabase/client";

export default function SigninPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }

    let role: "client" | "renner" | null = null;
    const userId = signInData.user?.id;
    if (userId) {
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .maybeSingle();
      role = (profile?.role as "client" | "renner" | null) ?? null;
    }

    router.push(role === "client" ? "/my-tasks" : "/browse");
    router.refresh();
  }

  return (
    <>
      <MarketingHeader />
      <main className="flex flex-col items-center justify-start pt-16 px-6 pb-16">
      <div className="w-full max-w-[440px]">
        <div className="card" style={{ padding: "40px" }}>
          <h1
            className="font-display"
            style={{
              fontSize: "28px",
              lineHeight: 1.1,
              marginBottom: "24px",
              color: "#0d0f12",
            }}
          >
            Sign in
          </h1>

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
                autoComplete="current-password"
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
              {submitting ? <LoadingSpinner size={18} tone="light" /> : "Sign in"}
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
            Don&apos;t have an account?{" "}
            <Link
              href="/"
              className="text-link"
              style={{ color: "#0d0f12", fontWeight: 500 }}
            >
              Get started
            </Link>
          </p>
        </div>
      </div>
      </main>
      <SiteFooter />
    </>
  );
}
