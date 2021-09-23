import { createSdk } from "../src/setup";
import { NetworkEnv, AssetAmount, toBaseUnits } from "../src";
import {
  DirectSecp256k1HdWalletProvider,
  Web3WalletProvider,
  WalletProvider,
} from "../src/clients/wallets";

import HDWalletProvider from "@truffle/hdwallet-provider";
import { BridgeParams } from "../src/clients/bridges/BaseBridge";

const sdk = createSdk({
  environment: NetworkEnv.DEVNET,
});

const cosmosWallet = new DirectSecp256k1HdWalletProvider(sdk.context, {
  mnemonic: process.env.COSMOS_MNEMONIC || "",
});
const web3Wallet = new Web3WalletProvider(sdk.context, {
  getWeb3Provider: async () => {
    return new HDWalletProvider({
      mnemonic: {
        phrase: process.env.ETH_MNEMONIC || "",
      },
      providerOrUrl: process.env.ETH_HTTP_PROVIDER_URL!,
      chainId: 3,
    });
  },
});

(async () => {
  const erowan = sdk.chains.ethereum.findAssetWithLikeSymbolOrThrow("erowan");
  const params = {
    fromChain: sdk.chains.ethereum,
    fromAddress: await web3Wallet.connect(sdk.chains.ethereum),
    toChain: sdk.chains.sifchain,
    toAddress: await cosmosWallet.connect(sdk.chains.sifchain),
    assetAmount: AssetAmount(erowan, toBaseUnits("0.01", erowan)),
  };

  await sdk.bridges.eth.approveTransfer(web3Wallet, params);

  const bridgeTx = await sdk.bridges.eth.transfer(web3Wallet, params);

  await sdk.bridges.eth.waitForTransferComplete(
    web3Wallet,
    bridgeTx,
    console.log.bind(console, "update"),
  );
  console.log("done!");
})();

/*

sdk.liquidity.getPools(): Promise<Pool[]>
sdk.liquidity.getPool(externalAsset: IAsset): Promise<Pool>

type SwapParams = {
  fromAmount: AssetAmount, 
  toAmount: AssetAmount,
  fromPool?: Pool,
  toPool?: Pool,
  slippage: number
}
sdk.liquidity.getSwapEstimate(params: SwapParams): { priceImpact, priceRatio, fee, minimumReceived  }
sdk.liquidity.swap(params: SwapParams): Promise<TransactionStatus>

sdk.liquidity.getAddLiquidityData(nativeAmount: AssetAmount, externalAmount: AssetAmount)
sdk.liquidity.addLiquidity(nativeAmount: AssetAmount, externalAmount: AssetAmount)
sdk.liquidity.getRemoveLiquidityData(nativeAmount: AssetAmount, externalAmount: AssetAmount)
sdk.liquidity.removeLiquidity(nativeAmount: AssetAmount, externalAmount: AssetAmount)

*/
