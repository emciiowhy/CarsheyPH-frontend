// frontend/components/ui/use-toast.ts
import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: (
      title: string,
      options?: {
        description?: string;
      }
    ) => {
      sonnerToast(title, options);
    },
  };
}
