import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Cart from '../../components/Cart';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import ProductsList from '../../components/ProductsList';
import Search from '../../components/Search';
import SelectList, { SortOptionType } from '../../components/SelectList';
import TagsCloud from '../../components/TagsCloud';
import TopProducts from '../../components/TopProducts';
import { closeCategories } from '../../slices/categoriesSlice';

import {
    setCurrentPage,
    setSortingType,
    ShopPageState,
} from '../../slices/shopPageSlice';

import { DispatchType, StoreState } from '../../store/store';

export default function ShopPage() {
    const { numberOfPages, currentPage, numberOfResults } = useSelector<
        StoreState,
        ShopPageState
    >(state => state.shopPage);

    const dispatch = useDispatch<DispatchType>();
    const [searchParams, setSearchParams] = useSearchParams();

    // aside part of page and hamburger menu for them
    const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
    const hamburgerAsideRef = useRef<HTMLElement | null>(null);
    const hamburgerIconRef = useRef<HTMLElement | null>(null);

    // last type of sorting read from query string
    const [sortType, setSortType] = useState<SortOptionType | null>(null);

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

    function hamburgerMenuClicked() {
        setHamburgerMenuActive(!hamburgerMenuActive);
    }

    function closeHamburgerMenu() {
        setHamburgerMenuActive(false);
    }

    // when shop page is leaved and component unmounted, then clear all categories,
    // subcategories and submenus flags because menu for filters should be cleared
    // when shop page is leaved
    useEffect(() => {
        return () => {
            dispatch(closeCategories());
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

    return (
        <div className='shop-page'>
            <i
                className='fa-solid fa-bars shop-page__hamburger-menu'
                onClick={hamburgerMenuClicked}
                ref={hamburgerIconRef}
            ></i>
            <aside className={hamburgerMenuClass} ref={hamburgerAsideRef}>
                <Search />
                <Cart />
                <Filter />
                <TopProducts />
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
