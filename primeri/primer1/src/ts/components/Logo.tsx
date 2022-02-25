import { Link } from 'react-router-dom';

interface Props {
    imageWidth: number;
}

export default function Logo({ imageWidth }: Props) {
    return (
        <Link to='/' className='logo logo--margin'>
            <div className='logo__wrapper'>
                <img
                    src='images/logo.png'
                    alt='logo'
                    width={imageWidth}
                    height='auto'
                    className='logo__image'
                />
            </div>
            <h1 className='logo__text'>
                <div className='logo__heading'>Generosity</div>
                <div className='logo__subheading'>Share your love</div>
            </h1>
        </Link>
    );
}
