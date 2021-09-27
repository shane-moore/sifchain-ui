import { createSdk } from "../src/setup";
import fetch from "cross-fetch";
import {
  NetworkEnv,
  AssetAmount,
  toBaseUnits,
  formatAssetAmount,
  IAsset,
  Network,
} from "../src";
import {
  DirectSecp256k1HdWalletProvider,
  Web3WalletProvider,
  WalletProvider,
} from "../src/clients/wallets";

import HDWalletProvider from "@truffle/hdwallet-provider";
import { BridgeParams } from "../src/clients/bridges/BaseBridge";

const sdk = createSdk({
  environment: NetworkEnv.MAINNET,
});

const cosmosWallet = new DirectSecp256k1HdWalletProvider(sdk.context, {
  mnemonic: process.env.COSMOS_MNEMONIC || "",
});
const web3Wallet = new Web3WalletProvider(sdk.context, {
  getWeb3Provider: async () => {
    return new HDWalletProvider({
      mnemonic: {
        phrase: process.env.ETH_MNEMONIC!,
      },
      providerOrUrl: process.env.ETH_HTTP_PROVIDER_URL!,
      chainId: 0,
    });
  },
});

// https://api.coingecko.com/api/v3/simple/price?ids=rally&vs_currencies=usd
const fetchCoingeckoPrices = async (cgSymbols: string[]) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${cgSymbols.join(
      ",",
    )}&vs_currencies=usd`,
  );
  const json = await res.json();

  // @ts-ignore
  return Object.fromEntries(
    Object.keys(json).map((key) => {
      return [key, json[key].usd];
    }),
  ) as Record<string, number>;
};

(async () => {
  const coins = [
    { geckoId: "sifchain", symbol: "rowan" },
    { geckoId: "ethereum", symbol: "ceth" },
    { geckoId: "cosmos", symbol: "uatom" },
    { geckoId: "chainlink", symbol: "clink" },
    { geckoId: "rally-2", symbol: "crly" },
    { geckoId: "render-token", symbol: "crndr" },
    { geckoId: "1inch", symbol: "c1inch" },
    { geckoId: "aave", symbol: "caave" },
    { geckoId: "thorchain", symbol: "crune" },
    { geckoId: "akash-network", symbol: "uakt" },
    { geckoId: "sentinel", symbol: "udvpn" },
    { geckoId: "persistence", symbol: "uxprt" },
    { geckoId: "linear", symbol: "clina" },
    { geckoId: "usd-coin", symbol: "cusdc" },
    { geckoId: "paid-network", symbol: "cpaid" },
    { geckoId: "rio-defi", symbol: "crfuel" },
    { geckoId: "crypto-com-chain", symbol: "ccro" },
  ];

  const allGeckoPrices = await fetchCoingeckoPrices(
    coins.map((c) => c.geckoId),
  );

  const allPools = await sdk.liquidity.fetchAllPools();

  const usdt = sdk.chains.sifchain.forceGetAsset("usdt");
  const usdtPool = allPools.find((p) => p.externalAmount.symbol === "cusdt");
  if (!usdtPool) throw "no usdt pool";

  let budget = 100;
  const opportunities = {
    export: new Map<string, any>(),
    import: new Map<string, any>(),
  };

  while (budget < 5000) {
    for (let coin of coins) {
      const { geckoId, symbol } = coin;
      checkOpportunity(
        budget,
        geckoId,
        sdk.chains.sifchain.forceGetAsset(symbol),
      );
    }
    budget += 50;
  }

  console.log(opportunities);

  function checkOpportunity(budget: number, geckoId: string, asset: IAsset) {
    const realPriceUsd = allGeckoPrices[geckoId];
    const assetPool =
      asset.symbol === "rowan"
        ? usdtPool
        : allPools.find((p) => p.externalAmount.symbol === asset.symbol)!;

    if (!assetPool) throw new Error("no pool for " + geckoId);

    const fairAmountToBuyExternally = budget / realPriceUsd;

    const sifchainBuyQuote = sdk.liquidity.createSwapQuote({
      fromAmount: AssetAmount(usdt, toBaseUnits(String(budget), usdt)),
      toAsset: asset,
      fromPool: usdtPool!,
      toPool: assetPool!,
    });

    const sifchainSellQuote = sdk.liquidity.createSwapQuote({
      fromAmount: AssetAmount(
        asset,
        toBaseUnits(String(fairAmountToBuyExternally), asset),
      ),
      toAsset: usdt,
      fromPool: assetPool!,
      toPool: usdtPool!,
    });

    const sifchainBuyAmountReceived = +formatAssetAmount(
      sifchainBuyQuote.toAmount,
    );
    const sifchainSellUsdtReceived = +formatAssetAmount(
      sifchainSellQuote.toAmount,
    );

    const exportRev = sifchainBuyAmountReceived * realPriceUsd;
    const importRev = sifchainSellUsdtReceived;

    const exportGas =
      asset.homeNetwork === Network.ETHEREUM || asset.symbol === "rowan"
        ? allGeckoPrices.ethereum * 0.036 + 50
        : 2;

    const importGas = asset.homeNetwork === Network.ETHEREUM ? 50 : 1;

    const importProfit = importRev - budget - importGas;
    const exportProfit = exportRev - budget - exportGas;

    if (importProfit > 0) {
      const current = opportunities.import.get(asset.symbol);
      if (!current || current.importProfit < importProfit) {
        opportunities.import.set(asset.symbol, {
          budget,
          symbol: asset.symbol,
          importRev,
          importGas,
          importProfit,
        });
      }
    } else if (exportProfit > 0) {
      const current = opportunities.export.get(asset.symbol);
      if (!current || current.exportProfit < exportProfit) {
        opportunities.export.set(asset.symbol, {
          budget,
          symbol: asset.symbol,
          exportRev,
          exportGas,
          exportProfit,
        });
      }
    }
  }
})();

// (async () => {
//   const token = sdk.chains.ethereum.findAssetWithLikeSymbolOrThrow("erowan");
//   const address = await web3Wallet.connect(sdk.chains.ethereum);
//   const balances = await web3Wallet.fetchBalances(sdk.chains.ethereum, address);
//   const rowanBal = balances.find((b) => b.symbol.toLowerCase() === "erowan");
//   console.log(formatAssetAmount(rowanBal!), "erowan");

//   const params = {
//     fromChain: sdk.chains.ethereum,
//     fromAddress: address,
//     toChain: sdk.chains.sifchain,
//     toAddress: await cosmosWallet.connect(sdk.chains.sifchain),
//     assetAmount: AssetAmount(rowanBal!, toBaseUnits("1", rowanBal!)),
//   };
//   console.log("approving...");

//   await sdk.bridges.eth.approveTransfer(web3Wallet, params);
//   console.log("approved! signing...");

//   const bridgeTx = await sdk.bridges.eth.transfer(web3Wallet, params);
//   console.log("sent!");

//   await sdk.bridges.eth.waitForTransferComplete(
//     web3Wallet,
//     bridgeTx,
//     console.log.bind(console, "update"),
//   );
//   console.log("done!");
// })();

// /*
// sdk.liquidity.getPools(): Promise<Pool[]>
// sdk.liquidity.getPool(externalAsset: IAsset): Promise<Pool>

// type SwapParams = {
//   fromAmount: AssetAmount,
//   toAmount: AssetAmount,
//   fromPool?: Pool,
//   toPool?: Pool,
//   slippage: number
// }
// sdk.liquidity.getSwapEstimate(params: SwapParams): { priceImpact, priceRatio, fee, minimumReceived  }
// sdk.liquidity.swap(params: SwapParams): Promise<TransactionStatus>

// sdk.liquidity.getAddLiquidityData(nativeAmount: AssetAmount, externalAmount: AssetAmount)
// sdk.liquidity.addLiquidity(nativeAmount: AssetAmount, externalAmount: AssetAmount)
// sdk.liquidity.getRemoveLiquidityData(nativeAmount: AssetAmount, externalAmount: AssetAmount)
// sdk.liquidity.removeLiquidity(nativeAmount: AssetAmount, externalAmount: AssetAmount)
// */

// async function test () {
//   const address = await cosmosWallet.connect(sdk.chains.sifchain)
//   const atom = sdk.chains.sifchain.forceGetAsset('uatom')
//   const rowan = sdk.chains.sifchain.forceGetAsset('rowan')

//   const pool = await sdk.liquidity.getPool({ externalAsset: atom })
//   const liquidityProvider = await sdk.liquidity.getLiquidityProvider({
//     externalAsset: atom,
//     address
//   })

//   const projection = sdk.addLiquidity.project({
//     addExternalAmount: AssetAmount(atom, 1000),
//     addNativeAmount: AssetAmount(rowan, 1000),
//   })
//   // projection.slipFactor, poolShare, externalToNativeRatio

//   const txDraft = await sdk.addLiquidity.prepareTx({
//     address,
//     addExternalAmount: AssetAmount(atom, 1000),
//     addNativeAmount: AssetAmount(rowan, 1000),
//   })

//   const signed = await cosmosWallet.sign(sdk.chains.sifchain, txDraft)
//   const response = await cosmosWallet.broadcast(sdk.chains.sifchain, signed)
// }
