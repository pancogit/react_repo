interface Props {
    isEditable?: boolean;
}

export default function Stars({ isEditable = false }: Props) {
    return (
        <div className='stars'>
            <i className='fa-solid fa-star stars__icon'></i>
            <i className='fa-solid fa-star stars__icon'></i>
            <i className='fa-solid fa-star stars__icon'></i>
            <i className='fa-solid fa-star-half-stroke stars__icon'></i>
            <i className='fa-solid fa-star stars__icon stars__icon--empty'></i>
        </div>
    );
}
