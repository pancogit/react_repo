export default function Pagination() {
    return (
        <div className='pagination'>
            <div className='pagination__left-border'></div>
            <div className='pagination__box'>
                <button className='pagination__arrow-left'>
                    <i className='fa-solid fa-angle-left pagination__icon'></i>
                </button>
                <button className='pagination__page'>1</button>
                <button className='pagination__page'>2</button>
                <button className='pagination__page'>3</button>
                <button className='pagination__page'>4</button>
                <button className='pagination__arrow-right'>
                    <i className='fa-solid fa-angle-right pagination__icon'></i>
                </button>
            </div>
            <div className='pagination__right-border'></div>
        </div>
    );
}
