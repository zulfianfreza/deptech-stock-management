import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function EMPTY_FUNCTION() {
  return null;
}

export const handleError = (error: any) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.data;
    toast.error(
      (typeof message === "object"
        ? message.map((item: string) => item)
        : message) || "Something went wrong"
    );
  } else {
    toast.error("Something went wrong");
  }
};

export function concatNameSafe(firstName?: string, lastName?: string): string {
  if (!firstName && !lastName) {
    return "";
  }

  if (!firstName) return lastName?.trim() || "";
  if (!lastName) return firstName.trim();

  return `${firstName.trim()} ${lastName.trim()}`;
}
