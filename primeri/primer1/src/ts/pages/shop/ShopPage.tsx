import Cart from '../../components/Cart';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import Product from '../../components/Product';
import Search from '../../components/Search';
import SelectList from '../../components/SelectList';
import TagsCloud from '../../components/TagsCloud';
import TopProducts from '../../components/TopProducts';

export default function ShopPage() {
    return (
        <div className='shop-page'>
            <i className='fa-solid fa-bars shop-page__hamburger-menu'></i>
            <aside className='shop-page__aside'>
                <Search />
                <Cart />
                <Filter />
                <TopProducts />
                <TagsCloud />
            </aside>

            <div className='shop-page__content'>
                <div className='shop-page__header'>
                    <h2 className='shop-page__heading main__heading'>
                        Shop Page
                    </h2>
                    <div className='shop-page__filters'>
                        <p className='shop-page__showing'>
                            Showing 1-7 of 84 results
                        </p>
                        <SelectList />
                    </div>
                </div>
                <div className='shop-page__products'>
                    <Product
                        sale={true}
                        heading='Flying Ninja'
                        price={{ old: 15, new: [12, 28] }}
                        image='/images/mens/jackets/05.jpeg'
                        link='/products/mens/jackets/05'
                    />
                    <Product
                        heading='Premium Quality'
                        price={{ old: 15, new: 12 }}
                        image='/images/mens/jackets/04.jpg'
                        link='/products/mens/jackets/04'
                        addedToCart={true}
                    />
                    <Product
                        heading='Ship Your Idea'
                        price={{ old: 15, new: 12 }}
                        image='/images/mens/jackets/03.jpg'
                        link='/products/mens/jackets/03'
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ new: 12 }}
                        image='/images/mens/jackets/09.jpeg'
                        link='/products/mens/jackets/09'
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ new: 12 }}
                        image='/images/mens/shirts/01.jpg'
                        link='/products/mens/shirts/01'
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ new: 12 }}
                        image='/images/mens/shirts/02.jpg'
                        link='/products/mens/shirts/02'
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                        image='/images/mens/shirts/05.jpg'
                        link='/products/mens/shirts/05'
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                        image='/images/mens/shirts/06.jpg'
                        link='/products/mens/shirts/06'
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                        image='/images/mens/shirts/08.jpg'
                        link='/products/mens/shirts/08'
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                        image='/images/mens/shirts/14.jpg'
                        link='/products/mens/shirts/14'
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                        image='/images/mens/shirts/15.jpg'
                        link='/products/mens/shirts/15'
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                        image='/images/mens/jackets/04.jpg'
                        link='/products/mens/shirts/04'
                    />
                </div>
                <div className='shop-page__pagination'>
                    <Pagination />
                </div>
            </div>
        </div>
    );
}
