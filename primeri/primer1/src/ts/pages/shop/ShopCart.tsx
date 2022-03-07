import { Link } from 'react-router-dom';
import CartProduct from '../../components/CartProduct';
import Order from '../../components/Order';

export default function ShopCart() {
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
                        <CartProduct
                            image={{
                                link: '/products/mens/jackets/01',
                                path: '/images/mens/jackets/01.jpg',
                            }}
                            heading='Hommed Light Jumper'
                            color='Blue'
                            size='XS'
                            productCode={185721}
                            price={35}
                        />
                        <CartProduct
                            image={{
                                link: '/products/mens/jackets/09',
                                path: '/images/mens/jackets/09.jpeg',
                            }}
                            heading='Jacket Men'
                            color='Black'
                            size='L'
                            productCode={548865}
                            price={55}
                        />
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
