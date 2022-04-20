import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function TopBack() {
    const [showButton, setShowButton] = useState(false);

    const topBackClass = showButton ? 'top-back top-back--active' : 'top-back';

    // show back to top button when 15% of page is scrolled
    useEffect(() => {
        function scrollWindow() {
            let currentScrollPosition = window.scrollY;
            let documentFullHeight = document.body.scrollHeight;

            // after 10 percentage show top back button
            let percentage = 10;
            let minimumScroll = (documentFullHeight * percentage) / 100;

            // show or hide button depending of current scroll position
            if (currentScrollPosition >= minimumScroll) setShowButton(true);
            else setShowButton(false);
        }

        window.addEventListener('scroll', scrollWindow);

        // clean up event listener when component is unmounted
        return () => window.addEventListener('scroll', scrollWindow);
    }, []);

    // scroll to top using smooth transition
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <Link to='#' className={topBackClass} onClick={scrollToTop}>
            <i className='fa-solid fa-arrow-up top-back__icon'></i>
            <span className='top-back__text'>Top</span>
        </Link>
    );
}
