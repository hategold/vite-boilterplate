import { useEffect } from 'react'

import { ChainId } from '../constants/chain'
import { initWeb3ModalAction } from '../slices/web3Slice'
import { useAppDispatch } from './rtkHooks'

function useWeb3State() {
  const selectedChain = ChainId.POLYGON
  const dispatch = useAppDispatch()
  //   const { selectedChain } = useContext(SelectedChainContext)

  useEffect(() => {
    dispatch(initWeb3ModalAction(selectedChain))
  }, [selectedChain])
}

export default useWeb3State
