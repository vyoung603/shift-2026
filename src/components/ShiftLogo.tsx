export default function ShiftLogo({ className = "", style, variant = "default" }: { className?: string; style?: React.CSSProperties; variant?: "default" | "white" }) {
  const src = variant === "white" ? "/shift-2026/shift-logo-white.png" : "/shift-2026/shift-logo.png";
  return (
    <img
      src={src}
      alt="SonderMind Shift"
      className={className}
      style={style}
    />
  );
}
