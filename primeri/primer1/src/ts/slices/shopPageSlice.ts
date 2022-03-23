import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    numberOfResults?: number;
    numberOfPages?: number;
    currentPage?: number;
    readonly numberOfProductsPerPage: number;
}

const initialState: State = {
    numberOfProductsPerPage: 12,
};

export type { State as ShopPageState };

const shopPageSlice = createSlice({
    name: 'shop-page',
    initialState,
    reducers: {
        setNumberOfResults(state, action: PayloadAction<number>) {
            state.numberOfResults = action.payload;
        },

        setNumberOfPages(state, action: PayloadAction<number>) {
            state.numberOfPages = action.payload;
        },

        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
});

export const shopPageReducer = shopPageSlice.reducer;
export const { setCurrentPage, setNumberOfPages, setNumberOfResults } =
    shopPageSlice.actions;
