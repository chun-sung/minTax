'use client';
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: { id: null ,
            login: false
        } ,
    },
    reducers: {
        SET_LOGIN(state, action) {
            state.user.id = action.payload
            state.user.login = false
        },
        SET_LOGIN_WINDOW(state, action) {
            state.user.login = action.payload
        },
        SET_LOGOUT(state, action) {
            state.user.id = action.payload
            state.user.login = false
        }
    }
})

export const { SET_LOGIN, SET_LOGOUT, SET_LOGIN_WINDOW } = userSlice.actions;
export default userSlice.reducer;

