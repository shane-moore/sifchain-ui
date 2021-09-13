import TokenRegistry from "../../services/TokenRegistryService";
import { getBridgeBankContract } from "../../services/EthbridgeService/bridgebankContract";
import Web3 from "web3";
import { provider } from "web3-core";
import { IAsset, Asset, Network } from "../../entities";

import { NetworkEnv } from "../getEnv";
import { chainConfigByNetworkEnv } from "config/chains";
import { assetMetadataLookup } from "./metadata";
import createEthbridgeService, {
  EthbridgeServiceContext,
} from "services/EthbridgeService";

export function symbolWithoutPrefix(symbol: string) {
  return symbol.toLowerCase().replace(/^(c|e|u|x)/, "");
}

import config from "../networks/sifchain/config.devnet.json";

const loader = createAssetLoader(NetworkEnv.DEVNET, {
  ...config,
  getWeb3Provider: async () => {
    return new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/7bf7bd5d44fd4f5eb081b580df2a2121",
    );
  },
});

loader.

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
    loadAssets 
  }
  async function loadAssets() {
    const entries = await registry.load();

    const nativeChainAssets: IAsset[] = [];

    const ethSymbolLookup: Record<string, string> = {};

    for (let entry of entries) {
      const homeNetwork = !entry.ibcCounterpartyChainId
        ? Network.SIFCHAIN
        : findNetworkMatchingChainId(entry.ibcCounterpartyChainId);

      if (!homeNetwork) {
        throw new Error(
          "Registry entry has no matching chain id " + JSON.stringify(entry),
        );
      }

      const asset: IAsset = {
        decimals: entry.decimals.toNumber(),
        name: entry.displayName || entry.baseDenom,
        label: entry.displayName || entry.baseDenom,
        symbol: entry.baseDenom,
        displaySymbol:
          entry.displaySymbol || symbolWithoutPrefix(entry.baseDenom),
        network: Network.SIFCHAIN,
        homeNetwork,
        ...assetMetadataLookup[entry.baseDenom],
      };
      nativeChainAssets.push(asset);

      let ethSymbol = entry.externalSymbol?.toLowerCase();
      if (!ethSymbol && asset.symbol === "rowan") {
        ethSymbol = "erowan";
      } else if (asset.homeNetwork === Network.SIFCHAIN) {
        ethSymbol = asset.symbol.replace(/^c/, "");
      } else {
        ethSymbol = asset.symbol;
      }
      ethSymbolLookup[asset.symbol] = ethSymbol;
    }

    const ethAssets: IAsset[] = [];

    for (let asset of nativeChainAssets) {
      const ethSymbol = ethSymbolLookup[asset.symbol];
      const bridgeAddress = await ethbridge.fetchTokenAddress(asset);
      let lockAddress;
      if (
        (!bridgeAddress || !+bridgeAddress) &&
        asset.homeNetwork === Network.SIFCHAIN
      ) {
        lockAddress = await ethbridge.fetchLockedSymbolAddress(ethSymbol);
      }

      if (bridgeAddress || lockAddress) {
        ethAssets.push({
          ...asset,
          symbol: ethSymbol,
          address: lockAddress && !!+lockAddress ? lockAddress : bridgeAddress,
          network: Network.ETHEREUM,
          homeNetwork: asset.homeNetwork === Network.SIFCHAIN ? Network.ETHEREUM : asset.homeNetwork
        });
      }
    }

    return [
      ...nativeChainAssets,
      ...ethAssets
    ]
  };
}
