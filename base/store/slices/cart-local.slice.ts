import { CartItemModel } from "@/base/models/cart.model";
import { CART_LOCAL_STORAGE_KEY } from "@/base/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

export interface CartInProcessState {
    products: CartItemModel[],
}
const initialState: CartInProcessState = {
    products: [],
}

export const cartSlice = createSlice({
    name: CART_LOCAL_STORAGE_KEY,
    initialState,
    reducers: {
        updateLocalCart: (state, action) => {
            const foundProduct = state.products.findIndex(i => i.id === action.payload.id)
            if (foundProduct === -1) state.products.push(action.payload)
            else state.products.splice(foundProduct, 1, action.payload)
        },
        removeCartItems: (state, {payload} : {payload: string[]}) => {
            state.products = state.products.filter(i => payload.includes(i.id || ''))
        },
    }
})

export const { updateLocalCart, removeCartItems } = cartSlice.actions
export default cartSlice.reducer 