import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOptionType } from '../components/SelectList';

interface State {
    numberOfResults?: number;
    numberOfPages?: number;
    currentPage?: number;
    readonly numberOfProductsPerPage: number;
    sortingType: SortOptionType;
    filters: FiltersType;
}

interface FiltersType {
    category: CategoryFilter;
    priceRange: PriceRangeFilter;
}

interface CategoryFilter {
    path: string | null;
    name: string | null;
}

type PriceRangeFilter = [number, number];

const initialState: State = {
    numberOfProductsPerPage: 12,
    sortingType: 'DEFAULT',
    filters: { category: { name: null, path: null }, priceRange: [75, 300] },
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

        setCategoriesFilters: {
            reducer(state, action: PayloadAction<CategoryFilter>) {
                state.filters.category = action.payload;
            },

            // set 2 arguments to the dispatched reducer function instead of payload object
            // get those 2 arguments and insert them into the payload object and then
            // return it to the reducer function "action" argument
            prepare(path: string | null, name: string | null) {
                return { payload: { path, name } };
            },
        },

        setPriceRangeFilters(state, action: PayloadAction<PriceRangeFilter>) {
            state.filters.priceRange = action.payload;
        },
    },
});

export const shopPageReducer = shopPageSlice.reducer;

export const {
    setCurrentPage,
    setNumberOfPages,
    setNumberOfResults,
    setSortingType,
    setCategoriesFilters,
    setPriceRangeFilters,
} = shopPageSlice.actions;
