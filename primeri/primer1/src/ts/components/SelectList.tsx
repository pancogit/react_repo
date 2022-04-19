import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
    clearSearchedProducts,
    setCurrentPage,
    setSortingType,
} from '../slices/shopPageSlice';

import { DispatchType, StoreState } from '../store/store';

export type SortOptionType =
    | 'DEFAULT'
    | 'NAME_ASCENDING'
    | 'NAME_DESCENDING'
    | 'PRICE_ASCENDING'
    | 'PRICE_DESCENDING'
    | 'QUALITY_ASCENDING'
    | 'QUALITY_DESCENDING';

type OptionsMap = Record<SortOptionType, string>;

// all options with their types and names
const options: OptionsMap = {
    DEFAULT: 'Default sorting',
    NAME_ASCENDING: 'Sort by name ascending',
    NAME_DESCENDING: 'Sort by name descending',
    PRICE_ASCENDING: 'Sort by price ascending',
    PRICE_DESCENDING: 'Sort by price descending',
    QUALITY_ASCENDING: 'Sort by rated quality ascending',
    QUALITY_DESCENDING: 'Sort by rated quality descending',
};

export default function SelectList() {
    const [isOpen, setIsOpen] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);

    const optionsClass = isOpen
        ? 'select-list__options select-list__options--open'
        : 'select-list__options';

    const dispatch = useDispatch<DispatchType>();
    const listOption = useSelector<StoreState, SortOptionType>(
        state => state.shopPage.sortingType
    );

    const allOptions = createOptions();

    const [searchParams, setSearchParams] = useSearchParams();

    function openCloseList() {
        setIsOpen(!isOpen);
    }

    // close menu when it's clicked outside of list
    useEffect(() => {
        function closeList(event: MouseEvent) {
            const pathElements = event.composedPath();
            let listElementFound = false;

            // search for all parents elements until top of the dom and if there is
            // list element on path that means that some element inside list element is clicked
            for (let i = 0; i < pathElements.length; i++) {
                if (listRef.current && pathElements[i] === listRef.current) {
                    listElementFound = true;
                }
            }

            // if some element inside list element is clicked, then don't close list, otherwise close it
            if (!listElementFound) setIsOpen(false);
        }

        // set event listener
        window.addEventListener('click', closeList);

        // clean-up event listener
        return () => window.removeEventListener('click', closeList);
    }, []);

    // close menu when it's pressed escape on keyboard
    useEffect(() => {
        function closeList(event: KeyboardEvent) {
            if (event.key === 'Escape') setIsOpen(false);
        }

        // set event listener
        window.addEventListener('keydown', closeList);

        // clean-up event listener
        return () => window.removeEventListener('keydown', closeList);
    }, []);

    // when component is unmounted, then set sorting type to the default value
    useEffect(() => {
        return () => {
            dispatch(setSortingType('DEFAULT'));
        };
    }, [dispatch]);

    // when some option is clicked, dispatch it to the store and close the list
    // set query string for current sorting type
    function optionIsClicked(optionType: SortOptionType) {
        dispatch(setSortingType(optionType));
        setIsOpen(false);

        const searchResults = searchParams.get('search');

        // if search results exist in query string, then remove search results
        // and also clear search results from the global store
        if (searchResults !== null) {
            searchParams.delete('search');
            dispatch(clearSearchedProducts());
        }

        // set current page to the first one and remove query strings for current page
        searchParams.delete('page');
        dispatch(setCurrentPage(1));

        // set query string for sorting
        searchParams.set('sorting', optionType.toLowerCase());
        setSearchParams(searchParams);
    }

    function createOptions() {
        const objectProperties = Object.getOwnPropertyNames(
            options
        ) as SortOptionType[];

        let allOptions: JSX.Element[] = [];
        let optionText: string;

        // create all options from options object properties
        objectProperties.forEach((property, index) => {
            optionText = options[property];

            // don't put default property, because once any property is clicked
            // then default property is not used anymore while component is mounted
            // also don't show already selected option in the list
            if (property !== 'DEFAULT' && listOption !== property) {
                allOptions.push(
                    <p
                        key={index}
                        className='select-list__option'
                        onClick={() => optionIsClicked(property)}
                    >
                        {optionText}
                    </p>
                );
            }
        });

        return allOptions;
    }

    return (
        <div className='select-list select-list--large' ref={listRef}>
            <div className='select-list__select' onClick={openCloseList}>
                <p className='select-list__text'>{options[listOption]}</p>
                <i className='fa-solid fa-caret-down select-list__arrow'></i>
            </div>
            <div className='select-list__options-wrapper'>
                <div className={optionsClass}>{allOptions}</div>
            </div>
        </div>
    );
}
