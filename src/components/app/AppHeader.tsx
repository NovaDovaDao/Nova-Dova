export default function AppHeader() {
  const commitHash = import.meta.env.VITE_APP_COMMIT_HASH ?? "dev";
  return (
    <header className="text-xs fixed top-8 left-8 z-10">
      <h1>Dova</h1>
      <h2>AI Agent Builder</h2>
      <hr className="my-1" />
      <h3 className="text-[10px] text-neutral-400">
        Commit #{commitHash.substring(commitHash.length - 6, commitHash.length)}
      </h3>
    </header>
  );
}
