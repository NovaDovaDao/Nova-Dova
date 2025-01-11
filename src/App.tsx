import { PrivyProvider } from "@privy-io/react-auth";
import Portal from "./components/Portal";

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
      <Portal />
    </PrivyProvider>
  );
}

export default App;
