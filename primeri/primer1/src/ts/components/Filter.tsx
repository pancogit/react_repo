import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    CategoryState,
    setCategories,
    Subcategories,
    Submenus,
} from '../slices/categoriesSlice';
import { setCategoriesFilters } from '../slices/shopPageSlice';

import { DispatchType, StoreState } from '../store/store';
import Slider from './Slider';

export default function Filter() {
    const categories = useSelector<StoreState, CategoryState>(
        state => state.categories
    );

    const dispatch = useDispatch<DispatchType>();

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

        dispatch(
            setCategoriesFilters(menuSelectedItemPath, menuSelectedItemName)
        );
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

    return (
        <div className='filter'>
            <h3 className='filter__heading shop-page__aside-heading'>
                Filter by Price
            </h3>
            <div className='filter__slider'>
                <Slider />
                <div className='filter__price-wrapper'>
                    <p className='filter__price'>Price:</p>
                    <p className='filter__pounds'>&pound;75 - &pound;300</p>
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
