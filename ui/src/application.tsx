import React from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UIHome } from "pages";

/** Required for Mantine UI Components */
import '@mantine/core/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export function Application() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <UIHome/>
      </MantineProvider>
    </QueryClientProvider>
  )
}