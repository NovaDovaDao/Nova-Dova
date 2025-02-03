import { useSendMessage } from "@/hooks/useChat";
import { useState } from "react";
import AppAlert from "../app/AppAlert";
import { Button, Textarea } from "@headlessui/react";
import { Send } from "lucide-react";

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
        <Textarea
          autoFocus
          value={inputValue}
          readOnly={isPending}
          onChange={(ev) => setInputValue(ev.currentTarget.value)}
          placeholder="Type your message..."
          className="form-input bg-transparent border-t-0 border-x-0 text-2xl w-full border-b border-neutral-200 focus:border-pink-600 focus:ring-0 [field-sizing:content] pr-8"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="absolute bottom-1/2 right-0 transition-colors hover:text-pink-400"
        >
          <Send />
        </Button>
      </div>
    </form>
  );
}
