import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CategoryState,
    Subcategories,
    Submenus,
} from '../slices/categoriesSlice';

import { Products } from '../slices/productsSlice';

import {
    setNumberOfPages,
    setNumberOfResults,
    ShopPageState,
} from '../slices/shopPageSlice';

import { DispatchType, StoreState } from '../store/store';
import Product from './Product';

export default function ProductsList() {
    const allProducts = useSelector<StoreState, CategoryState>(
        state => state.products
    );

    const { numberOfProductsPerPage, currentPage } = useSelector<
        StoreState,
        ShopPageState
    >(state => state.shopPage);

    const [productsLoaded, setProductsLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState<Products>([]);
    const dispatch = useDispatch<DispatchType>();

    let numberOfResults: number | null = null;
    const productsList = productsLoaded ? createProductsList() : [];

    if (allProducts.length) numberOfResults = getNumberOfSearchedResults();

    // create list of products
    function createProductsList() {
        let productsList: JSX.Element[] = [];

        // iterate through all search results of products and create products
        searchResults.forEach((product, index) => {
            productsList.push(
                <Product
                    key={product.id}
                    sale={product.sale}
                    heading={product.name}
                    price={{
                        old: product.price.old,
                        new: product.price.new,
                    }}
                    image={product.path}
                    link={product.link}
                    numberOfStars={product.starsRated}
                />
            );
        });

        return productsList;
    }

    // search for products and set local state with search results
    // memoize function (save reference to the function) to not call it on every render in useEffect hook
    const searchProducts = useCallback(() => {
        let subcategories: Subcategories;
        let submenus: Submenus;
        let products: Products;
        let foundProducts: Products = [];
        let numberOfProducts = 0;
        let skipProducts = false;

        // skip some products if it's not the first page
        let numberOfProductsToSkip =
            currentPage && currentPage > 1
                ? (currentPage - 1) * numberOfProductsPerPage
                : 0;

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
                        if (numberOfProductsToSkip) numberOfProductsToSkip--;
                        else {
                            numberOfProducts++;

                            // save first several products, not all products at once because
                            // pagination is used for more products
                            if (numberOfProducts <= numberOfProductsPerPage) {
                                foundProducts.push(products[l]);
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
        }

        // save search results in local state
        setSearchResults(foundProducts);
    }, [allProducts, numberOfProductsPerPage, currentPage]);

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

    // when page is changed, search for new products for that page
    useEffect(() => {
        if (currentPage) {
            setProductsLoaded(false);
            searchProducts();
            setProductsLoaded(true);
        }
    }, [currentPage, searchProducts]);

    return <div className='shop-page__products'>{productsList}</div>;
}
