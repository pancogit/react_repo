import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CategoryState } from '../slices/categoriesSlice';
import { Products, ProductType } from '../slices/productsSlice';
import { StoreState } from '../store/store';
import Stars from './Stars';

interface Props {
    numberOfTopProducts: number;
}

export default function TopProducts({ numberOfTopProducts }: Props) {
    const products = useSelector<StoreState, CategoryState>(
        state => state.products
    );

    const [topProducts, setTopProducts] = useState<Products>([]);

    const findAllProducts = useCallback(() => {
        let allProducts: Products = [];

        products.forEach(product => {
            product.subcategories.forEach(subcategory => {
                subcategory.submenu.forEach(submenu => {
                    submenu.products.forEach(singleProduct => {
                        allProducts.push(singleProduct);
                    });
                });
            });
        });

        return allProducts;
    }, [products]);

    const getTopProducts = useCallback(() => {
        let allProducts: Products = findAllProducts();
        let topProducts: Products = [];

        sortProducts(allProducts);

        // get top products
        for (let i = 0; i < allProducts.length; i++) {
            if (i < numberOfTopProducts) topProducts.push(allProducts[i]);
            else break;
        }

        return topProducts;
    }, [findAllProducts, numberOfTopProducts]);

    // sort products in place by descending order of stars rating
    function sortProducts(allProducts: Products) {
        let tempProduct: ProductType;

        for (let i = 0; i < allProducts.length - 1; i++) {
            for (let j = i + 1; j < allProducts.length; j++) {
                if (allProducts[i].starsRated < allProducts[j].starsRated) {
                    tempProduct = allProducts[i];
                    allProducts[i] = allProducts[j];
                    allProducts[j] = tempProduct;
                }
            }
        }
    }

    // find top products and set it to the local state
    useEffect(() => {
        const topProducts = getTopProducts();

        setTopProducts(topProducts);
    }, [getTopProducts]);

    return (
        <div className='top-products'>
            <h3 className='top-products__heading shop-page__aside-heading'>
                Top Rated Products
            </h3>
            <div className='top-products__products'>
                {topProducts.map((product, index) => (
                    <div className='top-products__product' key={index}>
                        <Link to={product.link} className='top-products__image'>
                            <img
                                src={product.path}
                                alt='product'
                                width={80}
                                height='auto'
                                className='top-products__picture'
                            />
                            {product.sale && (
                                <img
                                    src='/images/sale.png'
                                    alt='sale logo'
                                    width={40}
                                    height='auto'
                                    className='top-products__sale'
                                />
                            )}
                        </Link>
                        <div className='top-products__info'>
                            <Link
                                to={product.link}
                                className='top-products__heading-link'
                            >
                                <h4 className='top-products__heading'>
                                    {product.name}
                                </h4>
                            </Link>
                            <Stars numberOfStars={product.starsRated} />
                            <p className='top-products__price'>
                                {product.price.old && (
                                    <span className='top-products__before'>
                                        &pound;{product.price.old}
                                    </span>
                                )}

                                {typeof product.price.new === 'number' ? (
                                    <span className='top-products__after'>
                                        &pound;{product.price.new}
                                    </span>
                                ) : (
                                    <span className='top-products__after'>
                                        &pound;{product.price.new[0]} - &pound;
                                        {product.price.new[1]}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
