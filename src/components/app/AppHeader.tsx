import { Button } from "@headlessui/react";
import { usePrivy } from "@privy-io/react-auth";
import { a } from "../../../dist/assets/index-bY-V8sx2.js";

const links = [
  ["Discord", "https://discord.gg/GPt44bGqqR"],
  ["Telegram", "https://t.me/+WsS1KasVMPhjYTcx"],
  ["Twitter", "https://x.com/nova_dova_dao?s=21&amp;t=ZbFHk49cdIpDiDCtajTlug"],
  [
    "DAO",
    "https://app.realms.today/dao/9C4iKuh92M45gSCRmDCSBYsdieK8TwiTvjFQohz8iMH9",
  ],
  [
    "DEX",
    "https://dexscreener.com/solana/3i8wmd25pdifbikjmklelvenjjhim3mfluabcmeofwc2",
  ],
  [
    "Raydium",
    "https://raydium.io/swap/?inputMint=sol&amp;outputMint=8HjiRvPNwFT9jpzAAsYF4rE9y576CKdTkQZXaxibpump",
  ],
];

export default function AppHeader() {
  const commitHash = import.meta.env.VITE_APP_COMMIT_HASH ?? "dev";
  const { authenticated, login, logout } = usePrivy();
  return (
    <header className="fixed z-20 inset-x-0 top-0 bg-black shadow-2xl p-4 border-pink-600/50 border-b flex justify-between md:top-8 md:left-8 md:right-auto md:border-b-0 md:flex-col md:gap-4">
      <div className="">
        <h1 className=" text-blue-400 font-bold">Dova</h1>
        <h2 className="hidden md:block">AI Agent Builder</h2>
        <hr className="my-1 hidden md:block" />
        <h3 className="text-[10px] text-neutral-400 hidden md:block">
          Commit #
          {commitHash.substring(commitHash.length - 6, commitHash.length)}
        </h3>
      </div>
      <div className="text-xs flex gap-y-1 gap-x-2 md:flex-col w-1/2 flex-wrap md:gap-y-2 md:order-last">
        {links.map(([label, href]) => (
          <a
            href={href}
            target="_blank"
            className=" underline underline-offset-2"
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex gap-4 items-center md:flex-col-reverse md:items-start">
        {authenticated ? (
          <Button onClick={logout} className="btn">
            Logout
          </Button>
        ) : (
          <Button onClick={login} className="btn">
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
