export default function CheckoutDialog() {
    return (
        <div className='checkout-dialog'>
            <div className='checkout-dialog__box checkout-dialog__box--visible'>
                <div className='checkout-dialog__header'>
                    <span className='checkout-dialog__heading'>
                        Checkout Cart
                    </span>
                    <button className='checkout-dialog__close'>
                        <i className='fa-solid fa-xmark checkout-dialog__close-icon'></i>
                    </button>
                </div>
                <div className='checkout-dialog__content'>
                    <p className='checkout-dialog__text'>
                        Are you sure you want to checkout shopping cart?
                    </p>
                    <div className='checkout-dialog__buttons'>
                        <button className='checkout-dialog__button'>Yes</button>
                        <button className='checkout-dialog__button'>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
