import { Link } from 'react-router-dom';
import Stars from './Stars';

interface Props {
    heading: string;
    price: Price;
    sale?: boolean;
    image: string;
    addedToCart?: boolean;
    link: string;
    numberOfStars: number;
}

export interface Price {
    old?: number;
    new: number | [number, number];
}

export default function Product(props: Props) {
    const {
        heading,
        price,
        sale = false,
        image,
        addedToCart = false,
        link,
        numberOfStars,
    } = props;

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
        <button className='product__button'>
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
