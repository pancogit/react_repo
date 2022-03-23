import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Colors } from '../components/ColorSelect';
import { Sizes } from '../components/SizeSelect';
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
    colors: Colors;
    sizes: SizesObjectArray;
    productCode: number;
    description: string;
    comments: CommentsObject;
}

interface Price {
    old?: number;
    new: number | [number, number];
}

interface SizesObject {
    name: Sizes;
    price: number;
}

interface CommentsObject {
    numberOfComments: number;
    allComments: AllComments;
}

interface SingleComment {
    author: string;
    text: string;
}

type SizesObjectArray = SizesObject[];
type AllComments = SingleComment;

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
