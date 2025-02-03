import { useAppStore } from "@/stores/app";
import AppLogo from "./AppLogo";
import { Button } from "@headlessui/react";
import { ArrowRight, X } from "lucide-react";

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

export default function AppNav() {
  const { isNavOpen, setIsNavOpen } = useAppStore();
  const commitHash = import.meta.env.VITE_APP_COMMIT_HASH ?? "dev";

  if (!isNavOpen) return;

  return (
    <div className="fixed inset-0 bg-black z-20 p-24 flex flex-col gap-48">
      <Button
        className="absolute md:left-4 right-4 top-4"
        onClick={() => setIsNavOpen(false)}
      >
        <X size={48} />
      </Button>
      <div className="space-y-2">
        <AppLogo />
        <h2 className="">AI Agent Builder</h2>
        <div className="text-xs text-neutral-600">
          Version commit #
          {commitHash.substring(commitHash.length - 6, commitHash.length)}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-around font-extrabold text-4xl ">
        {links.map(([label, href], i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            className="flex gap-2 group items-center"
          >
            {label}{" "}
            <ArrowRight className="transition text-neutral-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:text-current" />
          </a>
        ))}
      </div>
    </div>
  );
}
