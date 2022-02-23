export default function Slider() {
    return (
        <div className='slider'>
            <div className='slider__buttons'>
                <button className='slider__button slider__button--left slider__button-top'></button>
                <button className='slider__button slider__button--left'></button>

                <button className='slider__button slider__button--right slider__button--active slider__button-top'></button>
                <button className='slider__button slider__button--right slider__button--active'></button>
            </div>
            <div className='slider__range'>
                <div className='slider__track'></div>
                <div className='slider__line slider__line--left'></div>
                <div className='slider__line slider__line--right'></div>
            </div>
        </div>
    );
}
