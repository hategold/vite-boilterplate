import { combineReducers } from '@reduxjs/toolkit'

import web3Reducer from './slices/web3Slice'

const rootReducer = combineReducers({
  web3State: web3Reducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
