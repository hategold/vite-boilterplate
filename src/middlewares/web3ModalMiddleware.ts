import { Action, Middleware, ThunkDispatch } from '@reduxjs/toolkit'
import Web3Modal from 'web3modal'

import { RootState } from '../reducer'
import {
  initConnectAction,
  INITIAL_STATE,
  initWeb3ModalAction,
  onConnectAction,
  resetAppAction,
  setWeb3StateAction,
} from '../slices/web3Slice'
import getProviderOptions from '../utils/getProviderOptions'
import { getChainData } from '../utils/web3Utils'

const getNetwork = (chainId: number) => {
  try {
    return getChainData(chainId).network
  } catch {
    return ''
  }
}

const subscribeProvider = async (
  provider: any,
  web3Modal: Web3Modal,
  dispatch: ThunkDispatch<RootState, void, Action>,
) => {
  if (!provider.on) {
    return
  }
  const onConnect = dispatch(onConnectAction(web3Modal))

  const resetApp = dispatch(resetAppAction())
  provider.on('disconnect', resetApp)
  provider.on('accountsChanged', async (accounts: string[]) =>
    dispatch(setWeb3StateAction({ account: accounts[0] })),
  )
  provider.on('networkChanged', onConnect)
}

const createWebModalMiddleWare: () => Middleware<{}, RootState> = () => {
  let web3Modal: Web3Modal
  return (store) => (next) => async (action: Action) => {
    if (initWeb3ModalAction.match(action)) {
      web3Modal = new Web3Modal({
        network: getNetwork(store.getState().web3State.chainId),
        cacheProvider: true,
        providerOptions: getProviderOptions(action.payload),
      })
      if (web3Modal.cachedProvider) {
        store.dispatch(initConnectAction())
      }
    } else if (initConnectAction.match(action)) {
      if (
        web3Modal.cachedProvider === 'custom-uauth' &&
        !window.localStorage.getItem('username')
      ) {
        web3Modal.clearCachedProvider()
      }
      const dispatch = store.dispatch as ThunkDispatch<RootState, void, Action>
      dispatch(onConnectAction(web3Modal)).then((provider) => {
        subscribeProvider(provider, web3Modal, dispatch)
      })
    } else if (resetAppAction.match(action)) {
      window.localStorage.removeItem('username')
      await web3Modal.clearCachedProvider()
      store.dispatch(setWeb3StateAction(INITIAL_STATE))
      store.dispatch(initConnectAction())
    }
    return next(action)
  }
}

export default createWebModalMiddleWare
