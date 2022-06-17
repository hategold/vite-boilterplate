import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../reducer'
import { initConnectAction, resetAppAction } from '../../slices/web3Slice'
import { useAppDispatch } from '../../store'

const Testing = () => {
  const dispatch = useAppDispatch()
  const initConnect = () => dispatch(initConnectAction())
  const resetApp = () => dispatch(resetAppAction())
  const web3State = useSelector((state: RootState) => state.web3State)
  console.log(web3State)
  const handleConnect = () => {
    initConnect()
  }
  const handleReset = () => {
    resetApp()
  }

  return (
    <Flex m="1rem" alignItems={'center'} w="100%" flexDirection={'column'}>
      <Box>Testing</Box>
      <Box>Account: {web3State.account}</Box>
      <Button onClick={handleConnect}>Connect</Button>
      <Button onClick={handleReset}>Reset</Button>
    </Flex>
  )
}

export default Testing
