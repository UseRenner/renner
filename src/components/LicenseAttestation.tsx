"use client";

import { US_STATES } from "@/lib/states";

export const LICENSE_ATTESTATION_TEXT =
  "I attest that I hold an active real estate license in the state indicated below. I understand that misrepresenting my license status may result in removal from the Renner platform.";

export function LicenseAttestationCard({
  licensed,
  setLicensed,
  licenseNumber,
  setLicenseNumber,
  licenseState,
  setLicenseState,
}: {
  licensed: boolean;
  setLicensed: (v: boolean) => void;
  licenseNumber: string;
  setLicenseNumber: (v: string) => void;
  licenseState: string;
  setLicenseState: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setLicensed(!licensed)}
        style={{
          textAlign: "left",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          border: licensed ? "1px solid #0d0f12" : "1px solid #cad1d8",
          backgroundColor: licensed ? "#f6f7f9" : "#fbfbfc",
          borderRadius: "10px",
          padding: "14px 16px",
          cursor: "pointer",
          width: "100%",
          transition:
            "border-color 120ms ease, background-color 120ms ease",
        }}
      >
        <span
          aria-hidden
          style={{
            width: "16px",
            height: "16px",
            flexShrink: 0,
            marginTop: "2px",
            borderRadius: "3px",
            border: licensed ? "1px solid #0d0f12" : "1.5px solid #a7b2be",
            backgroundColor: licensed ? "#0d0f12" : "#fbfbfc",
            color: "#fbfbfc",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            lineHeight: 1,
          }}
        >
          {licensed ? "✓" : ""}
        </span>
        <span
          style={{
            fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
            fontSize: "14px",
            color: "#0d0f12",
            lineHeight: 1.55,
          }}
        >
          {LICENSE_ATTESTATION_TEXT}
        </span>
      </button>

      {licensed && (
        <div className="flex gap-3">
          <div style={{ flex: 1 }}>
            <label className="input-label" htmlFor="licenseNumber">
              License number
            </label>
            <input
              id="licenseNumber"
              className="input"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required={licensed}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="input-label" htmlFor="licenseState">
              License state
            </label>
            <select
              id="licenseState"
              className="input"
              value={licenseState}
              onChange={(e) => setLicenseState(e.target.value)}
              required={licensed}
            >
              <option value="" disabled>
                —
              </option>
              {US_STATES.map(([code, name]) => (
                <option key={code} value={code}>
                  {code} — {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
