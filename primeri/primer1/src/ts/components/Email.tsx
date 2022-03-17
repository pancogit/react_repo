import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeUser } from '../slices/subscribeSlice';
import { DispatchType } from '../store/store';

export default function Email() {
    const [inputValue, setInputValue] = useState('');
    const [subscribed, setSubscribed] = useState<boolean | null>(null);
    const dispatch = useDispatch<DispatchType>();

    // when enter is pressed, check if it's valid email address, and if it is ok,
    // then subscribe user with given email address
    function keyIsPressed(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') checkEmail();
    }

    // check email with regular expression and if it's good then dispatch email to the store
    // first are words including dash -, then @, then more words, then dot .
    // and finally 2-3 small characters
    function checkEmail() {
        if (inputValue.match(/^[\w-]+@\w+\.[a-z]{2,3}$/)) {
            setSubscribed(true);
            dispatch(subscribeUser(inputValue));
        } else {
            setSubscribed(false);
        }
    }

    function inputIsChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value.trim());
    }

    return (
        <div className='email email--margin'>
            {!subscribed && (
                <div className='email__box'>
                    <input
                        type='email'
                        name='email-input'
                        className='email__input'
                        placeholder='Your mail'
                        id='email-input-id'
                        onKeyDown={keyIsPressed}
                        value={inputValue}
                        onChange={inputIsChanged}
                    />
                    <label
                        htmlFor='email-input-id'
                        className='email__label'
                        onClick={checkEmail}
                    >
                        <i className='fa-solid fa-pencil email__icon'></i>
                    </label>
                </div>
            )}

            {subscribed !== null && !subscribed && (
                <p className='email__message'>Enter valid email address</p>
            )}

            {subscribed && (
                <p className='email__message'>Thank you for subscribing</p>
            )}
        </div>
    );
}
