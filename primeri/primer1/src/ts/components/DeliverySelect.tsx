export default function DeliverySelect() {
    return (
        <div className='select-list select-list--paddings select-list--full-width'>
            <div className='select-list__select'>
                <p className='select-list__text'>
                    Standard Delivery - &pound;4.00
                </p>
                <i className='fa-solid fa-caret-down select-list__arrow'></i>
            </div>
            <div className='select-list__options-wrapper'>
                <div className='select-list__options'>
                    <p className='select-list__option'>
                        Standard Delivery - &pound;4.00
                    </p>
                    <p className='select-list__option'>
                        Ship Delivery - &pound;25.00
                    </p>
                </div>
            </div>
        </div>
    );
}
