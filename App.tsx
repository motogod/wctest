/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import '@walletconnect/react-native-compat';
import React from 'react';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from '@web3modal/wagmi-react-native';

import {WagmiConfig} from 'wagmi';
import {arbitrum, mainnet} from 'wagmi/chains';

import AppContainer from './src/navigator';

// 1. Get projectId
const projectId = '88df17cf1fa66c336efceb21027d647f';

// 2. Create config
const metadata = {
  name: 'Web3Modal + wagmi',
  description: 'Web3Modal + wagmi',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'wctest://',
  },
};

const chains = [mainnet, arbitrum];

const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

function App(): JSX.Element {
  return (
    <WagmiConfig config={wagmiConfig}>
      <AppContainer />
      <Web3Modal />
    </WagmiConfig>
  );
}

export default App;
