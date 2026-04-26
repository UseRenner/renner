"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LicenseAttestationCard } from "@/components/LicenseAttestation";
import { createClient } from "@/lib/supabase/client";
import { TASK_CATEGORIES } from "@/lib/types";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  phone: string | null;
  role: "renner" | "client" | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  bio: string | null;
  categories: string[] | null;
  licensed: boolean | null;
  license_number: string | null;
  license_state: string | null;
  stripe_account_id: string | null;
  stripe_onboarded: boolean | null;
  background_verified: boolean | null;
  background_check_date: string | null;
};

export function SettingsClient({
  email,
  profile,
}: {
  email: string;
  profile: Profile | null;
}) {
  const router = useRouter();
  const supabase = createClient();

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        eyebrow="Account"
        title="Email & password"
        description="Used for sign-in and important notifications."
      >
        <AccountSection email={email} supabase={supabase} />
      </SectionCard>

      <SectionCard
        eyebrow="Profile"
        title="How you appear on Renner"
        description="Update your public profile and the categories you work in."
      >
        <ProfileSection profile={profile} supabase={supabase} />
      </SectionCard>

      <SectionCard
        eyebrow={profile?.role === "client" ? "Billing" : "Payment"}
        title={
          profile?.role === "client" ? "Billing details" : "Stripe payouts"
        }
        description={
          profile?.role === "client"
            ? "Where we charge for tasks. Funds are held in escrow until you confirm the task is complete."
            : "Where we send your payouts after clients confirm completed work."
        }
      >
        <PaymentSection profile={profile} />
      </SectionCard>

      {profile?.role !== "client" && (
        <SectionCard
          eyebrow="Verification"
          title="Background check"
          description="Renners must complete a Checkr background check before booking licensed tasks."
        >
          <VerificationSection profile={profile} />
        </SectionCard>
      )}

      <SectionCard
        eyebrow="Danger zone"
        title="Delete account"
        description="Permanently remove your account and all associated tasks, messages, and reviews. This cannot be undone."
        tone="danger"
      >
        <DangerZone supabase={supabase} router={router} />
      </SectionCard>
    </div>
  );
}

function SectionCard({
  eyebrow,
  title,
  description,
  tone = "default",
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "default" | "danger";
  children: React.ReactNode;
}) {
  return (
    <div
      className="card"
      style={{
        padding: "28px",
        borderColor: tone === "danger" ? "rgba(192,57,43,0.25)" : "#dce0e5",
      }}
    >
      <div className="micro-label" style={{ marginBottom: "8px" }}>
        {eyebrow}
      </div>
      <h2
        className="font-display"
        style={{
          fontSize: "22px",
          color: "#0d0f12",
          marginBottom: "6px",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "13px",
          color: "#647589",
          marginBottom: "20px",
          lineHeight: 1.55,
        }}
      >
        {description}
      </p>
      {children}
    </div>
  );
}

function AccountSection({
  email,
  supabase,
}: {
  email: string;
  supabase: ReturnType<typeof createClient>;
}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });
    setSubmitting(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setPassword("");
    setConfirm("");
    setSuccess("Password updated.");
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="input-label">Email</div>
        <div
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "15px",
            color: "#0d0f12",
            padding: "10px 0",
          }}
        >
          {email}
        </div>
      </div>

      <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="input-label" htmlFor="newPassword">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          <div className="flex-1">
            <label className="input-label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              minLength={8}
              autoComplete="new-password"
            />
          </div>
        </div>
        {error && (
          <p style={{ color: "#c0392b", fontSize: "13px" }}>{error}</p>
        )}
        {success && (
          <p style={{ color: "#2d8a4e", fontSize: "13px" }}>{success}</p>
        )}
        <button
          type="submit"
          className="btn-dark"
          disabled={submitting || !password}
          style={{ width: "auto", padding: "10px 18px", alignSelf: "flex-start" }}
        >
          {submitting ? "Saving…" : "Update password"}
        </button>
      </form>
    </div>
  );
}

