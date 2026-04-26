"use client";

import { useEffect } from "react";

export function ModalShell({
  children,
  onClose,
  width = 480,
}: {
  children: React.ReactNode;
  onClose: () => void;
  width?: number;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(13, 15, 18, 0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fbfbfc",
          border: "1px solid #dce0e5",
          borderRadius: "16px",
          padding: "28px",
          width: "100%",
          maxWidth: `${width}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
