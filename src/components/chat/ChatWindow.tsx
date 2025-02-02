import { useEffect, useMemo, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import Markdown from "markdown-to-jsx";
import { Message, useChat } from "@/hooks/useChat";
import ChatInput from "./ChatInput";
import AppAlert from "../app/AppAlert";
// import AgentModal from "../agent/AgentModal";

export const ChatWindow = () => {
  const { error, messages, isLoading } = useChat();

  const chatLog = useMemo(() => {
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  const lastEl = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isLoading && messages && lastEl.current) {
      lastEl.current.scrollIntoView();
    }
  }, [isLoading, messages]);

  return (
    <div className="fixed inset-0 z-10 flex flex-col md:right-0 md:w-1/2 md:left-auto max-h-screen bg-black/90 md:bg-transparent">
      <div className="flex-1 overflow-auto">
        <div className="h-full px-12 md:px-8">
          {chatLog.map((message, i) => (
            <article
              key={message.timestamp}
              className={`flex flex-col w-full relative group ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <ChatMessage message={message} />
              {chatLog.length - 1 > i && (
                <hr className=" border-white/20 w-24 mx-auto" />
              )}
            </article>
          ))}
          <div ref={lastEl}></div>
          {/* {chatLog.length > 0 && <AgentModal />} */}
        </div>
      </div>

      {error && <AppAlert className="mt-4 mx-8">{error.message}</AppAlert>}

      <ChatInput />
    </div>
  );
};

const ChatMessage = ({ message }: { message: Message }) => (
  <div
    className={`max-w-[85%] sm:max-w-[75%] py-8 ${
      message.role === "user"
        ? "text-neutral-300 ml-auto"
        : "text-white mr-auto"
    }`}
  >
    <header
      className={`absolute top-2 inset-x-0 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition ${
        message.role === "user" && "text-right"
      }`}
    >
      <span className="whitespace-nowrap text-xs text-neutral-400 ">
        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
      </span>
    </header>
    <Markdown className="text-sm break-words prose prose-invert">
      {message.content}
    </Markdown>
    <footer>
      {message.role === "agent" && (
        <span className="uppercase tracking-widest text-[10px] text-pink-400">
          — Dova
        </span>
      )}
    </footer>
  </div>
);
