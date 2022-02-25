import { Link } from 'react-router-dom';
import Stars from './Stars';

export default function TopProducts() {
    return (
        <div className='top-products'>
            <h3 className='top-products__heading shop-page__aside-heading'>
                Top Rated Products
            </h3>
            <div className='top-products__products'>
                <div className='top-products__product'>
                    <Link to='product-1' className='top-products__image'>
                        <img
                            src='images/mens/jackets/01.jpg'
                            alt='product'
                            width={80}
                            height='auto'
                            className='top-products__picture'
                        />
                        <img
                            src='images/sale.png'
                            alt='sale logo'
                            width={40}
                            height='auto'
                            className='top-products__sale'
                        />
                    </Link>
                    <div className='top-products__info'>
                        <Link
                            to='product-1'
                            className='top-products__heading-link'
                        >
                            <h4 className='top-products__heading'>
                                Ninja Silhouette
                            </h4>
                        </Link>
                        <Stars />
                        <p className='top-products__price'>
                            <span className='top-products__before'>
                                &pound;15.00
                            </span>
                            <span className='top-products__after'>
                                &pound;12.00
                            </span>
                        </p>
                    </div>
                </div>

                <div className='top-products__product'>
                    <Link to='product-2' className='top-products__image'>
                        <img
                            src='images/mens/jackets/02.jpg'
                            alt='product'
                            width={80}
                            height='auto'
                            className='top-products__picture'
                        />
                    </Link>
                    <div className='top-products__info'>
                        <Link
                            to='product-2'
                            className='top-products__heading-link'
                        >
                            <h4 className='top-products__heading'>
                                Ship Your Idea
                            </h4>
                        </Link>
                        <Stars />
                        <p className='top-products__price'>
                            <span className='top-products__before'>
                                &pound;15.00
                            </span>
                            <span className='top-products__after'>
                                &pound;12.00
                            </span>
                        </p>
                    </div>
                </div>

                <div className='top-products__product'>
                    <Link to='product-3' className='top-products__image'>
                        <img
                            src='images/mens/jackets/03.jpg'
                            alt='product'
                            width={80}
                            height='auto'
                            className='top-products__picture'
                        />
                    </Link>
                    <div className='top-products__info'>
                        <Link
                            to='product-3'
                            className='top-products__heading-link'
                        >
                            <h4 className='top-products__heading'>
                                Premium Quality
                            </h4>
                        </Link>
                        <Stars />
                        <p className='top-products__price'>
                            <span className='top-products__before'>
                                &pound;15.00
                            </span>
                            <span className='top-products__after'>
                                &pound;12.00
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
