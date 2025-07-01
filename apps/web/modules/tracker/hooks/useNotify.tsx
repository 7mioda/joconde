import { toast } from "sonner"


export const useNotify = () => {
  const notify = (message: string, options?: any) => {
    toast(message, options)
  }

  return {
    notify,
  }
}