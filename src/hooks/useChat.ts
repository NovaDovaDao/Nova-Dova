import { usePrivy } from "@privy-io/react-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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

export const useChat = () => {
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

  const { mutate: sendMessage } = useMutation({
    mutationKey: ["chat", "send"],
    mutationFn: async (variables: { message: Message }) => {
      console.log("not implemented yet", variables);
    },
  });

  const messages = useMemo(
    () =>
      data ?? [
        {
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae ipsa deserunt odit cupiditate temporibus? Placeat, rerum corrupti aperiam magnam veritatis molestias illo voluptatum totam velit voluptates labore repudiandae eligendi! Quas.",
          created_at: new Date().toISOString(),
          id: Date.now(),
          sender: "agent",
          userId: "",
        } satisfies Message,
      ],
    [data]
  );

  return {
    ...rest,
    messages,
    sendMessage,
  };
};
