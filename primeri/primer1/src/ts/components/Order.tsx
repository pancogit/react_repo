import DeliverySelect from './DeliverySelect';
/* import CheckoutDialog from './CheckoutDialog'; */

export default function Order() {
    return (
        <div className='order'>
            <h2 className='order__heading'>Order Summary</h2>
            <div className='order__items'>
                <span className='order__heading-text'>Items: 2</span>
                <span className='order__items-price'>&pound;70.00</span>
            </div>
            <div className='order__heading-text'>Shipping</div>
            <div className='order__delivery'>
                <DeliverySelect />
            </div>
            <div className='order__items'>
                <span className='order__heading-text'>Total Cost</span>
                <span className='order__items-price'>&pound;74.00</span>
            </div>
            <button className='order__checkout'>Checkout</button>
            <div className='order__promotion-wrapper'>
                <div className='order__promotion'>
                    <span className='order__promotion-text'>
                        Promotional Code
                    </span>
                    <i className='fa-solid fa-plus order__promotion-plus'></i>
                </div>
                <div className='order__promotion-code-wrapper order__promotion-code-wrapper--open'>
                    <input
                        type='text'
                        name='promotion-code'
                        className='order__promotion-code'
                    />
                </div>
            </div>

            {/* <CheckoutDialog /> */}
        </div>
    );
}
