export default function AppHeader() {
  const commitHash = import.meta.env.VITE_APP_COMMIT_HASH ?? "dev";
  return (
    <header className="text-xs fixed z-20 flex flex-nowrap gap-2 items-center [writing-mode:vertical-lr] right-1 top-2 md:[writing-mode:horizontal-tb] md:right-auto md:top-8 md:left-8 md:block">
      <h1>Dova</h1>
      <h2>AI Agent Builder</h2>
      <hr className="my-1" />
      <h3 className="text-[10px] text-neutral-400">
        Commit #{commitHash.substring(commitHash.length - 6, commitHash.length)}
      </h3>
    </header>
  );
}
