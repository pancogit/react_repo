export default function Search() {
    return (
        <div className='search'>
            <input
                type='text'
                name='search-input'
                id='search-input-id'
                className='search__input'
                placeholder='Type here'
            />
            <label htmlFor='search-input-id' className='search__label'>
                <i className='fa-solid fa-magnifying-glass search__icon'></i>
            </label>
        </div>
    );
}
