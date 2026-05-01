"use client";

// A floating, almost-invisible variant + tone switcher. By default
// it sits as a small mono pill at the bottom-right of the viewport.
// The pill shows the active variant; click to expand a panel that
// also offers Paper / Steel / Ink tones via query param. Click
// outside or hit Esc to collapse.

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { VARIANTS, type VariantKey } from "./_shared";

const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const TONES: Array<{ key: "paper" | "mist" | "haze" | "steel" | "ink"; label: string }> = [
  { key: "paper", label: "Paper" },
  { key: "mist", label: "Mist" },
  { key: "haze", label: "Haze" },
  { key: "steel", label: "Steel" },
  { key: "ink", label: "Ink" },
];

export function VariantSwitcher({ active }: { active: VariantKey }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTone = (searchParams?.get("tone") as "paper" | "mist" | "haze" | "steel" | "ink" | null) ?? "paper";
  const activeLabel = VARIANTS.find((v) => v.key === active)?.label ?? "";

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function hrefForVariant(href: string) {
    if (currentTone === "paper") return href;
    return `${href}?tone=${currentTone}`;
  }

  function hrefForTone(tone: "paper" | "mist" | "haze" | "steel" | "ink") {
    const base = pathname || "/";
    if (tone === "paper") return base;
    return `${base}?tone=${tone}`;
  }

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 60,
        fontFamily: MONO,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
      }}
    >
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            right: 0,
            backgroundColor: "rgba(13,15,18,0.96)",
            backdropFilter: "saturate(140%) blur(10px)",
            WebkitBackdropFilter: "saturate(140%) blur(10px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 6,
            padding: "10px 4px",
            minWidth: 220,
            maxHeight: "min(72vh, 560px)",
            overflowY: "auto",
            boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
          }}
        >
          {/* Tone toggle */}
          <div style={{ padding: "6px 14px 4px", color: "rgba(255,255,255,0.4)" }}>Tone</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, padding: "0 8px 8px" }}>
            {TONES.map((t) => {
              const isActive = t.key === currentTone;
              return (
                <Link
                  key={t.key}
                  href={hrefForTone(t.key)}
                  style={{
                    display: "block",
                    padding: "8px 6px",
                    textAlign: "center",
                    color: isActive ? "#fbfbfc" : "rgba(255,255,255,0.55)",
                    backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>

          <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.06)", margin: "4px 0 8px" }} />

          {/* Variant list */}
          <div style={{ padding: "0 14px 6px", color: "rgba(255,255,255,0.4)" }}>
            {VARIANTS.length} variants
          </div>
          <div role="menu">
            {VARIANTS.map((v) => {
              const isActive = v.key === active;
              return (
                <Link
                  key={v.href}
                  href={hrefForVariant(v.href)}
                  role="menuitem"
                  style={{
                    display: "block",
                    padding: "8px 14px",
                    color: isActive ? "#fbfbfc" : "rgba(255,255,255,0.62)",
                    textDecoration: "none",
                    backgroundColor: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                  }}
                >
                  {v.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-label="Switch preview variant"
        onClick={() => setOpen((v) => !v)}
        style={{
          appearance: "none",
          background: open ? "rgba(13,15,18,0.96)" : "rgba(13,15,18,0.62)",
          backdropFilter: "saturate(140%) blur(8px)",
          WebkitBackdropFilter: "saturate(140%) blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 999,
          padding: "8px 14px",
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          letterSpacing: "inherit",
          textTransform: "inherit",
          color: "rgba(255,255,255,0.78)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          transition: "background-color 150ms ease, color 150ms ease",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.4)" }}>Preview</span>
        <span aria-hidden style={{ color: "rgba(255,255,255,0.18)" }}>·</span>
        <span style={{ color: "#fbfbfc" }}>{activeLabel}</span>
        <span aria-hidden style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
        <span style={{ color: "rgba(255,255,255,0.78)" }}>{TONES.find((t) => t.key === currentTone)?.label}</span>
        <span aria-hidden style={{ marginLeft: 2, color: "rgba(255,255,255,0.4)", transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease" }}>↑</span>
      </button>
    </div>
  );
}
