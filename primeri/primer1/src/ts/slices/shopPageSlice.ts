import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOptionType } from '../components/SelectList';

interface State {
    numberOfResults?: number;
    numberOfPages?: number;
    currentPage?: number;
    readonly numberOfProductsPerPage: number;
    sortingType: SortOptionType;
    filters: FiltersType;
    numberOfTopProducts: number;
}

interface FiltersType {
    category: CategoryFilter;
    priceRange: PriceRangeObject;
}

interface CategoryFilter {
    path: string | null;
    name: string | null;
}

interface PriceRangeObject {
    prices: PriceRangeFilter | null;
    minMaxPrices: PriceRangeFilter;
    defaultPrices: PriceRangeFilter;
    slidersCoordinatesMinimumDifference: number;
}

export type PriceRangeFilter = [number, number];

const initialState: State = {
    numberOfProductsPerPage: 12,
    sortingType: 'DEFAULT',
    filters: {
        category: { name: null, path: null },
        priceRange: {
            prices: null,
            minMaxPrices: [0, 300],
            defaultPrices: [0, 150],
            slidersCoordinatesMinimumDifference: 20,
        },
    },
    numberOfTopProducts: 3,
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
            state.filters.priceRange.prices = action.payload;
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
