import "./App.css";
import { PrivyProvider } from "@privy-io/react-auth";
import NovaPortal from "./components/NovaPortal";

function App() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <NovaPortal />
    </PrivyProvider>
  );
}

export default App;
