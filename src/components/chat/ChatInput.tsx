import { useSendMessage } from "@/hooks/useChat";
import { useState } from "react";
import AppAlert from "../app/AppAlert";

export default function ChatInput() {
  const { sendMessage, isPending, error } = useSendMessage();
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    if (isPending) return;
    e.preventDefault();
    e.stopPropagation();
    if (!inputValue.trim()) return;

    sendMessage({ message: inputValue });
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 md:p-8 [box-shadow:0_-30px_30px_black] md:shadow-none z-10 "
    >
      {error && <AppAlert className="mb-2">{error?.message}</AppAlert>}

      <div className="relative">
        <input
          type="text"
          autoFocus
          value={inputValue}
          readOnly={isPending}
          onChange={(ev) => setInputValue(ev.currentTarget.value)}
          placeholder="Type your message..."
          className="form-input bg-transparent border-t-0 border-x-0 text-2xl w-full border-b border-neutral-200 focus:border-pink-600 focus:ring-0"
        />
        <button
          type="submit"
          disabled={isPending}
          className="absolute bottom-4 right-0 transition-colors hover:text-pink-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
