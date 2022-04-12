import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ColorSelect from '../components/ColorSelect';
import Description from '../components/Description';
import Quantity from '../components/Quantity';
import SizeSelect from '../components/SizeSelect';
import Stars from '../components/Stars';
import { CategoryState } from '../slices/categoriesSlice';
import { StoreState } from '../store/store';
import { ProductType } from '../slices/productsSlice';

// ':category/:kind/:specific'
type UrlParams = 'category' | 'kind' | 'specific';

export default function SingleProduct() {
    // read url parameters and create product link path
    const params = useParams<UrlParams>();
    const productLink = useRef<string>(
        `/products/${params.category}/${params.kind}/${params.specific}`
    );

    const allProducts = useSelector<StoreState, CategoryState>(
        state => state.products
    );

    const [singleProduct, setSingleProduct] = useState<ProductType>();
    const [productNotFound, setProductNotFound] = useState(false);

    // find product for current product link
    useEffect(() => {
        let currentProduct: ProductType;
        let productFound = false;

        // don't search again if product is already found or if products
        // are still not set to the global store
        if (singleProduct || !allProducts.length) return;

        // search for current single product
        for (let i = 0; i < allProducts.length; i++) {
            if (productFound) break;

            for (let j = 0; j < allProducts[i].subcategories.length; j++) {
                if (productFound) break;

                for (
                    let k = 0;
                    k < allProducts[i].subcategories[j].submenu.length;
                    k++
                ) {
                    if (productFound) break;

                    for (
                        let m = 0;
                        m <
                        allProducts[i].subcategories[j].submenu[k].products
                            .length;
                        m++
                    ) {
                        if (productFound) break;

                        currentProduct =
                            allProducts[i].subcategories[j].submenu[k].products[
                                m
                            ];

                        // when product is found, save it to the local state and finish the search
                        if (currentProduct.link === productLink.current) {
                            productFound = true;
                            setSingleProduct(currentProduct);
                            setProductNotFound(false);

                            break;
                        }
                    }
                }
            }
        }

        // product is not found, show message on the page
        if (!productFound) setProductNotFound(true);
    }, [allProducts, singleProduct]);

    // if current product is found, then render it
    if (singleProduct) {
        const {
            path,
            sale,
            name,
            starsRated,
            comments,
            price,
            text,
            description,
        } = singleProduct;

        return (
            <div className='single-product'>
                <div className='single-product__info'>
                    <div className='single-product__picture'>
                        <img
                            src={path}
                            alt='single product'
                            className='single-product__image'
                        />
                        {sale && (
                            <img
                                src='/images/sale.png'
                                alt='sale'
                                className='single-product__sale'
                            />
                        )}
                    </div>
                    <div className='single-product__details'>
                        <h2 className='single-product__heading main__heading'>
                            {name}
                        </h2>
                        <div className='single-product__rating'>
                            <Stars
                                isEditable={true}
                                numberOfStars={starsRated}
                            />
                            <Link
                                to=''
                                className='single-product__reviews-link'
                            >
                                ({comments.numberOfComments} customer reviews)
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
                        <p className='single-product__text'>{text}</p>
                        <div className='single-product__list'>
                            <span className='single-product__list-text'>
                                Color
                            </span>
                            <div className='single-product__list-select'>
                                <ColorSelect />
                            </div>
                        </div>
                        <div className='single-product__list'>
                            <span className='single-product__list-text'>
                                Size
                            </span>
                            <div className='single-product__list-select'>
                                <SizeSelect />
                            </div>
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
                    <Description
                        description={description}
                        comments={comments}
                    />
                </div>
            </div>
        );
    }

    // show message if product is not found in the global store
    else if (productNotFound) {
        return (
            <div className='single-product__message'>Product not found...</div>
        );
    }

    // render spinner if product is still loading
    else {
        return (
            <div className='single-product__spinner-box'>
                <i className='fa-solid fa-rotate single-product__spinner'></i>
            </div>
        );
    }
}
