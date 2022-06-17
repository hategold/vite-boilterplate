export enum ChainId {
  MAINNET = 1,
  POLYGON = 137,
  FANTOM = 250,
  FORK_MAIN_NET = 8787,
}

export const DEV_MULTICALL_CHAIN_ID = parseInt(
  import.meta.env.REACT_APP_DEV_MULTICALL_ID || '0',
)

export const DEFAULT_CHAIN_ID: ChainId =
  import.meta.env.REACT_APP_ENV === 'development'
    ? ChainId.FORK_MAIN_NET
    : ChainId.POLYGON

export const SWITCH_CHAIN_LIST = [ChainId.POLYGON, ChainId.FANTOM]
