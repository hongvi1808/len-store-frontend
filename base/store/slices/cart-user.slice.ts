import { CartItemModel } from "@/base/models/cart.model";
import { CART_LOCAL_STORAGE_KEY } from "@/base/utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import { getCountCartThunk, getListCartThunk } from "../thunks/cart.thunk";

export interface CartUserState {
    products: CartItemModel[],
    count: number;
    page: number;
    limit: number;
    total: number
    totalPage: number,
    loading: boolean
}
const initialState: CartUserState = {
    products: [],
    count:0,
    page:0,
    limit:10,
    total:0,
    totalPage:0,
    loading: false,
}

export const cartSlice = createSlice({
    name: 'cartUser',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
        .addCase(getCountCartThunk.pending, (state) => {
                state.loading = true;
              })
        .addCase(getCountCartThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload
              })
        .addCase(getCountCartThunk.rejected, (state, action) => {
                state.loading = false;
              })
              
        .addCase(getListCartThunk.pending, (state) => {
                state.loading = true;
              })
        .addCase(getListCartThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.items
                state.page = action.payload.page
                state.limit = action.payload.limit
                state.total = action.payload.total
                state.totalPage = action.payload.totalPage
              })
        .addCase(getListCartThunk.rejected, (state, action) => {
                state.loading = false;
              })
    },
})

export const {  } = cartSlice.actions
export default cartSlice.reducer 