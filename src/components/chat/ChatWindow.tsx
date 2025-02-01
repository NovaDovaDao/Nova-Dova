import { Message, useChat } from "@/hooks/useChat";
import ChatInput from "./ChatInput";
import { useEffect, useMemo, useRef } from "react";
import { formatDistanceToNow } from "date-fns";

export const ChatWindow = () => {
  const { error, messages, isLoading } = useChat();

  const chatLog = useMemo(() => {
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  const lastEl = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isLoading && lastEl.current) {
      lastEl.current.scrollIntoView({ behavior: "instant" });
    }
  }, [isLoading]);

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
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error.message}</p>}

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
    <p className="text-sm break-words">{message.content}</p>
    <footer>
      {message.role === "agent" && (
        <span className="uppercase tracking-widest text-[10px] text-pink-400">
          — Dova
        </span>
      )}
    </footer>
    {/* <div className="mt-4">
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
                readOnly
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
                readOnly
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
      </div> */}
  </div>
);
