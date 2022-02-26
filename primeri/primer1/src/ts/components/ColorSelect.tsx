export default function ColorSelect() {
    return (
        <div className='select-list'>
            <div className='select-list__select'>
                <p className='select-list__text'>Select color</p>
                <i className='fa-solid fa-caret-down select-list__arrow'></i>
            </div>
            <div className='select-list__options'>
                <p className='select-list__option'>Black</p>
                <p className='select-list__option'>White</p>
                <p className='select-list__option'>Red</p>
                <p className='select-list__option'>Blue</p>
                <p className='select-list__option'>Green</p>
                <p className='select-list__option'>Yellow</p>
            </div>
        </div>
    );
}
