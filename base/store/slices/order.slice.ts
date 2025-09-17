import { OrderModel, ProductOrderModel } from "@/base/models/order.model";
import { ORDER_LOCAL_STORAGE_KEY } from "@/base/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

export interface OrderInProcessState {
    status: string;
    totalPrice: number
    customerId: string,
    products: ProductOrderModel[],
    orderCreateInfo?: OrderModel
}
const initialState: OrderInProcessState = {
    status: 'Empty',
    totalPrice: 0,
    customerId: '',
    products: [],
    orderCreateInfo: undefined


}

export const orderSlice = createSlice({
    name: ORDER_LOCAL_STORAGE_KEY,
    initialState,
    reducers: {
        goToOrder: (state, action) => {
            state.status = 'GoToOrder'
            state.totalPrice = action.payload.totalPrice
            state.customerId = action.payload.customerId || ''
            state.products = action.payload.products
        },
        updateProductOrder: (state, {payload} : {payload: ProductOrderModel}) => {
           const foundProduct = state.products.findIndex(i => i.id === payload.id)
            if (foundProduct === -1) state.products.push(payload)
            else state.products.splice(foundProduct, 1, payload)
        },
        updateTotalPriceOrder: (state, {payload} : {payload: number}) => {
            state.totalPrice = payload
        },
        updateStatusOrder: (state, {payload} : {payload: string}) => {
            if (payload === 'Completed') {
                state = initialState
            }

            else state.status = payload
        },
        clearOrder: (state) => {
            state = initialState
        },
        switchLocalToUser: (state, action) => {
            state.customerId = action.payload
        },
        pushInfoCreateOrderLocal: (state, action) => {
            state.orderCreateInfo = action.payload
        },
    }
})

export const { goToOrder, updateStatusOrder,updateTotalPriceOrder,
     updateProductOrder, clearOrder, switchLocalToUser, pushInfoCreateOrderLocal } = orderSlice.actions
export default orderSlice.reducer 