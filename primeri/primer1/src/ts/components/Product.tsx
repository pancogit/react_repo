import { EntityState } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    addCartProduct,
    CartProduct,
    selectByIdCartProduct,
} from '../slices/cartSlice';
import { ProductType } from '../slices/productsSlice';
import { DispatchType, StoreState } from '../store/store';
import Stars from './Stars';

interface Props {
    id: string;
    heading: string;
    price: Price;
    sale?: boolean;
    image: string;
    link: string;
    numberOfStars: number;
    product: ProductType;
}

export interface Price {
    old?: number;
    new: number | [number, number];
}

export default function Product(props: Props) {
    const {
        id,
        heading,
        price,
        sale = false,
        image,
        link,
        numberOfStars,
        product,
    } = props;

    const [addedToCart, setAddedToCart] = useState(false);

    const cart = useSelector<StoreState, EntityState<CartProduct>>(
        state => state.cart
    );

    // find product by id
    const cartProduct = selectByIdCartProduct(cart, id);

    const dispatch = useDispatch<DispatchType>();

    // choose between added to cart button and normal buy button
    const addButton = addedToCart ? (
        <Link to='/shop-cart' className='product__button-cart'>
            <button className='product__button product__button--added'>
                <p className='product__price'>
                    <span className='product__new-price'>Added to cart</span>
                </p>
                <i className='fa-solid fa-circle-check product__cart'></i>
            </button>
        </Link>
    ) : (
        <button className='product__button' onClick={addProductToCart}>
            <p className='product__price'>
                {price.old && (
                    <span className='product__old-price'>
                        &pound;{price.old}
                    </span>
                )}
                {typeof price.new === 'number' ? (
                    <span className='product__new-price'>
                        &pound;{price.new}
                    </span>
                ) : (
                    <span className='product__new-price'>
                        &pound;{price.new[0]} - &pound;
                        {price.new[1]}
                    </span>
                )}
            </p>
            <i className='fa-solid fa-cart-plus product__cart'></i>
        </button>
    );

    function addProductToCart() {
        dispatch(
            addCartProduct({
                color: 'Default',
                size: 'Default',
                quantity: 1,
                product,
            })
        );
    }

    // when product is added or removed from the cart, change local state of product
    useEffect(() => {
        if (cartProduct) setAddedToCart(true);
        else setAddedToCart(false);
    }, [cartProduct]);

    return (
        <article className='product'>
            <Link to={link} className='product__image-wrapper'>
                <div
                    className='product__image'
                    style={{ backgroundImage: `url(${image})`, color: 'white' }}
                ></div>
                {sale && (
                    <img
                        src='/images/sale.png'
                        alt='sale'
                        className='product__sale'
                    />
                )}
            </Link>
            <div className='product__bottom'>
                <div className='product__info'>
                    <Link to={link} className='product__heading-wrapper'>
                        <h4 className='product__heading'>{heading}</h4>
                    </Link>
                    <Stars numberOfStars={numberOfStars} />
                </div>
                {addButton}
            </div>
            <div className='product__line'></div>
        </article>
    );
}
