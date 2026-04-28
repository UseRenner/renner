"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LicenseAttestationCard } from "@/components/LicenseAttestation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MarketingHeader } from "@/components/MarketingHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { isValidNameInput, normalizeNameInput } from "@/lib/displayName";
import { createClient } from "@/lib/supabase/client";
import { TASK_CATEGORIES } from "@/lib/types";

export default function ProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showFullLastName, setShowFullLastName] = useState(false);
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [bio, setBio] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [licensed, setLicensed] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseState, setLicenseState] = useState("");
  const [role, setRole] = useState<"client" | "renner" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!active) return;

      if (!user) {
        router.replace("/signin");
        return;
      }

      setUserId(user.id);

      const { data: profile } = await supabase
        .from("users")
        .select(
          "display_name, phone, city, state, zip, bio, categories, first_name, last_name, show_full_last_name, company, licensed, license_number, license_state, role",
        )
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        setFirstName(profile.first_name ?? "");
        setLastName(profile.last_name ?? "");
        setShowFullLastName(!!profile.show_full_last_name);
        setCompany(profile.company ?? "");
        setPhone(profile.phone ?? "");
        setCity(profile.city ?? "");
        setState(profile.state ?? "");
        setZip(profile.zip ?? "");
        setBio(profile.bio ?? "");
        setCategories(profile.categories ?? []);
        setLicensed(!!profile.licensed);
        setLicenseNumber(profile.license_number ?? "");
        setLicenseState(profile.license_state ?? "");
        setRole(
          (profile.role as "client" | "renner" | null | undefined) ?? null,
        );
      }

      setLoadingUser(false);
    })();

    return () => {
      active = false;
    };
  }, [router, supabase]);

  function toggleCategory(category: string) {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setError(null);
    setSubmitting(true);

    if (!isValidNameInput(firstName) || !isValidNameInput(lastName)) {
      setError(
        "First and last name may only contain letters, hyphens, and apostrophes.",
      );
      setSubmitting(false);
      return;
    }

    if (licensed && (!licenseNumber || !licenseState)) {
      setError("Please provide your license number and state.");
      setSubmitting(false);
      return;
    }

    const cleanFirst = normalizeNameInput(firstName);
    const cleanLast = normalizeNameInput(lastName);
    const derivedDisplay = showFullLastName
      ? `${cleanFirst} ${cleanLast}`
      : `${cleanFirst} ${cleanLast.charAt(0)}.`;

    const { error: updateError } = await supabase
      .from("users")
      .update({
        first_name: cleanFirst,
        last_name: cleanLast,
        display_name: derivedDisplay,
        show_full_last_name: showFullLastName,
        company: role === "client" ? company.trim() || null : null,
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
      .eq("id", userId);

    if (updateError) {
      setError(updateError.message);
      setSubmitting(false);
      return;
    }

    router.push(role === "client" ? "/my-tasks" : "/browse");
    router.refresh();
  }

  if (loadingUser) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={32} />
      </main>
    );
  }

  const previewName = (() => {
    const f = normalizeNameInput(firstName).trim();
    const l = normalizeNameInput(lastName).trim();
    if (!f && !l) return "—";
    if (showFullLastName && l) return `${f} ${l}`.trim();
    if (l) return `${f} ${l.charAt(0)}.`.trim();
    return f;
  })();

  return (
    <>
      <MarketingHeader />
      <main className="pt-10 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <h1 className="page-title" style={{ marginBottom: "20px" }}>
          Set up your <span className="headline-em">profile</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: "32px" }}>
            <div className="flex flex-col gap-5">
              <div>
                <label className="input-label">Legal name</label>
                <div
                  style={{
                    fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
                    fontSize: "12px",
                    color: "#7d8da0",
                    marginTop: "-2px",
                    marginBottom: "10px",
                    lineHeight: 1.5,
                  }}
                >
                  Letters, hyphens, and apostrophes only. We display you as
                  &ldquo;{previewName}&rdquo; on Renner.
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
                      fontFamily:
                        "var(--font-work-sans), ui-sans-serif, system-ui",
                      fontSize: "13px",
                      color: "#4d5b6a",
                      lineHeight: 1.5,
                    }}
                  >
                    Show my full last name instead of just the initial.
                  </span>
                </label>
              </div>

              {role === "client" && (
                <div>
                  <label className="input-label" htmlFor="company">
                    Company / firm <span style={{ color: "#7d8da0", fontWeight: 400 }}>(optional)</span>
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
                      fontFamily:
                        "var(--font-work-sans), ui-sans-serif, system-ui",
                      fontSize: "12px",
                      color: "#7d8da0",
                      marginTop: "6px",
                      lineHeight: 1.5,
                    }}
                  >
                    Shown after your name to Renners — e.g. &ldquo;
                    {previewName}
                    {company.trim() ? ` · ${company.trim()}` : " · Compass"}
                    &rdquo;.
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
                  autoComplete="tel"
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
                  {TASK_CATEGORIES.map((category) => {
                    const selected = categories.includes(category);
                    return (
                      <button
                        type="button"
                        key={category}
                        onClick={() => toggleCategory(category)}
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
                          transition:
                            "background-color 120ms ease, border-color 120ms ease",
                        }}
                      >
                        {category}
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

              {error && (
                <p style={{ color: "#c0392b", fontSize: "13px" }}>{error}</p>
              )}

              <button
                type="submit"
                className="btn-dark"
                disabled={submitting}
                style={{ marginTop: "8px" }}
              >
                {submitting ? <LoadingSpinner size={18} tone="light" /> : "Save & continue"}
              </button>
            </div>
          </div>
        </form>
      </div>
      </main>
      <SiteFooter />
    </>
  );
}
