import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ColorSelect, { Color } from '../components/ColorSelect';
import Description, { DescriptionTab } from '../components/Description';
import Quantity from '../components/Quantity';
import SizeSelect from '../components/SizeSelect';
import Stars from '../components/Stars';
import { CategoryState } from '../slices/categoriesSlice';
import { DispatchType, StoreState } from '../store/store';
import { ProductType, SizesObject } from '../slices/productsSlice';
import { Price } from '../components/Product';

import {
    addCartProduct,
    CartProduct,
    changeCartPriceQuantity,
    changeCartProductColor,
    changeCartProductQuantity,
    changeCartProductSize,
} from '../slices/cartSlice';

import { Dictionary } from '@reduxjs/toolkit';

// ':category/:kind/:specific'
type UrlParams = 'category' | 'kind' | 'specific';

export default function SingleProduct() {
    // read url parameters and create product link path
    const params = useParams<UrlParams>();

    const productLink = useRef<string>(
        `/products/${params.category}/${params.kind}/${params.specific}`
    );

    const allProducts = useSelector<StoreState, CategoryState>(
        state => state.products
    );

    // current products in shopping cart
    const cartProducts = useSelector<StoreState, Dictionary<CartProduct>>(
        state => state.cart.cartProductsEntityAdapter.entities
    );

    const dispatch = useDispatch<DispatchType>();
    const navigate = useNavigate();

    // it's set if product is inside shopping cart, otherwise it's null
    const [productInCart, setProductInCart] = useState<CartProduct | null>(
        null
    );

    const searchProductInCart = useRef(false);

    // if color or size is not set before updating product in cart, then show error message
    const [cartProductErrorMessage, setCartProductErrorMessage] = useState<
        string | undefined
    >(undefined);

    const addCartButtonClass = productInCart
        ? 'single-product__add-cart single-product__add-cart--added'
        : 'single-product__add-cart';

    const [singleProduct, setSingleProduct] = useState<ProductType>();
    const [productNotFound, setProductNotFound] = useState(false);

    const [currentColor, setCurrentColor] = useState<Color>('Default');

    const [currentSize, setCurrentSize] = useState<SizesObject>({
        name: 'Default',
        price: 0,
    });

    const [currentQuantity, setCurrentQuantity] = useState<number>(1);

    // current tab for description component
    const [descriptionTab, setDescriptionTab] =
        useState<DescriptionTab>('Description');

    const descriptionRef = useRef<HTMLDivElement | null>(null);

    function setColor(color: Color) {
        setCurrentColor(color);
    }

    function setSize(size: SizesObject) {
        setCurrentSize(size);
    }

    function setQuantity(quantity: number) {
        setCurrentQuantity(quantity);
    }

    function openDiscussionTab() {
        setDescriptionTab('Discussion');

        // when link for customer reviews is clicked, scroll page down to the discussion tab
        // do smooth scroll to discussion tab and align scroll to the top of the discussion tab
        if (descriptionRef.current) {
            descriptionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    // find product for current product link
    useEffect(() => {
        let currentProduct: ProductType;
        let productFound = false;

        // don't search if products are still not set to the global store
        if (!allProducts.length) return;

        // search for current single product
        for (let i = 0; i < allProducts.length; i++) {
            if (productFound) break;

            for (let j = 0; j < allProducts[i].subcategories.length; j++) {
                if (productFound) break;

                for (
                    let k = 0;
                    k < allProducts[i].subcategories[j].submenu.length;
                    k++
                ) {
                    if (productFound) break;

                    for (
                        let m = 0;
                        m <
                        allProducts[i].subcategories[j].submenu[k].products
                            .length;
                        m++
                    ) {
                        if (productFound) break;

                        currentProduct =
                            allProducts[i].subcategories[j].submenu[k].products[
                                m
                            ];

                        // when product is found, save it to the local state and finish the search
                        if (currentProduct.link === productLink.current) {
                            productFound = true;
                            setSingleProduct(currentProduct);
                            setProductNotFound(false);

                            break;
                        }
                    }
                }
            }
        }

        // product is not found, show message on the page
        if (!productFound) setProductNotFound(true);
    }, [allProducts, singleProduct]);

    function createNewPriceElement(price: Price): JSX.Element {
        let newPrice = getNewPrice(price);

        // if size is not selected and price is array, then use default values from array
        if (currentSize.name === 'Default' && typeof newPrice !== 'number') {
            return (
                <span className='single-product__new-price'>
                    &pound;{newPrice[0]} - &pound;
                    {newPrice[1]}
                </span>
            );
        }

        // if size is selected then use price for selected size value
        // or if size is not selected then use default price as simple number
        else {
            return (
                <span className='single-product__new-price'>
                    &pound;{newPrice}
                </span>
            );
        }
    }

    // if size is not selected, then return default value
    // otherwise return price for selected size value
    function getNewPrice(price: Price): number | [number, number] {
        if (currentSize.name === 'Default') return price.new;
        else return currentSize.price;
    }

    // search through cart products and try to find current product
    // if current product on page is in the cart then return it, otherwise return null
    const findProductInCart = useCallback(() => {
        // first get cart products names from map
        const productsNames = Object.getOwnPropertyNames(cartProducts);
        let cartProductObj: CartProduct | undefined;

        for (let i = 0; i < productsNames.length; i++) {
            cartProductObj = cartProducts[productsNames[i]];

            if (cartProductObj && singleProduct) {
                if (cartProductObj.product.id === singleProduct.id)
                    return cartProductObj;
            }
        }

        // current product on page is not found in the cart
        return null;
    }, [cartProducts, singleProduct]);

    // see if current product on page is inside shopping cart
    useEffect(() => {
        let productFound: CartProduct | null;

        // search for product in cart only once
        if (!searchProductInCart.current && singleProduct) {
            searchProductInCart.current = true;
            productFound = findProductInCart();

            setProductInCart(productFound);

            // set current color, size and quantity of found product in cart
            if (productFound) {
                setColor(productFound.color);

                // find size info of current product on page and set it to the local state
                for (let i = 0; i < singleProduct.sizes.length; i++) {
                    if (singleProduct.sizes[i].name === productFound.size) {
                        setSize({ ...singleProduct.sizes[i] });
                    }
                }

                // set product quantity from the shop cart to the local state
                setQuantity(productFound.quantity);
            }
        }
    }, [cartProducts, singleProduct, findProductInCart]);

    // update product color, size or quantity in shopping cart or show
    // error if not all default values are set
    function updateProductInCart() {
        let colorSet = currentColor !== 'Default';
        let sizeSet = currentSize.name !== 'Default';
        let errorMessage: string | undefined;

        // set error message if exist
        if (!colorSet && !sizeSet) errorMessage = 'Set color and size';
        else if (!colorSet) errorMessage = 'Set color';
        else if (!sizeSet) errorMessage = 'Set size';

        setCartProductErrorMessage(errorMessage);

        // dispatch product color, size and quantity to the store only if there are no errors
        // also redirect to the main shop page and remove current page from history stack
        if (!errorMessage) {
            updateCartProduct();
            navigate('/shop-page', { replace: true });
        }
    }

    // dispatch product including product color, size and quantity to the store
    function updateCartProduct() {
        if (singleProduct) {
            let newPrice = getNewPrice(singleProduct.price);

            // if price is array, then use minimum price
            if (typeof newPrice !== 'number') newPrice = newPrice[0];

            // try to add new product if it's not already in the cart
            dispatch(
                addCartProduct({
                    product: singleProduct,
                    color: 'Default',
                    price: 0,
                    quantity: 1,
                    size: 'Default',
                })
            );

            // update color
            dispatch(changeCartProductColor(singleProduct.id, currentColor));

            // update size
            dispatch(changeCartProductSize(singleProduct.id, currentSize.name));

            // update quantity
            dispatch(
                changeCartProductQuantity(singleProduct.id, currentQuantity)
            );

            // update price
            dispatch(changeCartPriceQuantity(singleProduct.id, newPrice));
        }
    }

    // if current product is found, then render it
    if (singleProduct) {
        const {
            path,
            sale,
            name,
            starsRated,
            comments,
            price,
            text,
            description,
            colors,
            sizes,
            id,
        } = singleProduct;

        let newPrice: JSX.Element = createNewPriceElement(price);

        return (
            <div className='single-product'>
                <div className='single-product__info'>
                    <div className='single-product__picture'>
                        <img
                            src={path}
                            alt='single product'
                            className='single-product__image'
                        />
                        {sale && (
                            <img
                                src='/images/sale.png'
                                alt='sale'
                                className='single-product__sale'
                            />
                        )}
                    </div>
                    <div className='single-product__details'>
                        <h2 className='single-product__heading main__heading'>
                            {name}
                        </h2>
                        <div className='single-product__rating'>
                            <Stars
                                isEditable={true}
                                numberOfStars={starsRated}
                                productId={id}
                            />
                            <Link
                                to=''
                                className='single-product__reviews-link'
                                onClick={openDiscussionTab}
                            >
                                ({comments.numberOfComments} customer reviews)
                            </Link>
                        </div>
                        <div className='single-product__price'>
                            {price.old && (
                                <span className='single-product__old-price'>
                                    &pound;{price.old}
                                </span>
                            )}
                            {newPrice}
                        </div>
                        <p className='single-product__text'>{text}</p>
                        <div className='single-product__list'>
                            <span className='single-product__list-text'>
                                Color
                            </span>
                            <div className='single-product__list-select'>
                                <ColorSelect
                                    colors={colors}
                                    currentColor={currentColor}
                                    setColor={setColor}
                                />
                            </div>
                        </div>
                        <div className='single-product__list'>
                            <span className='single-product__list-text'>
                                Size
                            </span>
                            <div className='single-product__list-select'>
                                <SizeSelect
                                    sizes={sizes}
                                    currentSize={currentSize.name}
                                    setSize={setSize}
                                />
                            </div>
                        </div>
                        <div className='single-product__quantity'>
                            <Quantity
                                currentQuantity={currentQuantity}
                                setQuantity={setQuantity}
                                maximumQuantity={10}
                            />
                            <button
                                className={addCartButtonClass}
                                onClick={updateProductInCart}
                            >
                                {productInCart ? 'In cart' : 'Add to cart'}
                            </button>
                        </div>
                        {cartProductErrorMessage && (
                            <p className='single-product__cart-error-message'>
                                {cartProductErrorMessage}
                            </p>
                        )}
                    </div>
                </div>
                <div
                    className='single-product__description-wrapper'
                    ref={descriptionRef}
                >
                    <div className='single-product__description'>
                        <Description
                            description={description}
                            comments={comments}
                            currentTab={descriptionTab}
                            changeTab={setDescriptionTab}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // show message if product is not found in the global store
    else if (productNotFound) {
        return (
            <div className='single-product__message'>Product not found...</div>
        );
    }

    // render spinner if product is still loading
    else {
        return (
            <div className='single-product__spinner-box'>
                <i className='fa-solid fa-rotate single-product__spinner'></i>
            </div>
        );
    }
}
