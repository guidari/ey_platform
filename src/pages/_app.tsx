import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"

import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"

import "../styles/globals.css"

// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        session={pageProps.session}
      >
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </SessionProvider>
    </QueryClientProvider>
  )
}
