import { useEffect, useRef, useState } from 'react';

export type Color =
    | 'Black'
    | 'White'
    | 'Red'
    | 'Blue'
    | 'Green'
    | 'Yellow'
    | 'Default';

interface Props {
    colors: Color[];
    currentColor: Color;
    setColor(color: Color): void;
}

export default function ColorSelect(props: Props) {
    const { colors, currentColor, setColor } = props;
    const [openList, setOpenList] = useState(false);

    // dom reference to the container element
    const listRef = useRef<HTMLDivElement | null>(null);

    const currrentColorString =
        currentColor === 'Default' ? 'Select color' : currentColor;

    const optionsClass = openList
        ? 'select-list__options select-list__options--open'
        : 'select-list__options';

    // close menu when it's clicked outside of list
    useEffect(() => {
        function closeList(event: MouseEvent) {
            const pathElements = event.composedPath();
            let listElementFound = false;

            // search for all parents elements until top of the dom and if there is
            // list element on path that means that some element inside list element is clicked
            for (let i = 0; i < pathElements.length; i++) {
                if (listRef.current && pathElements[i] === listRef.current) {
                    listElementFound = true;
                }
            }

            // if some element inside list element is clicked, then don't close list, otherwise close it
            if (!listElementFound) setOpenList(false);
        }

        // set event listener
        window.addEventListener('click', closeList);

        // clean-up event listener
        return () => window.removeEventListener('click', closeList);
    }, [listRef, setOpenList]);

    // close menu when it's pressed escape on keyboard
    useEffect(() => {
        function closeList(event: KeyboardEvent) {
            if (event.key === 'Escape') setOpenList(false);
        }

        // set event listener
        window.addEventListener('keydown', closeList);

        // clean-up event listener
        return () => window.removeEventListener('keydown', closeList);
    }, [setOpenList]);

    function listIsClicked() {
        setOpenList(!openList);
    }

    return (
        <div className='select-list'>
            <div
                className='select-list__select'
                onClick={listIsClicked}
                ref={listRef}
            >
                <p className='select-list__text'>{currrentColorString}</p>
                <i className='fa-solid fa-caret-down select-list__arrow'></i>
            </div>
            <div className='select-list__options-wrapper'>
                <div className={optionsClass}>
                    {colors.map(
                        (color, index) =>
                            currentColor !== color && (
                                <p
                                    className='select-list__option'
                                    key={index}
                                    onClick={() => setColor(color)}
                                >
                                    {color}
                                </p>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}
