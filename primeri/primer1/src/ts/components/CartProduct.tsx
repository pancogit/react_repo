import { Link } from 'react-router-dom';
import { Colors } from './ColorSelect';
import QuantitySelect from './QuantitySelect';
import { Sizes } from './SizeSelect';

interface Props {
    image: Image;
    heading: string;
    color: Colors;
    size: Sizes;
    productCode: number;
    price: number;
}

interface Image {
    link: string;
    path: string;
}

export default function CartProduct(props: Props) {
    const { image, heading, color, size, productCode, price } = props;

    return (
        <div className='cart-product cart-product--margin'>
            <div className='cart-product__image-wrapper'>
                <div className='cart-product__image-box'>
                    <Link to={image.link} className='cart-product__image-link'>
                        <img
                            src={image.path}
                            alt='cart product'
                            className='cart-product__image'
                        />
                    </Link>
                </div>

                <div className='cart-product__info'>
                    <Link to={image.link} className='cart-product__link'>
                        <h3 className='cart-product__heading'>{heading}</h3>
                    </Link>
                    <div className='cart-product__types'>
                        <span className='cart-product__type'>Color:</span>
                        <span className='cart-product__kind'>{color}</span>
                    </div>
                    <div className='cart-product__types'>
                        <span className='cart-product__type'>Size:</span>
                        <span className='cart-product__kind'>{size}</span>
                    </div>
                    <div className='cart-product__types'>
                        <span className='cart-product__type cart-product__type--capitalize'>
                            Product Code:
                        </span>
                        <span className='cart-product__kind'>
                            {productCode}
                        </span>
                    </div>
                </div>
            </div>

            <div className='cart-product__quantity'>
                <QuantitySelect />
                <div className='cart-product__edit'>Remove</div>
            </div>
            <div className='cart-product__cost'>
                <div className='cart-product__money'>&pound;{price}</div>
            </div>
            <div className='cart-product__cost'>
                <div className='cart-product__money cart-product__money--margin'>
                    &pound;70.00
                </div>
                <Link
                    to={image.link}
                    className='cart-product__edit cart-product__edit--left'
                >
                    Edit
                </Link>
            </div>
        </div>
    );
}
