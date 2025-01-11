// src/App.tsx
import { PrivyProvider } from "@privy-io/react-auth";
import { BrowserRouter } from "react-router-dom";
import { WebGLProvider } from "./context/WebGLContext";
import { TransitionProvider } from "./context/TransitionContext";
import { RootLayout } from "./components/layout/RootLayout";
import Portal from "./components/ui/Portal";
import { LoadingTransition } from "./components/effects/LoadingTransition";
import { useState, useEffect } from "react";

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
        }}
      >
        <WebGLProvider>
          <TransitionProvider>
            <RootLayout>
              <LoadingTransition initialLoading={initialLoading} />
              <Portal />
            </RootLayout>
          </TransitionProvider>
        </WebGLProvider>
      </PrivyProvider>
    </BrowserRouter>
  );
}

export default App;