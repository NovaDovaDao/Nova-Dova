import { FormEvent } from "react";

export default function ChatInput({
  handleSendMessage,
}: {
  handleSendMessage: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={handleSendMessage} className="p-8">
      <div className="relative">
        <input
          type="text"
          autoFocus
          placeholder="Type your message..."
          className="form-input bg-transparent border-t-0 border-x-0 text-2xl w-full border-b-2 border-neutral-200 focus:ring-0"
        />
        <button
          type="submit"
          className="absolute bottom-4 right-0 transition-transform ring-0 hover:translate-x-1"
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
