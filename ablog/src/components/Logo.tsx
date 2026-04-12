export default function Logo({ size = "default" }: { size?: "small" | "default" }) {
  const height = size === "small" ? 28 : 36;
  return (
    <svg
      viewBox="0 0 180 48"
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ABlog"
    >
      <rect x="4" y="4" width="40" height="40" rx="10" fill="#2563eb" />
      <path
        d="M24 14L13 42h6l2.2-6h5.6l2.2 6h6L24 14zm0 7l2.4 9h-4.8l2.4-9z"
        fill="white"
      />
      <text
        x="54"
        y="34"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="currentColor"
      >
        Blog
      </text>
    </svg>
  );
}
