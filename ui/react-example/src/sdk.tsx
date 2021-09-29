import { createSdk } from "@sifchain/sdk/src/setup";
import { NetworkEnv } from "@sifchain/sdk";

export const sdk = createSdk({
  environment: NetworkEnv.DEVNET,
});
