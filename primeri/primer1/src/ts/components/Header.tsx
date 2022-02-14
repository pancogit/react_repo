import Logo from './Logo';
import Navigation from './Navigation';
import Searchbar from './Searchbar';
import Social from './Social';

export default function Header() {
    return (
        <header className='header'>
            <div className='header__top'>
                <div className='content'>
                    <div className='header__top-wrapper'>
                        <p className='header__number'>
                            8 093{' '}
                            <span className='header__number-bold'>
                                852 12 48
                            </span>
                        </p>
                        <div className='header__info'>
                            <div className='header__user'>
                                <i className='fa-solid fa-envelope'></i>
                                <p className='header__email'>
                                    generosity@gmail.com
                                </p>
                                <p className='header__username'>John Doe</p>
                            </div>
                            <Social />
                            <Searchbar />
                        </div>
                    </div>
                </div>
            </div>
            <div className='header__content'>
                <div className='content'>
                    <div className='header__content-wrapper'>
                        <Logo imageWidth={50} />
                        <Navigation />
                        <div className='header__donate'>Donate Now</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
