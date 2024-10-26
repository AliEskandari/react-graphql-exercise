"use client";

import {
  QueryClientProvider as ReactQueryQueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReactQueryQueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </ReactQueryQueryClientProvider>
  );
};

export default QueryClientProvider;
