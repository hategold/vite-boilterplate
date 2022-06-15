import { createSlice } from '@reduxjs/toolkit'

const walletSlice = createSlice({
  name: 'wallet',
  initialState: { count: 0 },
  reducers: {
    connectWallet(state: { count: number }) {
      state.count = state.count + 1
    },
  },
})

const { actions, reducer } = walletSlice
export const { connectWallet } = actions
export default reducer
