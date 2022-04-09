import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAsyncData } from './asyncData';

export interface Delivery {
    kind: string;
    cost: number;
}

type State = Delivery[];

interface AsyncData {
    delivery: State;
}

export const getDelivery = createAsyncThunk('get-delivery', async () => {
    const data: AsyncData = await getAsyncData('/data/delivery.json');

    return data.delivery;
});

const initialState: State = [];

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(
            getDelivery.fulfilled,
            (state, action: PayloadAction<State>) => {
                return action.payload;
            }
        );
    },
});

export const deliveryReducer = deliverySlice.reducer;
