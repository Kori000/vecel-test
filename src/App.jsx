import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { WalletKitProvider } from '@mysten/wallet-kit';

import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';
import { formatAddress } from '@mysten/sui.js';

function ConnectToWallet() {
  const { currentAccount, connect } = useWalletKit();
  console.log('connect', connect);
  return (
    <ConnectButton
      connectText={'Connect Wallet'}
      connectedText={`Connected: ${formatAddress(
        currentAccount?.address || ''
      )}`}
    />
  );
}

// sui 连接按钮
function ConnectToWallet2() {
  const { currentAccount, connect } = useWalletKit();
  return (
    <button
      className='w-fit h-[50px] rounded-xl border-blue-300 border  bg-slate-700  px-5 '
      onClick={async () => {
        await connect('Sui Wallet');
        console.log(currentAccount.address);
      }}
    >
      连接 sui
    </button>
  );
}

function App() {
  // metaMask的信息
  const [metaInfo, setMetaInfo] = useState('');

  // metaMask签名后的结果
  const [metaSignResult, setMetaSignResult] = useState('');

  //------------------------

  // 连接 metaMask
  const connectMeta = async () => {
    console.log('连接 meta');
    const res = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    console.log('meta 的信息', res);

    setMetaInfo(res);

    metaSign();
  };

  // 连接 sui
  const connectSui = () => {
    console.log('连接 sui');
  };

  // metaMask 的签名
  async function metaSign() {
    const exampleMessage = 'Example `personal_sign` message.';
    try {
      const from = metaInfo[0];
      // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
      // This uses a Node.js-style buffer shim in the browser.
      const msg = `哈哈哈哈`;
      const sign = await ethereum.request({
        method: 'personal_sign',
        params: [msg, from, 'Example password']
      });
      console.log('sign', sign);
      setMetaSignResult(sign);
      // personalSignVerify.disabled = false;
    } catch (err) {
      console.error(err);
      setMetaSignResult(`Error: ${err.message}`);
    }
  }
  return (
    <WalletKitProvider>
      <div className='w-full h-screen bg-black text-white flex justify-center items-center gap-5'>
        <button
          className='w-fit h-[50px] rounded-xl border-blue-300 border  bg-slate-700  px-5 '
          onClick={connectMeta}
        >
          连接 metamask
        </button>
        {/* <ConnectToWallet></ConnectToWallet> */}
        <ConnectToWallet2></ConnectToWallet2>
        <div className='min-w-[200px] w-fit h-[70px] bg-blue-400 flex justify-center items-center  '>
          metaSignResult结果是: {metaSignResult}
        </div>
      </div>
    </WalletKitProvider>
  );
}

export default App;
