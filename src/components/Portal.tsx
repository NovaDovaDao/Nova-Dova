import { createElement } from "react";
import { usePrivy } from "@privy-io/react-auth";
import Dashboard from "./Dashboard";
import Welcome from "./Welcome";

export default function Portal() {
  const { authenticated } = usePrivy();
  return <main>{createElement(authenticated ? Dashboard : Welcome)}</main>;
}
