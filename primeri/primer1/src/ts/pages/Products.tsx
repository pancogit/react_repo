import { Navigate, Route, Routes } from 'react-router-dom';
import SingleProduct from './SingleProduct';

export default function Products() {
    const imagePath = '/images/mens/jackets/01.jpg';

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
                        isSale={true}
                    />
                }
            />

            {/* replace current url with new one to not constantly navigate to the new url
                when back button is clicked */}
            <Route
                path='*'
                element={<Navigate to='/shop-page' replace={true} />}
            />
        </Routes>
    );
}
