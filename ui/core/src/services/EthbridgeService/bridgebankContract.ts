import Web3 from "web3";
import { AbiItem } from "web3-utils";

let abisPromise: Promise<AbiItem[]>;
function fetchBridgebankContractAbis(nativeChainId: string) {
  if (!abisPromise) {
    abisPromise = (async () => {
      const res = await fetch(
        `https://sifchain-changes-server.vercel.app/api/bridgebank-abis/${nativeChainId}`,
      );
      return res.json();
    })();
  }
  return abisPromise;
}

export async function getBridgeBankContract(
  web3: Web3,
  address: string,
  nativeChainId: string,
) {
  const abis = await fetchBridgebankContractAbis(nativeChainId);
  return ((window as any).bbc = new web3.eth.Contract(
    abis as AbiItem[],
    address,
  ));
}
