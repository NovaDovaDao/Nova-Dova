// src/components/chat/ChatWindow.tsx
import React, { useState, useMemo } from "react";
import { Message, useChat } from "@/hooks/useChat";
import { usePrivy } from "@privy-io/react-auth";
import ChatInput from "./ChatInput";

export const ChatWindow = () => {
  const { messages, error, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState("");

  const chatLog = useMemo(() => {
    return messages.sort((a, b) =>
      new Date(a.created_at) > new Date(b.created_at) ? 1 : -1
    );
  }, [messages]);

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

    sendMessage({ message: newMessage });
    setInputValue("");
  };

  const renderMessage = (message: Message) => (
    <article
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      } w-full`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%]  ${
          message.sender === "user"
            ? " text-white ml-auto"
            : " text-gray-200 mr-auto"
        }`}
      >
        <div className="space-y-1">
          <p className="text-sm sm:text-base break-words">{message.content}</p>
          <footer className=" space-x-4">
            <span className="text-xs text-neutral-400 ">
              {new Date(message.created_at).toLocaleTimeString()}
            </span>
          </footer>
        </div>
        <div className="mt-4">
          <fieldset className="border border-neutral-600 rounded-xl p-4 bg-black overflow-hidden relative">
            <legend className="uppercase text-xs tracking-widest ">
              Agent Configurations
            </legend>
            <div>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  value="Mr. Love"
                  className="form-input w-full bg-transparent rounded-lg text-sm"
                />
              </label>
            </div>
            <div>
              <label>
                <span>Description</span>
                <input
                  type="text"
                  value="Lorem ipsum dolor sit amet consectetur, adipisicing elit. "
                  className="form-input w-full bg-transparent rounded-lg text-sm"
                />
              </label>
            </div>
            <div className=" absolute inset-0 from-black to-transparent bg-gradient-to-t">
              <button className=" text-blue-400 flex h-full w-full items-center justify-center uppercase">
                open
              </button>
            </div>
          </fieldset>
        </div>
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
