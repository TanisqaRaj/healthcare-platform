import { createSlice } from '@reduxjs/toolkit'

const initialState= {
  user: null
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails :(state , actions)=>{
        console.log(actions, payload)
    }

  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = counterSlice.actions

export default userSlice.reducer