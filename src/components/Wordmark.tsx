import Link from "next/link";

export function Wordmark({ size = 26 }: { size?: number }) {
  return (
    <Link
      href="/"
      className="wordmark inline-block"
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
    >
      Renner
    </Link>
  );
}
