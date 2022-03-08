import { Link } from 'react-router-dom';

interface Props {
    image: Image;
    heading: string;
    description: string;
    cost: number;
}

interface Image {
    path: string;
    url: string;
}

export default function QueryResult(props: Props) {
    const { cost, description, heading, image } = props;

    return (
        <div className='query-result'>
            <div className='query-result__image-wrapper'>
                <Link to={image.url} className='query-result__image-link'>
                    <img
                        src={image.path}
                        alt='query result'
                        className='query-result__image'
                    />
                </Link>
            </div>
            <div className='query-result__content-wrapper'>
                <div className='query-result__content'>
                    <Link to={image.url} className='query-result__link'>
                        <h3 className='query-result__heading'>{heading}</h3>
                    </Link>
                    <p className='query-result__description'>{description}</p>
                </div>
                <div className='query-result__price'>
                    <p className='query-result__cost'>&pound;{cost}</p>
                </div>
            </div>
        </div>
    );
}
