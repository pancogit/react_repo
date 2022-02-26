import { Link } from 'react-router-dom';
import ColorSelect from '../components/ColorSelect';
import Description from '../components/Description';
import { Price } from '../components/Product';
import Quantity from '../components/Quantity';
import SizeSelect from '../components/SizeSelect';
import Stars from '../components/Stars';

interface Props {
    image: string;
    price: Price;
}

export default function SingleProduct(props: Props) {
    const { image, price } = props;

    return (
        <div className='single-product'>
            <div className='single-product__info'>
                <div className='single-product__picture'>
                    <img
                        src={image}
                        alt='single product'
                        className='single-product__image'
                    />
                </div>
                <div className='single-product__details'>
                    <h2 className='single-product__heading main__heading'>
                        Single Product Page
                    </h2>
                    <div className='single-product__rating'>
                        <Stars isEditable={true} />
                        <Link to='' className='single-product__reviews-link'>
                            (5 customer reviews)
                        </Link>
                    </div>
                    <div className='single-product__price'>
                        {price.old && (
                            <span className='single-product__old-price'>
                                &pound;{price.old}
                            </span>
                        )}
                        {typeof price.new === 'number' ? (
                            <span className='single-product__new-price'>
                                &pound;{price.new}
                            </span>
                        ) : (
                            <span className='single-product__new-price'>
                                &pound;{price.new[0]} - &pound;
                                {price.new[1]}
                            </span>
                        )}
                    </div>
                    <p className='single-product__text'>
                        Excerpt Pellentesque habitant morbi tristique senectus
                        et netus et malesuada fames ac turpis egestas.
                        Vestibulum tortor quam, feugiat vitae, ultricies eget,
                        tempor sit amet, ante. Donec eu libero sit amet quam
                        egestas semper. Aenean ultricies mi vitae est. Mauris
                        placerat eleifend leo.
                    </p>
                    <div className='single-product__color'>
                        <span className='single-product__color-text'>
                            Color
                        </span>
                        <ColorSelect />
                    </div>
                    <div className='single-product__size'>
                        <span className='single-product__size-text'>Size</span>
                        <SizeSelect />
                    </div>
                    <div className='single-product__quantity'>
                        <Quantity />
                        <button className='single-product__add-cart'>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
            <div className='single-product__description'>
                <Description />
            </div>
        </div>
    );
}
