import { CommentsObject } from '../slices/productsSlice';

interface Props {
    description: string;
    comments: CommentsObject;
}

export default function Description({ comments, description }: Props) {
    return (
        <div className='description'>
            <div className='description__tabs'>
                <span className='description__tab-left'></span>
                <span className='description__tab description__tab--left description__tab--active'>
                    Description
                </span>
                <span className='description__tab description__tab--right'>
                    Discussion ({comments.numberOfComments})
                </span>
                <span className='description__tab-right'></span>
            </div>
            <div className='description__content'>
                <h2 className='description__header'>Product Description</h2>
                <p className='description__text'>{description}</p>
            </div>
            <div className='description__content' style={{ display: 'none' }}>
                <h2 className='description__header'>Product Discussion</h2>
                {comments.allComments.map((comment, index) => (
                    <p className='description__comment' key={index}>
                        <span className='description__username'>
                            {comment.author}
                        </span>
                        <span className='description__comment-text'>
                            {comment.text}
                        </span>
                    </p>
                ))}
            </div>
        </div>
    );
}
