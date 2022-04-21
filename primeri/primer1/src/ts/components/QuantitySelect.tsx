import { useEffect, useRef, useState } from 'react';

interface Props {
    quantity: number;
    maximumQuantity: number;
    setQuantity(quantity: number): void;
}

export default function QuantitySelect(props: Props) {
    const { quantity, maximumQuantity, setQuantity } = props;

    const [openList, setOpenList] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);

    const optionsClass = openList
        ? 'select-list__options select-list__options--open'
        : 'select-list__options';

    function listIsClicked() {
        setOpenList(!openList);
    }

    // when option is clicked, set new quantity and close list
    function optionIsClicked(newQuantity: number) {
        setQuantity(newQuantity);
        setOpenList(false);
    }

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
    }, []);

    // close menu when it's pressed escape on keyboard
    useEffect(() => {
        function closeList(event: KeyboardEvent) {
            if (event.key === 'Escape') setOpenList(false);
        }

        // set event listener
        window.addEventListener('keydown', closeList);

        // clean-up event listener
        return () => window.removeEventListener('keydown', closeList);
    }, []);

    return (
        <div
            className='select-list select-list--small select-list--paddings'
            ref={listRef}
        >
            <div className='select-list__select' onClick={listIsClicked}>
                <p className='select-list__text'>{quantity}</p>
                <i className='fa-solid fa-caret-down select-list__arrow'></i>
            </div>
            <div className='select-list__options-wrapper'>
                <div className={optionsClass}>
                    {quantity <= maximumQuantity
                        ? new Array<number>(maximumQuantity).fill(0).map(
                              (option, index) =>
                                  // show only numbers which are different than current
                                  // selected quantity number
                                  quantity !== index + 1 && (
                                      <p
                                          key={index + 1}
                                          className='select-list__option'
                                          onClick={() =>
                                              optionIsClicked(index + 1)
                                          }
                                      >
                                          {index + 1}
                                      </p>
                                  )
                          )
                        : null}
                </div>
            </div>
        </div>
    );
}
