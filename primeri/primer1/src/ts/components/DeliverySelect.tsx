import { EntityState } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartProduct, selectAllCartProducts } from '../slices/cartSlice';
import { Delivery, DeliveryState } from '../slices/deliverySlice';
import { StoreState } from '../store/store';

interface Props {
    updateDelivery: (delivery: Delivery) => void;
}

export default function DeliverySelect({ updateDelivery }: Props) {
    const delivery = useSelector<StoreState, DeliveryState>(
        state => state.delivery
    );

    const cartProductsEntities = useSelector<
        StoreState,
        EntityState<CartProduct>
    >(state => state.cart.cartProductsEntityAdapter);

    // get all cart products to detect when cart is empty to reset delivery index
    const allCartProducts = selectAllCartProducts(cartProductsEntities);

    const [deliveryIndex, setDeliveryIndex] = useState(0);
    const [listIsOpen, setListIsOpen] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);
    const initDelivery = useRef(false);

    const listOptionsClass = listIsOpen
        ? 'select-list__options select-list__options--open'
        : 'select-list__options';

    function listClicked() {
        setListIsOpen(!listIsOpen);
    }

    // when option is clicked, set delivery index, close the list
    // and save delivery object to the lifted state
    function optionClicked(index: number) {
        setDeliveryIndex(index);
        setListIsOpen(false);
        updateDelivery(delivery[index]);
    }

    // init delivery lifted state
    useEffect(() => {
        if (delivery.length && !initDelivery.current) {
            initDelivery.current = true;

            updateDelivery(delivery[0]);
        }
    }, [delivery, updateDelivery]);

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
            if (!listElementFound) setListIsOpen(false);
        }

        // set event listener
        window.addEventListener('click', closeList);

        // clean-up event listener
        return () => window.removeEventListener('click', closeList);
    }, []);

    // close menu when it's pressed escape on keyboard
    useEffect(() => {
        function closeList(event: KeyboardEvent) {
            if (event.key === 'Escape') setListIsOpen(false);
        }

        // set event listener
        window.addEventListener('keydown', closeList);

        // clean-up event listener
        return () => window.removeEventListener('keydown', closeList);
    }, []);

    // when checkout is finished, then cart is empty
    // in that case reset delivery index to init delivery again
    useEffect(() => {
        if (!allCartProducts.length) setDeliveryIndex(0);
    }, [allCartProducts.length]);

    if (delivery.length) {
        return (
            <div
                className='select-list select-list--paddings select-list--full-width'
                ref={listRef}
            >
                <div className='select-list__select' onClick={listClicked}>
                    <p className='select-list__text'>
                        {delivery[deliveryIndex].kind} - &pound;
                        {delivery[deliveryIndex].cost}
                    </p>
                    <i className='fa-solid fa-caret-down select-list__arrow'></i>
                </div>
                <div className='select-list__options-wrapper'>
                    <div className={listOptionsClass}>
                        {delivery.map(
                            (deliveryItem, index) =>
                                // show only deliveries which are not already selected
                                index !== deliveryIndex && (
                                    <p
                                        key={index}
                                        className='select-list__option'
                                        onClick={() => optionClicked(index)}
                                    >
                                        {deliveryItem.kind} - &pound;
                                        {deliveryItem.cost}
                                    </p>
                                )
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}
