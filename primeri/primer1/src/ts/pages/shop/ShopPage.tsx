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
            <aside className='shop-page__aside'>
                <Search />
                <Cart />
                <Filter />
                <TopProducts />
                <TagsCloud />
            </aside>

            <div className='shop-page__content'>
                <div className='shop-page__header'>
                    <h2 className='shop-page__heading'>Shop Page</h2>
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
                    />
                    <Product
                        heading='Premium Quality'
                        price={{ old: 15, new: 12 }}
                    />
                    <Product
                        heading='Ship Your Idea'
                        price={{ old: 15, new: 12 }}
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                    />
                    <Product
                        heading='Ninja Silhouette'
                        price={{ old: 15, new: 12 }}
                    />
                </div>
                <div className='shop-page__pagination'>
                    <Pagination />
                </div>
            </div>
        </div>
    );
}
