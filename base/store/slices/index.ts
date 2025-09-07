import { combineReducers } from "@reduxjs/toolkit";
import sessionReducer from './session.slice'
import orderReducer from './order.slice'
import cartLocalReducer from './cart-local.slice'
import userReducer from './user.slice'


export const rootReducer = combineReducers({
    session: sessionReducer,
    user: userReducer,
    order: orderReducer,
    cartLocal: cartLocalReducer,

})