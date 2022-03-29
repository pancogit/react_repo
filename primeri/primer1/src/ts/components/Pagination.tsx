import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentPage, ShopPageState } from '../slices/shopPageSlice';
import { DispatchType, StoreState } from '../store/store';

type PagesNumbers = [number, number, number, number];

export default function Pagination() {
    const [pagesNumbers, setPagesNumbers] = useState<PagesNumbers | null>(null);

    const shopPage = useSelector<StoreState, ShopPageState>(
        state => state.shopPage
    );

    // keep local track of last clicked page
    const [lastPage, setLastPage] = useState<number | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch<DispatchType>();

    const disableLeftArrow = shopPage.currentPage === 1;
    const disableRightArrow = shopPage.currentPage === shopPage.numberOfPages;
    let leftArrowClass = 'pagination__arrow pagination__arrow--left';
    let rightArrowClass = 'pagination__arrow pagination__arrow--right';

    let buttonClass = 'pagination__page';
    let buttonClassActive = 'pagination__page pagination__page--active';

    let showPagesNumbers =
        shopPage.numberOfPages &&
        shopPage.currentPage &&
        shopPage.currentPage <= shopPage.numberOfPages;

    if (!disableLeftArrow) leftArrowClass += ' pagination__arrow--active';
    if (!disableRightArrow) rightArrowClass += ' pagination__arrow--active';

    // move with pagination to another page
    function moveToPage(pageNumber: number) {
        // read query strings from location object
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', pageNumber.toString());

        // change url by appending query string
        navigate({ search: searchParams.toString() });

        // update current page to the store
        dispatch(setCurrentPage(pageNumber));
    }

    function moveLeft() {
        if (shopPage.currentPage && shopPage.currentPage > 1) {
            moveToPage(shopPage.currentPage - 1);
        }
    }

    function moveRight() {
        if (
            shopPage.numberOfPages &&
            shopPage.currentPage &&
            shopPage.currentPage < shopPage.numberOfPages
        ) {
            moveToPage(shopPage.currentPage + 1);
        }
    }

    // try to find first free page slot for current page
    // (1 - 4, 4 - 7, 7 - 10, 10 - 13, etc.)
    const findFirstFreePageSlot = useCallback(() => {
        let firstPage = 1;

        if (shopPage.numberOfPages && shopPage.currentPage) {
            for (let i = 1; i < shopPage.numberOfPages; i += 3) {
                if (
                    shopPage.currentPage >= i &&
                    shopPage.currentPage <= i + 3
                ) {
                    firstPage = i;
                }
            }
        }

        return firstPage;
    }, [shopPage.numberOfPages, shopPage.currentPage]);

    // updating pagination numbers
    // use pages slots (1 - 4, 4 - 7, 7 - 10, 10 - 13, etc.)
    useEffect(() => {
        let pages: PagesNumbers = [1, 2, 3, 4];
        let firstPage = 1;

        if (shopPage.numberOfPages && shopPage.currentPage) {
            if (lastPage && lastPage === shopPage.currentPage) return;

            // first look for last clicked visible page, then look for first and finally
            // look for some page in between
            if (pagesNumbers) {
                // if it's last visible page number, then show next page numbers
                if (shopPage.currentPage === pagesNumbers[3]) {
                    firstPage = pagesNumbers[3];

                    // don't move to the page which doesn't exist
                    if (firstPage + 3 > shopPage.numberOfPages)
                        firstPage = shopPage.numberOfPages - 3;
                }
                // if it's first visible page number, then show previous page numbers
                else if (shopPage.currentPage === pagesNumbers[0]) {
                    firstPage = pagesNumbers[0] - 3;

                    // don't move to the page which doesn't exist
                    if (firstPage < 1) firstPage = 1;
                }
                // then it's page number between first / last visible and use
                // first visible page number as starting number
                else if (
                    shopPage.currentPage > pagesNumbers[0] &&
                    shopPage.currentPage <= pagesNumbers[3]
                )
                    firstPage = pagesNumbers[0];
                // current page is not in the scope of visible pages, that means
                // direction of pagination is changed and new pages slot should be found instead
                else firstPage = findFirstFreePageSlot();
            }
            // then it's first page loading, search for good page slot
            // (1 - 4, 4 - 7, 7 - 10, 10 - 13, etc.)
            else firstPage = findFirstFreePageSlot();

            // update page numbers in ascending order
            for (let i = firstPage, j = 0; i < firstPage + 4; i++, j++) {
                pages[j] = i;
            }

            // update pagination numbers only when they are changed
            if (pagesNumbers === null || pagesNumbers[0] !== pages[0])
                setPagesNumbers(pages);

            // save last visited page
            setLastPage(shopPage.currentPage);
        }
    }, [
        shopPage.currentPage,
        shopPage.numberOfPages,
        findFirstFreePageSlot,
        pagesNumbers,
        lastPage,
    ]);

    return (
        <div className='pagination'>
            <div className='pagination__border'></div>
            <div className='pagination__box'>
                <button className={leftArrowClass} onClick={moveLeft}>
                    <i className='fa-solid fa-angle-left pagination__icon'></i>
                </button>

                {pagesNumbers && showPagesNumbers
                    ? pagesNumbers.map((pageNumber, index) => {
                          // don't render page if it's out of bounds of existing pages
                          if (
                              shopPage.numberOfPages &&
                              index >= shopPage.numberOfPages
                          ) {
                              return null;
                          }

                          let isActiveButton =
                              shopPage.currentPage === pagesNumbers[index];

                          return (
                              <div
                                  key={index}
                                  className={
                                      isActiveButton
                                          ? buttonClassActive
                                          : buttonClass
                                  }
                                  onClick={
                                      isActiveButton
                                          ? () => {}
                                          : () => moveToPage(pageNumber)
                                  }
                              >
                                  <span className='pagination__number'>
                                      {pageNumber}
                                  </span>
                              </div>
                          );
                      })
                    : null}

                <button className={rightArrowClass} onClick={moveRight}>
                    <i className='fa-solid fa-angle-right pagination__icon'></i>
                </button>
            </div>
            <div className='pagination__border'></div>
        </div>
    );
}
