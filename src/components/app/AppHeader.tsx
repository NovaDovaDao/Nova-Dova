import { Button } from "@headlessui/react";
import { usePrivy } from "@privy-io/react-auth";

export default function AppHeader() {
  const commitHash = import.meta.env.VITE_APP_COMMIT_HASH ?? "dev";
  const { authenticated, login, logout } = usePrivy();
  return (
    <header className="fixed text-xs z-20 inset-x-0 top-0 bg-black shadow-2xl p-4 border-pink-600/50 border-b flex justify-between md:top-8 md:left-8 md:right-auto md:border-b-0 md:flex-col md:gap-4">
      <div className="">
        <h1 className=" text-blue-400 font-bold">Dova</h1>
        <h2>AI Agent Builder</h2>
        <hr className="my-1 hidden md:block" />
        <h3 className="text-[10px] text-neutral-400 hidden md:block">
          Commit #
          {commitHash.substring(commitHash.length - 6, commitHash.length)}
        </h3>
      </div>
      <div className="flex gap-4 items-center md:flex-col-reverse md:items-start">
        <a
          href="https://solscan.io/token/8HjiRvPNwFT9jpzAAsYF4rE9y576CKdTkQZXaxibpump"
          target="_blank"
        >
          Solscan
        </a>
        <a href="https://discord.gg/GPt44bGqqR" target="_blank">
          Discord
        </a>
        {authenticated ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Button onClick={login} className="btn">
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
