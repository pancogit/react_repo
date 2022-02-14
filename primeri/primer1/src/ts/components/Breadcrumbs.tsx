import { Link } from 'react-router-dom';

export default function Breadcrumbs() {
    return (
        <div className='breadcrumbs'>
            <div className='content'>
                <ul className='breadcrumbs__list'>
                    <li className='breadcrumbs__item'>
                        <Link to='/' className='breadcrumbs__link'>
                            Home
                        </Link>
                    </li>
                    <li className='breadcrumbs__item'>
                        <Link to='/bread' className='breadcrumbs__link'>
                            Bread
                        </Link>
                    </li>
                    <li className='breadcrumbs__item'>
                        <Link to='/bread/crumbs' className='breadcrumbs__link'>
                            Crumbs
                        </Link>
                    </li>
                </ul>
                <div className='breadcrumbs__box'>
                    <i className='fa-solid fa-circle-chevron-up breadcrumbs__icon'></i>
                    <span className='breadcrumbs__hide'>Hide</span>
                </div>
            </div>
        </div>
    );
}
