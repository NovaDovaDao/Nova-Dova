import { Button } from "@headlessui/react";
import { usePrivy } from "@privy-io/react-auth";
import { CircleDashed, CircleDot, MenuIcon } from "lucide-react";
import AppButton from "./AppButton";
import { useAppStore } from "@/stores/app";
import AppLogo from "./AppLogo";
import clsx from "clsx";

export default function AppHeader() {
  const { setIsNavOpen } = useAppStore();
  const { authenticated, login, logout } = usePrivy();

  return (
    <header
      className={clsx(
        "fixed z-20 p-4 flex justify-between inset-x-0 items-center border-b border-opacity-20 border-white bg-black",
        "md:top-24 md:left-24 md:p-0 md:border-none md:inset-x-auto md:bg-transparent md:block"
      )}
    >
      <div className="md:mb-4 flex gap-4">
        <AppLogo />
        {authenticated ? (
          <AppButton onClick={logout} className=" bg-pink-500/20 text-pink-500">
            <CircleDashed width={16} /> Logout
          </AppButton>
        ) : (
          <AppButton
            onClick={login}
            className=" bg-green-500/20 text-green-500"
          >
            <CircleDot width={16} /> Login
          </AppButton>
        )}
      </div>
      <Button
        className="flex items-center gap-2"
        onClick={() => setIsNavOpen(true)}
      >
        <MenuIcon width={16} /> Menu
      </Button>
    </header>
  );
}
