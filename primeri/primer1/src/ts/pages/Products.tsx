import { Navigate, Route, Routes } from 'react-router-dom';
import SingleProduct from './SingleProduct';

export default function Products() {
    const imagePath = '/images/mens/jackets/04.jpg';

    return (
        <Routes>
            <Route
                path=':category/:kind/:specific'
                element={
                    <SingleProduct
                        image={imagePath}
                        price={{ old: 15, new: 12 }}
                        /* price={{ old: 15, new: [12, 28] }}
                        price={{ new: 12 }} */
                    />
                }
            />
            <Route path='*' element={<Navigate to='/shop-page' />} />
        </Routes>
    );
}
