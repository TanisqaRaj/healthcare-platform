import { createSlice } from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
  
    name:"auth",
    initialState:{
        user:null,
        token:1234,
        doctor:null,
    },
    reducers:{
        //functions logic
        login:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            if(action.payload.user.role === 'doctor'){
                state.doctor = action.payload.user;
            }
            else{
                state.doctor=null;
            }
            
        },
        logout:(state)=>{
            state.user=null;
            state.token=null;
            state.doctor=null;
        },
    },
});


export const {login , logout }=AuthSlice.actions

export default AuthSlice.reducer