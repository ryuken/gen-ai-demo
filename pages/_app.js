import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"

import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {

    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}

export default MyApp