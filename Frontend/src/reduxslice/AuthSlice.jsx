import { createSlice } from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
  
    name:"auth",
    initialState:{
        user:null,
        token:1234,
    },
    reducers:{
        //functions logic
        login:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout:(state)=>{
            state.user=null;
            state.token=null;
        },
    },
});


export const {login , logout }=AuthSlice.actions

export default AuthSlice.reducer