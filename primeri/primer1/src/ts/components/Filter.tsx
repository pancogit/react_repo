import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import {
    CategoryState,
    setCategories,
    Subcategories,
    Submenus,
} from '../slices/categoriesSlice';
import {
    PriceRangeFilter,
    setCategoriesFilters,
    setPriceRangeFilters,
} from '../slices/shopPageSlice';

import { DispatchType, StoreState } from '../store/store';
import Slider from './Slider';

interface SelectedOpenedCategories {
    selectedCategories: string[];
    openedCategories: string[];
    selectedSubcategories: string[];
    openedSubcategories: string[];
    selectedSubmenus: string[];
}

interface Props {
    closeHamburgerMenu(): void;
}

export default function Filter(props: Props) {
    const categories = useSelector<StoreState, CategoryState>(
        state => state.categories
    );

    const dispatch = useDispatch<DispatchType>();
    const [searchParams, setSearchParams] = useSearchParams();

    // filter pounds prices will be updated via reference by slider and not by state
    // because it's very rapid change and can cause performance issues
    // update prices range by ref all the time while it's changing and when filter
    // is dispatched to the store, then update global state with prices range
    const filterPoundsRef = useRef<HTMLParagraphElement | null>(null);

    // minimum and maximum price for current left and right sliders
    const currentMinimumPrice = useRef<number>(0);
    const currentMaximumPrice = useRef<number>(0);

    // minimum and maximum predefined price for sliders
    const minMaxDefinedPrice = useSelector<StoreState, PriceRangeFilter>(
        state => state.shopPage.filters.priceRange.minMaxPrices
    );

    // default prices for sliders
    const defaultPrices = useSelector<StoreState, PriceRangeFilter>(
        state => state.shopPage.filters.priceRange.defaultPrices
    );

    function categoryIsClicked(
        event: React.MouseEvent<HTMLAnchorElement>,
        categoryIndex: number
    ) {
        let categorySelectedFlag: boolean;

        event.preventDefault();

        // create copy of object and then mutate it and set state
        const categoriesCopy = createCategoriesCopy();

        // first save current category flag
        categorySelectedFlag = categoriesCopy[categoryIndex].isSelected;

        // clear all categories, subcategories and submenus selected flags because
        // only one link can be selected at the same time
        clearAllSelectedFlags(categoriesCopy);

        // flip current flags
        categoriesCopy[categoryIndex].isOpened =
            !categoriesCopy[categoryIndex].isOpened;

        categoriesCopy[categoryIndex].isSelected = !categorySelectedFlag;

        // when category is closed then clear all opened flags for given category
        // to close all subcategories
        if (!categoriesCopy[categoryIndex].isOpened) {
            categoriesCopy[categoryIndex].subcategories.forEach(subcategory => {
                subcategory.isOpened = false;
            });
        }

        // dispatch categories to the store
        dispatch(setCategories(categoriesCopy));
    }

    function subcategoryIsClicked(
        event: React.MouseEvent<HTMLAnchorElement>,
        subcategoryIndex: number,
        categoryIndex: number
    ) {
        let subcategorySelectedFlag;

        event.preventDefault();

        // create copy of object and then mutate it and set state
        const categoriesCopy = createCategoriesCopy();

        // first save current subcategory flag
        subcategorySelectedFlag =
            categoriesCopy[categoryIndex].subcategories[subcategoryIndex]
                .isSelected;

        // clear all categories, subcategories and submenus selected flags because
        // only one link can be selected at the same time
        clearAllSelectedFlags(categoriesCopy);

        // flip current flags
        categoriesCopy[categoryIndex].subcategories[subcategoryIndex].isOpened =
            !categoriesCopy[categoryIndex].subcategories[subcategoryIndex]
                .isOpened;

        categoriesCopy[categoryIndex].subcategories[
            subcategoryIndex
        ].isSelected = !subcategorySelectedFlag;

        // dispatch categories to the store
        dispatch(setCategories(categoriesCopy));
    }

    function submenuIsClicked(
        event: React.MouseEvent<HTMLAnchorElement>,
        submenuIndex: number,
        subcategoryIndex: number,
        categoryIndex: number
    ) {
        let submenuSelectedFlag;

        event.preventDefault();

        // create copy of object and then mutate it and set state
        const categoriesCopy = createCategoriesCopy();

        // first save current submenu flag
        submenuSelectedFlag =
            categoriesCopy[categoryIndex].subcategories[subcategoryIndex]
                .submenu[submenuIndex].isSelected;

        // clear all categories, subcategories and submenus selected flags because
        // only one link can be selected at the same time
        clearAllSelectedFlags(categoriesCopy);

        // flip current flag
        categoriesCopy[categoryIndex].subcategories[subcategoryIndex].submenu[
            submenuIndex
        ].isSelected = !submenuSelectedFlag;

        // dispatch categories to the store
        dispatch(setCategories(categoriesCopy));
    }

    // clear all categories, subcategories and submenus selected flags because
    // only one link can be selected at the same time
    function clearAllSelectedFlags(categories: CategoryState) {
        categories.forEach(category => {
            category.isSelected = false;

            category.subcategories.forEach(subcategory => {
                subcategory.isSelected = false;

                subcategory.submenu.forEach(submenu => {
                    submenu.isSelected = false;
                });
            });
        });
    }

    // create deep copy of categories
    function createCategoriesCopy() {
        let categoriesArray: CategoryState = [];
        let subcategories: Subcategories;
        let submenu: Submenus;

        for (let i = 0; i < categories.length; i++) {
            let subcategoriesArray: Subcategories = [];

            subcategories = categories[i].subcategories;

            for (let j = 0; j < subcategories.length; j++) {
                let submenusArray: Submenus = [];

                submenu = subcategories[j].submenu;

                for (let k = 0; k < submenu.length; k++) {
                    let submenuObject = Object.assign({}, submenu[k]);

                    // 1) create all submenus first
                    submenusArray.push(submenuObject);
                }

                const { name, numberOfProducts, path, isSelected, isOpened } =
                    subcategories[j];

                // 2) after submenus are created, then create all subcategories
                subcategoriesArray.push({
                    isSelected,
                    isOpened,
                    name,
                    numberOfProducts,
                    path,
                    submenu: submenusArray,
                });
            }

            const { isSelected, isOpened, kind, numberOfProducts, path } =
                categories[i];

            // 3) when subcategories are created, then create all categories
            categoriesArray.push({
                isSelected,
                isOpened,
                kind,
                numberOfProducts,
                path,
                subcategories: subcategoriesArray,
            });
        }

        return categoriesArray;
    }

    // dispatch filters values to the store and apply them
    function applyFilters() {
        // find clicked menu item and dispatch it to the store
        const { menuSelectedItemName, menuSelectedItemPath } =
            findClickedMenuItem();

        // dispatch categories
        dispatch(
            setCategoriesFilters(menuSelectedItemPath, menuSelectedItemName)
        );

        // dispatch prices range
        dispatch(
            setPriceRangeFilters([
                currentMinimumPrice.current,
                currentMaximumPrice.current,
            ])
        );

        // set query strings to save state of filters in the url
        setQueryStringsForFilters();

        // when filter button is clicked also close hamburger menu
        // if it's opened via mobile
        props.closeHamburgerMenu();
    }

    // return path and name of clicked menu item or null if it's not found
    function findClickedMenuItem() {
        let menuSelectedItemFound = false;
        let menuSelectedItemName: string | null = null;
        let menuSelectedItemPath: string | null = null;

        // find clicked submenu item
        for (let i = 0; i < categories.length; i++) {
            if (menuSelectedItemFound) break;

            // when selected menu item is found, save name and path and exit from loops
            if (categories[i].isSelected) {
                menuSelectedItemFound = true;
                menuSelectedItemName = categories[i].kind;

                // path is always at the root of the images folder
                menuSelectedItemPath = '/images/';
                break;
            }

            for (let j = 0; j < categories[i].subcategories.length; j++) {
                if (menuSelectedItemFound) break;

                // when selected menu item is found, save name and path and exit from loops
                if (categories[i].subcategories[j].isSelected) {
                    menuSelectedItemFound = true;
                    menuSelectedItemName = categories[i].subcategories[j].name;
                    menuSelectedItemPath = categories[i].path;
                    break;
                }

                for (
                    let k = 0;
                    k < categories[i].subcategories[j].submenu.length;
                    k++
                ) {
                    // when selected menu item is found, save name and path and exit from loops
                    if (categories[i].subcategories[j].submenu[k].isSelected) {
                        menuSelectedItemFound = true;
                        menuSelectedItemName =
                            categories[i].subcategories[j].submenu[k].name;
                        menuSelectedItemPath =
                            categories[i].subcategories[j].path;
                        break;
                    }
                }
            }
        }

        return {
            menuSelectedItemName,
            menuSelectedItemPath,
        };
    }

    // when filters are applied, set query strings for filters to remember state in the url
    function setQueryStringsForFilters() {
        const categoriesObject: SelectedOpenedCategories = {
            selectedCategories: [],
            openedCategories: [],
            selectedSubcategories: [],
            openedSubcategories: [],
            selectedSubmenus: [],
        };

        // find all selected or opened items
        findSelectedOpenedCategories(categoriesObject);

        // set query strings for found selected or opened items
        setQueryStringsForCategories(categoriesObject);

        // set query strings for minimum and maximum price for filters
        setQueryStringsForPrices();

        return 0;
    }

    // search through all categories, subcategories and submenus and find
    // selected and opened items and save them to the arrays
    function findSelectedOpenedCategories(
        categoriesObject: SelectedOpenedCategories
    ) {
        const {
            selectedCategories,
            openedCategories,
            selectedSubcategories,
            openedSubcategories,
            selectedSubmenus,
        } = categoriesObject;

        categories.forEach(category => {
            if (category.isSelected) selectedCategories.push(category.path);
            if (category.isOpened) openedCategories.push(category.path);

            category.subcategories.forEach(subcategory => {
                if (subcategory.isSelected)
                    selectedSubcategories.push(subcategory.path);
                if (subcategory.isOpened)
                    openedSubcategories.push(subcategory.path);

                // for submenu, save path with subcategory path concatenated with
                // the submenu name with lower case letters
                subcategory.submenu.forEach(submenu => {
                    if (submenu.isSelected)
                        selectedSubmenus.push(
                            `${subcategory.path}${submenu.name.toLowerCase()}`
                        );
                });
            });
        });
    }

    // set query strings for categories, subcategories and submenus
    // for selected and opened items
    function setQueryStringsForCategories(
        categoriesObject: SelectedOpenedCategories
    ) {
        const {
            selectedCategories,
            openedCategories,
            selectedSubcategories,
            openedSubcategories,
            selectedSubmenus,
        } = categoriesObject;

        if (selectedCategories.length) {
            searchParams.set(
                'selected-categories',
                selectedCategories.toString()
            );
        }
        // if selected category is empty, remove any existing selected
        // category from some previous setting
        else {
            searchParams.delete('selected-categories');
        }

        if (openedCategories.length) {
            searchParams.set('opened-categories', openedCategories.toString());
        } else {
            searchParams.delete('opened-categories');
        }

        if (selectedSubcategories.length) {
            searchParams.set(
                'selected-subcategories',
                selectedSubcategories.toString()
            );
        } else {
            searchParams.delete('selected-subcategories');
        }

        if (openedSubcategories.length) {
            searchParams.set(
                'opened-subcategories',
                openedSubcategories.toString()
            );
        } else {
            searchParams.delete('opened-subcategories');
        }

        if (selectedSubmenus.length) {
            searchParams.set('selected-submenus', selectedSubmenus.toString());
        } else {
            searchParams.delete('selected-submenus');
        }

        // set query strings to the url
        setSearchParams(searchParams);
    }

    // set query strings for minimum and maximum price for filters
    function setQueryStringsForPrices() {
        searchParams.set(
            'prices',
            `${currentMinimumPrice.current},${currentMaximumPrice.current}`
        );

        // set query string to the url
        setSearchParams(searchParams);
    }

    // when minimum and maximum prices are set in slider, then update filter pounds on page
    // by updating the reference of dom element
    // it's done by ref because of very rapid change, to not render filter component all the time
    // filter component will update global store with state only when filter button is pressed
    function updateFilterPoundsPrices(
        minimumPrice: number,
        maximumPrice: number
    ) {
        // save minimum and maximum price in local refs
        currentMinimumPrice.current = minimumPrice;
        currentMaximumPrice.current = maximumPrice;

        // update prices on page via refs
        if (filterPoundsRef.current) {
            filterPoundsRef.current.innerHTML = `&pound;${currentMinimumPrice.current} - &pound;${currentMaximumPrice.current}`;
        }
    }

    return (
        <div className='filter'>
            <h3 className='filter__heading shop-page__aside-heading'>
                Filter by Price
            </h3>
            <div className='filter__slider'>
                <Slider
                    minimumPrice={minMaxDefinedPrice[0]}
                    maximumPrice={minMaxDefinedPrice[1]}
                    updateFilterPoundsPrices={updateFilterPoundsPrices}
                />
                <div className='filter__price-wrapper'>
                    <p className='filter__price'>Price:</p>
                    <p className='filter__pounds' ref={filterPoundsRef}>
                        &pound;{defaultPrices[0]} - &pound;{defaultPrices[1]}
                    </p>
                </div>
            </div>
            <button className='filter__button' onClick={applyFilters}>
                <span className='filter__button-text'>Filter</span>
                <i className='fa-solid fa-filter filter__icon'></i>
            </button>

            <ul className='filter__list'>
                {categories.map((category, categoryIndex) => (
                    <li className='filter__list-item' key={categoryIndex}>
                        <Link
                            to=''
                            className={
                                category.isSelected
                                    ? 'filter__link filter__link--active'
                                    : 'filter__link'
                            }
                            onClick={event =>
                                categoryIsClicked(event, categoryIndex)
                            }
                        >
                            <span className='filter__link-text'>
                                {category.kind}
                            </span>
                            <span className='filter__link-number'>
                                {category.numberOfProducts}
                            </span>
                        </Link>
                        <ul
                            className={
                                category.isOpened
                                    ? 'filter__submenu filter__submenu--active'
                                    : 'filter__submenu'
                            }
                        >
                            {category.subcategories.map(
                                (subcategory, subcategoryIndex) => (
                                    <li
                                        className={
                                            subcategory.isOpened
                                                ? 'filter__list-item filter__list-item--active'
                                                : 'filter__list-item'
                                        }
                                        key={subcategoryIndex}
                                    >
                                        <Link
                                            to=''
                                            className={
                                                subcategory.isSelected
                                                    ? 'filter__link filter__link--active'
                                                    : 'filter__link'
                                            }
                                            onClick={event =>
                                                subcategoryIsClicked(
                                                    event,
                                                    subcategoryIndex,
                                                    categoryIndex
                                                )
                                            }
                                        >
                                            <span className='filter__submenu-text'>
                                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                                <span className='filter__link-text'>
                                                    {subcategory.name}
                                                </span>
                                            </span>
                                            <span className='filter__link-number'>
                                                {subcategory.numberOfProducts}
                                            </span>
                                        </Link>
                                        <ul className='filter__submenu-list'>
                                            {subcategory.submenu.map(
                                                (productKind, submenuIndex) => (
                                                    <li
                                                        className='filter__list-item'
                                                        key={submenuIndex}
                                                    >
                                                        <Link
                                                            to=''
                                                            className={
                                                                productKind.isSelected
                                                                    ? 'filter__link filter__link--active'
                                                                    : 'filter__link'
                                                            }
                                                            onClick={event =>
                                                                submenuIsClicked(
                                                                    event,
                                                                    submenuIndex,
                                                                    subcategoryIndex,
                                                                    categoryIndex
                                                                )
                                                            }
                                                        >
                                                            <span className='filter__link-text'>
                                                                {
                                                                    productKind.name
                                                                }
                                                            </span>
                                                            <span className='filter__link-number'>
                                                                {
                                                                    productKind.numberOfProducts
                                                                }
                                                            </span>
                                                        </Link>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </li>
                                )
                            )}
                        </ul>
                    </li>
                ))}
            </ul>

            <div className='filter__divider'></div>
        </div>
    );
}
