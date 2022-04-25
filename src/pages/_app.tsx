import type { AppProps } from 'next/app'
//import '../styles/globals.css'
import NextHead from 'next/head'
import { InjectedConnector, StarknetProvider } from '@starknet-react/core'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = [new InjectedConnector()]

  return (
    <StarknetProvider autoConnect connectors={connectors}>
      <NextHead>
        <title>StarkNet ❤️ React</title>
      </NextHead>
      <Component {...pageProps} />
    </StarknetProvider>
  )
}

export default MyApp
