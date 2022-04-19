import { useEffect, useRef, useState } from 'react';
import { SizesObject, SizesObjectArray } from '../slices/productsSlice';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'Default';

interface Props {
    sizes: SizesObjectArray;
    currentSize: Size;
    setSize(size: SizesObject): void;
}

export default function SizeSelect(props: Props) {
    const { sizes, currentSize, setSize } = props;
    const [openList, setOpenList] = useState(false);

    // dom reference to the container element
    const listRef = useRef<HTMLDivElement | null>(null);

    const currrentSizeString =
        currentSize === 'Default' ? 'Select size' : currentSize;

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
                <p className='select-list__text'>{currrentSizeString}</p>
                <i className='fa-solid fa-caret-down select-list__arrow'></i>
            </div>
            <div className='select-list__options-wrapper'>
                <div className={optionsClass}>
                    {sizes.map(
                        (size, index) =>
                            currentSize !== size.name && (
                                <p
                                    className='select-list__option'
                                    key={index}
                                    onClick={() => setSize(size)}
                                >
                                    {size.name}
                                </p>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}
