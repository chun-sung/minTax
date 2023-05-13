'use client';
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: { id: null,
            login: false,
            member_panel: false,
            member_consul: false,
            menu: false           
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
        },
        SET_MEMBER_PANEL(state, action) {
            state.user.member_panel = action.payload
        },
        SET_CONSULTING_PANEL(state, action) {
            state.user.member_consul = action.payload
        },
        SET_MENU_BTN(state, action) {
            state.user.menu = action.payload
        }

    }
})

export const { SET_LOGIN, SET_LOGOUT, SET_LOGIN_WINDOW, SET_MEMBER_PANEL,SET_CONSULTING_PANEL, SET_MENU_BTN } = userSlice.actions;
export default userSlice.reducer;

