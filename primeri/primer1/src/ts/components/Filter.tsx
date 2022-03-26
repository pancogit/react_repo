import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    CategoryState,
    setCategories,
    Subcategories,
    Submenus,
} from '../slices/categoriesSlice';

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
        event.preventDefault();

        // create copy of object and then mutate it and set state
        const categoriesCopy = createCategoriesCopy();

        // flip current flag
        categoriesCopy[categoryIndex].isActive =
            !categoriesCopy[categoryIndex].isActive;

        // if flag is cleared, then clear all subcategories and submenus flags
        if (!categoriesCopy[categoryIndex].isActive) {
            categoriesCopy[categoryIndex].subcategories.forEach(subcategory => {
                subcategory.isActive = false;

                subcategory.submenu.forEach(submenu => {
                    submenu.isActive = false;
                });
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
        event.preventDefault();

        // create copy of object and then mutate it and set state
        const categoriesCopy = createCategoriesCopy();

        // flip current flag
        categoriesCopy[categoryIndex].subcategories[subcategoryIndex].isActive =
            !categoriesCopy[categoryIndex].subcategories[subcategoryIndex]
                .isActive;

        // if flag is cleared, then clear submenus flags
        if (
            !categoriesCopy[categoryIndex].subcategories[subcategoryIndex]
                .isActive
        ) {
            categoriesCopy[categoryIndex].subcategories[
                subcategoryIndex
            ].submenu.forEach(submenu => {
                submenu.isActive = false;
            });
        }

        // dispatch categories to the store
        dispatch(setCategories(categoriesCopy));
    }

    function submenuIsClicked(
        event: React.MouseEvent<HTMLAnchorElement>,
        submenuIndex: number,
        subcategoryIndex: number,
        categoryIndex: number
    ) {
        event.preventDefault();

        // create copy of object and then mutate it and set state
        const categoriesCopy = createCategoriesCopy();

        // clear all existing submenu flags before setting current,
        // because just 1 flag can be set at the same time
        clearAllSubmenusFlags(categoriesCopy);

        // flip current flag
        categoriesCopy[categoryIndex].subcategories[subcategoryIndex].submenu[
            submenuIndex
        ].isActive =
            !categoriesCopy[categoryIndex].subcategories[subcategoryIndex]
                .submenu[submenuIndex].isActive;

        // dispatch categories to the store
        dispatch(setCategories(categoriesCopy));
    }

    function clearAllSubmenusFlags(categories: CategoryState) {
        categories.forEach(category => {
            category.subcategories.forEach(subcategory => {
                subcategory.submenu.forEach(submenu => {
                    submenu.isActive = false;
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

                const { name, numberOfProducts, path, isActive } =
                    subcategories[j];

                // 2) after submenus are created, then create all subcategories
                subcategoriesArray.push({
                    isActive,
                    name,
                    numberOfProducts,
                    path,
                    submenu: submenusArray,
                });
            }

            const { isActive, kind, numberOfProducts, path } = categories[i];

            // 3) when subcategories are created, then create all categories
            categoriesArray.push({
                isActive,
                kind,
                numberOfProducts,
                path,
                subcategories: subcategoriesArray,
            });
        }

        return categoriesArray;
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
            <button className='filter__button'>
                <span className='filter__button-text'>Filter</span>
                <i className='fa-solid fa-filter filter__icon'></i>
            </button>

            <ul className='filter__list'>
                {categories.map((category, categoryIndex) => (
                    <li className='filter__list-item' key={categoryIndex}>
                        <Link
                            to=''
                            className='filter__link'
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
                                category.isActive
                                    ? 'filter__submenu filter__submenu--active'
                                    : 'filter__submenu'
                            }
                        >
                            {category.subcategories.map(
                                (subcategory, subcategoryIndex) => (
                                    <li
                                        className={
                                            subcategory.isActive
                                                ? 'filter__list-item filter__list-item--active'
                                                : 'filter__list-item'
                                        }
                                        key={subcategoryIndex}
                                    >
                                        <Link
                                            to=''
                                            className='filter__link'
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
                                                                productKind.isActive
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
