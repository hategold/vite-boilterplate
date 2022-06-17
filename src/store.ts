import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import createWebModalMiddleWare from './middlewares/web3ModalMiddleware'
import rootReducer from './reducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // a little bit dangerous, need to fix
    }).concat(createWebModalMiddleWare()),
})

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
