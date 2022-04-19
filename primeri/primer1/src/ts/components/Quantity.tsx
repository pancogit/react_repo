interface Props {
    currentQuantity: number;
    setQuantity(quantity: number): void;
    maximumQuantity: number;
}

export default function Quantity(props: Props) {
    const { currentQuantity, setQuantity, maximumQuantity } = props;

    // increase quantity by 1, but don't increase more than maximum defined quantity
    function increaseQuantity() {
        if (currentQuantity < maximumQuantity) setQuantity(currentQuantity + 1);
    }

    // decrease quantity by 1, but don't decrease quantity bellow 1 because
    // minimum 1 product can be bought
    function decreaseQuantity() {
        if (currentQuantity > 1) setQuantity(currentQuantity - 1);
    }

    return (
        <div className='quantity'>
            <button className='quantity__button' onClick={decreaseQuantity}>
                <span className='quantity__sign'>-</span>
            </button>
            <span className='quantity__total'>{currentQuantity}</span>
            <button className='quantity__button' onClick={increaseQuantity}>
                <span className='quantity__sign'>+</span>
            </button>
        </div>
    );
}
