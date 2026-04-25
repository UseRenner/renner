import Link from "next/link";

export function Wordmark() {
  return (
    <Link
      href="/"
      className="font-display block text-center"
      style={{
        fontSize: "26px",
        fontWeight: 500,
        color: "#0d0f12",
        letterSpacing: "-0.035em",
      }}
    >
      Renner
    </Link>
  );
}
