import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className='navigation'>
            <ul className='navigation__list'>
                <li className='navigation__item'>
                    <Link to='/about' className='navigation__link'>
                        About
                    </Link>
                </li>
                <li className='navigation__item'>
                    <Link to='/causes' className='navigation__link'>
                        Causes
                    </Link>
                </li>
                <li className='navigation__menu'>
                    <Link to='#' className='navigation__link'>
                        Pages{' '}
                        <i className='fa-solid fa-angle-down navigation__arrow'></i>
                    </Link>
                    <ul className='navigation__submenu'>
                        <li className='navigation__submenu-item'>
                            <Link to='/projects' className='navigation__link'>
                                Projects
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link to='/volunteers' className='navigation__link'>
                                Volunteers
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link to='/partners' className='navigation__link'>
                                Partners
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='navigation__menu'>
                    <Link to='#' className='navigation__link'>
                        Gallery{' '}
                        <i className='fa-solid fa-angle-down navigation__arrow'></i>
                    </Link>
                    <ul className='navigation__submenu'>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/gallery-pictures'
                                className='navigation__link'
                            >
                                Gallery Pictures
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/gallery-links'
                                className='navigation__link'
                            >
                                Gallery Links
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='navigation__menu'>
                    <Link to='#' className='navigation__link'>
                        Shop{' '}
                        <i className='fa-solid fa-angle-down navigation__arrow'></i>
                    </Link>
                    <ul className='navigation__submenu'>
                        <li className='navigation__submenu-item'>
                            <Link to='/shop-page' className='navigation__link'>
                                Shop Page
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link to='/shop-cart' className='navigation__link'>
                                Shop Cart
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='navigation__menu'>
                    <Link to='#' className='navigation__link'>
                        Blog{' '}
                        <i className='fa-solid fa-angle-down navigation__arrow'></i>
                    </Link>
                    <ul className='navigation__submenu'>
                        <li className='navigation__submenu-item'>
                            <Link to='/blog-1' className='navigation__link'>
                                Blog 1
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link to='/blog-2' className='navigation__link'>
                                Blog 2
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link to='/blog-3' className='navigation__link'>
                                Blog 3
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link to='/blog-4' className='navigation__link'>
                                Blog 4
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='navigation__item'>
                    <Link to='/contact' className='navigation__link'>
                        Contact
                    </Link>
                </li>
            </ul>
            <i className='fa-solid fa-bars navigation__hamburger-menu'></i>
            <i className='fa-solid fa-xmark navigation__hamburger-close'></i>
        </nav>
    );
}
