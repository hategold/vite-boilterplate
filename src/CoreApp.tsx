import React from 'react'

import useWeb3State from './hooks/useWeb3State'
import MainRouter from './MainRouter'

const CoreApp = () => {
  useWeb3State()
  return <MainRouter />
}

export default CoreApp
