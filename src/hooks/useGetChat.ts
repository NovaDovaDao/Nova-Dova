import { usePrivy } from "@privy-io/react-auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useWebSocket } from "./useWebsocket";

export interface Message {
  agentId?: string;
  content: string;
  created_at: string;
  id: number;
  sender: "user" | "agent";
  userId: string;
}

const baseUrl = new URL("/get-chat", import.meta.env.VITE_REST_API_URL);
const chatQueryKey = ["chat", "general"];

export const useGetChat = () => {
  const { getAccessToken, authenticated } = usePrivy();
  const { data, ...rest } = useQuery({
    queryKey: chatQueryKey,
    queryFn: async () => {
      const token = await getAccessToken();
      const res = await fetch(baseUrl, {
        headers: {
          "x-ghost-token": token ?? "",
        },
      });
      const result: { data: Message[] } = await res.json();
      return result.data;
    },
    enabled: authenticated,
    retryDelay: 1000 * 30,
  });

  const { socket } = useWebSocket();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket) return;

    const handleResponse = async (messageId: string) => {
      const token = await getAccessToken();
      const url = new URL(baseUrl);
      url.searchParams.set("messageId", messageId);

      const res = await fetch(url, {
        headers: {
          "x-ghost-token": token ?? "",
        },
      });
      console.log(res);
      const result: { data: Message } = await res.json();

      if (result.data) {
        queryClient.setQueryData(chatQueryKey, (data: Message[]) => {
          return [...data, result.data];
        });
      }
    };
    socket.on("response", handleResponse);

    return () => {
      socket.off("response", handleResponse);
    };
  }, [getAccessToken, queryClient, socket]);

  const messages = useMemo(() => data ?? [], [data]);

  return {
    ...rest,
    messages,
  };
};
