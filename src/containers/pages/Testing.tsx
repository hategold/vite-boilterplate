import { Box, Button } from '@chakra-ui/react'
import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks'
import { connectWallet } from '../../slices/walletSlice'

const Testing = () => {
  const count = useAppSelector((state) => state.wallet.count)
  const dispatch = useAppDispatch()
  const handleAdd = () => {
    dispatch(connectWallet())
  }

  return (
    <Box>
      <Box>Testing</Box>
      <Box>{count}</Box>
      <Button onClick={handleAdd}>Add</Button>
    </Box>
  )
}

export default Testing
