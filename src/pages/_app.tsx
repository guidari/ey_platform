import type { AppProps } from "next/app"

import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

import { UserProvider } from "../context/userContext"
import "../styles/globals.css"

import VLibras from "vlibras-nextjs"

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
      <VLibras forceOnload />
    </QueryClientProvider>
  )
}
