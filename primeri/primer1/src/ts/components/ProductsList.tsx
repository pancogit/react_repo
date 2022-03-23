import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CategoryState,
    Subcategories,
    Submenus,
} from '../slices/categoriesSlice';

import { Products } from '../slices/productsSlice';
import { setNumberOfPages, setNumberOfResults } from '../slices/shopPageSlice';
import { DispatchType, StoreState } from '../store/store';
import Product from './Product';

export default function ProductsList() {
    const allProducts = useSelector<StoreState, CategoryState>(
        state => state.products
    );

    const numberOfProductsPerPage = useSelector<StoreState, number>(
        state => state.shopPage.numberOfProductsPerPage
    );

    const dispatch = useDispatch<DispatchType>();

    let numberOfResults: number | null = null;
    const productsList = createList();

    if (allProducts.length) numberOfResults = getNumberOfSearchedResults();

    // create list of products
    function createList() {
        let subcategories: Subcategories,
            submenus: Submenus,
            products: Products;
        let productsList: JSX.Element[] = [];
        let numberOfProducts = 0;
        let skipProducts = false;

        // get number of searched results for products

        // iterate through all categories and subcategories to find products
        for (let i = 0; i < allProducts.length; i++) {
            if (skipProducts) break;

            subcategories = allProducts[i].subcategories;

            for (let j = 0; j < subcategories.length; j++) {
                if (skipProducts) break;

                submenus = subcategories[j].submenu;

                for (let k = 0; k < submenus.length; k++) {
                    if (skipProducts) break;

                    products = submenus[k].products;

                    for (let l = 0; l < products.length; l++) {
                        numberOfProducts++;

                        // show first several products, not all products at once because
                        // pagination is used for more products
                        if (numberOfProducts <= numberOfProductsPerPage) {
                            productsList.push(
                                <Product
                                    key={products[l].id}
                                    sale={products[l].sale}
                                    heading={products[l].name}
                                    price={{
                                        old: products[l].price.old,
                                        new: products[l].price.new,
                                    }}
                                    image={products[l].path}
                                    link={products[l].link}
                                    numberOfStars={products[l].starsRated}
                                />
                            );
                        }
                        // if enough products are loaded, then skip searching for others
                        else {
                            skipProducts = true;
                            break;
                        }
                    }
                }
            }
        }

        return productsList;
    }

    function getNumberOfSearchedResults() {
        let numberOfResults = 0;

        for (let i = 0; i < allProducts.length; i++) {
            numberOfResults += allProducts[i].numberOfProducts;
        }

        return numberOfResults;
    }

    // update number of results and number of pages after component is rendered
    useEffect(() => {
        if (numberOfResults) {
            let numberOfPages = numberOfResults / numberOfProductsPerPage;

            // if it's real number with remainder, then increase number of pages by 1
            if (numberOfPages % 1) {
                numberOfPages = numberOfPages - (numberOfPages % 1) + 1;
            }

            dispatch(setNumberOfResults(numberOfResults));
            dispatch(setNumberOfPages(numberOfPages));
        }
    }, [dispatch, numberOfProductsPerPage, numberOfResults]);

    return <div className='shop-page__products'>{productsList}</div>;
}
