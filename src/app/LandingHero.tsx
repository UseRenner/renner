"use client";

import { useState } from "react";

type HeroCategory = {
  id: string;
  label: string;
  price: string;
  title: string;
  location: string;
};

const CATEGORIES: HeroCategory[] = [
  {
    id: "signs",
    label: "Signs",
    price: "$45",
    title: "Install sign rider",
    location: "RiNo, Denver 80205  ·  Today, 2:00 – 5:00 PM",
  },
  {
    id: "lockbox",
    label: "Lockbox",
    price: "$35",
    title: "Swap lockbox at listing",
    location: "Buckhead, Atlanta 30305  ·  Today, 10:00 AM – 12:00 PM",
  },
  {
    id: "showing",
    label: "Showing",
    price: "$75",
    title: "Show property to buyer",
    location: "Lincoln Park, Chicago 60614  ·  Tomorrow, 1:00 PM",
  },
  {
    id: "courier",
    label: "Courier",
    price: "$45",
    title: "Deliver closing docs",
    location: "SoHo, New York 10012  ·  Today, 1:00 – 3:00 PM",
  },
  {
    id: "visuals",
    label: "Visuals",
    price: "$75",
    title: "Walkthrough photos",
    location: "West Hollywood, Los Angeles 90046  ·  Tomorrow, 8:00 AM",
  },
  {
    id: "guest",
    label: "Guest access",
    price: "$40",
    title: "Guest check-in",
    location: "South Beach, Miami 33139  ·  Today, 4:00 PM",
  },
];

export function LandingHero() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <SampleTaskCard category={active} />
      <CategoryPills
        activeId={activeId}
        onSelect={setActiveId}
      />
    </div>
  );
}

function SampleTaskCard({ category }: { category: HeroCategory }) {
  return (
    <div
      aria-hidden
      style={{
        backgroundColor: "#fbfbfc",
        border: "1px solid #dce0e5",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 12px 32px rgba(13, 15, 18, 0.08)",
        maxWidth: "420px",
      }}
    >
      <div
        key={category.id}
        className="hero-card-fade"
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "16px" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#eaedf0",
              color: "#4d5b6a",
              fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "4px 8px",
              borderRadius: "3px",
            }}
          >
            {category.label}
          </span>
          <span
            className="font-display"
            style={{
              fontSize: "24px",
              fontWeight: 500,
              color: "#0d0f12",
              lineHeight: 1,
            }}
          >
            {category.price}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
            fontSize: "15px",
            fontWeight: 500,
            color: "#0d0f12",
            lineHeight: 1.35,
            marginBottom: "6px",
          }}
        >
          {category.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
            fontSize: "13px",
            color: "#647589",
            margin: 0,
          }}
        >
          {category.location}
        </p>
      </div>
    </div>
  );
}

function CategoryPills({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      aria-hidden
      className="flex flex-wrap"
      style={{
        gap: "8px",
        maxWidth: "520px",
      }}
    >
      {CATEGORIES.map((c) => {
        const isActive = c.id === activeId;
        return (
          <button
            key={c.id}
            type="button"
            tabIndex={-1}
            onClick={() => onSelect(c.id)}
            style={{
              fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
              fontSize: "12px",
              fontWeight: 500,
              color: isActive ? "#fbfbfc" : "#647589",
              backgroundColor: isActive ? "#0d0f12" : "#fbfbfc",
              border: `1px solid ${isActive ? "#0d0f12" : "#dce0e5"}`,
              borderRadius: "999px",
              padding: "6px 12px",
              cursor: "pointer",
              transition:
                "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
            }}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
