import { Message, useChat } from "@/hooks/useChat";
import ChatInput from "./ChatInput";
import { useEffect, useMemo, useRef } from "react";

export const ChatWindow = () => {
  const { error, messages, isFetched } = useChat();

  const chatLog = useMemo(() => {
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  const renderMessage = (message: Message) => (
    <article
      key={message.timestamp}
      className={`flex w-full  border-b last-of-type:border-b-0 border-white/20 py-8 relative group ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%]   ${
          message.role === "user"
            ? " text-white ml-auto"
            : " text-gray-200 mr-auto"
        }`}
      >
        <header
          className={`absolute top-0 inset-x-0 md:opacity-0 md:group-hover:opacity-100 md:-translate-y-2 md:group-hover:translate-y-0 transition ${
            message.role === "user" && "text-right"
          }`}
        >
          <span className="whitespace-nowrap text-xs text-neutral-400 ">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </header>
        <p className="text-sm sm:text-base break-words">{message.content}</p>
        <footer>
          {message.role === "agent" && (
            <span className="uppercase tracking-widest text-xs text-pink-400">
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
    </article>
  );

  const lastEl = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isFetched && lastEl.current) {
      lastEl.current.scrollIntoView({ behavior: "instant" });
    }
  }, [isFetched]);

  return (
    <div className="fixed inset-0 z-10 flex flex-col md:right-0 md:w-1/2 md:left-auto max-h-screen">
      <div className="flex-1 overflow-auto">
        <div className=" space-y-4 h-full overflow-auto p-8">
          {chatLog.map(renderMessage)}
          <div ref={lastEl}></div>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error.message}</p>}

      <ChatInput />
    </div>
  );
};
