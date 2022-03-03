export default function Quantity() {
    return (
        <div className='quantity'>
            <button className='quantity__button'>
                <span className='quantity__sign'>-</span>
            </button>
            <span className='quantity__total'>1</span>
            <button className='quantity__button'>
                <span className='quantity__sign'>+</span>
            </button>
        </div>
    );
}
