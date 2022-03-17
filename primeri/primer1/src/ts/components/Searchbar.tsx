import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Searchbar() {
    const [openSearch, setOpenSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // hold dom reference to the component to use for closing searcbar
    // when it's clicked outside of component
    const searchbarRef = useRef<HTMLDivElement | null>(null);

    const searchbarClass = openSearch
        ? 'searchbar searchbar--active'
        : 'searchbar';

    const navigate = useNavigate();

    // open search box if it's not opened or redirect to the search page
    // if search box is opened
    function buttonIsClicked() {
        if (!openSearch) setOpenSearch(true);
        else goToSearchPage();
    }

    function goToSearchPage() {
        const searchResult = searchValue.trim();
        let queryString = '/search';

        // if search result is not empty, then append them to the query string
        if (searchResult !== '') queryString += `?result=${searchResult}`;

        // close and clear search box
        closeClearSearch();

        navigate(queryString);
    }

    function closeClearSearch() {
        setOpenSearch(false);
        setSearchValue('');
    }

    function searchIsChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    // also search result if enter is pressed in the input box
    function searchKeyPressed(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') goToSearchPage();
    }

    // close input box if it's clicked anywhere in the window outside of search
    useEffect(() => {
        function closeInputBox(event: MouseEvent) {
            if (
                event.target &&
                searchbarRef.current &&
                !searchbarRef.current.contains(event.target as Node)
            ) {
                closeClearSearch();
            }
        }

        window.addEventListener('click', closeInputBox);

        return () => window.removeEventListener('click', closeInputBox);
    }, []);

    return (
        <div className={searchbarClass} ref={searchbarRef}>
            <input
                type='text'
                name='searchbar-input'
                className='searchbar__input'
                placeholder='Search for product...'
                value={searchValue}
                onChange={searchIsChanged}
                onKeyDown={searchKeyPressed}
            />
            <button className='searchbar__button' onClick={buttonIsClicked}>
                <i className='fa-solid fa-magnifying-glass searchbar__icon'></i>
            </button>
        </div>
    );
}
