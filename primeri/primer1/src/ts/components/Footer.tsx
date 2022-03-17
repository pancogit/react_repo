import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TimeTweet, Tweet, TweetsState } from '../slices/tweetsSlice';
import { StoreState } from '../store/store';
import Email from './Email';
import Social from './Social';

export default function Footer() {
    const tweets = useSelector<StoreState, TweetsState>(state => state.tweets);
    const latestTweet = findLatestTweet();

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const latestTweetDate = getTweetDate();

    // return latest tweet or undefined if there are no tweets
    function findLatestTweet() {
        let latestTweet: Tweet;

        if (!tweets.length) return undefined;
        else {
            latestTweet = tweets[0];

            if (tweets.length === 1) return tweets[0];

            // there are more than 1 tweet, search for latest one
            for (let i = 1; i < tweets.length; i++) {
                if (latestTweet.date.year < tweets[i].date.year) {
                    latestTweet = tweets[i];
                }
                // years are the same, then compare months
                else if (latestTweet.date.year === tweets[i].date.year) {
                    if (latestTweet.date.month < tweets[i].date.month) {
                        latestTweet = tweets[i];
                    }
                    // months are the same, then compare days
                    else if (latestTweet.date.month === tweets[i].date.month) {
                        if (latestTweet.date.day < tweets[i].date.day) {
                            latestTweet = tweets[i];
                        }
                        // days are the same, then compare time
                        else if (latestTweet.date.day === tweets[i].date.day) {
                            // first time is less than second, get second as latest
                            if (
                                !compareTimes(
                                    latestTweet.date.time,
                                    tweets[i].date.time
                                )
                            ) {
                                latestTweet = tweets[i];
                            }
                        }
                    }
                }
            }
        }

        return latestTweet;
    }

    // compare two times and return true if they are the same or first time is greater then second,
    // and return false if first time is less than second
    function compareTimes(time1: TimeTweet, time2: TimeTweet): boolean {
        // first compare meridiems and if they are different, don't compare times
        if (time1.meridiem !== time2.meridiem) {
            if (time1.meridiem === 'am') return false;
            else return true;
        }
        // meridiems are the same, then compare times
        else {
            if (time1.hour > time2.hour) return true;
            else {
                if (time1.hour === time2.hour) {
                    if (time1.minute > time2.minute) return true;
                    else {
                        if (time1.minute === time2.minute) return true;
                        else return false;
                    }
                } else return false;
            }
        }
    }

    // return month for given month number or return null if wrong month number is sent
    function getMonth(monthNumber: number) {
        if (monthNumber >= 1 && monthNumber <= 12)
            return months[monthNumber - 1];
        else return null;
    }

    // convert tweet data to the date
    function getTweetDate() {
        if (!latestTweet) return '';

        // prepend one zero if it's single digit
        let hour =
            latestTweet.date.time.hour < 10
                ? `0${latestTweet.date.time.hour}`
                : `${latestTweet.date.time.hour}`;

        let minute =
            latestTweet.date.time.minute < 10
                ? `0${latestTweet.date.time.minute}`
                : `${latestTweet.date.time.minute}`;

        let date = `${getMonth(latestTweet.date.month)} ${
            latestTweet.date.day
        }, ${latestTweet.date.year} ${hour}:${minute} ${
            latestTweet.date.time.meridiem
        }`;

        return date;
    }

    // show first 200 characters of tweet or full tweet if it's less than 200 characters
    function sliceTweetText(text: string) {
        const textMinLength = 200;

        if (text.length <= textMinLength) return text;
        else return text.slice(0, textMinLength) + ' ...';
    }

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
                                        <i className='fa-solid fa-caret-right footer__arrow'></i>
                                        <span className='footer__list-text'>
                                            About Event
                                        </span>
                                    </Link>
                                </li>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/projects'
                                        className='footer__link'
                                    >
                                        <i className='fa-solid fa-caret-right footer__arrow'></i>
                                        <span className='footer__list-text'>
                                            Current Projects
                                        </span>
                                    </Link>
                                </li>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/volunteers'
                                        className='footer__link'
                                    >
                                        <i className='fa-solid fa-caret-right footer__arrow'></i>
                                        <span className='footer__list-text'>
                                            Our Volunteers
                                        </span>
                                    </Link>
                                </li>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/partners'
                                        className='footer__link'
                                    >
                                        <i className='fa-solid fa-caret-right footer__arrow'></i>
                                        <span className='footer__list-text'>
                                            Our Partners
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                            <ul className='footer__list'>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/gallery-pictures'
                                        className='footer__link'
                                    >
                                        <i className='fa-solid fa-caret-right footer__arrow'></i>
                                        <span className='footer__list-text'>
                                            Our Gallery
                                        </span>
                                    </Link>
                                </li>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/shop-page'
                                        className='footer__link'
                                    >
                                        <i className='fa-solid fa-caret-right footer__arrow'></i>
                                        <span className='footer__list-text'>
                                            Our Shop
                                        </span>
                                    </Link>
                                </li>
                                <li className='footer__list-item'>
                                    <Link
                                        to='/contact'
                                        className='footer__link'
                                    >
                                        <i className='fa-solid fa-caret-right footer__arrow'></i>
                                        <span className='footer__list-text'>
                                            Contact Us
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className='footer__section'>
                        <h3 className='footer__heading'>Latest Tweet</h3>
                        {latestTweet && (
                            <>
                                <p className='footer__text'>
                                    {sliceTweetText(latestTweet.text)}
                                    <br />
                                    <a
                                        href={latestTweet.link}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='footer__redirect'
                                    >
                                        {latestTweet.link}
                                    </a>
                                </p>
                                <div className='footer__tweet'>
                                    <i className='fa-brands fa-twitter-square footer__tweet-icon'></i>
                                    <p className='footer__latest-tweet'>
                                        {latestTweetDate}
                                        <br />
                                        By:{' '}
                                        <a
                                            href='https://www.twitter.com'
                                            target='_blank'
                                            rel='noreferrer'
                                            className='footer__redirect footer__redirect--small'
                                        >
                                            @YourTwitter
                                        </a>
                                    </p>
                                </div>
                            </>
                        )}
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
                            <span className='footer__copyright'>
                                &copy; Created by{' '}
                                <a
                                    href='https://www.webinvader.com'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='footer__redirect footer__redirect--small'
                                >
                                    wwwebinvader
                                </a>
                            </span>
                            <span className='footer__news'>
                                Get news by E-mail
                            </span>
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
