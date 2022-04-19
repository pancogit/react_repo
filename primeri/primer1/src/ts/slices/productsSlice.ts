import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Color } from '../components/ColorSelect';
import { Size } from '../components/SizeSelect';
import { getAsyncData } from './asyncData';
import { CategoryState } from './categoriesSlice';

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
    reducers: {},

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
