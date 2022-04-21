import { EntityState } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CartProduct,
    checkoutCartProducts,
    removeAllCartProducts,
    selectAllCartProducts,
} from '../slices/cartSlice';
import { Delivery } from '../slices/deliverySlice';
import { DispatchType, StoreState } from '../store/store';
import DeliverySelect from './DeliverySelect';
import CheckoutDialog from './CheckoutDialog';

export default function Order() {
    const totalPrice = useSelector<StoreState, number>(
        state => state.cart.totalPrice
    );

    const cartProductsMap = useSelector<StoreState, EntityState<CartProduct>>(
        state => state.cart.cartProductsEntityAdapter
    );

    const dispatch = useDispatch<DispatchType>();

    const cartProductsArray = selectAllCartProducts(cartProductsMap);
    const numberOfCartProducts = cartProductsArray.length;

    const [openPromotion, setOpenPromotion] = useState(false);
    const [promotionInput, setPromotionInput] = useState('');

    const [currentDelivery, setCurrentDelivery] = useState<
        Delivery | undefined
    >();

    const [openModal, setOpenModal] = useState(false);

    function updateDelivery(delivery: Delivery) {
        setCurrentDelivery(delivery);
    }

    // disable checkout button if there are no products in the cart
    const checkoutButtonClass = numberOfCartProducts
        ? 'order__checkout'
        : 'order__checkout order__checkout--disabled';

    // open promotion if promotion is clicked and if there are products
    // in the cart, otherwise close promotion
    const promotionCodeWrapperClass =
        openPromotion && numberOfCartProducts
            ? 'order__promotion-code-wrapper order__promotion-code-wrapper--open'
            : 'order__promotion-code-wrapper order__promotion-code-wrapper--close';

    // disable order promotion if there are no products in the cart
    const orderPromotionClass = numberOfCartProducts
        ? 'order__promotion'
        : 'order__promotion order__promotion--disabled';

    // when promotion is clicked, open / close promotion input and also clear it
    // if there are no products in cart, then disable promotion by closing it
    function promotionClicked() {
        let promotionFlag = numberOfCartProducts ? !openPromotion : false;

        setOpenPromotion(promotionFlag);
        setPromotionInput('');
    }

    function promotionInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setPromotionInput(event.target.value);
    }

    // if all products are removed from cart, then checkout button is disabled
    // and promotion is closed, but promotion input can still hold some value
    // clear promotion input value if there are no products in the cart and
    // if promotion input already has some value
    useEffect(() => {
        if (!numberOfCartProducts && promotionInput.length) {
            setPromotionInput('');
        }
    }, [numberOfCartProducts, promotionInput]);

    // try to do checkout by opening modal window with yes / no question
    // don't open modal window if there are no products in the cart
    function tryCheckout() {
        if (numberOfCartProducts) setOpenModal(true);
    }

    // checkout cart if it's required and close modal window
    // if checkout is done, then clear cart also
    function checkoutCart(checkout: boolean) {
        if (checkout && currentDelivery) {
            // remove possible whitespaces from the beginning and end of
            // promotional code and if if it's not empty, then dispatch it
            let promotionalCodeTrimmed = promotionInput.trim();
            let promotionalCode = promotionalCodeTrimmed.length
                ? promotionalCodeTrimmed
                : undefined;

            dispatch(
                checkoutCartProducts(
                    cartProductsArray,
                    currentDelivery,
                    totalPrice + currentDelivery.cost,
                    promotionalCode
                )
            );

            dispatch(removeAllCartProducts());
        }

        setOpenModal(false);
    }

    return (
        <div className='order'>
            <h2 className='order__heading'>Order Summary</h2>
            <div className='order__items'>
                <span className='order__heading-text'>
                    Items: {numberOfCartProducts}
                </span>
                <span className='order__items-price'>&pound;{totalPrice}</span>
            </div>
            <div className='order__heading-text'>Shipping</div>
            <div className='order__delivery'>
                <DeliverySelect updateDelivery={updateDelivery} />
            </div>
            <div className='order__items'>
                <span className='order__heading-text'>Total Cost</span>
                {currentDelivery && (
                    <span className='order__items-price'>
                        &pound;{totalPrice + currentDelivery.cost}
                    </span>
                )}
            </div>
            <button className={checkoutButtonClass} onClick={tryCheckout}>
                Checkout
            </button>
            <div className='order__promotion-wrapper'>
                <div className={orderPromotionClass} onClick={promotionClicked}>
                    <span className='order__promotion-text'>
                        Promotional Code
                    </span>
                    <i className='fa-solid fa-plus order__promotion-plus'></i>
                </div>
                <div className={promotionCodeWrapperClass}>
                    <input
                        type='text'
                        name='promotion-code'
                        className='order__promotion-code'
                        value={promotionInput}
                        onChange={promotionInputChanged}
                    />
                </div>
            </div>

            {openModal && <CheckoutDialog checkoutCart={checkoutCart} />}
        </div>
    );
}
