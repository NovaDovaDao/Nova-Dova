import { createElement } from "react";
import { usePrivy } from "@privy-io/react-auth";
import Dashboard from "../../pages/Dashboard";
import Welcome from "../../pages/Welcome";

export default function Portal() {
  const { authenticated } = usePrivy();
  return <main>{createElement(authenticated ? Dashboard : Welcome)}</main>;
}
