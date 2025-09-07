"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "./ui/sonner";
import { handleError } from "@/lib/utils";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
      queryCache: new QueryCache({
        onError: (error) => {
          handleError(error);
        },
      }),
      mutationCache: new MutationCache({
        onError: (error) => {
          handleError(error);
        },
      }),
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster richColors closeButton />
    </QueryClientProvider>
  );
}
