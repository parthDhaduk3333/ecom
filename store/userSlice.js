import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        cart:0,
        fetched:false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setCart : (state,action) => {
            state.cart = action.payload
        },
        setFetched : (state,action) => {
            state.fetched = action.payload
        }
    }
})

export const { setUser, setCart,setFetched } = userSlice.actions;

export default userSlice.reducer;