"use client";

import { useMemo, useState } from "react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { InviteToTaskButton } from "@/components/InviteToTaskButton";
import { formatDisplayName, formatInitials } from "@/lib/displayName";
import { TASK_CATEGORIES } from "@/lib/types";

export type RennerCard = {
  id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  show_full_last_name: boolean | null;
  city: string | null;
  state: string | null;
  rating: number | null;
  completed_tasks: number | null;
  background_verified: boolean | null;
  licensed: boolean | null;
  categories: string[] | null;
};

const FILTERS = ["All", ...TASK_CATEGORIES] as const;

function nameFor(r: RennerCard) {
  return formatDisplayName(r);
}

function initialsFor(r: RennerCard) {
  return formatInitials(r);
}

export function RennersDirectoryClient({
  renners,
  viewerRole,
  viewerId,
  savedRennerIds,
}: {
  renners: RennerCard[];
  viewerRole: "client" | "renner" | null;
  viewerId: string | null;
  savedRennerIds: string[];
}) {
  const [category, setCategory] = useState<(typeof FILTERS)[number]>("All");
  const [licensedOnly, setLicensedOnly] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");

  const isClient = viewerRole === "client";
  const savedSet = useMemo(() => new Set(savedRennerIds), [savedRennerIds]);

  const visible = useMemo(() => {
    const q = locationQuery.trim().toLowerCase();
    return renners.filter((r) => {
      if (
        category !== "All" &&
        !(r.categories ?? []).includes(category)
      )
        return false;
      if (licensedOnly && !r.licensed) return false;
      if (q) {
        const hay =
          `${r.city ?? ""} ${r.state ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [renners, category, licensedOnly, locationQuery]);

  return (
    <>
      <div className="flex flex-col gap-3" style={{ marginBottom: "24px" }}>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((label) => {
            const active = category === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setCategory(label)}
                style={{
                  padding: "8px 14px",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui",
                  borderRadius: "999px",
                  border: active
                    ? "1px solid #0d0f12"
                    : "1px solid #cad1d8",
                  backgroundColor: active ? "#0d0f12" : "#fbfbfc",
                  color: active ? "#fbfbfc" : "#0d0f12",
                  cursor: "pointer",
                  transition:
                    "background-color 150ms ease, border-color 150ms ease",
                }}
              >
                {label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setLicensedOnly((v) => !v)}
            style={{
              padding: "8px 14px",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily:
                "var(--font-inter), ui-sans-serif, system-ui",
              borderRadius: "999px",
              border: licensedOnly
                ? "1px solid #0d0f12"
                : "1px solid #cad1d8",
              backgroundColor: licensedOnly ? "#0d0f12" : "#fbfbfc",
              color: licensedOnly ? "#fbfbfc" : "#0d0f12",
              cursor: "pointer",
              transition:
                "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            Licensed
          </button>
        </div>
        <input
          className="input"
          placeholder="Search by city or state…"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          style={{ maxWidth: "360px" }}
        />
      </div>

      {visible.length === 0 ? (
        <div
          className="card"
          style={{
            padding: "48px 32px",
            textAlign: "center",
            color: "#647589",
            fontSize: "14px",
          }}
        >
          No Renners match these filters.
        </div>
      ) : (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {visible.map((r) => (
            <RennerProfileCard
              key={r.id}
              renner={r}
              isClient={isClient}
              viewerId={viewerId}
              isSaved={savedSet.has(r.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}

function RennerProfileCard({
  renner,
  isClient,
  viewerId,
  isSaved,
}: {
  renner: RennerCard;
  isClient: boolean;
  viewerId: string | null;
  isSaved: boolean;
}) {
  const name = nameFor(renner);
  const cats = (renner.categories ?? []).slice(0, 3);
  const location = [renner.city, renner.state].filter(Boolean).join(", ");
  return (
    <div
      style={{
        backgroundColor: "#fbfbfc",
        border: "1px solid #dce0e5",
        borderRadius: "10px",
        padding: "24px",
      }}
    >
      <div className="flex items-start gap-3" style={{ marginBottom: "14px" }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "9999px",
            backgroundColor: "#0d0f12",
            color: "#fbfbfc",
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "14px",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          {initialsFor(renner)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="flex items-center gap-2 flex-wrap"
            style={{ marginBottom: "4px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "15px",
                fontWeight: 500,
                color: "#0d0f12",
              }}
            >
              {name}
            </span>
            {isClient && viewerId && (
              <FavoriteButton
                rennerId={renner.id}
                clientId={viewerId}
                initiallySaved={isSaved}
              />
            )}
          </div>
          <div
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "12px",
              color: "#7d8da0",
            }}
          >
            {`${renner.completed_tasks ?? 0} task${
              (renner.completed_tasks ?? 0) === 1 ? "" : "s"
            } completed  ·  ${
              renner.rating
                ? `${Number(renner.rating).toFixed(1)}★`
                : "No ratings yet"
            }${location ? `  ·  ${location}` : ""}`}
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-2"
        style={{ marginBottom: "14px" }}
      >
        {renner.background_verified && (
          <SmallTag tone="green">Background verified</SmallTag>
        )}
        {renner.licensed && <SmallTag tone="dark">Licensed</SmallTag>}
      </div>

      {cats.length > 0 && (
        <div
          className="flex flex-wrap gap-1"
          style={{ marginBottom: isClient ? "16px" : 0 }}
        >
          {cats.map((c) => (
            <span
              key={c}
              style={{
                fontFamily:
                  "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "11px",
                color: "#4d5b6a",
                backgroundColor: "#f6f7f9",
                border: "1px solid #eaedf0",
                borderRadius: "999px",
                padding: "4px 10px",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {isClient && viewerId && (
        <div className="flex gap-2">
          <InviteToTaskButton
            rennerId={renner.id}
            clientId={viewerId}
            rennerName={name}
          />
        </div>
      )}
    </div>
  );
}

function SmallTag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "dark";
}) {
  const palette =
    tone === "green"
      ? { background: "rgba(45,138,78,0.10)", color: "#2d8a4e" }
      : { background: "#0d0f12", color: "#fbfbfc" };
  return (
    <span
      style={{
        backgroundColor: palette.background,
        color: palette.color,
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "3px 7px",
        borderRadius: "3px",
      }}
    >
      {children}
    </span>
  );
}
