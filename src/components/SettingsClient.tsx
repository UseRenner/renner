"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LicenseAttestationCard } from "@/components/LicenseAttestation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  formatDisplayNameWithCompany,
  isValidNameInput,
  normalizeNameInput,
} from "@/lib/displayName";
import { createClient } from "@/lib/supabase/client";
import { TASK_CATEGORIES } from "@/lib/types";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  show_full_last_name: boolean | null;
  company: string | null;
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
  profile_visibility: "public" | "private" | null;
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
          description="Every Renner completes a Checkr background check before booking any task."
        >
          <VerificationSection profile={profile} />
        </SectionCard>
      )}

      <SectionCard
        eyebrow="Discovery"
        title="Profile visibility"
        description="Public profiles appear in the Browse directories. Private profiles stay invisible to discovery, but anyone you've already worked with — applied to your task, booked you, or saved you — can still find you."
      >
        <VisibilitySection profile={profile} supabase={supabase} />
      </SectionCard>

      <SectionCard
        eyebrow="Account management"
        title="Delete account"
        description="Close your Renner account and remove your tasks, messages, and reviews. We&rsquo;ll keep a small audit record where the law requires."
      >
        <DangerZone supabase={supabase} router={router} />
      </SectionCard>
    </div>
  );
}

function VisibilitySection({
  profile,
  supabase,
}: {
  profile: Profile | null;
  supabase: ReturnType<typeof createClient>;
}) {
  const [value, setValue] = useState<"public" | "private">(
    profile?.profile_visibility === "private" ? "private" : "public",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSelect(next: "public" | "private") {
    if (!profile || next === value) return;
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    const { error: updateError } = await supabase
      .from("users")
      .update({ profile_visibility: next })
      .eq("id", profile.id);
    setSubmitting(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setValue(next);
    setSuccess(
      next === "public"
        ? "Visible in the Browse directories."
        : "Hidden from the Browse directories.",
    );
  }

  const Option = ({
    title,
    body,
    selected,
    onClick,
  }: {
    title: string;
    body: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={submitting}
      style={{
        textAlign: "left",
        flex: 1,
        border: selected ? "1px solid #0d0f12" : "1px solid #cad1d8",
        backgroundColor: selected ? "#f6f7f9" : "#fbfbfc",
        borderRadius: "10px",
        padding: "14px 16px",
        cursor: submitting ? "not-allowed" : "pointer",
        transition:
          "background-color 150ms ease, border-color 150ms ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
          fontSize: "14px",
          fontWeight: 500,
          color: "#0d0f12",
          marginBottom: "2px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
          fontSize: "12px",
          color: "#7d8da0",
          lineHeight: 1.5,
        }}
      >
        {body}
      </div>
    </button>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Option
          title="Public"
          body="Discoverable in the Browse directories."
          selected={value === "public"}
          onClick={() => handleSelect("public")}
        />
        <Option
          title="Private"
          body="Hidden from directory browsing. Saved + booked relationships still see you."
          selected={value === "private"}
          onClick={() => handleSelect("private")}
        />
      </div>
      {error && <p style={{ color: "#c0392b", fontSize: "13px" }}>{error}</p>}
      {success && (
        <p style={{ color: "#2d8a4e", fontSize: "13px" }}>{success}</p>
      )}
    </div>
  );
}

function SectionCard({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="card"
      style={{
        padding: "28px",
        borderColor: "#dce0e5",
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
          fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
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
            fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
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
          {submitting ? <LoadingSpinner size={18} tone="light" /> : "Update password"}
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
  const [firstName, setFirstName] = useState(profile?.first_name ?? "");
  const [lastName, setLastName] = useState(profile?.last_name ?? "");
  const [showFullLastName, setShowFullLastName] = useState(
    !!profile?.show_full_last_name,
  );
  const [company, setCompany] = useState(profile?.company ?? "");
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
    if (!isValidNameInput(firstName) || !isValidNameInput(lastName)) {
      setError(
        "First and last name may only contain letters, hyphens, and apostrophes.",
      );
      return;
    }
    if (licensed && (!licenseNumber || !licenseState)) {
      setError("Please provide your license number and state.");
      return;
    }
    const cleanFirst = normalizeNameInput(firstName);
    const cleanLast = normalizeNameInput(lastName);
    const derivedDisplay = showFullLastName
      ? `${cleanFirst} ${cleanLast}`
      : `${cleanFirst} ${cleanLast.charAt(0)}.`;
    setSubmitting(true);
    const { error: updateError } = await supabase
      .from("users")
      .update({
        first_name: cleanFirst,
        last_name: cleanLast,
        display_name: derivedDisplay,
        show_full_last_name: showFullLastName,
        company: profile.role === "client" ? company.trim() || null : null,
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

  const previewName = formatDisplayNameWithCompany({
    first_name: normalizeNameInput(firstName),
    last_name: normalizeNameInput(lastName),
    show_full_last_name: showFullLastName,
    company: profile?.role === "client" ? company : null,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="input-label">Legal name</label>
        <div
          style={{
            fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#7d8da0",
            marginTop: "-2px",
            marginBottom: "10px",
            lineHeight: 1.5,
          }}
        >
          Letters, hyphens, and apostrophes only. You appear on Renner as{" "}
          <strong style={{ color: "#0d0f12" }}>{previewName}</strong>.
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
              autoComplete="given-name"
              required
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
              autoComplete="family-name"
              required
            />
          </div>
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            marginTop: "12px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={showFullLastName}
            onChange={(e) => setShowFullLastName(e.target.checked)}
            style={{ marginTop: "3px" }}
          />
          <span
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "13px",
              color: "#4d5b6a",
              lineHeight: 1.5,
            }}
          >
            Show my full last name instead of just the initial.
          </span>
        </label>
      </div>
      {profile?.role === "client" && (
        <div>
          <label className="input-label" htmlFor="company">
            Company / firm{" "}
            <span style={{ color: "#7d8da0", fontWeight: 400 }}>
              (optional)
            </span>
          </label>
          <input
            id="company"
            className="input"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Compass, SERHANT., Coldwell Banker"
          />
          <p
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "12px",
              color: "#7d8da0",
              marginTop: "6px",
              lineHeight: 1.5,
            }}
          >
            Shown after your name to Renners.
          </p>
        </div>
      )}
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
        {submitting ? <LoadingSpinner size={18} tone="light" /> : "Save profile"}
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
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "14px",
              fontWeight: 500,
              color: "#0d0f12",
            }}
          >
            No card on file
          </div>
          <div
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
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
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
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
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
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
            fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
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
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
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
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
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
            fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
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
          fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
          fontSize: "13px",
          color: "#4d5b6a",
          lineHeight: 1.6,
        }}
      >
        Type <strong>DELETE</strong> to confirm. Once submitted, your
        profile, tasks, applications, messages, and reviews will be removed
        from Renner.
      </p>
      <input
        className="input"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        placeholder="Type DELETE"
      />
      {error && (
        <p style={{ color: "#647589", fontSize: "13px" }}>{error}</p>
      )}
      <button
        type="button"
        className="btn-light"
        onClick={handleDelete}
        disabled={!ready || submitting}
        style={{ alignSelf: "flex-start", padding: "10px 18px" }}
      >
        {submitting ? "Closing account…" : "Delete account"}
      </button>
    </div>
  );
}
