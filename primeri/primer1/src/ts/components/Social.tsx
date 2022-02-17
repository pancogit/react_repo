export default function Social() {
    return (
        <ul className='social'>
            <li className='social__item'>
                <a
                    href='https://www.twitter.com'
                    target='_blank'
                    rel='noreferrer'
                    className='social__link'
                >
                    <i className='fa-brands fa-twitter social__icon'></i>
                </a>
            </li>
            <li className='social__item'>
                <a
                    href='https://www.facebook.com'
                    target='_blank'
                    rel='noreferrer'
                    className='social__link'
                >
                    <i className='fa-brands fa-facebook-f social__icon'></i>
                </a>
            </li>
            <li className='social__item'>
                <a
                    href='https://www.rss.com'
                    target='_blank'
                    rel='noreferrer'
                    className='social__link'
                >
                    <i className='fa-solid fa-rss social__icon'></i>
                </a>
            </li>
            <li className='social__item social__item--no-border'>
                <a
                    href='https://www.youtube.com'
                    target='_blank'
                    rel='noreferrer'
                    className='social__link'
                >
                    <i className='fa-brands fa-youtube social__icon'></i>
                </a>
            </li>
        </ul>
    );
}
