import { Link, useLocation, useNavigate } from 'react-router-dom';
import QuantitySelect from './QuantitySelect';

import {
    CartProduct as CartProductState,
    changeCartProductQuantity,
    removeCartProduct,
} from '../slices/cartSlice';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../store/store';

interface Props {
    cartProduct: CartProductState;
}

export default function CartProduct({ cartProduct }: Props) {
    const { color, size, price, quantity } = cartProduct;
    const { link, path, name, productCode, id } = cartProduct.product;

    // current product quantity
    const [productQuantity, setProductQuantity] = useState(quantity);

    const dispatch = useDispatch<DispatchType>();
    const navigate = useNavigate();
    const location = useLocation();

    const totalPrice = quantity * price;

    // set current selected quantity and dispatch it to the store
    function setQuantity(quantity: number) {
        setProductQuantity(quantity);
        dispatch(changeCartProductQuantity(id, quantity));
    }

    function removeProduct() {
        dispatch(removeCartProduct(id));
    }

    // when product is edited, save current url location to the location state
    // because when product edit is finished, it can redirect to the cart product page again
    function editProduct(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        link: string
    ) {
        // prevent default link behaviour and redirect to the link manually
        event.preventDefault();

        navigate(link, { state: location.pathname });
    }

    return (
        <div className='cart-product cart-product--margin'>
            <div className='cart-product__image-wrapper'>
                <div className='cart-product__image-box'>
                    <Link to={link} className='cart-product__image-link'>
                        <img
                            src={path}
                            alt='cart product'
                            className='cart-product__image'
                        />
                    </Link>
                </div>

                <div className='cart-product__info'>
                    <Link to={link} className='cart-product__link'>
                        <h3 className='cart-product__heading'>{name}</h3>
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
                <QuantitySelect
                    quantity={productQuantity}
                    maximumQuantity={10}
                    setQuantity={setQuantity}
                />
                <div className='cart-product__edit' onClick={removeProduct}>
                    Remove
                </div>
            </div>
            <div className='cart-product__cost'>
                <div className='cart-product__money'>&pound;{price}</div>
            </div>
            <div className='cart-product__cost'>
                <div className='cart-product__money cart-product__money--margin'>
                    &pound;{totalPrice}
                </div>
                <Link
                    to={link}
                    className='cart-product__edit cart-product__edit--left'
                    onClick={event => editProduct(event, link)}
                >
                    Edit
                </Link>
            </div>
        </div>
    );
}
