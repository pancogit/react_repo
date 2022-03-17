import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAsyncData } from './asyncData';

export interface Tweet {
    text: string;
    link: string;
    date: DateTweet;
}

interface DateTweet {
    month: number;
    day: number;
    year: number;
    time: TimeTweet;
}

export interface TimeTweet {
    hour: number;
    minute: number;
    meridiem: Meridiem;
}

type Meridiem = 'am' | 'pm';

type State = Tweet[];

export type { State as TweetsState };

interface AsyncData {
    tweets: State;
}

export const getTweets = createAsyncThunk('get-tweets', async () => {
    const data: AsyncData = await getAsyncData('/data/tweets.json');

    return data.tweets;
});

const initialState: State = [];

const tweetsSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(
            getTweets.fulfilled,
            (state, action: PayloadAction<State>) => {
                return action.payload;
            }
        );
    },
});

export const tweetsReducer = tweetsSlice.reducer;
