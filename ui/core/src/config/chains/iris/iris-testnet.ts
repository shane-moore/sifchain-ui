import { Network, IBCChainConfig } from "../../../entities";

export const IRIS_TESTNET: IBCChainConfig = {
  chainType: "ibc",
  displayName: "IRISNet",
  blockExplorerUrl: "https://nyancat.iobscan.io/",
  nativeAssetSymbol: "unyan",
  network: Network.IRIS,
  chainId: "nyancat-8",
  rpcUrl: "https://proxies.sifchain.finance/api/nyancat-8/rpc",
  restUrl: "https://proxies.sifchain.finance/api/nyancat-8/rest",
  keplrChainInfo: {
    rpc: "https://proxies.sifchain.finance/api/nyancat-8/rpc",
    rest: "https://proxies.sifchain.finance/api/nyancat-8/rest",
    chainId: "nyancat-8",
    chainName: "Iris Testnet",
    stakeCurrency: {
      coinDenom: "NYAN",
      coinMinimalDenom: "unyan",
      coinDecimals: 6,
      coinGeckoId: "iris",
    },
    walletUrl: "https://wallet.keplr.app/#/iris/stake",
    walletUrlForStaking: "https://wallet.keplr.app/#/iris/stake",
    bip44: {
      coinType: 566,
    },
    bech32Config: {
      bech32PrefixAccAddr: "iaa",
      bech32PrefixAccPub: "iaapub",
      bech32PrefixValAddr: "iaavaloper",
      bech32PrefixValPub: "iaavaloperpub",
      bech32PrefixConsAddr: "iaavalcons",
      bech32PrefixConsPub: "iaavalconspub",
    },
    currencies: [
      {
        coinDenom: "NYAN",
        coinMinimalDenom: "unyan",
        coinDecimals: 6,
        coinGeckoId: "iris",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "NYAN",
        coinMinimalDenom: "unyan",
        coinDecimals: 6,
        coinGeckoId: "iris",
      },
    ],
    coinType: 556,
    features: ["stargate", "ibc-transfer"],
  },
};
