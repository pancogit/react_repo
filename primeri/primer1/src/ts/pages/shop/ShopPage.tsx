import { useEffect } from 'react';
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

    let showingResults =
        numberOfPages &&
        numberOfResults &&
        currentPage &&
        currentPage <= numberOfPages
            ? `Showing ${currentPage}-${numberOfPages} of ${numberOfResults} results`
            : '';

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
                dispatch(setSortingType(sortingType));
            }
            // remove not existing sorting types from url
            else {
                searchParams.delete('sorting');
                setSearchParams(searchParams);
            }
        }
    }, [dispatch, searchParams, setSearchParams]);

    return (
        <div className='shop-page'>
            <i className='fa-solid fa-bars shop-page__hamburger-menu'></i>
            <aside className='shop-page__aside'>
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
