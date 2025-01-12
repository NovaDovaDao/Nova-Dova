export const formatTokens = (value: string) =>
  new Intl.NumberFormat("en-US", { style: "decimal" }).format(+value);
