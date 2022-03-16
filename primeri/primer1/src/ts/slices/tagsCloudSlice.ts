import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAsyncData } from './asyncData';

type State = string[];

interface AsyncData {
    tagsCloud: State;
}

export const getTagsCloud = createAsyncThunk('get-tags-cloud', async () => {
    const data: AsyncData = await getAsyncData('/data/tagsCloud.json');

    return data.tagsCloud;
});

const initialState: State = [];

const tagsCloudSlice = createSlice({
    name: 'tags-cloud',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(
            getTagsCloud.fulfilled,
            (state, action: PayloadAction<State>) => {
                return action.payload;
            }
        );
    },
});

export const tagsCloudReducer = tagsCloudSlice.reducer;
