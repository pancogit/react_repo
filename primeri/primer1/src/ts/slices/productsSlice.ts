import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Color } from '../components/ColorSelect';
import { Size } from '../components/SizeSelect';
import { getAsyncData } from './asyncData';
import { CategoryState, Subcategories, Submenus } from './categoriesSlice';

interface Product {
    id: string;
    name: string;
    path: string;
    link: string;
    starsRated: number;
    price: Price;
    sale: boolean;
    text: string;
    colors: Color[];
    sizes: SizesObjectArray;
    productCode: number;
    description: string;
    comments: CommentsObject;
}

export type { Product as ProductType };

interface Price {
    old?: number;
    new: number | [number, number];
}

export interface SizesObject {
    name: Size;
    price: number;
}

export interface CommentsObject {
    numberOfComments: number;
    allComments: AllComments;
}

interface SingleComment {
    author: string;
    text: string;
}

interface StarsRatingPayload {
    productId: string;
    starsRating: number;
}

export type SizesObjectArray = SizesObject[];
type AllComments = SingleComment[];

export type Products = Product[];

interface AsyncData {
    products: CategoryState;
}

export const getProducts = createAsyncThunk('get-products', async () => {
    const data: AsyncData = await getAsyncData('/data/products.json');

    return data.products;
});

const initialState: CategoryState = [];

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProductStarsRating: {
            reducer(state, action: PayloadAction<StarsRatingPayload>) {
                let productFound = false;
                let product: Product;
                let subcategories: Subcategories;
                let submenu: Submenus;
                let products: Products;

                // search through products and when product is found, update stars rating
                for (let i = 0; i < state.length; i++) {
                    if (productFound) break;

                    subcategories = state[i].subcategories;

                    for (let j = 0; j < subcategories.length; j++) {
                        if (productFound) break;

                        submenu = subcategories[j].submenu;

                        for (let k = 0; k < submenu.length; k++) {
                            if (productFound) break;

                            products = submenu[k].products;

                            for (let m = 0; m < products.length; m++) {
                                if (productFound) break;

                                product = products[m];

                                // if product is found, update stars rating and finish the search
                                if (product.id === action.payload.productId) {
                                    product.starsRated =
                                        action.payload.starsRating;

                                    productFound = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            },

            // create payload from function arguments
            prepare(productId: string, starsRating: number) {
                return { payload: { productId, starsRating } };
            },
        },
    },

    extraReducers: builder => {
        builder.addCase(
            getProducts.fulfilled,
            (state, action: PayloadAction<CategoryState>) => {
                return action.payload;
            }
        );
    },
});

export const productsReducer = productsSlice.reducer;
export const { updateProductStarsRating } = productsSlice.actions;
