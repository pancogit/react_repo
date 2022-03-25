import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOptionType } from '../components/SelectList';

interface State {
    numberOfResults?: number;
    numberOfPages?: number;
    currentPage?: number;
    readonly numberOfProductsPerPage: number;
    sortingType: SortOptionType;
}

const initialState: State = {
    numberOfProductsPerPage: 12,
    sortingType: 'DEFAULT',
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

        setSortingType(state, action: PayloadAction<SortOptionType>) {
            state.sortingType = action.payload;
        },
    },
});

export const shopPageReducer = shopPageSlice.reducer;

export const {
    setCurrentPage,
    setNumberOfPages,
    setNumberOfResults,
    setSortingType,
} = shopPageSlice.actions;
