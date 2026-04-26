"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import {
  clearPendingTask,
  readPendingTask,
} from "@/lib/pendingTask";
import { createClient } from "@/lib/supabase/client";

type Role = "renner" | "client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [role, setRole] = useState<Role>("renner");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [hasPendingTask, setHasPendingTask] = useState(false);

  useEffect(() => {
    if (readPendingTask()) {
      setHasPendingTask(true);
      setRole("client");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName, role },
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
        first_name: firstName,
        last_name: lastName,
        display_name: `${firstName} ${lastName}`.trim(),
        role,
      });
      if (profileError) {
        setError(profileError.message);
        setSubmitting(false);
        return;
      }

      const pending = readPendingTask();
      if (pending && role === "client") {
        const { error: taskError } = await supabase.from("tasks").insert({
          ...pending,
          posted_by: userId,
        });
        clearPendingTask();
        if (taskError) {
          setError(
            `Account created, but we couldn't post your task: ${taskError.message}`,
          );
          setSubmitting(false);
          return;
        }
        router.push("/my-tasks");
        router.refresh();
        return;
      }
    }

    router.push("/profile-setup");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-16 px-6 pb-16">
      <div className="w-full max-w-[440px]">
        <div className="mb-10 text-center">
          <Wordmark />
        </div>

        <div
          className="card"
          style={{ padding: "40px" }}
        >
          {hasPendingTask && (
            <div
              style={{
                backgroundColor: "#f6f7f9",
                border: "1px solid #eaedf0",
                borderRadius: "10px",
                padding: "12px 14px",
                marginBottom: "20px",
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#4d5b6a",
                lineHeight: 1.55,
              }}
            >
              Your task is saved. Sign up and we&apos;ll post it for you.
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-8">
            <RoleBox
              title="Renner"
              subtitle="Complete tasks"
              selected={role === "renner"}
              onClick={() => setRole("renner")}
            />
            <RoleBox
              title="Client"
              subtitle="Post tasks"
              selected={role === "client"}
              onClick={() => setRole("client")}
            />
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "28px",
              lineHeight: 1.1,
              marginBottom: "24px",
              color: "#0d0f12",
            }}
          >
            {hasPendingTask ? "One last step" : "Create your account"}
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
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
              {submitting ? "Creating account…" : "Create account"}
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
  );
}

function RoleBox({
  title,
  subtitle,
  selected,
  onClick,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left transition-colors"
      style={{
        padding: "16px 18px",
        borderRadius: "10px",
        border: selected ? "1px solid #0d0f12" : "1px solid #cad1d8",
        backgroundColor: selected ? "#0d0f12" : "#fbfbfc",
        color: selected ? "#fbfbfc" : "#0d0f12",
      }}
    >
      <div style={{ fontSize: "15px", fontWeight: 500 }}>{title}</div>
      <div
        style={{
          fontSize: "12px",
          marginTop: "2px",
          color: selected ? "#cad1d8" : "#7d8da0",
        }}
      >
        {subtitle}
      </div>
    </button>
  );
}
