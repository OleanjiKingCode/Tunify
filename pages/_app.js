import '../styles/globals.css'

import Header from '../components/Header'
import Footer from '../components/Footer'
import '@rainbow-me/rainbowkit/styles.css';
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';




const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.polygonMumbai],
  [
    apiProvider.alchemy(process.env.ANKR_ID),
    apiProvider.fallback()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    <>
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
      </RainbowKitProvider>
      </WagmiProvider>
    </>)
}

export default MyApp
