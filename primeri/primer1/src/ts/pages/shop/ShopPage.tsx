import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Cart from '../../components/Cart';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import ProductsList from '../../components/ProductsList';
import Search, { searchProductsWithName } from '../../components/Search';
import SelectList, { SortOptionType } from '../../components/SelectList';
import TagsCloud from '../../components/TagsCloud';
import TopProducts from '../../components/TopProducts';

import {
    CategoryState,
    closeCategories,
    setCategoriesFlags,
} from '../../slices/categoriesSlice';

import {
    clearAllFilters,
    clearSearchedProducts,
    clearSortingType,
    PriceRangeFilter,
    setCategoriesFilters,
    setCurrentPage,
    setPriceRangeFilters,
    setSearchedProducts,
    setSortingType,
    ShopPageState,
} from '../../slices/shopPageSlice';

import { DispatchType, StoreState } from '../../store/store';

export default function ShopPage() {
    const { numberOfPages, currentPage, numberOfResults, numberOfTopProducts } =
        useSelector<StoreState, ShopPageState>(state => state.shopPage);

    const categories = useSelector<StoreState, CategoryState>(
        state => state.categories
    );

    const allProducts = useSelector<StoreState, CategoryState>(
        state => state.products
    );

    // query string for search results
    const searchQueryString = useRef<string>('');

    // query strings for categories / prices must be set only once during page reload
    // or when it's returned back from another page to the shop page
    const queryStringsCategoriesSet = useRef(false);
    const queryStringsPricesSet = useRef(false);

    const dispatch = useDispatch<DispatchType>();
    const [searchParams, setSearchParams] = useSearchParams();

    // aside part of page and hamburger menu for them
    const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
    const hamburgerAsideRef = useRef<HTMLElement | null>(null);
    const hamburgerIconRef = useRef<HTMLElement | null>(null);

    // last type of sorting read from query string
    const [sortType, setSortType] = useState<SortOptionType | null>(null);

    // minimum and maximum predefined price for sliders
    const minMaxDefinedPrices = useSelector<StoreState, PriceRangeFilter>(
        state => state.shopPage.filters.priceRange.minMaxPrices
    );

    // minimum predefined difference between left and right slider
    const slidersCoordinatesMinimumDifference = useSelector<StoreState, number>(
        state =>
            state.shopPage.filters.priceRange
                .slidersCoordinatesMinimumDifference
    );

    let showingResults =
        numberOfPages &&
        numberOfResults &&
        currentPage &&
        currentPage <= numberOfPages
            ? `Showing ${currentPage}-${numberOfPages} of ${numberOfResults} results`
            : '';

    const hamburgerMenuClass = hamburgerMenuActive
        ? 'shop-page__aside shop-page__aside--hamburger-menu'
        : 'shop-page__aside';

    // set current page to the first if shop page is mounted and query
    // string for page is not specified
    // if query string for page is set, then read current page from url and dispatch it
    useEffect(() => {
        const pageNumberString = searchParams.get('page');
        let pageNumber = 1;
        let page = 1;

        if (pageNumberString) pageNumber = Number(pageNumberString);
        if (pageNumber && !isNaN(pageNumber)) page = pageNumber;

        // don't do anything if number of pages is not dispatched initially
        if (!numberOfPages) return;

        if (page < 1) page = 1;
        else if (numberOfPages && page > numberOfPages) page = numberOfPages;

        // dispatch current page and set search parameter for page
        if (currentPage !== page) {
            dispatch(setCurrentPage(page));

            if (pageNumberString !== null) {
                searchParams.set('page', page.toString());
                setSearchParams(searchParams, { replace: true });
            }
        }
    }, [dispatch, searchParams, setSearchParams, numberOfPages, currentPage]);

    // read sorting type from query string and dispatch it to the store
    useEffect(() => {
        let queryString = searchParams.get('sorting');
        let sortingType: SortOptionType;

        if (queryString !== null) {
            sortingType = queryString.toUpperCase() as SortOptionType;

            // dispatch just known types
            if (
                sortingType === 'NAME_ASCENDING' ||
                sortingType === 'NAME_DESCENDING' ||
                sortingType === 'PRICE_ASCENDING' ||
                sortingType === 'PRICE_DESCENDING' ||
                sortingType === 'QUALITY_ASCENDING' ||
                sortingType === 'QUALITY_DESCENDING'
            ) {
                // dispatch sorting type only if it's not already updated with the same value
                if (sortingType !== sortType) {
                    dispatch(setSortingType(sortingType));

                    // remember last sorting type for the next update to skip
                    // update if it's already updated
                    setSortType(sortingType);
                }
            }
            // remove not existing sorting types from url
            else {
                searchParams.delete('sorting');
                setSearchParams(searchParams);
            }
        }
    }, [dispatch, searchParams, setSearchParams, sortType]);

    // split query strings separated by comma (,)
    const splitQueryStrings = useCallback((queryStrings: string[]) => {
        let queryStringsArray: string[] = [];

        queryStrings.forEach(query => {
            let tokens = query.split(',');
            queryStringsArray.push(...tokens);
        });

        return queryStringsArray;
    }, []);

    // extract categories filter name and path from query strings using
    // selected category, subcategory or submenu and dispatch it to the store
    const dispatchCategoriesFilter = useCallback(
        (
            selectedCategory: string | null,
            selectedSubcategory: string | null,
            selectedSubmenu: string | null
        ) => {
            if (selectedCategory || selectedSubcategory || selectedSubmenu) {
                let selectedMenu: string = '';

                // find which links is selected
                if (selectedCategory) selectedMenu = selectedCategory;
                else if (selectedSubcategory)
                    selectedMenu = selectedSubcategory;
                else if (selectedSubmenu) selectedMenu = selectedSubmenu;

                let categoriesFilterName = '';
                let categoriesFilterPath = '/';
                let splitted = selectedMenu.split('/');
                let tokens: string[] = [];

                // remove whitespaces from tokens
                splitted.forEach(split => {
                    if (split !== '') tokens.push(split);
                });

                // get categories filter name and path
                tokens.forEach((token, index) => {
                    // if it's not last token, then build filter path
                    if (index < tokens.length - 1) {
                        categoriesFilterPath += `${token}/`;
                    }

                    // it's last token, then set filter capitalize name for each word
                    else {
                        // split words with whitespaces and capitalize each word
                        token.split(/\s+/).forEach((word, index, array) => {
                            categoriesFilterName +=
                                word[0].toUpperCase() + word.slice(1);

                            // if it's not last word, then add one whitespace to separate words
                            if (index !== array.length - 1)
                                categoriesFilterName += ' ';
                        });
                    }
                });

                // dispatch shop page filters for categories
                dispatch(
                    setCategoriesFilters(
                        categoriesFilterPath,
                        categoriesFilterName
                    )
                );

                return;
            }
        },
        [dispatch]
    );

    // read category filters from query strings and dispatch it to the store
    // to update selected and opened flags for store categories slice
    useEffect(() => {
        // set query strings for categories only once when page component is
        // mounted and when categories exist in the store
        if (categories.length && !queryStringsCategoriesSet.current) {
            queryStringsCategoriesSet.current = true;

            // read query strings from url
            let selectedCategory = searchParams.get('selected-categories');
            let openedCategories = searchParams.getAll('opened-categories');
            let selectedSubcategory = searchParams.get(
                'selected-subcategories'
            );
            let openedSubcategories = searchParams.getAll(
                'opened-subcategories'
            );
            let selectedSubmenu = searchParams.get('selected-submenus');

            // split query strings from array if they exist
            let openedCategoriesArray = splitQueryStrings(openedCategories);
            let openedSubcategoriesArray =
                splitQueryStrings(openedSubcategories);

            // dispatch selected and opened flags for category filters
            dispatch(
                setCategoriesFlags(
                    selectedCategory,
                    openedCategoriesArray,
                    selectedSubcategory,
                    openedSubcategoriesArray,
                    selectedSubmenu
                )
            );

            dispatchCategoriesFilter(
                selectedCategory,
                selectedSubcategory,
                selectedSubmenu
            );
        }
    }, [
        categories,
        splitQueryStrings,
        dispatch,
        searchParams,
        dispatchCategoriesFilter,
    ]);

    // read prices filters from query strings and dispatch it to the store
    // when shop page is reloaded or returned back to the shop page from another page
    useEffect(() => {
        const pricesFilter = searchParams.get('prices');

        if (pricesFilter && !queryStringsPricesSet.current) {
            let tokens = pricesFilter.split(',');
            let removePricesFromUrl = false;

            queryStringsPricesSet.current = true;

            // if there are two price values, then see if they are numbers and in scope
            // of predefined prices and dispatch it to the global store,
            // otherwise remove it from query string
            if (tokens.length === 2) {
                let minimumPrice = Number(tokens[0]);
                let maximumPrice = Number(tokens[1]);
                let pricesDifference = maximumPrice - minimumPrice;

                if (
                    !isNaN(minimumPrice) &&
                    !isNaN(maximumPrice) &&
                    minimumPrice >= minMaxDefinedPrices[0] &&
                    maximumPrice >= minMaxDefinedPrices[0] &&
                    maximumPrice <= minMaxDefinedPrices[1] &&
                    pricesDifference >= slidersCoordinatesMinimumDifference
                ) {
                    dispatch(
                        setPriceRangeFilters([minimumPrice, maximumPrice])
                    );
                } else removePricesFromUrl = true;
            }
            // there are no two prices, remove it from query string
            else removePricesFromUrl = true;

            if (removePricesFromUrl) {
                searchParams.delete('prices');
                setSearchParams(searchParams);
            }
        }
    }, [
        dispatch,
        searchParams,
        setSearchParams,
        minMaxDefinedPrices,
        slidersCoordinatesMinimumDifference,
    ]);

    function hamburgerMenuClicked() {
        setHamburgerMenuActive(!hamburgerMenuActive);
    }

    function closeHamburgerMenu() {
        setHamburgerMenuActive(false);
    }

    // when shop page is leaved and component unmounted, then clear all categories,
    // subcategories and submenus flags because menu for filters should be cleared
    // when shop page is leaved
    // also clear all filters and search results when page is leaved
    useEffect(() => {
        return () => {
            dispatch(closeCategories());
            dispatch(clearAllFilters());
            dispatch(clearSearchedProducts());
        };
    }, [dispatch]);

    // close aside hamburger menu when escape is pressed on keyboard
    useEffect(() => {
        function keyIsPressed(event: KeyboardEvent) {
            if (event.key === 'Escape') closeHamburgerMenu();
        }

        window.addEventListener('keydown', keyIsPressed);

        return () => window.removeEventListener('keydown', keyIsPressed);
    }, []);

    // close aside hamburger menu when it's clicked outside of aside component
    useEffect(() => {
        function windowIsClicked(event: MouseEvent) {
            const eventPath = event.composedPath();
            let node: Node;
            let asideMenuFound = false;

            for (let i = 0; i < eventPath.length; i++) {
                node = eventPath[i] as Node;

                // look when it's clicked on aside component or on hamburger menu icon
                // in that case, don't close aside component
                if (
                    hamburgerAsideRef.current &&
                    hamburgerIconRef.current &&
                    (node === hamburgerAsideRef.current ||
                        node === hamburgerIconRef.current)
                ) {
                    asideMenuFound = true;
                    break;
                }
            }

            // if there is no aside component along to the root dom element,
            // then it's clicked outside of aside component and close the hamburger menu
            if (!asideMenuFound) closeHamburgerMenu();
        }

        window.addEventListener('click', windowIsClicked);

        return () => window.removeEventListener('click', windowIsClicked);
    }, []);

    // detect search results in query string when component is mounted and search for products
    // also remove other filters from query strings and also clear them all
    // because search results and filters are exclusive, only one can be applied
    useEffect(() => {
        const searchResults = searchParams.get('search');

        // remove all query strings for filters if search results are used
        // also clear all filters from the global store and dispatch search results
        if (
            searchResults !== null &&
            searchResults !== searchQueryString.current &&
            allProducts.length
        ) {
            // remember last query string for search results
            searchQueryString.current = searchResults;

            searchParams.delete('sorting');
            searchParams.delete('prices');
            searchParams.delete('selected-categories');
            searchParams.delete('opened-categories');
            searchParams.delete('selected-subcategories');
            searchParams.delete('opened-subcategories');
            searchParams.delete('selected-submenus');

            setSearchParams(searchParams);

            dispatch(clearSearchedProducts());
            dispatch(closeCategories());
            dispatch(clearAllFilters());
            dispatch(clearSortingType());

            // search for products and dispatch it to the global store
            const allSearchedProducts = searchProductsWithName(
                searchResults,
                allProducts
            );

            dispatch(setSearchedProducts(allSearchedProducts));
        }
    }, [searchParams, setSearchParams, dispatch, allProducts]);

    return (
        <div className='shop-page'>
            <i
                className='fa-solid fa-bars shop-page__hamburger-menu'
                onClick={hamburgerMenuClicked}
                ref={hamburgerIconRef}
            ></i>
            <aside className={hamburgerMenuClass} ref={hamburgerAsideRef}>
                <Search closeHamburgerMenu={closeHamburgerMenu} />
                <Cart />
                <Filter closeHamburgerMenu={closeHamburgerMenu} />
                <TopProducts numberOfTopProducts={numberOfTopProducts} />
                <TagsCloud />
            </aside>

            <div className='shop-page__content'>
                <div className='shop-page__header'>
                    <h2 className='shop-page__heading main__heading'>
                        Shop Page
                    </h2>
                    <div className='shop-page__filters'>
                        <p className='shop-page__showing'>{showingResults}</p>
                        <SelectList />
                    </div>
                </div>
                <ProductsList />
                <div className='shop-page__pagination'>
                    <Pagination />
                </div>
            </div>
        </div>
    );
}
