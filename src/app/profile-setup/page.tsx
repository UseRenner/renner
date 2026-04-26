"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LicenseAttestationCard } from "@/components/LicenseAttestation";
import { createClient } from "@/lib/supabase/client";
import { TASK_CATEGORIES } from "@/lib/types";

export default function ProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [displayName, setDisplayName] = useState("");
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
          "display_name, phone, city, state, zip, bio, categories, first_name, last_name, licensed, license_number, license_state, role",
        )
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        setDisplayName(
          profile.display_name ||
            [profile.first_name, profile.last_name]
              .filter(Boolean)
              .join(" "),
        );
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

    if (licensed && (!licenseNumber || !licenseState)) {
      setError("Please provide your license number and state.");
      setSubmitting(false);
      return;
    }

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
        <p style={{ color: "#647589", fontSize: "14px" }}>Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-10 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <div className="micro-label" style={{ marginBottom: "12px" }}>
          Step 1 of 1
        </div>
        <h1
          className="font-display-tight"
          style={{
            fontSize: "48px",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "32px",
          }}
        >
          Set up your <span className="headline-em">profile</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: "32px" }}>
            <div className="flex flex-col gap-5">
              <div>
                <label className="input-label" htmlFor="displayName">
                  Display name
                </label>
                <input
                  id="displayName"
                  className="input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
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
                {submitting ? "Saving…" : "Save & continue"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
