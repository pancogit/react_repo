import { configureStore } from '@reduxjs/toolkit';
import { cartSliceReducer } from '../slices/cartSlice';
import { categoriesReducer } from '../slices/categoriesSlice';
import { deliveryReducer } from '../slices/deliverySlice';
import { productsReducer } from '../slices/productsSlice';
import { shopPageReducer } from '../slices/shopPageSlice';
import { subscribeReducer } from '../slices/subscribeSlice';
import { tagsCloudReducer } from '../slices/tagsCloudSlice';
import { tweetsReducer } from '../slices/tweetsSlice';
import { userReducer } from '../slices/userSlice';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        delivery: deliveryReducer,
        tagsCloud: tagsCloudReducer,
        tweets: tweetsReducer,
        user: userReducer,
        products: productsReducer,
        subscribe: subscribeReducer,
        shopPage: shopPageReducer,
        cart: cartSliceReducer,
    },
});

type StoreStateFunction = typeof store.getState;
export type StoreState = ReturnType<StoreStateFunction>;
export type DispatchType = typeof store.dispatch;

export default store;
