import TokenRegistry from "../../services/TokenRegistryService";
import {
  getBridgeBankContract,
  bridgeBankFetchTokenAddress,
} from "../../services/EthbridgeService/bridgebankContract";
import Web3 from "web3";
import { provider } from "web3-core";
import { IAsset, Asset, Network } from "../../entities";

import { NetworkEnv } from "../getEnv";
import { chainConfigByNetworkEnv } from "../chains";
import { assetMetadataLookup, ethSymbolLookup } from "./metadata";
import createEthbridgeService, {
  EthbridgeServiceContext,
} from "services/EthbridgeService";

export function symbolWithoutPrefix(symbol: string) {
  return symbol.toLowerCase().replace(/^(c|e|u|x)/, "");
}

import config from "../networks/sifchain/config.mainnet.json";
import { getWeb3Provider } from "test/utils/getWeb3Provider";
import { getMetamaskProvider } from "../../services";

const loader = createAssetLoader(NetworkEnv.MAINNET, {
  ...config,
  getWeb3Provider: getMetamaskProvider,
});

(async () => {
  console.log(await loader.loadAssets());
})();

export default function createAssetLoader(
  networkEnv: NetworkEnv,
  context: {
    sifRpcUrl: string;
    sifChainId: string;
    bridgebankContractAddress: string;
    getWeb3Provider: () => Promise<provider>;
  },
) {
  const registry = TokenRegistry(context);

  const findChainConfigMatchingChainId = (chainId: string) => {
    const chainsByNetwork = chainConfigByNetworkEnv[networkEnv];
    return Object.values(chainsByNetwork).find((chainConfig) => {
      return chainConfig.chainId === chainId;
    });
  };
  const findNetworkMatchingChainId = (chainId: string) => {
    return findChainConfigMatchingChainId(chainId)?.network;
  };

  return {
    loadAssets,
  };
  async function loadAssets() {
    const entries = await registry.load();

    let nativeChainAssets: IAsset[] = [];

    for (let entry of entries) {
      try {
        const homeNetwork = !entry.ibcCounterpartyChainId
          ? Network.SIFCHAIN
          : findNetworkMatchingChainId(entry.ibcCounterpartyChainId);

        if (!homeNetwork) {
          throw "Registry entry has no matching chain id";
        }

        const displaySymbol =
          entry.displaySymbol || symbolWithoutPrefix(entry.baseDenom);
        const asset: IAsset = {
          decimals: entry.decimals.toNumber(),
          symbol: entry.baseDenom,
          displaySymbol,
          name: entry.displayName || displaySymbol,
          label: entry.displayName || displaySymbol,
          network: Network.SIFCHAIN,
          homeNetwork,
          ibcDenom: entry.denom?.startsWith("ibc/") ? entry.denom : undefined,
          ...assetMetadataLookup[entry.baseDenom],
        };
        nativeChainAssets.push(asset);

        if (!ethSymbolLookup[asset.symbol]) {
          let ethSymbol = entry.externalSymbol?.toLowerCase();
          if (!ethSymbol && asset.symbol === "rowan") {
            ethSymbol = "erowan";
          } else if (asset.homeNetwork === Network.SIFCHAIN) {
            ethSymbol = asset.symbol.replace(/^c/, "");
          } else {
            ethSymbol = asset.symbol;
          }
          ethSymbolLookup[asset.symbol] = ethSymbol.toUpperCase();
        }
      } catch (error) {
        console.log("skip", entry);
        console.error(error);
        continue;
      }
    }

    const web3 = new Web3(await context.getWeb3Provider());
    const bridgeContract = await getBridgeBankContract(
      web3,
      context.bridgebankContractAddress,
      context.sifChainId,
    );

    const ethAssets: IAsset[] = [];

    // nativeChainAssets = nativeChainAssets.filter((a) => a.symbol === "c1inch");

    for (let asset of nativeChainAssets) {
      try {
        const ethSymbol = ethSymbolLookup[asset.symbol];
        let lockAddress;
        if (asset.homeNetwork === Network.SIFCHAIN) {
          lockAddress = await bridgeContract.methods
            .getLockedTokenAddress(ethSymbol)
            .call();
        }

        let bridgeAddress;
        if (!+lockAddress) {
          bridgeAddress = await bridgeBankFetchTokenAddress(
            web3,
            context.bridgebankContractAddress,
            context.sifChainId,
            asset,
          );
        }
        console.log(asset.symbol, { ethSymbol, bridgeAddress, lockAddress });

        if (bridgeAddress || lockAddress) {
          ethAssets.push({
            ...asset,
            symbol: ethSymbol,
            address:
              lockAddress && !!+lockAddress ? lockAddress : bridgeAddress,
            network: Network.ETHEREUM,
            homeNetwork:
              asset.homeNetwork === Network.SIFCHAIN
                ? Network.ETHEREUM
                : asset.homeNetwork,
          });
        }
      } catch (error) {
        console.log("skip", asset);
        console.error(error);
        continue;
      }
    }
    console.log({ ethAssets });

    return [...nativeChainAssets, ...ethAssets];
  }
}
