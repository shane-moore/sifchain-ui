import { useChains } from "@/hooks/useChains";
import { useCore } from "@/hooks/useCore";
import { IAsset, IAssetAmount, Network } from "@sifchain/sdk";
import { PegEvent } from "../../../../core/src/usecases/peg/peg";
import { UnpegEvent } from "../../../../core/src/usecases/peg/unpeg";
import { Vuextra } from "../Vuextra";
import { accountStore } from "./accounts";

export type ExportDraft = {
  amount: string;
  network: Network;
  symbol: string;
  unpegEvent: UnpegEvent | undefined;
};
type State = {
  draft: ExportDraft;
};
export const exportStore = Vuextra.createStore({
  name: "export",
  options: {
    devtools: true,
  },
  state: {
    draft: {
      amount: "0",
      network: Network.ETHEREUM,
      symbol: "eth",
      unpegEvent: undefined,
    },
  } as State,
  getters: (state) => ({
    networks() {
      return Object.values(Network).filter(
        (network) => network !== Network.SIFCHAIN,
      );
    },
  }),
  mutations: (state) => ({
    setDraft(nextDraft: Partial<ExportDraft>) {
      Object.assign(state.draft, nextDraft);
    },
    setUnpegEvent(unpegEvent: UnpegEvent | undefined) {
      state.draft.unpegEvent = unpegEvent;
    },
  }),
  actions: (ctx) => ({
    async runExport(payload: { assetAmount: IAssetAmount }) {
      if (!payload.assetAmount) throw new Error("Please provide an amount");
      self.setUnpegEvent(undefined);

      const interchain = useCore().usecases.interchain(
        useChains().sifchain,
        useChains().getByNetwork(ctx.state.draft.network),
      );
      const executableTx = await interchain.prepareTransfer(
        payload.assetAmount,
        accountStore.state.sifchain.address,
        accountStore.state[ctx.state.draft.network].address,
      );

      const promise = executableTx.execute();
      for await (const ev of executableTx.generator()) {
        console.log("setUnpegEvent", ev);
        self.setUnpegEvent(ev);
      }
      await promise;
    },
  }),

  modules: [],
});

const self = exportStore;
