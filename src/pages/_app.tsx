import type { AppProps } from "next/app"

import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"

import "../styles/globals.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
