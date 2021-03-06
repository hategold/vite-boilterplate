import { ChainId } from '../constants/chain'
import supportedChains from '../constants/supportChains'
import { IChainData } from '../constants/types'

export function getChainData(chainId: ChainId): IChainData {
  const chainData = supportedChains[chainId]

  if (!chainData) {
    throw new Error('ChainId missing or not supported')
  }

  const API_KEY = import.meta.env.REACT_APP_INFURA_ID

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY)

    return {
      ...chainData,
      rpc_url: rpcUrl,
    }
  }

  return chainData
}
