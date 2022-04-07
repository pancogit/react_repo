import { useSelector } from 'react-redux';
import { TagsCloudState } from '../slices/tagsCloudSlice';
import { StoreState } from '../store/store';

export default function TagsCloud() {
    const tagsCloud = useSelector<StoreState, TagsCloudState>(
        state => state.tagsCloud
    );

    return (
        <div className='tags-cloud'>
            <h3 className='tags-cloud__heading shop-page__aside-heading'>
                Tags Cloud
            </h3>
            <div className='tags-cloud__tags'>
                {tagsCloud.map((tag, index) => (
                    <div className='tags-cloud__tag' key={index}>
                        <p className='tags-cloud__text'>{tag.text}</p>
                        <div className='tags-cloud__back'>
                            <div className='tags-cloud__circle'></div>
                            <div className='tags-cloud__track'></div>
                            {tag.value && (
                                <div className='tags-cloud__value'>
                                    {tag.value}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