function ProfileSection({
  profile,
  supabase,
}: {
  profile: Profile | null;
  supabase: ReturnType<typeof createClient>;
}) {
  const [displayName, setDisplayName] = useState(profile?.display_name ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [city, setCity] = useState(profile?.city ?? "");
  const [state, setState] = useState(profile?.state ?? "");
  const [zip, setZip] = useState(profile?.zip ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [categories, setCategories] = useState<string[]>(
    profile?.categories ?? [],
  );
  const [licensed, setLicensed] = useState(!!profile?.licensed);
  const [licenseNumber, setLicenseNumber] = useState(
    profile?.license_number ?? "",
  );
  const [licenseState, setLicenseState] = useState(
    profile?.license_state ?? "",
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function toggle(category: string) {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setError(null);
    setSuccess(null);
    if (licensed && (!licenseNumber || !licenseState)) {
      setError("Please provide your license number and state.");
      return;
    }
    setSubmitting(true);
    const { error: updateError } = await supabase
      .from("users")
      .update({
        display_name: displayName,
        phone,
        city,
        state,
        zip,
        bio,
        categories,
        licensed,
        license_number: licensed ? licenseNumber : null,
        license_state: licensed ? licenseState : null,
      })
      .eq("id", profile.id);
    setSubmitting(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSuccess("Profile saved.");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="input-label" htmlFor="displayName">
          Display name
        </label>
        <input
          id="displayName"
          className="input"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div>
        <label className="input-label" htmlFor="phone">
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          className="input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <div style={{ flex: 2 }}>
          <label className="input-label" htmlFor="city">
            City
          </label>
          <input
            id="city"
            className="input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className="input-label" htmlFor="state">
            State
          </label>
          <input
            id="state"
            className="input"
            value={state}
            onChange={(e) => setState(e.target.value)}
            maxLength={2}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className="input-label" htmlFor="zip">
            Zip code
          </label>
          <input
            id="zip"
            className="input"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            maxLength={10}
          />
        </div>
      </div>
      <div>
        <label className="input-label" htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          className="input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{ minHeight: "100px", resize: "vertical" }}
        />
      </div>
      <div>
        <label className="input-label">Task categories</label>
        <div className="flex flex-wrap gap-2">
          {TASK_CATEGORIES.map((c) => {
            const selected = categories.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggle(c)}
                style={{
                  padding: "8px 14px",
                  fontSize: "13px",
                  fontWeight: 500,
                  borderRadius: "999px",
                  border: selected
                    ? "1px solid #0d0f12"
                    : "1px solid #cad1d8",
                  backgroundColor: selected ? "#0d0f12" : "#fbfbfc",
                  color: selected ? "#fbfbfc" : "#0d0f12",
                  cursor: "pointer",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="input-label">Real estate license</label>
        <LicenseAttestationCard
          licensed={licensed}
          setLicensed={setLicensed}
          licenseNumber={licenseNumber}
          setLicenseNumber={setLicenseNumber}
          licenseState={licenseState}
          setLicenseState={setLicenseState}
        />
      </div>

      {error && <p style={{ color: "#c0392b", fontSize: "13px" }}>{error}</p>}
      {success && (
        <p style={{ color: "#2d8a4e", fontSize: "13px" }}>{success}</p>
      )}

      <button
        type="submit"
        className="btn-dark"
        disabled={submitting}
        style={{ width: "auto", padding: "10px 18px", alignSelf: "flex-start" }}
      >
        {submitting ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}

function PaymentSection({ profile }: { profile: Profile | null }) {
  const isClient = profile?.role === "client";

  if (isClient) {
    return (
      <div className="flex items-center justify-between gap-3">
        <div>
          <div
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "14px",
              fontWeight: 500,
              color: "#0d0f12",
            }}
          >
            No card on file
          </div>
          <div
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "12px",
              color: "#7d8da0",
              marginTop: "2px",
            }}
          >
            You&apos;ll be prompted for payment when you book a Renner.
          </div>
        </div>
        <button
          type="button"
          className="btn-light"
          style={{ padding: "10px 16px", whiteSpace: "nowrap" }}
        >
          Add payment method
        </button>
      </div>
    );
  }

  const onboarded = !!profile?.stripe_onboarded;
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "14px",
              fontWeight: 500,
              color: "#0d0f12",
            }}
          >
            {onboarded ? "Stripe connected" : "Stripe not connected"}
          </span>
          <span
            style={{
              backgroundColor: onboarded
                ? "rgba(45,138,78,0.10)"
                : "#eaedf0",
              color: onboarded ? "#2d8a4e" : "#4d5b6a",
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "3px 7px",
              borderRadius: "3px",
            }}
          >
            {onboarded ? "Active" : "Pending"}
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#7d8da0",
            marginTop: "2px",
          }}
        >
          {onboarded
            ? "Payouts arrive 1–2 business days after task confirmation."
            : "Connect Stripe to start receiving payouts."}
        </div>
      </div>
      <button
        type="button"
        className="btn-light"
        style={{ padding: "10px 16px", whiteSpace: "nowrap" }}
      >
        {onboarded ? "Manage Stripe" : "Connect Stripe"}
      </button>
    </div>
  );
}

function VerificationSection({ profile }: { profile: Profile | null }) {
  const verified = !!profile?.background_verified;
  const date = profile?.background_check_date
    ? new Date(profile.background_check_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "14px",
              fontWeight: 500,
              color: "#0d0f12",
            }}
          >
            {verified ? "Background verified" : "Not yet verified"}
          </span>
          <span
            style={{
              backgroundColor: verified
                ? "rgba(45,138,78,0.10)"
                : "#eaedf0",
              color: verified ? "#2d8a4e" : "#4d5b6a",
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "3px 7px",
              borderRadius: "3px",
            }}
          >
            {verified ? "Verified" : "Required"}
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#7d8da0",
            marginTop: "2px",
          }}
        >
          {verified && date
            ? `Last checked ${date}.`
            : "Checkr typically completes background checks in 24–72 hours."}
        </div>
      </div>
      <button
        type="button"
        className="btn-light"
        style={{ padding: "10px 16px", whiteSpace: "nowrap" }}
      >
        {verified ? "Refresh" : "Start check"}
      </button>
    </div>
  );
}

