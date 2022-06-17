import { Web3Provider } from '@ethersproject/providers'
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import debounce from 'lodash/debounce'
import Web3Modal from 'web3modal'

import { ChainId, DEFAULT_CHAIN_ID } from '../constants/chain'
import { IPartialWeb3State, IWeb3State } from '../constants/types'

export const INITIAL_STATE: IWeb3State = {
  account: '',
  web3Provider: null,
  provider: null,
  connected: false,
  connecting: false,
  chainId: DEFAULT_CHAIN_ID,
  blockNumber: 0,
}

const initWeb3Provider = (provider: any) => {
  const web3Provider = new Web3Provider(provider)
  return web3Provider
}

const onConnect = createAsyncThunk(
  'wallet/onConnect',
  async (web3Modal: Web3Modal, thunkAPI) => {
    try {
      const provider = await web3Modal.connect()
      const web3Provider: Web3Provider = initWeb3Provider(provider)
      const signer = web3Provider.getSigner()
      const account = (await signer.getAddress()).toLowerCase()
      const network = await web3Provider.getNetwork()
      const blockNumber = await web3Provider.getBlockNumber()
      const chainId = network.chainId
      thunkAPI.dispatch(
        web3Slice.actions.setWeb3State({
          web3Provider,
          provider,
          connected: true,
          account,
          chainId,
          blockNumber,
          connecting: false,
        }),
      )
      const setBlockNumber = (blockNumber: number) => {
        thunkAPI.dispatch(setBlockNumberAction({ chainId, blockNumber }))
      }
      const debouncedSetBlockNumber = debounce(setBlockNumber, 200)
      web3Provider.on('block', debouncedSetBlockNumber)
      return provider
    } catch (e) {
      thunkAPI.dispatch(setWeb3StateAction({ connecting: false }))
      throw e
    }
  },
)

const initWeb3Modal = createAction<ChainId>('initWeb3Modal')
const initConnect = createAction('initConnect')

const resetApp = createAction('resetApp')

const web3Slice = createSlice({
  name: 'wallet',
  initialState: INITIAL_STATE,
  reducers: {
    initWeb3State() {
      return INITIAL_STATE
    },
    setWeb3State(state: IWeb3State, action: { payload: IPartialWeb3State }) {
      return { ...state, ...action.payload }
    },
    setBlockNumber(
      state: IWeb3State,
      action: { payload: { chainId: ChainId; blockNumber: number } },
    ) {
      const { chainId, blockNumber } = action.payload
      if (chainId === state.chainId) {
        if (typeof state.blockNumber !== 'number') {
          state.blockNumber = blockNumber
        } else {
          state.blockNumber = Math.max(blockNumber, state.blockNumber)
        }
      }
    },
  },
})

const { actions, reducer } = web3Slice
export const {
  setWeb3State: setWeb3StateAction,
  setBlockNumber: setBlockNumberAction,
  initWeb3State: initWeb3StateAction,
} = actions

export {
  initConnect as initConnectAction,
  initWeb3Modal as initWeb3ModalAction,
  onConnect as onConnectAction,
  resetApp as resetAppAction,
}
export default reducer
