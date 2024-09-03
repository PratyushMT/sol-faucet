import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import * as web3 from "@solana/web3.js"
import loader from '../assets/loader.svg'

function Airdrop() {
    const { publicKey } = useWallet();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
  
    const handleAirdrop = async (amount) => {
      setLoading(true);
      try {
        const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
        const signature = await connection.requestAirdrop(publicKey, web3.LAMPORTS_PER_SOL * amount);
        const latestBlockHash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
          blockhash : latestBlockHash.blockhash,
          lastValidBlockHeight : latestBlockHash.lastValidBlockHeight,
          signature : signature
        })
        setSuccess(true)
      } catch(error) {
        setFailed(true)
      } finally {
        setLoading(false);
        setShowModal(false);
      }
    };
  
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-tr from-slate-800 to-stone-800">
        <div className="text-slate-300 text-4xl font-bold mb-9 animate-fade-in select-none">SOL FAUCET</div>
        <div className="absolute top-0 right-0 m-4">
          <WalletMultiButton />
        </div>
        <div className="bg-gray-200 p-8 rounded-lg shadow-lg animate-move-up">
          <input type="text" className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md" placeholder="Wallet Address" value={publicKey?.toBase58() || ''} />
          <button className={`w-full px-4 py-2 ${publicKey ? 'bg-blue-600 hover:bg-blue-700 transition ease-in-out hover:scale-105 duration-300' : 'bg-gray-400'} text-white rounded-md`} type="button" disabled={!publicKey} onClick={() => setShowModal(true)}>Confirm Airdrop</button>
          {success && (
            <div className="bg-green-700 text-white px-4 py-2 mt-4 rounded-md flex justify-between items-center animate-fade-in animate-duration-3000 animate-ease-in">
              <span>Airdrop Successful!</span>
              <button className="text-black font-extrabold hover:bg-red-600 transition-colors bg-white px-2 py-1 rounded-md" onClick={() => setSuccess(false)}>×</button>
            </div>
          )}
          {failed && (
            <div className="bg-red-700 text-white px-4 py-2 mt-4 rounded-md flex justify-between items-center animate-fade-in animate-duration-3000 animate-ease-in">
              <span>Airdrop Failed. Please Try Again Later</span>
              <button className="text-black font-extrabold hover:bg-red-600 transition-colors bg-white px-2 py-1 rounded-md" onClick={() => setFailed(false)}>×</button>
            </div>
          )}
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Select Airdrop Amount</h2>
              <div className="flex justify-between">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md mr-2 transition ease-in-out hover:scale-105 duration-300" onClick={() => handleAirdrop(0.5)}>0.5 SOL</button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md mr-2 transition ease-in-out hover:scale-105 duration-300" onClick={() => handleAirdrop(1)}>1 SOL</button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md mr-2 transition ease-in-out hover:scale-105 duration-300" onClick={() => handleAirdrop(3)}>3 SOL</button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition ease-in-out hover:scale-105 duration-300" onClick={() => handleAirdrop(5)}>5 SOL</button>
              </div>
              <button className="mt-4 px-4 py-2 bg-zinc-700 hover:bg-red-500 text-white rounded-md" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* <div className="bg-white p-9 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Processing Airdrop...</h2>
            </div> */}
            <button type="button" className="bg-slate-300 text-black text-lg font-bold px-9 py-6 shadow-lg rounded-lg" disabled>
            <img src={loader} alt="loading" />
                    Processing...
            </button>
          </div>
        )}
      </div>
    )
}

export default Airdrop