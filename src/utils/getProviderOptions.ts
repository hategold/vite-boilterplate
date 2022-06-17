import WalletConnectProvider from '@walletconnect/web3-provider'

import ImTokenLogo from '../assets/icon-imToken.svg'
import MetamaskLogo from '../assets/icon-metamask.svg'
import WalletconnectLogo from '../assets/icon-walletconnect.svg'
import { ChainId } from '../constants/chain'

function getProviderOptions(selectedChain: ChainId) {
  const providerOptions = {
    injected: {
      display: {
        logo: window?.ethereum?.isImToken ? ImTokenLogo : MetamaskLogo,
        name: window?.ethereum?.isImToken ? 'imToken' : 'MetaMask',
        description: `Connect to your ${
          window?.ethereum?.isImToken ? 'imToken' : 'MetaMask'
        } Wallet`,
      },
      package: null,
    },
    'custom-walletconnect': {
      package: WalletConnectProvider,
      display: {
        logo: WalletconnectLogo,
        name: 'WalletConnect',
        description: 'Scan with WalletConnect to connect',
      },
      options: {
        chainId: selectedChain,
        rpc: {
          [ChainId.MAINNET]: import.meta.env.REACT_APP_NETWORK_URL,
          [ChainId.POLYGON]: import.meta.env.REACT_APP_POLYGON_NETWORK_URL,
          [ChainId.FANTOM]: import.meta.env.REACT_APP_FANTOM_NETWORK_URL,
        },
        bridge: 'https://bridge.walletconnect.org',
        qrcode: true,
        pollingInterval: 15000,
      },
      connector: async (ProviderPackage: any, options: any) => {
        const provider = new ProviderPackage(options)
        await provider.enable()
        return provider
      },
    },
  }

  return providerOptions
}

export default getProviderOptions
