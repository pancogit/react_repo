import { EntityState } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartProduct, selectAllCartProducts } from '../slices/cartSlice';
import { StoreState } from '../store/store';

export default function Cart() {
    const cart = useSelector<StoreState, EntityState<CartProduct>>(
        state => state.cart
    );

    const cartProducts = selectAllCartProducts(cart);

    return (
        <div className='cart cart--margin'>
            <div className='cart__header'>
                <h3 className='cart__heading shop-page__aside-heading'>
                    Your Cart
                </h3>
                <Link to='/shop-cart' className='cart__link'>
                    <i className='fa-solid fa-cart-shopping cart__icon'></i>
                </Link>
            </div>
            <div className='cart__items'>
                {cartProducts.length ? (
                    cartProducts.map(singleProduct => (
                        <div
                            className='cart__item'
                            key={singleProduct.product.id}
                        >
                            <div className='cart__image-wrapper'>
                                <Link
                                    to={singleProduct.product.link}
                                    className='cart__item-link'
                                >
                                    <img
                                        src={singleProduct.product.path}
                                        alt='cart product'
                                        className='cart__image'
                                        width={80}
                                        height='auto'
                                    />
                                </Link>
                            </div>
                            <div className='cart__info'>
                                <Link
                                    to={singleProduct.product.link}
                                    className='cart__item-link'
                                >
                                    <p className='cart__name'>
                                        {singleProduct.product.name}
                                    </p>
                                </Link>
                                <p className='cart__order'>
                                    <span className='cart__quantity'>
                                        {singleProduct.quantity} x
                                    </span>

                                    <span className='cart__pounds'>
                                        {typeof singleProduct.product.price
                                            .new === 'number' ? (
                                            <>
                                                &pound;{' '}
                                                {
                                                    singleProduct.product.price
                                                        .new
                                                }
                                            </>
                                        ) : (
                                            <>
                                                &pound;
                                                {
                                                    singleProduct.product.price
                                                        .new[0]
                                                }{' '}
                                                - &pound;
                                                {
                                                    singleProduct.product.price
                                                        .new[1]
                                                }
                                            </>
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='cart__empty'>Cart is empty</div>
                )}
            </div>
            <div className='cart__total'>
                <p className='cart__subtotal'>Subtotal:</p>
                <p className='cart__price'>&pound;36.00</p>
            </div>
            <div className='cart__buttons'>
                <Link to='/shop-cart' className='cart__buttons-link'>
                    <button className='cart__button-view'>View Cart</button>
                </Link>
                <Link to='/shop-cart' className='cart__buttons-link'>
                    <button className='cart__button-checkout'>
                        <span className='cart__checkout-text'>Checkout</span>
                        <i className='fa-regular fa-credit-card cart__checkout-icon'></i>
                    </button>
                </Link>
            </div>
        </div>
    );
}
