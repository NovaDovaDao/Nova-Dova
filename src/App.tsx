// src/App.tsx
import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import DovaModel from "./components/DovaModel";
import { ChatWindow } from "./components/chat/ChatWindow";
import AppHeader from "./components/app/AppHeader";

const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: false,
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
        <AppHeader />
        <ChatWindow />
        {/* <DovaModel /> */}
      </PrivyProvider>
    </QueryClientProvider>
  );
}

export default App;
