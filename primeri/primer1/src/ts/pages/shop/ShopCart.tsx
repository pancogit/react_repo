import { EntityState } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartProduct from '../../components/CartProduct';
import Order from '../../components/Order';

import {
    CartProduct as CartProductState,
    selectAllCartProducts,
} from '../../slices/cartSlice';

import { StoreState } from '../../store/store';

export default function ShopCart() {
    const cartProductsEntityAdapter = useSelector<
        StoreState,
        EntityState<CartProductState>
    >(state => state.cart.cartProductsEntityAdapter);

    // get all cart products with entity adapter pre defined selector
    const cartProducts = selectAllCartProducts(cartProductsEntityAdapter);

    return (
        <div className='shop-cart'>
            <div className='shop-cart__content-wrapper'>
                <div className='shop-cart__items-wrapper'>
                    <h2 className='shop-cart__heading main__heading'>
                        Shop Cart
                    </h2>
                    <div className='shop-cart__products'>
                        <h3 className='shop-cart__product-heading shop-cart__product-heading--details'>
                            Product Details
                        </h3>
                        <h3 className='shop-cart__product-heading'>Quantity</h3>
                        <h3 className='shop-cart__product-heading shop-cart__product-heading--money'>
                            Price
                        </h3>
                        <h3 className='shop-cart__product-heading shop-cart__product-heading--money'>
                            Total
                        </h3>
                    </div>
                    <div className='shop-cart__items'>
                        {cartProducts.map(singleProduct => (
                            <CartProduct
                                key={singleProduct.product.id}
                                cartProduct={singleProduct}
                            />
                        ))}
                    </div>
                </div>
                <div className='shop-cart__order-wrapper'>
                    <Order />
                </div>
            </div>

            <div className='shop-cart__continue'>
                <Link to='/shop-page' className='shop-cart__shopping-link'>
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
