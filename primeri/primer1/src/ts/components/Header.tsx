import { useSelector } from 'react-redux';
import { User } from '../slices/userSlice';
import { StoreState } from '../store/store';
import Logo from './Logo';
import Navigation from './Navigation';
import Searchbar from './Searchbar';
import Social from './Social';

export default function Header() {
    const { email, username } = useSelector<StoreState, User>(
        state => state.user
    );

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
                                <i className='fa-solid fa-envelope header__letter'></i>
                                <p className='header__email'>{email}</p>
                                <p className='header__username'>{username}</p>
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
                        <Logo imageWidth={60} />
                        <Navigation />
                        <div className='header__donate-wrapper'>
                            <div className='header__donate'>Donate Now</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
