import { useAppStore } from "@/stores/app";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";
import { clsx } from "clsx";

export default function AgentModal() {
  const { isAgentModalOpen, setIsAgentModalOpen } = useAppStore();

  function open() {
    setIsAgentModalOpen(true);
  }

  function close() {
    setIsAgentModalOpen(false);
  }

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-pink-400/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button>

      <Dialog
        open={isAgentModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Agent Configuration
              </DialogTitle>
              <p className="my-2 text-sm/6 text-white/50">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p>
              <AgentConfiguration />
              <div className="mt-4 space-x-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Update
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-pink-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Deploy
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

const AgentConfiguration = () => {
  return (
    <Fieldset className="space-y-6">
      <Field>
        <Label className="text-sm/6 font-medium text-white">Name</Label>
        <Input
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        />
      </Field>
      <Field>
        <Label className="text-sm/6 font-medium text-white">Description</Label>
        <Textarea
          className={clsx(
            "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          rows={3}
        />
      </Field>
    </Fieldset>
  );
};
