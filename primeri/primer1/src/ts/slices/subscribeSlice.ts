import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    email: string;
}

const initialState: State = { email: '' };

const subscribeSlice = createSlice({
    name: 'subscribe',
    initialState,
    reducers: {
        subscribeUser(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
    },
});

export const subscribeReducer = subscribeSlice.reducer;
export const { subscribeUser } = subscribeSlice.actions;
