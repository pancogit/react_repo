import { Route, Routes } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import About from './About';
import Blog1 from './blog/Blog1';
import Blog2 from './blog/Blog2';
import Blog3 from './blog/Blog3';
import Blog4 from './blog/Blog4';
import Causes from './Causes';
import Contact from './Contact';
import GalleryLinks from './gallery/GalleryLinks';
import GalleryPictures from './gallery/GalleryPictures';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Pages1 from './pages/Pages1';
import Pages2 from './pages/Pages2';
import Pages3 from './pages/Pages3';
import ShopCart from './shop/ShopCart';
import ShopPage from './shop/ShopPage';

export default function Main() {
    return (
        <main className='main'>
            <Breadcrumbs />

            <div className='content'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='causes' element={<Causes />} />
                    <Route path='pages-1' element={<Pages1 />} />
                    <Route path='pages-2' element={<Pages2 />} />
                    <Route path='pages-3' element={<Pages3 />} />
                    <Route
                        path='gallery-pictures'
                        element={<GalleryPictures />}
                    />
                    <Route path='gallery-links' element={<GalleryLinks />} />
                    <Route path='shop-page' element={<ShopPage />} />
                    <Route path='shop-cart' element={<ShopCart />} />
                    <Route path='blog-1' element={<Blog1 />} />
                    <Route path='blog-2' element={<Blog2 />} />
                    <Route path='blog-3' element={<Blog3 />} />
                    <Route path='blog-4' element={<Blog4 />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </div>
        </main>
    );
}
