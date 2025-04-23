import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "cart",
    initialState: {
      items:0
    },
    reducers: {
      //functions logic
      addItem: (state) => {
        state.items += 1
      },
      removeItem: (state) => {
        state.items -= 1
      },
      alreadyExist: (state, action) => {
        state.items += action.payload
      },
    },
  });
  
  export const { addItem, removeItem, alreadyExist} = CartSlice.actions;
  
  export default CartSlice.reducer;