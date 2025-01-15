// TODO: refactor from deno to node

const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

// Validate environment variables
const PRIVY_APP_ID = Deno.env.get("PRIVY_APP_ID");
const PRIVY_APP_SECRET = Deno.env.get("PRIVY_APP_SECRET");
if (!PRIVY_APP_ID || !PRIVY_APP_SECRET) {
  console.error(
    "Missing required environment variables: PRIVY_APP_ID and PRIVY_APP_SECRET must be set"
  );
  Deno.exit(1);
}
const privy = new PrivyClient(PRIVY_APP_ID, PRIVY_APP_SECRET);

const getChat = async (req: Request) => {
  const token = req.headers.get("x-ghost-token");
  if (!token) throw "invalid request";

  const url = new URL(req.url);
  const { userId } = await privy.verifyAuthToken(token);
  const agentId = url.searchParams.get("agentId");

  const key = ["chat", userId, agentId ?? "general"];
  const res = await kv.get<{ messages: unknown[] }>(key);

  return res.value?.messages ?? [];
};

export default getChat;
