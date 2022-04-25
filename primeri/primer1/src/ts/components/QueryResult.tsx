import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../slices/productsSlice';

interface Props {
    product: ProductType;
}

export default function QueryResult({ product }: Props) {
    const { link, path, name, description, price } = product;
    const cost = typeof price.new === 'number' ? price.new : price.new[0];

    const descriptionLength = useRef(140);
    const descriptionText = sliceDescription();

    // slice description and add tree dots if there are more text in the original description
    function sliceDescription() {
        let descriptionSliced = description.slice(0, descriptionLength.current);

        if (description.length > descriptionLength.current)
            descriptionSliced += '...';

        return descriptionSliced;
    }

    return (
        <div className='query-result'>
            <div className='query-result__image-wrapper'>
                <Link to={link} className='query-result__image-link'>
                    <img
                        src={path}
                        alt='query result'
                        className='query-result__image'
                    />
                </Link>
            </div>
            <div className='query-result__content-wrapper'>
                <div className='query-result__content'>
                    <Link to={link} className='query-result__link'>
                        <h3 className='query-result__heading'>{name}</h3>
                    </Link>
                    <p className='query-result__description'>
                        {descriptionText}
                    </p>
                </div>
                <div className='query-result__price'>
                    <p className='query-result__cost'>&pound;{cost}</p>
                </div>
            </div>
        </div>
    );
}
