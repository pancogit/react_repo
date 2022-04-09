import {
    createEntityAdapter,
    createSlice,
    EntityState,
    PayloadAction,
} from '@reduxjs/toolkit';

import { WritableDraft } from 'immer/dist/internal';

import { Colors } from '../components/ColorSelect';
import { Sizes } from '../components/SizeSelect';
import { Delivery } from './deliverySlice';
import { ProductType } from './productsSlice';

export interface CartProduct {
    product: ProductType;
    quantity: number;
    color: Colors;
    size: Sizes;
    price: number;
}

export interface CartProductChangePayload<Type> {
    productId: string;
    changer: Type;
}

interface State {
    cartProductsEntityAdapter: EntityState<CartProduct>;
    totalPrice: number;
    delivery?: Delivery;
}

export type { State as CartState };

// create entity adapter for easy products searching via products IDs
// create id selector for product id, it will be key to the entity adapter map
const entityAdapter = createEntityAdapter<CartProduct>({
    selectId: idSelector => idSelector.product.id,
});

const entityAdapterState = entityAdapter.getInitialState();

const initialState: State = {
    totalPrice: 0,
    cartProductsEntityAdapter: entityAdapterState,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartProduct(state, action: PayloadAction<CartProduct>) {
            let productFound =
                state.cartProductsEntityAdapter.entities[
                    action.payload.product.id
                ];

            if (!productFound) {
                entityAdapter.addOne(
                    state.cartProductsEntityAdapter,
                    action.payload
                );

                updateTotalPrice(state);
            }
        },

        removeCartProduct(state, action: PayloadAction<string>) {
            entityAdapter.removeOne(
                state.cartProductsEntityAdapter,
                action.payload
            );

            updateTotalPrice(state);
        },

        removeAllCartProducts(state) {
            entityAdapter.removeAll(state.cartProductsEntityAdapter);

            updateTotalPrice(state);
        },

        // change quantity for given cart product
        changeCartProductQuantity: {
            reducer(
                state,
                action: PayloadAction<CartProductChangePayload<number>>
            ) {
                const { productId, changer } = action.payload;
                const productFound =
                    state.cartProductsEntityAdapter.entities[productId];

                if (productFound) {
                    productFound.quantity = changer;

                    updateTotalPrice(state);
                }
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
                const productFound =
                    state.cartProductsEntityAdapter.entities[productId];

                if (productFound) {
                    productFound.color = changer;

                    updateTotalPrice(state);
                }
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
                const productFound =
                    state.cartProductsEntityAdapter.entities[productId];

                if (productFound) {
                    productFound.size = changer;

                    updateTotalPrice(state);
                }
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
                const productFound =
                    state.cartProductsEntityAdapter.entities[productId];

                if (productFound) {
                    productFound.product.starsRated = changer;

                    updateTotalPrice(state);
                }
            },

            // add function for creating payload
            prepare(productId: string, changer: number) {
                return { payload: { productId, changer } };
            },
        },
    },
});

// when products are added / removed / modified, etc, then update total price for cart products
function updateTotalPrice(state: WritableDraft<State>) {
    let totalPrice = 0;
    const allProducts = selectAllCartProducts(state.cartProductsEntityAdapter);

    allProducts.forEach(product => {
        totalPrice += product.price * product.quantity;
    });

    state.totalPrice = totalPrice;
}

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
