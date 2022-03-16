import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './ts/components/App';

// fontawesome icons
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './ts/store/store';
import { getCategories } from './ts/slices/categoriesSlice';
import { getDelivery } from './ts/slices/deliverySlice';
import { getTagsCloud } from './ts/slices/tagsCloudSlice';
import { getTweets } from './ts/slices/tweetsSlice';
import { getUser } from './ts/slices/userSlice';
import { getProducts } from './ts/slices/productsSlice';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// dispatch thunks to get server data at the beginning
store.dispatch(getCategories());
store.dispatch(getDelivery());
store.dispatch(getTagsCloud());
store.dispatch(getTweets());
store.dispatch(getUser());
store.dispatch(getProducts());
