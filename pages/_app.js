import '../styles/globals.css'

import Header from '../components/Header'
import Footer from '../components/Footer'
import '@rainbow-me/rainbowkit/styles.css';
import {
  apiProvider,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {chain, configureChains, createClient, WagmiConfig, } from 'wagmi';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";




const mumbaiChain = {
  id: 80001,
  name: "Mumbai Testnet",
  network: "mumbai",
  nativeCurrency: {
    decimals: 18,
    name: "Matic",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: "https://rpc-mumbai.maticvigil.com",
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://polygonscan.com/",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [mumbaiChain],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== mumbaiChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
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
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
      </RainbowKitProvider>
      </WagmiConfig>
    </>)
}

export default MyApp
