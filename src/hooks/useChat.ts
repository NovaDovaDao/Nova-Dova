import { usePrivy } from "@privy-io/react-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export interface Message {
  content: string;
  timestamp: number;
  role: "user" | "agent" | "system";
}

const chatQueryKey = ["chat", "general"];

export const useChat = () => {
  const { getAccessToken, authenticated } = usePrivy();
  const { data, ...rest } = useQuery({
    queryKey: chatQueryKey,
    queryFn: async () => {
      const token = await getAccessToken();
      const url = new URL("/chat", import.meta.env.VITE_REST_API_URL);
      const res = await fetch(url, {
        headers: {
          "x-ghost-token": token ?? "",
        },
      });
      const result: Message[] = await res.json();
      return result;
    },
    enabled: authenticated,
    retryDelay: 1000 * 30,
  });

  const messages = useMemo(() => data ?? [], [data]);

  return {
    ...rest,
    messages,
  };
};

export const useSendMessage = () => {
  const { getAccessToken } = usePrivy();
  const queryClient = useQueryClient();
  const { mutate: sendMessage, ...rest } = useMutation({
    mutationKey: ["chat", "send"],
    mutationFn: async (variables: { message: Message["content"] }) => {
      const token = await getAccessToken();
      const url = new URL("/chat", import.meta.env.VITE_REST_API_URL);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "x-ghost-token": token ?? "",
        },
        body: JSON.stringify({
          content: variables.message,
        }),
      });
      await queryClient.refetchQueries({ queryKey: chatQueryKey });
      const result: Message = (await res.json()) as Message;

      if (result.role === "system") alert(result.content);

      return result;
    },
  });
  return {
    ...rest,
    sendMessage,
  };
};
