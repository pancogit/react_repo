export default function Email() {
    return (
        <div className='email email--margin'>
            <div className='email__box'>
                <input
                    type='email'
                    name='email-input'
                    className='email__input'
                    placeholder='Your mail'
                    id='email-input-id'
                />
                <label htmlFor='email-input-id' className='email__label'>
                    <i className='fa-solid fa-pencil email__icon'></i>
                </label>
            </div>
            <p className='email__message'>Enter valid email address</p>
        </div>
    );
}
