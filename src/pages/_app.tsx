import type { AppProps } from "next/app"

import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"

import "../styles/globals.css"
import { UserProvider } from "../context/userContext"

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
      <UserProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </UserProvider>
    </QueryClientProvider>
  )
}
