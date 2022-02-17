export default function Searchbar() {
    return (
        <div className='searchbar'>
            <input
                type='text'
                name='searchbar-input'
                className='searchbar__input'
            />
            <button className='searchbar__button'>
                <i className='fa-solid fa-magnifying-glass searchbar__icon'></i>
            </button>
        </div>
    );
}
