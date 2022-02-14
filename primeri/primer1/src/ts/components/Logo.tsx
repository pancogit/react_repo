import { Link } from 'react-router-dom';
import logoImage from '../../images/logo.png';

interface Props {
    imageWidth: number;
}

export default function Logo({ imageWidth }: Props) {
    return (
        <Link to='/' className='logo'>
            <div className='logo__wrapper'>
                <img
                    src={logoImage}
                    alt='logo'
                    width={imageWidth}
                    height='auto'
                    className='logo__image'
                />
                <h1 className='logo__text'>
                    <div className='logo__heading'>Generosity</div>
                    <div className='logo__subheading'>Share your love</div>
                </h1>
            </div>
        </Link>
    );
}
