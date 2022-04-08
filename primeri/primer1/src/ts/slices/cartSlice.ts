import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { Colors } from '../components/ColorSelect';
import { Sizes } from '../components/SizeSelect';
import { ProductType } from './productsSlice';

export interface CartProduct {
    product: ProductType;
    quantity: number;
    color: Colors;
    size: Sizes;
}

export interface CartProductChangePayload<Type> {
    productId: string;
    changer: Type;
}

// create entity adapter for easy products searching via products IDs
// create id selector for product id, it will be key to the entity adapter map
const entityAdapter = createEntityAdapter<CartProduct>({
    selectId: idSelector => idSelector.product.id,
});

const initialState = entityAdapter.getInitialState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartProduct(state, action: PayloadAction<CartProduct>) {
            let productFound = state.entities[action.payload.product.id];

            if (!productFound) {
                entityAdapter.addOne(state, action.payload);
            }
        },

        removeCartProduct(state, action: PayloadAction<string>) {
            entityAdapter.removeOne(state, action.payload);
        },

        removeAllCartProducts(state) {
            entityAdapter.removeAll(state);
        },

        // change quantity for given cart product
        changeCartProductQuantity: {
            reducer(
                state,
                action: PayloadAction<CartProductChangePayload<number>>
            ) {
                const { productId, changer } = action.payload;
                const productFound = state.entities[productId];

                if (productFound) productFound.quantity = changer;
            },

            // add function for creating payload
            prepare(productId: string, changer: number) {
                return { payload: { productId, changer } };
            },
        },

        // change picked color for given cart product
        changeCartProductColor: {
            reducer(
                state,
                action: PayloadAction<CartProductChangePayload<Colors>>
            ) {
                const { productId, changer } = action.payload;
                const productFound = state.entities[productId];

                if (productFound) productFound.color = changer;
            },

            // add function for creating payload
            prepare(productId: string, changer: Colors) {
                return { payload: { productId, changer } };
            },
        },

        // change picked size for given cart product
        changeCartProductSize: {
            reducer(
                state,
                action: PayloadAction<CartProductChangePayload<Sizes>>
            ) {
                const { productId, changer } = action.payload;
                const productFound = state.entities[productId];

                if (productFound) productFound.size = changer;
            },

            // add function for creating payload
            prepare(productId: string, changer: Sizes) {
                return { payload: { productId, changer } };
            },
        },

        // change stars rating for given cart product
        changeCartProductStarsRating: {
            reducer(
                state,
                action: PayloadAction<CartProductChangePayload<number>>
            ) {
                const { productId, changer } = action.payload;
                const productFound = state.entities[productId];

                if (productFound) productFound.product.starsRated = changer;
            },

            // add function for creating payload
            prepare(productId: string, changer: number) {
                return { payload: { productId, changer } };
            },
        },
    },
});

export const cartSliceReducer = cartSlice.reducer;

export const {
    addCartProduct,
    removeCartProduct,
    removeAllCartProducts,
    changeCartProductQuantity,
    changeCartProductColor,
    changeCartProductSize,
    changeCartProductStarsRating,
} = cartSlice.actions;

// export selectors for created entity adapter
export const {
    selectAll: selectAllCartProducts,
    selectById: selectByIdCartProduct,
} = entityAdapter.getSelectors();
