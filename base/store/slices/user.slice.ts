import { CartItemModel } from "@/base/models/cart.model";
import { UserModel } from "@/base/models/user.model";
import { CART_LOCAL_STORAGE_KEY } from "@/base/utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import { getUserSessionThunk } from "../thunks/user.thunk";

export interface UserState {
    loading: boolean,
    item: UserModel,
}
const initialState: UserState = {
    loading: false, 
    item: {id: '', fullName: ''}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      clearUser: (state) => {
                  state = initialState
              },
    },
     extraReducers(builder) {
         builder
      .addCase(getUserSessionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserSessionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(getUserSessionThunk.rejected, (state, action) => {
        state.loading = false;
      })
    },
})

export const { clearUser } = userSlice.actions
export default userSlice.reducer 