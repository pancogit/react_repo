import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
    const [openHamburgerMenu, setOpenHamburgerMenu] = useState(false);
    let navigationClass = 'navigation';

    // add modifier class when hamburger menu is opened
    if (openHamburgerMenu) navigationClass += ' navigation--hamburger-menu';

    function hamburgerMenuClicked() {
        setOpenHamburgerMenu(!openHamburgerMenu);
    }

    function closeHamburgerMenu() {
        setOpenHamburgerMenu(false);
    }

    // add side effect for closing hamburger menu on escape keyboard button
    useEffect(() => {
        function closeMenu(event: KeyboardEvent) {
            if (event.key === 'Escape') closeHamburgerMenu();
        }

        window.addEventListener('keydown', closeMenu);

        // cleanup function for removing event listener when component is unmounted
        return () => window.removeEventListener('keydown', closeMenu);
    }, []);

    // don't clean query strings if they exist if submenu heading link is clicked
    function preventDefaultLink(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
    }

    return (
        <nav className={navigationClass}>
            <ul className='navigation__list'>
                <li className='navigation__item'>
                    <Link
                        to='/about'
                        className='navigation__link'
                        onClick={closeHamburgerMenu}
                    >
                        About
                    </Link>
                </li>
                <li className='navigation__item'>
                    <Link
                        to='/causes'
                        className='navigation__link'
                        onClick={closeHamburgerMenu}
                    >
                        Causes
                    </Link>
                </li>
                <li className='navigation__menu'>
                    <Link
                        to='#'
                        className='navigation__link'
                        onClick={preventDefaultLink}
                    >
                        Pages{' '}
                        <i className='fa-solid fa-angle-down navigation__arrow'></i>
                    </Link>
                    <ul className='navigation__submenu'>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/projects'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Projects
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/volunteers'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Volunteers
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/partners'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Partners
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='navigation__menu'>
                    <Link
                        to='#'
                        className='navigation__link'
                        onClick={preventDefaultLink}
                    >
                        Gallery{' '}
                        <i className='fa-solid fa-angle-down navigation__arrow'></i>
                    </Link>
                    <ul className='navigation__submenu'>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/gallery-pictures'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Gallery Pictures
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/gallery-links'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Gallery Links
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='navigation__menu'>
                    <Link
                        to='#'
                        className='navigation__link'
                        onClick={preventDefaultLink}
                    >
                        Shop{' '}
                        <i className='fa-solid fa-angle-down navigation__arrow'></i>
                    </Link>
                    <ul className='navigation__submenu'>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/shop-page'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Shop Page
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/shop-cart'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Shop Cart
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='navigation__menu'>
                    <Link
                        to='#'
                        className='navigation__link'
                        onClick={preventDefaultLink}
                    >
                        Blog{' '}
                        <i className='fa-solid fa-angle-down navigation__arrow'></i>
                    </Link>
                    <ul className='navigation__submenu'>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/blog-1'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Blog 1
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/blog-2'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Blog 2
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/blog-3'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Blog 3
                            </Link>
                        </li>
                        <li className='navigation__submenu-item'>
                            <Link
                                to='/blog-4'
                                className='navigation__link'
                                onClick={closeHamburgerMenu}
                            >
                                Blog 4
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='navigation__item'>
                    <Link
                        to='/contact'
                        className='navigation__link'
                        onClick={closeHamburgerMenu}
                    >
                        Contact
                    </Link>
                </li>
            </ul>
            <i
                className='fa-solid fa-bars navigation__hamburger-menu'
                onClick={hamburgerMenuClicked}
            ></i>
            <i
                className='fa-solid fa-xmark navigation__hamburger-close'
                onClick={closeHamburgerMenu}
            ></i>
        </nav>
    );
}
