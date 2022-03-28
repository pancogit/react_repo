import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAsyncData } from './asyncData';
import { Products } from './productsSlice';

interface Category {
    kind: string;
    numberOfProducts: number;
    path: string;
    subcategories: Subcategories;
    isSelected: boolean;
    isOpened: boolean;
}

export type { Category as CategoryType };

interface Subcategory {
    name: string;
    numberOfProducts: number;
    path: string;
    submenu: Submenus;
    isSelected: boolean;
    isOpened: boolean;
}

interface Submenu {
    name: string;
    numberOfProducts: number;
    products: Products;
    isSelected: boolean;
}

export type Subcategories = Subcategory[];
export type Submenus = Submenu[];
type State = Category[];

export type { State as CategoryState };

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
    reducers: {
        setCategories(state, action: PayloadAction<State>) {
            return action.payload;
        },

        // close all categories, subcategories and submenus by clearing all their flags
        closeCategories(state) {
            state.forEach(category => {
                category.isSelected = false;
                category.isOpened = false;

                category.subcategories.forEach(subcategory => {
                    subcategory.isSelected = false;
                    subcategory.isOpened = false;

                    subcategory.submenu.forEach(submenu => {
                        submenu.isSelected = false;
                    });
                });
            });
        },
    },

    extraReducers: builder => {
        builder.addCase(
            getCategories.fulfilled,
            (state, action: PayloadAction<State>) => {
                // set selected and opened fields to false for each category
                action.payload.forEach(category => {
                    category.isSelected = false;
                    category.isOpened = false;

                    // set selected and opened fields to false for each subcategory
                    category.subcategories.forEach(subcategory => {
                        subcategory.isSelected = false;
                        subcategory.isOpened = false;

                        // set selected field to false for each submenu
                        subcategory.submenu.forEach(submenu => {
                            submenu.isSelected = false;
                        });
                    });
                });

                return action.payload;
            }
        );
    },
});

export const categoriesReducer = categoriesSlice.reducer;

export const { setCategories, closeCategories } = categoriesSlice.actions;
