import { Link } from 'react-router-dom';

export default function TopBack() {
    return (
        <Link to='#' className='top-back'>
            <i className='fa-solid fa-arrow-up top-back__icon'></i>
            <span className='top-back__text'>Top</span>
        </Link>
    );
}
