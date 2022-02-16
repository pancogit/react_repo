import { Link } from 'react-router-dom';

export default function Filter() {
    return (
        <div className='filter'>
            <h3 className='filter__heading'>Filter by Price</h3>
            <input
                type='range'
                name='range-slider'
                className='filter__slider'
            />
            <div className='filter__price-wrapper'>
                <p className='filter__price'>Price</p>
                <p className='filter__pounds'>&pound;75 - &pound;300</p>
            </div>
            <button className='filter__button'>
                <span className='filter__button-text'>Filter</span>
                <i className='fa-solid fa-filter filter__icon'></i>
            </button>

            <ul className='filter__list'>
                <li className='filter__list-item'>
                    <Link to='' className='filter__link'>
                        <span className='filter__link-text'>Mens</span>
                        <span className='filter__link-number'>24</span>
                    </Link>
                    <ul className='filter__submenu'>
                        <li className='filter__list-item'>
                            <Link to='' className='filter__link'>
                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                <span className='filter__link-text'>
                                    Submenu
                                </span>
                                <span className='filter__link-number'>18</span>
                            </Link>
                            <ul className='filter__submenu-list'>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            5
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            10
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            3
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className='filter__list-item'>
                            <Link to='' className='filter__link'>
                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                <span className='filter__link-text'>
                                    Submenu
                                </span>
                                <span className='filter__link-number'>26</span>
                            </Link>
                            <ul className='filter__submenu-list'>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            12
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            14
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className='filter__list-item'>
                            <Link to='' className='filter__link'>
                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                <span className='filter__link-text'>
                                    Submenu
                                </span>
                                <span className='filter__link-number'>22</span>
                            </Link>
                            <ul className='filter__submenu-list'>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            13
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            3
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            4
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            2
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className='filter__list-item'>
                    <Link to='' className='filter__link'>
                        <span className='filter__link-text'>Girls</span>
                        <span className='filter__link-number'>14</span>
                    </Link>
                    <ul className='filter__submenu'>
                        <li className='filter__list-item'>
                            <Link to='' className='filter__link'>
                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                <span className='filter__link-text'>
                                    Submenu
                                </span>
                                <span className='filter__link-number'>18</span>
                            </Link>
                            <ul className='filter__submenu-list'>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            5
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            10
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            3
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className='filter__list-item'>
                            <Link to='' className='filter__link'>
                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                <span className='filter__link-text'>
                                    Submenu
                                </span>
                                <span className='filter__link-number'>26</span>
                            </Link>
                            <ul className='filter__submenu-list'>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            12
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            14
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className='filter__list-item'>
                            <Link to='' className='filter__link'>
                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                <span className='filter__link-text'>
                                    Submenu
                                </span>
                                <span className='filter__link-number'>22</span>
                            </Link>
                            <ul className='filter__submenu-list'>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            13
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            3
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            4
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            2
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className='filter__list-item'>
                    <Link to='' className='filter__link'>
                        <span className='filter__link-text'>Other</span>
                        <span className='filter__link-number'>18</span>
                    </Link>
                    <ul className='filter__submenu'>
                        <li className='filter__list-item'>
                            <Link to='' className='filter__link'>
                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                <span className='filter__link-text'>
                                    Submenu
                                </span>
                                <span className='filter__link-number'>18</span>
                            </Link>
                            <ul className='filter__submenu-list'>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            8
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            10
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className='filter__list-item'>
                            <Link to='' className='filter__link'>
                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                <span className='filter__link-text'>
                                    Submenu
                                </span>
                                <span className='filter__link-number'>26</span>
                            </Link>
                            <ul className='filter__submenu-list'>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            12
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            14
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className='filter__list-item'>
                    <Link to='' className='filter__link'>
                        <span className='filter__link-text'>Accessories</span>
                        <span className='filter__link-number'>22</span>
                    </Link>
                    <ul className='filter__submenu'>
                        <li className='filter__list-item'>
                            <Link to='' className='filter__link'>
                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                <span className='filter__link-text'>
                                    Submenu
                                </span>
                                <span className='filter__link-number'>18</span>
                            </Link>
                            <ul className='filter__submenu-list'>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            8
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            10
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className='filter__list-item'>
                            <Link to='' className='filter__link'>
                                <i className='fa-solid fa-angle-right filter__submenu-arrow'></i>
                                <span className='filter__link-text'>
                                    Submenu
                                </span>
                                <span className='filter__link-number'>26</span>
                            </Link>
                            <ul className='filter__submenu-list'>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            12
                                        </span>
                                    </Link>
                                </li>
                                <li className='filter__list-item'>
                                    <Link to='' className='filter__link'>
                                        <span className='filter__link-text'>
                                            Menu
                                        </span>
                                        <span className='filter__link-number'>
                                            14
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
