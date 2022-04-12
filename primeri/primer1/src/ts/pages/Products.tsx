import { Navigate, Route, Routes } from 'react-router-dom';
import SingleProduct from './SingleProduct';

export default function Products() {
    return (
        <Routes>
            <Route
                path=':category/:kind/:specific'
                element={<SingleProduct />}
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
