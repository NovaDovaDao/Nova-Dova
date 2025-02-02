import { ComponentPropsWithoutRef } from "react";

export default function AppAlert({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      className={`text-sm text-pink-400 bg-pink-600/10 py-2 px-4 border-pink-400/20 border rounded ${className}`}
    >
      {children}
    </p>
  );
}
