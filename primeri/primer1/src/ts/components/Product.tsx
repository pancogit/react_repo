import { Link } from 'react-router-dom';
import Stars from './Stars';

interface Props {
    heading: string;
    price: Price;
    sale?: boolean;
    image: string;
}

interface Price {
    old: number;
    new: number | [number, number];
}

export default function Product(props: Props) {
    const { heading, price, sale = false, image } = props;

    return (
        <article className='product'>
            <Link to='' className='product__image-wrapper'>
                <div
                    className='product__image'
                    style={{ backgroundImage: `url(${image})`, color: 'white' }}
                ></div>
                {sale && (
                    <img
                        src='images/sale.png'
                        alt='sale'
                        className='product__sale'
                    />
                )}
            </Link>
            <div className='product__bottom'>
                <div className='product__info'>
                    <Link to='' className='product__heading-wrapper'>
                        <h4 className='product__heading'>{heading}</h4>
                    </Link>
                    <Stars />
                </div>
                <button className='product__button'>
                    <p className='product__price'>
                        <span className='product__old-price'>
                            &pound;{price.old}
                        </span>
                        {typeof price.new === 'number' ? (
                            <span className='product__new-price'>
                                &pound;{price.new}
                            </span>
                        ) : (
                            <span className='product__new-price'>
                                &pound;{price.new[0]} - &pound;{price.new[1]}
                            </span>
                        )}
                    </p>
                    <i className='fa-solid fa-cart-plus product__cart'></i>
                </button>
            </div>
            <div className='product__line'></div>
        </article>
    );
}
