import { Link } from 'react-router-dom';
import Email from './Email';
import Social from './Social';

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='content'>
                <div className='footer__sections'>
                    <section className='footer__section'>
                        <h3 className='footer__heading'>About Us</h3>
                        <div className='footer__lists'>
                            <ul className='footer__list'>
                                <li className='footer__list-item'>
                                    <Link to='/about' className='footer__link'>
                                        About Event
                                    </Link>
                                </li>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/projects'
                                        className='footer__link'
                                    >
                                        Current Projects
                                    </Link>
                                </li>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/volunteers'
                                        className='footer__link'
                                    >
                                        Our Volunteers
                                    </Link>
                                </li>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/partners'
                                        className='footer__link'
                                    >
                                        Our Partners
                                    </Link>
                                </li>
                            </ul>
                            <ul className='footer__list'>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/gallery-pictures'
                                        className='footer__link'
                                    >
                                        Our Gallery
                                    </Link>
                                </li>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/shop-page'
                                        className='footer__link'
                                    >
                                        Our Shop
                                    </Link>
                                </li>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/contact'
                                        className='footer__link'
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className='footer__section'>
                        <h3 className='footer__heading'>Latest Tweet</h3>
                        <p className='footer__text'>
                            Quisque ut nisi. Donec mi odio, faucibus at,
                            scelerisque quis, convallis in, nisi. Suspendisse
                            non nisl. <br />
                            <a
                                href='http://t.co/abcde'
                                target='_blank'
                                className='footer__redirect'
                            >
                                http://t.co/abcde
                            </a>
                        </p>
                        <div className='footer__tweet'>
                            <i className='fa-brands fa-twitter-square footer__tweet-icon'></i>
                            <p className='footer__latest-tweet'>
                                January 22, 214 8:24 am
                                <br />
                                By:{' '}
                                <a
                                    href='https://www.twitter.com'
                                    target='_blank'
                                    className='footer__redirect footer__redirect--small'
                                >
                                    @YourTwitter
                                </a>
                            </p>
                        </div>
                    </section>

                    <section className='footer__section'>
                        <h3 className='footer__heading'>Subscribe</h3>
                        <p className='footer__text'>
                            Quisque ut nisi. Donec mi odio, faucibus at,
                            scelerisque quis, convallis in, nisi. Suspendisse
                            non nisl.
                        </p>
                        <Email />
                    </section>
                </div>
            </div>

            <div className='footer__bottom'>
                <div className='content'>
                    <div className='footer__bottom-wrapper'>
                        <div className='footer__copy-wrapper'>
                            <p className='footer__copyright'>
                                &copy; Created by{' '}
                                <a
                                    href='https://www.webinvader.com'
                                    target='_blank'
                                    className='footer__redirect footer__redirect--small'
                                >
                                    wwwebinvader
                                </a>
                            </p>
                            <p className='footer__news'>Get news by E-mail</p>
                        </div>
                        <div className='footer__social'>
                            <Link to='/contact' className='footer__join'>
                                Join Us
                            </Link>
                            <Social />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
