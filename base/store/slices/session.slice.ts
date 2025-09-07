import { ListData } from "@/base/models/common.model";
import { SessionModel } from "@/base/models/session.model";
import { ROLE_CUSTOMER, SESSION_LOCAL_STORAGE_KEY } from "@/base/utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import { getUserSessionThunk } from "../thunks/user.thunk";

const emptySession =  {accessToken: '', expiredAt: 0, userId: '', role:  ROLE_CUSTOMER}
export interface SessionState {
    loading: boolean,
    user: SessionModel;
    loggedIn: boolean
}
const initialState: SessionState = {
    loading: false,
    user: emptySession,
    loggedIn: false


}

export const sessionSlice = createSlice({
    name: SESSION_LOCAL_STORAGE_KEY,
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.loggedIn = true
            state.user = action.payload
        },
        clearSession: (state) => {
            state.loggedIn = false
            state.user = emptySession
        },
    },
   
})

export const {setSession, clearSession} = sessionSlice.actions
export default sessionSlice.reducer 