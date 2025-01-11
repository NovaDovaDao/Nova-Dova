import { FormEvent, useState, ComponentProps } from "react";
import { socket } from "../socket";

export default function DashboardForm({
  disabled,
  ...props
}: ComponentProps<"section"> & { disabled: boolean }) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit("input", value, () => {
      setIsLoading(false);
    });
  }
  return (
    <section {...props}>
      <form onSubmit={onSubmit}>
        <fieldset className=" text-2xl flex gap-8">
          <input
            autoFocus
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
            className="bg-transparent focus:outline-none border-b-2 flex-1"
            placeholder="what is this?"
          />

          <button type="submit" disabled={isLoading}>
            Send
          </button>
        </fieldset>
      </form>
    </section>
  );
}
