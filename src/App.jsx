import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import "@solana/wallet-adapter-react-ui/styles.css"
import { useMemo } from "react"
import * as web3 from "@solana/web3.js"
import Airdrop from "./components/Airdrop"

function App() {

  const endpoint = web3.clusterApiUrl('devnet')
  const wallets = useMemo(() => [], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Airdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}



export default App
