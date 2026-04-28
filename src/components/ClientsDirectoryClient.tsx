"use client";

import { useMemo, useState } from "react";
import {
  formatDisplayNameWithCompany,
  formatInitials,
} from "@/lib/displayName";

export type ClientCard = {
  id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  show_full_last_name: boolean | null;
  company: string | null;
  city: string | null;
  state: string | null;
  created_at: string | null;
  tasks_posted: number;
};

function nameFor(c: ClientCard) {
  return formatDisplayNameWithCompany(c);
}

function initialsFor(c: ClientCard) {
  return formatInitials(c);
}

function memberSince(value: string | null) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ClientsDirectoryClient({
  clients,
}: {
  clients: ClientCard[];
}) {
  const [locationQuery, setLocationQuery] = useState("");

  const visible = useMemo(() => {
    const q = locationQuery.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter((c) =>
      `${c.city ?? ""} ${c.state ?? ""}`.toLowerCase().includes(q),
    );
  }, [clients, locationQuery]);

  return (
    <>
      <div className="flex flex-col gap-3" style={{ marginBottom: "24px" }}>
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
          No Clients match this filter.
        </div>
      ) : (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {visible.map((c) => (
            <ClientProfileCard key={c.id} client={c} />
          ))}
        </div>
      )}
    </>
  );
}

function ClientProfileCard({ client }: { client: ClientCard }) {
  const name = nameFor(client);
  const since = memberSince(client.created_at);
  const location = [client.city, client.state].filter(Boolean).join(", ");
  return (
    <div
      style={{
        backgroundColor: "#fbfbfc",
        border: "1px solid #dce0e5",
        borderRadius: "10px",
        padding: "24px",
      }}
    >
      <div className="flex items-start gap-3" style={{ marginBottom: "12px" }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "9999px",
            backgroundColor: "#0d0f12",
            color: "#fbfbfc",
            fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
            fontSize: "14px",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          {initialsFor(client)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "15px",
              fontWeight: 500,
              color: "#0d0f12",
              marginBottom: "4px",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "12px",
              color: "#7d8da0",
            }}
          >
            {`${client.tasks_posted} task${
              client.tasks_posted === 1 ? "" : "s"
            } posted${since ? `  ·  Member since ${since}` : ""}${
              location ? `  ·  ${location}` : ""
            }`}
          </div>
        </div>
      </div>
    </div>
  );
}
