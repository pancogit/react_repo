import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CategoryState,
    Subcategories,
    Submenus,
} from '../slices/categoriesSlice';

import { Products, ProductType } from '../slices/productsSlice';

import {
    setNumberOfPages,
    setNumberOfResults,
    ShopPageState,
} from '../slices/shopPageSlice';

import { DispatchType, StoreState } from '../store/store';
import Product from './Product';
import { SortOptionType } from './SelectList';

type SortDirection = 'ASCENDING' | 'DESCENDING';

export default function ProductsList() {
    const allProducts = useSelector<StoreState, CategoryState>(
        state => state.products
    );

    const { numberOfProductsPerPage, currentPage } = useSelector<
        StoreState,
        ShopPageState
    >(state => state.shopPage);

    // how to sort products
    const sortingType = useSelector<StoreState, SortOptionType>(
        state => state.shopPage.sortingType
    );

    // save sorted products in the local state
    const [sortedProducts, setSortedProducts] = useState<Products | null>(null);

    const [productsLoaded, setProductsLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState<Products>([]);
    const dispatch = useDispatch<DispatchType>();

    let numberOfResults: number | null = null;
    const productsList = getProductsElements();

    if (allProducts.length) numberOfResults = getNumberOfSearchedResults();

    // get products elements by sorting, filtering and other methods
    function getProductsElements() {
        let products: JSX.Element[] = [];

        if (productsLoaded) products = createProductsList(searchResults);

        // use sorted products only if it's not default sorting
        if (sortedProducts !== null && sortingType !== 'DEFAULT') {
            let productsPerPage = getSortedProductsPerPage(sortedProducts);
            products = createProductsList(productsPerPage);
        }

        return products;
    }

    // create list of products
    function createProductsList(products: Products) {
        let productsList: JSX.Element[] = [];

        // iterate through all search results of products and create products
        products.forEach(product => {
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

    function getSortedProductsPerPage(products: Products) {
        let productsPerPage: Products = [];
        let numberOfProducts = 0;

        // skip some products if it's not the first page
        let numberOfProductsToSkip =
            currentPage && currentPage > 1
                ? (currentPage - 1) * numberOfProductsPerPage
                : 0;

        // iterate through all products
        for (let i = 0; i < products.length; i++) {
            if (numberOfProductsToSkip) numberOfProductsToSkip--;
            else {
                numberOfProducts++;

                // save first several products, not all products at once because
                // pagination is used for more products
                if (numberOfProducts <= numberOfProductsPerPage) {
                    productsPerPage.push(products[i]);
                }
            }
        }

        return productsPerPage;
    }

    const sortProductsByType = useCallback(
        (sortingType: SortOptionType, products: Products) => {
            switch (sortingType) {
                case 'NAME_ASCENDING': {
                    sortByName(products, 'ASCENDING');
                    break;
                }

                case 'NAME_DESCENDING': {
                    sortByName(products, 'DESCENDING');
                    break;
                }

                case 'PRICE_ASCENDING': {
                    sortByPrice(products, 'ASCENDING');
                    break;
                }

                case 'PRICE_DESCENDING': {
                    sortByPrice(products, 'DESCENDING');
                    break;
                }

                case 'QUALITY_ASCENDING': {
                    sortByQuality(products, 'ASCENDING');
                    break;
                }

                case 'QUALITY_DESCENDING': {
                    sortByQuality(products, 'DESCENDING');
                    break;
                }

                case 'DEFAULT':
                default:
                    break;
            }
        },
        []
    );

    // sort products in the various ways
    const sortProducts = useCallback(() => {
        let subcategories: Subcategories;
        let submenus: Submenus;
        let products: Products;
        let sortedProducts: Products = [];

        // iterate through all categories and subcategories to find products
        for (let i = 0; i < allProducts.length; i++) {
            subcategories = allProducts[i].subcategories;

            for (let j = 0; j < subcategories.length; j++) {
                submenus = subcategories[j].submenu;

                for (let k = 0; k < submenus.length; k++) {
                    products = submenus[k].products;

                    for (let l = 0; l < products.length; l++) {
                        sortedProducts.push(products[l]);
                    }
                }
            }
        }

        // sort products and set in local state
        sortProductsByType(sortingType, sortedProducts);
        setSortedProducts(sortedProducts);
    }, [allProducts, sortProductsByType, sortingType]);

    function sortByName(products: Products, direction: SortDirection) {
        let tempProduct: ProductType;

        // compare the names and swap products when needed
        for (let i = 0; i < products.length - 1; i++) {
            for (let j = i + 1; j < products.length; j++) {
                if (
                    (direction === 'ASCENDING' &&
                        products[i].name.localeCompare(products[j].name) ===
                            1) ||
                    (direction === 'DESCENDING' &&
                        products[i].name.localeCompare(products[j].name) === -1)
                ) {
                    tempProduct = products[i];
                    products[i] = products[j];
                    products[j] = tempProduct;
                }
            }
        }
    }

    function sortByPrice(products: Products, direction: SortDirection) {
        let tempProduct: ProductType;
        let firstPriceArray: Array<number>, secondPriceArray: Array<number>;
        let firstPriceValue: number, secondPriceValue: number;

        // compare the prices and swap products when needed
        for (let i = 0; i < products.length - 1; i++) {
            for (let j = i + 1; j < products.length; j++) {
                firstPriceArray = products[i].price.new as Array<number>;
                secondPriceArray = products[j].price.new as Array<number>;

                // if price is given as array, then compare with higher price value
                // otherwise compare with single price value
                firstPriceValue = firstPriceArray[1]
                    ? firstPriceArray[1]
                    : (products[i].price.new as number);
                secondPriceValue = secondPriceArray[1]
                    ? secondPriceArray[1]
                    : (products[j].price.new as number);

                if (
                    (direction === 'ASCENDING' &&
                        firstPriceValue > secondPriceValue) ||
                    (direction === 'DESCENDING' &&
                        firstPriceValue < secondPriceValue)
                ) {
                    tempProduct = products[i];
                    products[i] = products[j];
                    products[j] = tempProduct;
                }
            }
        }
    }

    function sortByQuality(products: Products, direction: SortDirection) {
        let tempProduct: ProductType;

        // compare the rated stars and swap products when needed
        for (let i = 0; i < products.length - 1; i++) {
            for (let j = i + 1; j < products.length; j++) {
                if (
                    (direction === 'ASCENDING' &&
                        products[i].starsRated > products[j].starsRated) ||
                    (direction === 'DESCENDING' &&
                        products[i].starsRated < products[j].starsRated)
                ) {
                    tempProduct = products[i];
                    products[i] = products[j];
                    products[j] = tempProduct;
                }
            }
        }
    }

    // sort products when type of sorting is changed
    useEffect(() => {
        sortProducts();
    }, [sortingType, sortProducts]);

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
