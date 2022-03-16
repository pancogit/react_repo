import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAsyncData } from './asyncData';
import { Products } from './productsSlice';

interface Category {
    kind: string;
    numberOfProducts: number;
    path: string;
    subcategories: Subcategories;
}

interface Subcategory {
    name: string;
    numberOfProducts: number;
    path: string;
    submenu: Submenus;
}

interface Submenu {
    name: string;
    numberOfProducts: number;
    products: Products;
}

type Subcategories = Subcategory[];
type Submenus = Submenu[];
type State = Category[];

interface AsyncData {
    categories: State;
}

export const getCategories = createAsyncThunk('get-categories', async () => {
    const data: AsyncData = await getAsyncData('/data/categories.json');

    return data.categories;
});

const initialState: State = [];

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(
            getCategories.fulfilled,
            (state, action: PayloadAction<State>) => {
                return action.payload;
            }
        );
    },
});

export const categoriesReducer = categoriesSlice.reducer;
