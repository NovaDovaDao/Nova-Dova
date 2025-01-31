// src/components/chat/ChatWindow.tsx
import React, { useState, useMemo } from "react";
import { Message, useChat } from "@/hooks/useChat";
import { usePrivy } from "@privy-io/react-auth";
import ChatInput from "./ChatInput";

export const ChatWindow = () => {
  const { messages: history, error } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae ipsa deserunt odit cupiditate temporibus? Placeat, rerum corrupti aperiam magnam veritatis molestias illo voluptatum totam velit voluptates labore repudiandae eligendi! Quas.",
      created_at: new Date().toISOString(),
      id: Date.now(),
      sender: "agent",
      userId: "",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const chatLog = useMemo(() => {
    return history
      .concat(messages)
      .sort((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? 1 : -1
      );
  }, [history, messages]);

  const { user } = usePrivy();
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inputValue.trim() || !user?.id) return;

    const newMessage: Message = {
      id: Date.now(),
      content: inputValue,
      created_at: new Date().toISOString(),
      sender: "user",
      userId: user.id,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  const renderMessage = (message: Message) => (
    <article
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      } w-full`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] space-y-1 ${
          message.sender === "user"
            ? " text-white ml-auto"
            : " text-gray-200 mr-auto"
        }`}
      >
        <p className="text-sm sm:text-base break-words">{message.content}</p>
        <footer className=" space-x-4">
          {message.sender === "agent" && (
            <span className=" uppercase text-xs tracking-widest text-blue-400">
              Dova
            </span>
          )}
          <span className="text-xs text-neutral-400 ">
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
        </footer>
      </div>
    </article>
  );

  return (
    <div className="fixed inset-0 z-10 flex flex-col md:right-0 md:w-1/2 md:left-auto">
      <div className="flex-1">
        <div className=" space-y-8 h-full overflow-auto p-8">
          {chatLog.map(renderMessage)}
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error.message}</p>}

      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  );
};
