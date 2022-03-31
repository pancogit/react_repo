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

interface SelectedOpenedFlags {
    selectedCategory: string | null;
    openedCategories: string[];
    selectedSubcategory: string | null;
    openedSubcategories: string[];
    selectedSubmenu: string | null;
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

        // update selected and opened flags from given strings arrays
        setCategoriesFlags: {
            reducer(state, action: PayloadAction<SelectedOpenedFlags>) {
                // first clear all flags before setting new flags
                clearCategoriesFlags(state);

                state.forEach(category => {
                    // set selected flag for category
                    if (action.payload.selectedCategory === category.path) {
                        category.isSelected = true;
                    }

                    // set opened flags for categories
                    action.payload.openedCategories.forEach(openCategory => {
                        if (openCategory === category.path)
                            category.isOpened = true;
                    });

                    category.subcategories.forEach(subcategory => {
                        // set selected flag for subcategory
                        if (
                            action.payload.selectedSubcategory ===
                            subcategory.path
                        ) {
                            subcategory.isSelected = true;
                        }

                        // set opened flags for subcategories
                        action.payload.openedSubcategories.forEach(
                            openSubcategory => {
                                if (openSubcategory === subcategory.path)
                                    subcategory.isOpened = true;
                            }
                        );

                        // set selected flag for submenu
                        subcategory.submenu.forEach(submenu => {
                            if (
                                action.payload.selectedSubmenu ===
                                subcategory.path + submenu.name.toLowerCase()
                            ) {
                                submenu.isSelected = true;
                            }
                        });
                    });
                });
            },

            // convert string arrays arguments to the payload object with the same fields
            prepare(
                selectedCategory: string | null,
                openedCategories: string[],
                selectedSubcategory: string | null,
                openedSubcategories: string[],
                selectedSubmenu: string | null
            ) {
                return {
                    payload: {
                        selectedCategory,
                        openedCategories,
                        selectedSubcategory,
                        openedSubcategories,
                        selectedSubmenu,
                    },
                };
            },
        },

        // close all categories, subcategories and submenus by clearing all their flags
        closeCategories(state) {
            clearCategoriesFlags(state);
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

function clearCategoriesFlags(state: State) {
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
}

export const categoriesReducer = categoriesSlice.reducer;

export const { setCategories, closeCategories, setCategoriesFlags } =
    categoriesSlice.actions;
