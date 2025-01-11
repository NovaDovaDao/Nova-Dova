// src/components/ui/Portal.tsx
import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useTransition } from "../../context/TransitionContext";
import Dashboard from "../../pages/Dashboard";
import Welcome from "../../pages/Welcome";
// import AgentBuilder from "../../pages/AgentBuilder"; // You'll need to create this

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { authenticated } = usePrivy();
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function Portal() {
  const { authenticated } = usePrivy();
  const { startTransition, endTransition } = useTransition();
  const location = useLocation();

  useEffect(() => {
    const handleTransition = async () => {
      await startTransition();
      await new Promise(resolve => setTimeout(resolve, 100));
      endTransition();
    };

    handleTransition();
  }, [location.pathname, authenticated]);

  return (
    <Routes>
      <Route path="/" element={authenticated ? <Navigate to="/dashboard" replace /> : <Welcome />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/agent-builder"
        element={
          <PrivateRoute>
            <AgentBuilder />
          </PrivateRoute>
        }
      /> */}
      {/* Add more routes as needed */}
    </Routes>
  );
}