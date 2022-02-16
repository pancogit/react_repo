import { Link } from 'react-router-dom';
import flyingNinja from '../../images/mens/shirts/01.jpg';
import saleImage from '../../images/sale.png';
import Stars from './Stars';

interface Props {
    heading: string;
    price: Price;
    sale?: boolean;
}

interface Price {
    old: number;
    new: number | [number, number];
}

export default function Product({ heading, price, sale = false }: Props) {
    return (
        <article className='product'>
            <Link to='' className='product__image-wrapper'>
                <img
                    src={flyingNinja}
                    alt='product'
                    width={150}
                    height='auto'
                    className='product__image'
                />
                {sale && (
                    <img
                        src={saleImage}
                        alt='sale'
                        width={40}
                        height='auto'
                        className='product__sale'
                    />
                )}
            </Link>
            <div className='product__info'>
                <h4 className='product__heading'>{heading}</h4>
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
        </article>
    );
}
