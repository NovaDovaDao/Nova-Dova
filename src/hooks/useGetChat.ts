import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetChat = () => {
  const { getAccessToken, authenticated } = usePrivy();
  const { data, ...rest } = useQuery({
    queryKey: ["chat", "general"],
    queryFn: async () => {
      const token = await getAccessToken();
      const res = await fetch(
        new URL("/get-chat", import.meta.env.VITE_REST_API_URL),
        {
          // TODO: create api alias
          headers: {
            "x-ghost-token": token ?? "",
          },
        }
      );
      return res.json();
    },
    enabled: authenticated,
    retryDelay: 1000 * 30,
  });
  const messages = useMemo(() => data?.messages ?? [], [data]);

  return {
    ...rest,
    messages,
  };
};
