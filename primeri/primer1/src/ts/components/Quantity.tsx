export default function Quantity() {
    return (
        <div className='quantity'>
            <button className='quantity__button'>-</button>
            <span className='quantity__total'></span>
            <button className='quantity__button'>+</button>
        </div>
    );
}
