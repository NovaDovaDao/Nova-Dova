import { usePrivy } from "@privy-io/react-auth";

export default function Welcome() {
  const { ready, authenticated, login } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-8">
      <div className="text-center z-10">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-space-blue via-purple-500 to-space-purple tracking-wider animate-neon-glow hover:animate-pulse transition-all duration-500">
          NOVA DOVA DAO
        </h1>

        <div className="space-y-6 max-w-3xl mx-auto bg-black/5 rounded-3xl p-8 mb-12">
          <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wider mb-2 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
            Pioneering the Next Evolution of
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight mb-4 bg-gradient-to-r from-space-blue via-purple-400 to-space-purple bg-clip-text text-transparent animate-pulse">
            Autonomous AI Agents
          </p>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
          <button
            className="neon-button text-white bg-gradient-to-r from-space-blue to-space-purple hover:from-space-purple hover:to-space-blue py-3 px-8 rounded-full text-lg sm:text-xl md:text-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden"
            disabled={disableLogin}
            onClick={login}
          >
            <span className="relative z-10">Enter App</span>
            <div className="absolute inset-0 bg-gradient-to-r from-space-purple to-space-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>

        <a
          href="https://raydium.io/swap/?inputMint=sol&outputMint=8HjiRvPNwFT9jpzAAsYF4rE9y576CKdTkQZXaxibpump"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block group"
        >
          <button className="neon-button text-white bg-gradient-to-r from-space-blue to-space-purple hover:from-space-purple hover:to-space-blue py-3 px-8 rounded-full text-lg sm:text-xl md:text-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden">
            <span className="relative z-10">raydium</span>
            <div className="absolute inset-0 bg-gradient-to-r from-space-purple to-space-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </a>
      </div>
    </section>
  );
}
