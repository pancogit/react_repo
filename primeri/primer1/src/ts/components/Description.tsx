import { CommentsObject } from '../slices/productsSlice';

interface Props {
    description: string;
    comments: CommentsObject;
    currentTab: DescriptionTab;
    changeTab: React.Dispatch<React.SetStateAction<DescriptionTab>>;
}

export type DescriptionTab = 'Description' | 'Discussion';

export default function Description(props: Props) {
    const { comments, description, currentTab, changeTab } = props;

    const descriptionTabClass =
        currentTab === 'Description'
            ? 'description__tab description__tab--left description__tab--active'
            : 'description__tab description__tab--left';

    const discussionTabClass =
        currentTab === 'Discussion'
            ? 'description__tab description__tab--right description__tab--active'
            : 'description__tab description__tab--right';

    function descriptionClicked() {
        changeTab('Description');
    }

    function discussionClicked() {
        changeTab('Discussion');
    }

    return (
        <div className='description'>
            <div className='description__tabs'>
                <span className='description__tab-left'></span>
                <span
                    className={descriptionTabClass}
                    onClick={descriptionClicked}
                >
                    Description
                </span>
                <span
                    className={discussionTabClass}
                    onClick={discussionClicked}
                >
                    Discussion ({comments.numberOfComments})
                </span>
                <span className='description__tab-right'></span>
            </div>

            {currentTab === 'Description' && (
                <div className='description__content'>
                    <h2 className='description__header'>Product Description</h2>
                    <p className='description__text'>{description}</p>
                </div>
            )}

            {currentTab === 'Discussion' && (
                <div className='description__content'>
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
            )}
        </div>
    );
}
