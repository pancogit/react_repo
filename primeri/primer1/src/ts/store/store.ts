import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../slices/categoriesSlice';
import { deliveryReducer } from '../slices/deliverySlice';
import { productsReducer } from '../slices/productsSlice';
import { tagsCloudReducer } from '../slices/tagsCloudSlice';
import { tweetsReducer } from '../slices/tweetsSlice';
import { userReducer } from '../slices/userSlice';

export default configureStore({
    reducer: {
        categories: categoriesReducer,
        delivery: deliveryReducer,
        tagsCloud: tagsCloudReducer,
        tweets: tweetsReducer,
        user: userReducer,
        products: productsReducer,
    },
});
