import { Link } from 'react-router-dom';

import ninjaSilhouette from '../../images/mens/shirts/01.jpg';
import shipYourIdea from '../../images/mens/shirts/02.jpg';

export default function Cart() {
    return (
        <div className='cart cart--margin'>
            <div className='cart__header'>
                <h3 className='cart__heading'>Your Cart</h3>
                <Link to='/shop-cart' className='cart__link'>
                    <i className='fa-solid fa-cart-shopping cart__icon'></i>
                </Link>
            </div>
            <div className='cart__items'>
                <div className='cart__item'>
                    <div className='cart__image-wrapper'>
                        <Link to='cart-item-1' className='cart__item-link'>
                            <img
                                src={ninjaSilhouette}
                                alt='cart product'
                                className='cart__image'
                                width={100}
                                height='auto'
                            />
                        </Link>
                    </div>
                    <div className='cart__info'>
                        <Link to='cart-item-1' className='cart__item-link'>
                            <p className='cart__name'>Ninja Silhouette</p>
                        </Link>
                        <p className='cart__order'>
                            <span className='cart__quantity'>2 x</span>
                            <span className='cart__pounds'>&pound;12.00</span>
                        </p>
                    </div>
                </div>
                <div className='cart__item'>
                    <div className='cart__image-wrapper'>
                        <Link to='cart-item-2' className='cart__item-link'>
                            <img
                                src={shipYourIdea}
                                alt='cart product'
                                className='cart__image'
                                width={100}
                                height='auto'
                            />
                        </Link>
                    </div>
                    <div className='cart__info'>
                        <Link to='cart-item-2' className='cart__item-link'>
                            <p className='cart__name'>Ship Your Idea</p>
                        </Link>
                        <p className='cart__order'>
                            <span className='cart__quantity'>1 x</span>
                            <span className='cart__pounds'>&pound;12.00</span>
                        </p>
                    </div>
                </div>
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
