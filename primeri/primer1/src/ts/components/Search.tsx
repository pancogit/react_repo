import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { CategoryState, closeCategories } from '../slices/categoriesSlice';
import { Products, ProductType } from '../slices/productsSlice';
import {
    clearAllFilters,
    clearSortingType,
    setSearchedProducts,
} from '../slices/shopPageSlice';
import { DispatchType, StoreState } from '../store/store';

interface Props {
    closeHamburgerMenu: () => void;
}

export default function Search({ closeHamburgerMenu }: Props) {
    const [inputValue, setInputValue] = useState('');

    // search for product or not search
    const [searchProduct, setSearchProduct] = useState(false);

    const products = useSelector<StoreState, CategoryState>(
        state => state.products
    );

    const dispatch = useDispatch<DispatchType>();
    const [searchParams, setSearchParams] = useSearchParams();

    function inputIsChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    // start search for products and close hamburger menu if it's opened
    // also remove all query strings which are not used
    function searchForProduct() {
        setSearchProduct(true);
        closeHamburgerMenu();
        clearQueryStrings();
    }

    // search for products also if enter is pressed
    function keyIsPressed(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') searchForProduct();
    }

    const findProducts = useCallback(() => {
        let productName: string;
        let searchedName: string;
        let currentProduct: ProductType;
        let foundProducts: Products = [];

        // try to find products
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < products[i].subcategories.length; j++) {
                for (
                    let k = 0;
                    k < products[i].subcategories[j].submenu.length;
                    k++
                ) {
                    for (
                        let m = 0;
                        m <
                        products[i].subcategories[j].submenu[k].products.length;
                        m++
                    ) {
                        currentProduct =
                            products[i].subcategories[j].submenu[k].products[m];

                        // convert names to the lowercases because case sensitivity
                        // is not important for names comparing
                        // also remove trailing whitespaces, it doesn't matter at all
                        productName = currentProduct.name.toLowerCase().trim();

                        searchedName = inputValue.toLowerCase().trim();

                        // if names are the same or if one name contains another or vice-versa
                        // then product is found, and save them
                        if (
                            productName === searchedName ||
                            productName.includes(searchedName) ||
                            searchedName.includes(productName)
                        ) {
                            foundProducts.push(currentProduct);
                        }
                    }
                }
            }
        }

        return foundProducts;
    }, [inputValue, products]);

    // search through products to find searched product
    useEffect(() => {
        if (searchProduct) {
            let foundProducts: Products = findProducts();

            // dispatch found products to the global store and clear all filters from the shop page
            dispatch(setSearchedProducts(foundProducts));
            dispatch(closeCategories());
            dispatch(clearAllFilters());
            dispatch(clearSortingType());

            // searching for product is finished and clear search input
            setSearchProduct(false);
            setInputValue('');

            // set query string for search input
            searchParams.set('search', inputValue);
            setSearchParams(searchParams);
        }
    }, [
        searchProduct,
        dispatch,
        inputValue,
        products,
        findProducts,
        searchParams,
        setSearchParams,
    ]);

    // remove all query strings for categories, prices, current page and sorting
    function clearQueryStrings() {
        // remove query strings for categories
        searchParams.delete('selected-categories');
        searchParams.delete('opened-categories');
        searchParams.delete('selected-subcategories');
        searchParams.delete('opened-subcategories');
        searchParams.delete('selected-submenus');

        // remove query string for prices
        searchParams.delete('prices');

        // remove query string for current page
        searchParams.delete('page');

        // remove query string for sorting
        searchParams.delete('sorting');

        // remove query strings from url
        setSearchParams(searchParams);
    }

    return (
        <div className='search'>
            <input
                type='text'
                name='search-input'
                id='search-input-id'
                className='search__input'
                placeholder='Type here'
                value={inputValue}
                onChange={inputIsChanged}
                onKeyDown={keyIsPressed}
            />
            <label
                htmlFor='search-input-id'
                className='search__label'
                onClick={searchForProduct}
            >
                <i className='fa-solid fa-magnifying-glass search__icon'></i>
            </label>
        </div>
    );
}
