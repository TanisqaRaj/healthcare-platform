import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './UserSlice.jsx';
export const store = configureStore({
  reducer: {
    user: userReducer
  },
})
