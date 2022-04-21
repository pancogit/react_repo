import { useEffect, useRef } from 'react';

interface Props {
    checkoutCart(checkout: boolean): void;
}

export default function CheckoutDialog({ checkoutCart }: Props) {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    function doCheckout() {
        checkoutCart(true);
    }

    function skipCheckout() {
        checkoutCart(false);
    }

    // close menu when it's clicked outside of container
    useEffect(() => {
        function closeContainer(event: MouseEvent) {
            const pathElements = event.composedPath();
            let dialogElementFound = false;

            // search for all parents elements until top of the dom and if there is
            // dialog element on path that means that some element inside dialog element is clicked
            for (let i = 0; i < pathElements.length; i++) {
                if (
                    dialogRef.current &&
                    pathElements[i] === dialogRef.current
                ) {
                    dialogElementFound = true;
                }
            }

            // if some element inside dialog element is clicked, then don't close container, otherwise close it
            if (!dialogElementFound) checkoutCart(false);
        }

        // set event listener
        window.addEventListener('click', closeContainer);

        // clean-up event listener
        return () => window.removeEventListener('click', closeContainer);
    }, [checkoutCart]);

    // close menu when it's pressed escape on keyboard
    useEffect(() => {
        function closeContainer(event: KeyboardEvent) {
            if (event.key === 'Escape') checkoutCart(false);
        }

        // set event listener
        window.addEventListener('keydown', closeContainer);

        // clean-up event listener
        return () => window.removeEventListener('keydown', closeContainer);
    }, [checkoutCart]);

    return (
        <div className='checkout-dialog'>
            <div
                className='checkout-dialog__box checkout-dialog__box--visible'
                ref={dialogRef}
            >
                <div className='checkout-dialog__header'>
                    <span className='checkout-dialog__heading'>
                        Checkout Cart
                    </span>
                    <button
                        className='checkout-dialog__close'
                        onClick={skipCheckout}
                    >
                        <i className='fa-solid fa-xmark checkout-dialog__close-icon'></i>
                    </button>
                </div>
                <div className='checkout-dialog__content'>
                    <p className='checkout-dialog__text'>
                        Are you sure you want to checkout shopping cart?
                    </p>
                    <div className='checkout-dialog__buttons'>
                        <button
                            className='checkout-dialog__button'
                            onClick={doCheckout}
                        >
                            Yes
                        </button>
                        <button
                            className='checkout-dialog__button'
                            onClick={skipCheckout}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
