import type { AppProps } from "next/app";
import { SifchainProvider } from "@sifchain/sdk/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SifchainProvider environment="localnet">
      <Component {...pageProps} />
    </SifchainProvider>
  );
}
export default MyApp;
