import { createSlice } from '@reduxjs/toolkit'
import appApi from '../services/appApi';

const initialState = {}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
        });

        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, (state) => {
            delete state.user;
            delete state.token;
        });
    }
})

export default userSlice.reducer;