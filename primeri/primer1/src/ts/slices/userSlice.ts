import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAsyncData } from './asyncData';

export interface User {
    username: string;
    email: string;
}

interface AsyncData {
    user: User;
}

export const getUser = createAsyncThunk('get-user', async () => {
    const data: AsyncData = await getAsyncData('/data/user.json');

    return data.user;
});

const initialState: User = { username: '', email: '' };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(
            getUser.fulfilled,
            (state, action: PayloadAction<User>) => {
                return action.payload;
            }
        );
    },
});

export const userReducer = userSlice.reducer;
