import "@/styles/globals.css";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

const theme = createTheme({});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