function DangerZone({
  supabase,
  router,
}: {
  supabase: ReturnType<typeof createClient>;
  router: ReturnType<typeof useRouter>;
}) {
  const [confirmText, setConfirmText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setError(null);
    setSubmitting(true);
    const { error: rpcError } = await supabase.rpc("delete_my_account");
    if (rpcError) {
      setError(rpcError.message);
      setSubmitting(false);
      return;
    }
    await supabase.auth.signOut();
    router.replace("/signin");
    router.refresh();
  }

  const ready = confirmText === "DELETE";

  return (
    <div className="flex flex-col gap-3">
      <p
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "13px",
          color: "#4d5b6a",
          lineHeight: 1.6,
        }}
      >
        Type <strong>DELETE</strong> to confirm. We will permanently remove
        your account, profile, tasks, applications, messages, and reviews.
      </p>
      <input
        className="input"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        placeholder="Type DELETE"
      />
      {error && (
        <p style={{ color: "#c0392b", fontSize: "13px" }}>{error}</p>
      )}
      <button
        type="button"
        onClick={handleDelete}
        disabled={!ready || submitting}
        style={{
          alignSelf: "flex-start",
          backgroundColor: "#c0392b",
          color: "#fbfbfc",
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "14px",
          fontWeight: 500,
          padding: "10px 18px",
          border: "1px solid #c0392b",
          borderRadius: "6px",
          cursor: !ready || submitting ? "not-allowed" : "pointer",
          opacity: !ready || submitting ? 0.5 : 1,
        }}
      >
        {submitting ? "Deleting…" : "Delete my account"}
      </button>
    </div>
  );
}
