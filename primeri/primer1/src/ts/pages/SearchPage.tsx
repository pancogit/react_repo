import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { getNumberOfPages } from '../components/ProductsList';
import QueryResult from '../components/QueryResult';

import {
    CategoryState,
    Subcategories,
    Submenus,
} from '../slices/categoriesSlice';

import { Products } from '../slices/productsSlice';

import {
    setCurrentPage,
    setNumberOfPages,
    setNumberOfResults,
} from '../slices/shopPageSlice';

import { DispatchType, StoreState } from '../store/store';

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [resultsQueryString, setResultsQueryString] = useState('');
    const pageQueryStringRef = useRef<number>();

    const allProducts = useSelector<StoreState, CategoryState>(
        state => state.products
    );

    const numberOfProductsPerPage = useSelector<StoreState, number>(
        state => state.shopPage.numberOfProductsPerPage
    );

    const currentPage = useSelector<StoreState, number | undefined>(
        state => state.shopPage.currentPage
    );

    const numberOfPages = useSelector<StoreState, number | undefined>(
        state => state.shopPage.numberOfPages
    );

    const [searchedProducts, setSearchedProducts] = useState<Products>([]);
    const [noSearchResults, setNoSearchResults] = useState(false);

    const dispatch = useDispatch<DispatchType>();

    const [searchedProductsPerPage, setSearchedProductsPerPage] =
        useState<Products>([]);

    // parse all query strings from url or just given query string
    const parseQueryStrings = useCallback(
        (urlString: string, parseAll = false) => {
            const entries = searchParams.entries();

            let entry;
            let queryStrings = '';

            while (true) {
                entry = entries.next();

                // if there are no more entries, then remove last comma and space signs
                if (entry.done) {
                    queryStrings = queryStrings.slice(
                        0,
                        queryStrings.length - 2
                    );
                    break;
                }

                // parse all query strings
                if (parseAll) {
                    queryStrings +=
                        entry.value[0] + ' = ' + entry.value[1] + ', ';
                }
                // or get just "result" query string
                else {
                    if (entry.value[0] === urlString) {
                        queryStrings = entry.value[1];
                        break;
                    }
                }
            }

            return queryStrings;
        },
        [searchParams]
    );

    // parse query strings and set it to the local state
    useEffect(() => {
        let resultsQueryString = parseQueryStrings('result');
        let pageQueryString = parseQueryStrings('page');
        let page = Number(pageQueryString);

        // if page is not good, then remove query string for page
        if (isNaN(page)) {
            searchParams.delete('page');
            setSearchParams(searchParams);
        }

        // if page is out of boundaries, then set it to the first min / max number
        // if page is correct, set it to the url query string, ref and
        // dispatch it to the store
        else {
            if (pageQueryString !== '' && numberOfPages) {
                if (page > numberOfPages) page = numberOfPages;
                else if (page < 1) page = 1;

                searchParams.set('page', page.toString());
                setSearchParams(searchParams);

                if (!pageQueryStringRef.current) dispatch(setCurrentPage(page));

                pageQueryStringRef.current = page;
            }
        }

        setResultsQueryString(resultsQueryString);
    }, [
        parseQueryStrings,
        numberOfPages,
        searchParams,
        setSearchParams,
        dispatch,
    ]);

    // find products for search query string
    const findProductsQueryString = useCallback(() => {
        let subcategories: Subcategories;
        let submenus: Submenus;
        let products: Products;
        let productName: string;
        let productsFound: Products = [];

        for (let i = 0; i < allProducts.length; i++) {
            subcategories = allProducts[i].subcategories;

            for (let j = 0; j < subcategories.length; j++) {
                submenus = subcategories[j].submenu;

                for (let k = 0; k < submenus.length; k++) {
                    products = submenus[k].products;

                    // compare products with case insensitive letters
                    for (let m = 0; m < products.length; m++) {
                        productName = products[m].name.toLocaleLowerCase();

                        // look if current product name contains query string or if it's the same
                        if (
                            productName === resultsQueryString ||
                            productName.includes(resultsQueryString)
                        ) {
                            productsFound.push(products[m]);
                        }
                    }
                }
            }
        }

        return productsFound;
    }, [allProducts, resultsQueryString]);

    // search for products for given search and set results to the state
    // also dispatch number of results and pages to the store
    useEffect(() => {
        const products = findProductsQueryString();
        let numberOfPages: number;

        let noResultsFound =
            !products.length && allProducts.length ? true : false;

        setSearchedProducts(products);
        setNoSearchResults(noResultsFound);

        // if there are no search results, then remove query string for page
        if (noResultsFound) {
            searchParams.delete('page');
            setSearchParams(searchParams);
        }

        numberOfPages = getNumberOfPages(
            products.length,
            numberOfProductsPerPage
        );

        dispatch(setNumberOfResults(products.length));
        dispatch(setNumberOfPages(numberOfPages));

        // if page is not set, then dispatch first page
        if (!pageQueryStringRef.current) dispatch(setCurrentPage(1));
    }, [
        findProductsQueryString,
        allProducts.length,
        dispatch,
        numberOfProductsPerPage,
        searchParams,
        setSearchParams,
    ]);

    // set products for current page number
    useEffect(() => {
        let products: Products = [];

        if (currentPage) {
            let firstProduct = (currentPage - 1) * numberOfProductsPerPage;
            let numberOfProducts = 0;

            for (let i = firstProduct; i < searchedProducts.length; i++) {
                if (numberOfProducts < numberOfProductsPerPage) {
                    products.push(searchedProducts[i]);
                    numberOfProducts++;
                } else {
                    break;
                }
            }
        }

        setSearchedProductsPerPage(products);
    }, [currentPage, numberOfProductsPerPage, searchedProducts]);

    return (
        <div className='search-page'>
            <h2 className='search-page__heading main__heading'>
                Search results for <q>{resultsQueryString}</q>
            </h2>
            <div className='search-page__queries'>
                {noSearchResults ? (
                    <p className='search-page__message'>
                        Sorry, no search results found . . .
                    </p>
                ) : (
                    <>
                        {searchedProductsPerPage.map(product => (
                            <QueryResult key={product.id} product={product} />
                        ))}
                    </>
                )}
            </div>
            {!noSearchResults && (
                <div className='search-page__pagination'>
                    <Pagination />
                </div>
            )}
        </div>
    );
}
