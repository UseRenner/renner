export function LegalPage({
  title,
  effective,
  children,
}: {
  title: string;
  effective: string;
  children: React.ReactNode;
}) {
  return (
    <main className="pt-12 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <div className="micro-label" style={{ marginBottom: "12px" }}>
          Effective {effective}
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
          {title}
        </h1>
        <div
          className="legal-prose"
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "15px",
            color: "#4d5b6a",
            lineHeight: 1.7,
          }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}

export function LegalH2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display"
      style={{
        fontSize: "24px",
        color: "#0d0f12",
        marginTop: "32px",
        marginBottom: "12px",
      }}
    >
      {children}
    </h2>
  );
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: "14px" }}>{children}</p>;
}

export function LegalNote({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        marginTop: "32px",
        fontSize: "13px",
        color: "#7d8da0",
        lineHeight: 1.6,
      }}
    >
      {children}
    </p>
  );
}
