// src/App.tsx
import { PrivyProvider } from "@privy-io/react-auth";
import { WebGLProvider } from "./context/WebGLContext";
import Portal from "./components/ui/Portal";

function App() {
  return (
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
      <WebGLProvider value={{
        renderer: null,
        scene: null,
        updateShader: () => {},
      }}>
        <Portal />
      </WebGLProvider>
    </PrivyProvider>
  );
}

export default App;