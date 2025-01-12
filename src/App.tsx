// src/App.tsx
import { PrivyProvider } from "@privy-io/react-auth";
import { BrowserRouter } from "react-router-dom";
import { WebGLProvider } from "./context/WebGLContext";
import { TransitionProvider } from "./context/TransitionContext";
import { WebSocketProvider } from "./context/WebSocketContext";
import { RootLayout } from "./components/layout/RootLayout";
import Portal from "./components/ui/Portal";
import { LoadingTransition } from "./components/effects/LoadingTransition";
import { useState, useEffect } from "react";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";

const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: false,
});

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <PrivyProvider
        appId={import.meta.env.VITE_PRIVY_APP_ID}
        config={{
          appearance: {
            theme: "dark",
            accentColor: "#676FFF",
          },
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
          externalWallets: {
            solana: {
              connectors: solanaConnectors,
            },
          },
        }}
      >
        <WebSocketProvider>
          <WebGLProvider>
            <TransitionProvider>
              <RootLayout>
                <LoadingTransition initialLoading={initialLoading} />
                <Portal />
              </RootLayout>
            </TransitionProvider>
          </WebGLProvider>
        </WebSocketProvider>
      </PrivyProvider>
    </BrowserRouter>
  );
}

export default App;
