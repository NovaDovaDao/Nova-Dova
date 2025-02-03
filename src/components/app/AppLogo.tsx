import DovaLogo from "@/assets/logo.svg?react";

export default function AppLogo() {
  return (
    <span>
      <DovaLogo width={100} height={24} />
      <span className="sr-only">Dova</span>
    </span>
  );
}
