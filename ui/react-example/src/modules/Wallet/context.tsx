import { Chain, IAssetAmount, Network } from '@sifchain/sdk'
import { KeplrWalletProvider, MetamaskWalletProvider } from '@sifchain/sdk/src/clients/wallets'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { sdk } from '../../sdk'

const keplrProvider = new KeplrWalletProvider(sdk.context)
const metamaskProvider = new MetamaskWalletProvider(sdk.context)

if (typeof window !== 'undefined') {
  metamaskProvider.onChainChanged(() => window.location.reload())
  metamaskProvider.onAccountChanged(() => window.location.reload())
  keplrProvider.onAccountChanged(() => window.location.reload())
}

type WalletState = {
  address: string
  connected: boolean
  balances: IAssetAmount[]
}

const useWalletData = () => {
  const [state, setState] = useState(
    Object.values(Network).reduce((acc, network) => {
      acc[network] = {
        address: '',
        connected: false,
        balances: [],
      }
      return acc
    }, {} as Record<Network, WalletState>),
  )

  const connect = React.useCallback(async (chain: Chain) => {
    const provider = chain.chainConfig.chainType === 'ibc' ? keplrProvider : metamaskProvider

    const address = await provider.connect(chain)
    updateChainState(chain, { connected: true, address })
    return address
  }, [])

  const updateChainState = React.useCallback((chain: Chain, update: Partial<WalletState>) => {
    setState(state => ({
      ...state,
      [chain.network]: {
        ...state[chain.network],
        ...update,
      },
    }))
  }, [])

  const fetchBalances = async (chain: Chain) => {
    if (!state[chain.network].connected) return
    const provider = chain.chainConfig.chainType === 'ibc' ? keplrProvider : metamaskProvider
    const balances = await provider.fetchBalances(chain, state[chain.network].address)
    updateChainState(chain, { balances })
    return balances
  }

  const value = {
    state,
    connect,
    fetchBalances,
  }

  return useMemo(() => value, Object.values(value))
}

// @ts-ignore
const WalletContext = createContext<ReturnType<typeof useWalletData>>({})

export const useWalletContext = () => useContext(WalletContext)

export const WalletProvider = (props: { children: any }) => {
  const data = useWalletData()

  return <WalletContext.Provider value={data}>{props.children}</WalletContext.Provider>
}
