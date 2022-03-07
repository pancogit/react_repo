export type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export default function SizeSelect() {
    return (
        <div className='select-list'>
            <div className='select-list__select'>
                <p className='select-list__text'>Select size</p>
                <i className='fa-solid fa-caret-down select-list__arrow'></i>
            </div>
            <div className='select-list__options-wrapper'>
                <div className='select-list__options'>
                    <p className='select-list__option'>XS</p>
                    <p className='select-list__option'>S</p>
                    <p className='select-list__option'>M</p>
                    <p className='select-list__option'>L</p>
                    <p className='select-list__option'>XL</p>
                    <p className='select-list__option'>XXL</p>
                    <p className='select-list__option'>XXXL</p>
                </div>
            </div>
        </div>
    );
}
