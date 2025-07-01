'use client';
import { toast } from "sonner"
import { Toaster } from "davinci/primitives";
import { useOnEvent } from "./subscriptions/use-on-event";

export const TrackerProvider = ({ children }: { children: React.ReactNode }) => {
  useOnEvent({
    onData: ({ data }) => {
      const event = data?.data?.onEvent;
      if (!event) return;
      
      toast(event.title, {
        description: event.description,
        duration: 5000,
      })
    },
  });

  return (
    <>
      {children}
      <Toaster />
    </>
  );
};