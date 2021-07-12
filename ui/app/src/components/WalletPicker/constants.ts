import { useCore } from '@/hooks/useCore';
import { Network } from '@sifchain/sdk';

export type WalletConnection = {
    name: string;
    network: Network,
    iconSrc: string;
    useBlockExplorerBase: () => string;
    useConnection: () => {
        isConnected: boolean;
        address: string;
    }
}

export const walletConnections: WalletConnection[] = [{
    name: "Metamask",
    network: Network.ETHEREUM,
    iconSrc: require("@/assets/metamask.png"),
    useBlockExplorerBase: () => "https://etherscan.io",
    useConnection: () => {
      const { store } = useCore();
      return store.wallet.eth;
    },
  },
  {
    name: "KEPLR",
    network: Network.SIFCHAIN,
    iconSrc: require("@/assets/keplr.jpg"),
    useBlockExplorerBase: () => {
      const { config } = useCore();
      return config.blockExplorerUrl;
    },
    useConnection: () => {
      const { store } = useCore();
      return store.wallet.sif;
    },
  },
}]