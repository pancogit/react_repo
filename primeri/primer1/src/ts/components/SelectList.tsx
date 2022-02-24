export default function SelectList() {
    return (
        <div className='select-list'>
            <div className='select-list__select'>
                <p className='select-list__text'>Default sorting</p>
                <i className='fa-solid fa-caret-down select-list__arrow'></i>
            </div>
            <div className='select-list__options'>
                <p className='select-list__option'>Sort by name ascending</p>
                <p className='select-list__option'>Sort by name descending</p>
                <p className='select-list__option'>Sort by price ascending</p>
                <p className='select-list__option'>Sort by price descending</p>
                <p className='select-list__option'>
                    Sort by rated quality ascending
                </p>
                <p className='select-list__option'>
                    Sort by rated quality descending
                </p>
            </div>
        </div>
    );
}
