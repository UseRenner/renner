"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryBadge, LicenseBadge } from "./CategoryBadge";
import { EmptyState } from "./EmptyState";
import { formatPay, formatTaskTiming } from "@/lib/format";
import { TASK_CATEGORIES, type Task } from "@/lib/types";

const FILTERS = ["All categories", ...TASK_CATEGORIES] as const;

export function BrowseClient({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>(
    "All categories",
  );

  const filteredTasks = useMemo(() => {
    if (filter === "All categories") return tasks;
    return tasks.filter((t) => t.category === filter);
  }, [filter, tasks]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((label) => {
          const active = filter === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setFilter(label)}
              style={{
                padding: "8px 14px",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily:
                  "var(--font-work-sans), ui-sans-serif, system-ui",
                borderRadius: "999px",
                border: active
                  ? "1px solid #0d0f12"
                  : "1px solid #cad1d8",
                backgroundColor: active ? "#0d0f12" : "#fbfbfc",
                color: active ? "#fbfbfc" : "#0d0f12",
                cursor: "pointer",
                transition:
                  "background-color 120ms ease, border-color 120ms ease",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {filteredTasks.length === 0 ? (
        tasks.length === 0 ? (
          <EmptyState message="Tasks in your area will appear here." />
        ) : (
          <EmptyState message="No tasks match this filter yet." />
        )
      ) : (
        <div className="flex flex-col gap-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
}

function TaskCard({ task }: { task: Task }) {
  const meta = [
    task.zip_code ? `Zip code ${task.zip_code}` : null,
    formatTaskTiming(task),
    task.time_estimate,
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <Link
      href={`/tasks/${task.id}`}
      className="task-row block"
      style={{
        backgroundColor: "#fbfbfc",
        border: "1px solid #dce0e5",
        borderRadius: "10px",
        padding: "24px 28px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: "10px" }}>
            {task.category && <CategoryBadge>{task.category}</CategoryBadge>}
            {task.requires_license && <LicenseBadge />}
          </div>
          <h3
            style={{
              fontFamily:
                "var(--font-work-sans), ui-sans-serif, system-ui",
              fontSize: "16px",
              fontWeight: 500,
              color: "#0d0f12",
              marginBottom: "6px",
              lineHeight: 1.35,
            }}
          >
            {task.title}
          </h3>
          {meta && (
            <p
              style={{
                fontFamily:
                  "var(--font-work-sans), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#647589",
                marginBottom: "10px",
              }}
            >
              {meta}
            </p>
          )}
          <p
            style={{
              fontFamily:
                "var(--font-work-sans), ui-sans-serif, system-ui",
              fontSize: "11px",
              color: "#7d8da0",
            }}
          >
            Payment secured via Stripe
          </p>
        </div>
        <div
          className="font-display"
          style={{
            fontSize: "22px",
            fontWeight: 500,
            color: "#0d0f12",
            whiteSpace: "nowrap",
          }}
        >
          {formatPay(task.pay)}
        </div>
      </div>
    </Link>
  );
}
