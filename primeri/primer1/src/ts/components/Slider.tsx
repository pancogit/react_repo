import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    PriceRangeFilter,
    setPriceRangeFilters,
} from '../slices/shopPageSlice';
import { DispatchType, StoreState } from '../store/store';

interface ButtonsClasses {
    leftButtonTopClass: string;
    leftButtonBottomClass: string;
    rightButtonTopClass: string;
    rightButtonBottomClass: string;
}

type SliderTrackSize = 'LeftSliderTrackSide' | 'RightSliderTrackSide';

interface Props {
    minimumPrice: number;
    maximumPrice: number;

    updateFilterPoundsPrices(minimumPrice: number, maximumPrice: number): void;
}

export default function Slider(props: Props) {
    // detect if left or right button is dragged or not
    const [leftButtonDragged, setLeftButtonDragged] = useState(false);
    const [rightButtonDragged, setRightButtonDragged] = useState(false);

    const [draggingStarted, setDraggingStarted] = useState(false);

    // save starting dragging position for left or right button to calculate
    // positioning offset inside inner part of the buttons
    // because when button is dragged, dragging should start from the position
    // inside button from the correct place
    const [leftButtonInsideOffset, setLeftButtonInsideOffset] = useState(0);
    const [rightButtonInsideOffset, setRightButtonInsideOffset] = useState(0);

    // references to the left and right buttons and sliders
    const leftButtonTop = useRef<HTMLButtonElement | null>(null);
    const leftButtonBottom = useRef<HTMLButtonElement | null>(null);
    const leftSlider = useRef<HTMLDivElement | null>(null);
    const rightButtonTop = useRef<HTMLButtonElement | null>(null);
    const rightButtonBottom = useRef<HTMLButtonElement | null>(null);
    const rightSlider = useRef<HTMLDivElement | null>(null);
    const sliderButtons = useRef<HTMLDivElement | null>(null);
    const sliderTrack = useRef<HTMLDivElement | null>(null);
    const sliderRange = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch<DispatchType>();

    // when page is reloaded or mounted, get query string for slider filter prices
    // from the store if exists and apply it to the slider component
    const priceRange = useSelector<StoreState, PriceRangeFilter | null>(
        state => state.shopPage.filters.priceRange.prices
    );

    const [pricesLoaded, setPricesLoaded] = useState(false);

    // default prices for sliders
    const defaultPrices = useSelector<StoreState, PriceRangeFilter>(
        state => state.shopPage.filters.priceRange.defaultPrices
    );

    // save current left and right sliders coordinate in pixels as reference because
    // it's much faster than local state
    // also coordinates are changing rapidly and it's better to skip rendering component ultra fast
    const currentSliderLeftCoordinate = useRef<number>(50);
    const currentSliderRightCoordinate = useRef<number>(155);

    // minimum predefined difference between left and right slider
    const slidersCoordinatesMinimumDifference = useSelector<StoreState, number>(
        state =>
            state.shopPage.filters.priceRange
                .slidersCoordinatesMinimumDifference
    );

    // minimum and maximum price for current left and right sliders
    const currentMinimumPrice = useRef<number>(props.minimumPrice);
    const currentMaximumPrice = useRef<number>(props.maximumPrice);

    const {
        leftButtonTopClass,
        leftButtonBottomClass,
        rightButtonTopClass,
        rightButtonBottomClass,
    } = setButtonsClasses();

    // active classes for left and right buttons
    function setButtonsClasses(): ButtonsClasses {
        let leftButtonTopClass =
            'slider__button slider__button--left slider__button-top';
        let leftButtonBottomClass = 'slider__button slider__button--left';
        let rightButtonTopClass =
            'slider__button slider__button--right slider__button-top';
        let rightButtonBottomClass = 'slider__button slider__button--right';

        // add active classes if some button is dragged
        if (leftButtonDragged) {
            leftButtonTopClass += ' slider__button--active';
            leftButtonBottomClass += ' slider__button--active';
        } else if (rightButtonDragged) {
            rightButtonTopClass += ' slider__button--active';
            rightButtonBottomClass += ' slider__button--active';
        }

        return {
            leftButtonTopClass,
            leftButtonBottomClass,
            rightButtonTopClass,
            rightButtonBottomClass,
        };
    }

    // dragging started for left button
    function leftButtonDragStart(event: React.MouseEvent<HTMLButtonElement>) {
        setLeftButtonDragged(true);
        setDraggingStarted(true);

        let buttonLeftCoordinate: number, buttonOffset: number;

        // calculate offset inside button as difference between button
        // left edge position and current mouse position
        if (leftButtonTop.current) {
            buttonLeftCoordinate =
                leftButtonTop.current.getBoundingClientRect().left;

            buttonOffset = event.clientX - buttonLeftCoordinate;

            setLeftButtonInsideOffset(buttonOffset);
        }
    }

    // dragging started for right button
    function rightButtonDragStart(event: React.MouseEvent<HTMLButtonElement>) {
        setRightButtonDragged(true);
        setDraggingStarted(true);

        let buttonLeftCoordinate: number, buttonOffset: number;

        // calculate offset inside button as difference between button
        // left edge position and current mouse position
        if (rightButtonTop.current) {
            buttonLeftCoordinate =
                rightButtonTop.current.getBoundingClientRect().left;

            buttonOffset = event.clientX - buttonLeftCoordinate;

            setRightButtonInsideOffset(buttonOffset);
        }
    }

    // dragging is in the progress for left or right button
    // move button only if it's dragged
    function dragButton(
        event: React.MouseEvent<HTMLDivElement>,
        buttonTop: React.MutableRefObject<HTMLButtonElement | null>,
        buttonBottom: React.MutableRefObject<HTMLButtonElement | null>,
        buttonInsideOffset: number,
        slider: React.MutableRefObject<HTMLDivElement | null>,
        sliderTrackSide: SliderTrackSize
    ) {
        if (slider.current && sliderRange.current) {
            let sliderCoordinate = 0;
            let sliderCoordinateString = '';
            let { sliderRangeBorderWidth, sliderRangeWidth } =
                getSliderRangeBorderWidth();

            // get coordinate for slider
            sliderCoordinate = getSliderCoordinate(
                event,
                buttonInsideOffset,
                buttonTop,
                buttonBottom
            );

            // if slider go bellow minimum or higher than maximum value, don't allow that
            sliderCoordinate = setCorrectButtonsCoordinates(
                sliderCoordinate,
                sliderRangeBorderWidth,
                buttonTop,
                buttonBottom,
                sliderRangeWidth
            );

            // update slider coordinates
            sliderCoordinateString = sliderCoordinate.toString() + 'px';
            slider.current.style.left = sliderCoordinateString;

            // set left or right position for slider track
            setSliderTrackCoordinates(
                sliderTrackSide,
                sliderCoordinate,
                slider,
                sliderRangeBorderWidth
            );

            // if left slider go over right slider or vice-versa, prevent that
            setCorrectSlidersDifference(
                sliderTrackSide,
                slider,
                buttonTop,
                buttonBottom,
                sliderRangeBorderWidth
            );

            // set minimum and maximum price for given left / right sliders positions in pixels
            setPricesFromPixels();
        }
    }

    // get css border width and css width for slider range
    function getSliderRangeBorderWidth() {
        let sliderRangeBorderWidth = 0,
            sliderRangeWidth = 0;

        if (sliderRange.current) {
            let sliderRangeComputedCSSObject = window.getComputedStyle(
                sliderRange.current
            );

            // get border width of container element
            let sliderRangeBorderWidthString =
                sliderRangeComputedCSSObject.getPropertyValue('border-width');

            sliderRangeBorderWidth = parseInt(sliderRangeBorderWidthString);

            // for calculating maximum slider value, get width of container element plus one border width
            // because positioning starts from container start width excluding container left border
            let sliderRangeWidthString =
                sliderRangeComputedCSSObject.getPropertyValue('width');
            sliderRangeWidth = parseInt(sliderRangeWidthString);
        }

        return { sliderRangeBorderWidth, sliderRangeWidth };
    }

    function getSliderCoordinate(
        event: React.MouseEvent<HTMLDivElement>,
        buttonInsideOffset: number,
        buttonTop: React.MutableRefObject<HTMLButtonElement | null>,
        buttonBottom: React.MutableRefObject<HTMLButtonElement | null>
    ) {
        let sliderCoordinate = 0;
        let buttonCoordinate = event.clientX;
        let buttonCoordinateString = '';

        if (
            sliderButtons.current &&
            buttonTop.current &&
            buttonBottom.current
        ) {
            // get coordinate of left corner of positioning wrapper element
            let sliderButtonsLeftCorner =
                sliderButtons.current.getBoundingClientRect().left;

            // get width from left corner of wrapper element to the current
            // mouse position which is equal to the current button offset
            // also subtract offset from inside button where button is dragged
            // because without inside button offset, dragging will always start
            // from the left button edge which is not correct
            buttonCoordinate =
                buttonCoordinate - sliderButtonsLeftCorner - buttonInsideOffset;

            buttonCoordinateString = buttonCoordinate.toString() + 'px';

            buttonTop.current.style.left = buttonCoordinateString;
            buttonBottom.current.style.left = buttonCoordinateString;

            // slider coordinates should be current button left edge position
            // plus some width because slider should be centered
            sliderCoordinate =
                buttonTop.current.getBoundingClientRect().left -
                sliderButtonsLeftCorner +
                buttonTop.current.getBoundingClientRect().width / 3;
        }

        return sliderCoordinate;
    }

    function setCorrectButtonsCoordinates(
        sliderCoordinate: number,
        sliderRangeBorderWidth: number,
        buttonTop: React.MutableRefObject<HTMLButtonElement | null>,
        buttonBottom: React.MutableRefObject<HTMLButtonElement | null>,
        sliderRangeWidth: number
    ) {
        let newSliderCoordinate = sliderCoordinate;

        if (buttonTop.current && buttonBottom.current) {
            // if slider reach bellow minimum value, then set it to the minimum
            // also set buttons positions to their minimum left position value
            if (newSliderCoordinate < -sliderRangeBorderWidth) {
                newSliderCoordinate = -sliderRangeBorderWidth;

                let buttonMinimumPosition = -(
                    buttonTop.current.getBoundingClientRect().width / 2
                );

                buttonTop.current.style.left = buttonMinimumPosition + 'px';
                buttonBottom.current.style.left = buttonMinimumPosition + 'px';
            }

            // if slider reach more than maximum value, then set it to the maximum
            // also set buttons positions to their maximum left position value
            // maximum value for slider is equal to the width of container
            if (newSliderCoordinate > sliderRangeWidth) {
                newSliderCoordinate = sliderRangeWidth;

                // add some small offset for centering buttons with slider line
                let buttonMaximumOffsetPosition = -(
                    buttonTop.current.getBoundingClientRect().width / 3
                );

                buttonTop.current.style.left =
                    newSliderCoordinate + buttonMaximumOffsetPosition + 'px';
                buttonBottom.current.style.left =
                    newSliderCoordinate + buttonMaximumOffsetPosition + 'px';
            }
        }

        return newSliderCoordinate;
    }

    function setSliderTrackCoordinates(
        sliderTrackSide: SliderTrackSize,
        sliderCoordinate: number,
        slider: React.MutableRefObject<HTMLDivElement | null>,
        sliderRangeBorderWidth: number
    ) {
        let sliderCoordinateString = sliderCoordinate.toString() + 'px';

        if (sliderTrack.current && slider.current && sliderButtons.current) {
            // set slider track left or right position using calculated slider coordinate
            // slider track and slider coordinate should use the same positions
            if (sliderTrackSide === 'LeftSliderTrackSide') {
                sliderTrack.current.style.left = sliderCoordinateString;

                // save left slider coordinate in local reference
                currentSliderLeftCoordinate.current = sliderCoordinate;
            }
            // for slider track on right side use right side of container position minus right slider coordinate
            else if (sliderTrackSide === 'RightSliderTrackSide') {
                let rightSliderLinePosition: number;
                let sliderRightCoordinate: number;

                // get position of right slider line by subtracting right slider
                // coordinate with container left edge coordinate
                // also add two border widths in calculation because container has borders
                rightSliderLinePosition =
                    slider.current.getBoundingClientRect().left -
                    sliderButtons.current.getBoundingClientRect().left +
                    sliderRangeBorderWidth * 2;

                // subtract container width with right slider line (left) position
                // to get (right) position for right slider line
                sliderRightCoordinate =
                    sliderButtons.current.getBoundingClientRect().width -
                    rightSliderLinePosition;

                sliderTrack.current.style.right =
                    sliderRightCoordinate.toString() + 'px';

                // save right slider coordinate in local reference
                currentSliderRightCoordinate.current = sliderCoordinate;
            }
        }
    }

    function setCorrectSlidersDifference(
        sliderTrackSide: SliderTrackSize,
        slider: React.MutableRefObject<HTMLDivElement | null>,
        buttonTop: React.MutableRefObject<HTMLButtonElement | null>,
        buttonBottom: React.MutableRefObject<HTMLButtonElement | null>,
        sliderRangeBorderWidth: number
    ) {
        // stop left slider to go over right slider and stop right slider
        // to go bellow left slider
        // there should be some minimum difference between left and right slider
        // which should be never decreased
        let slidersDifference =
            currentSliderRightCoordinate.current -
            currentSliderLeftCoordinate.current;

        if (slidersDifference < slidersCoordinatesMinimumDifference) {
            // stop left slider from overlapping right slider by subtract right slider coordinate
            // with predefined minimum difference between left and right slider
            // also set left buttons centered with left slider and set left track edge
            // aligned with left slider
            if (sliderTrackSide === 'LeftSliderTrackSide') {
                correctLeftSlider(slider, buttonTop, buttonBottom);
            }

            // stop right slider from overlapping left slider by adding left slider coordinate
            // with predefined minimum difference between left and right slider
            // also set right buttons centered with right slider and set right track edge
            // aligned with right slider
            else if (sliderTrackSide === 'RightSliderTrackSide') {
                correctRightSlider(
                    slider,
                    buttonTop,
                    buttonBottom,
                    sliderRangeBorderWidth
                );
            }
        }
    }

    function correctLeftSlider(
        slider: React.MutableRefObject<HTMLDivElement | null>,
        buttonTop: React.MutableRefObject<HTMLButtonElement | null>,
        buttonBottom: React.MutableRefObject<HTMLButtonElement | null>
    ) {
        if (
            slider.current &&
            buttonTop.current &&
            buttonBottom.current &&
            sliderTrack.current
        ) {
            let newSliderCoordinate =
                currentSliderRightCoordinate.current -
                slidersCoordinatesMinimumDifference;

            slider.current.style.left = newSliderCoordinate + 'px';

            // add some small offset for centering buttons with slider line
            let buttonMaximumOffsetPosition = -(
                buttonTop.current.getBoundingClientRect().width / 3
            );

            buttonTop.current.style.left =
                newSliderCoordinate + buttonMaximumOffsetPosition + 'px';
            buttonBottom.current.style.left =
                newSliderCoordinate + buttonMaximumOffsetPosition + 'px';

            // set left slider track edge aligned with left slider
            sliderTrack.current.style.left = newSliderCoordinate + 'px';

            // save left slider coordinate in local reference
            currentSliderLeftCoordinate.current = newSliderCoordinate;
        }
    }

    function correctRightSlider(
        slider: React.MutableRefObject<HTMLDivElement | null>,
        buttonTop: React.MutableRefObject<HTMLButtonElement | null>,
        buttonBottom: React.MutableRefObject<HTMLButtonElement | null>,
        sliderRangeBorderWidth: number
    ) {
        if (
            slider.current &&
            buttonTop.current &&
            buttonBottom.current &&
            sliderButtons.current &&
            sliderTrack.current
        ) {
            let newSliderCoordinate =
                currentSliderLeftCoordinate.current +
                slidersCoordinatesMinimumDifference;

            slider.current.style.left = newSliderCoordinate + 'px';

            // add some small offset for centering buttons with slider line
            let buttonMaximumOffsetPosition = -(
                buttonTop.current.getBoundingClientRect().width / 3
            );

            buttonTop.current.style.left =
                newSliderCoordinate + buttonMaximumOffsetPosition + 'px';
            buttonBottom.current.style.left =
                newSliderCoordinate + buttonMaximumOffsetPosition + 'px';

            // get position of right slider line by subtracting right slider
            // coordinate with container left edge coordinate
            // also add two border widths in calculation because container has borders
            let rightSliderLinePosition =
                slider.current.getBoundingClientRect().left -
                sliderButtons.current.getBoundingClientRect().left +
                sliderRangeBorderWidth * 2;

            // subtract container width with right slider line (left) position
            // to get (right) position for right slider line
            let sliderRightCoordinate =
                sliderButtons.current.getBoundingClientRect().width -
                rightSliderLinePosition;

            // set right slider track edge aligned with right slider
            sliderTrack.current.style.right =
                sliderRightCoordinate.toString() + 'px';

            // save right slider coordinate in local reference
            currentSliderRightCoordinate.current = newSliderCoordinate;
        }
    }

    // set minimum and maximum price for given left / right sliders positions in pixels
    function setPricesFromPixels() {
        let minimumSliderWidth = currentSliderLeftCoordinate.current;
        let maximumSliderWidth = currentSliderRightCoordinate.current;
        let { sliderRangeWidth } = getSliderRangeBorderWidth();

        // find percentage of width for minimum / maximum slider width
        let minimumSliderPercentage =
            (100 * minimumSliderWidth) / sliderRangeWidth;
        let maximumSliderPercentage =
            (100 * maximumSliderWidth) / sliderRangeWidth;

        // don't underflow / overflow percentages values by pixels inconsistency
        if (minimumSliderPercentage < 0) minimumSliderPercentage = 0;
        if (maximumSliderPercentage > 100) maximumSliderPercentage = 100;

        // convert minimum / maximum width percentage to the minimum / maximum price
        let priceDifference = props.maximumPrice - props.minimumPrice;

        currentMinimumPrice.current = Math.round(
            props.minimumPrice +
                (minimumSliderPercentage * priceDifference) / 100
        );

        currentMaximumPrice.current = Math.round(
            props.minimumPrice +
                (maximumSliderPercentage * priceDifference) / 100
        );

        // update minimum and maximum prices on page using refs
        // it will skip rendering filter component all the time and skip performance issues
        props.updateFilterPoundsPrices(
            currentMinimumPrice.current,
            currentMaximumPrice.current
        );
    }

    // update prices from query strings only once if it's set in query string
    useEffect(() => {
        if (priceRange !== null && !pricesLoaded) {
            props.updateFilterPoundsPrices(priceRange[0], priceRange[1]);

            setPricesLoaded(true);
        }
    }, [priceRange, props, pricesLoaded]);

    // convert left and right slider coordinates from numbers to the pixels
    function convertSliderCoordinates() {
        let minimumPriceNumbers = 0;
        let maximumPriceNumbers = 0;
        let minimumPricePixels = 0;
        let maximumPricePixels = 0;

        // use set price range either from query string or from slider component
        if (priceRange) {
            minimumPriceNumbers = priceRange[0];
            maximumPriceNumbers = priceRange[1];
        }

        // use default values for prices instead
        else {
            minimumPriceNumbers = defaultPrices[0];
            maximumPriceNumbers = defaultPrices[1];
        }

        let { sliderRangeWidth, sliderRangeBorderWidth } =
            getSliderRangeBorderWidth();

        let priceDifference = props.maximumPrice - props.minimumPrice;
        let minimumPriceDifference = minimumPriceNumbers - props.minimumPrice;
        let maximumPriceDifference = maximumPriceNumbers - props.minimumPrice;

        // get percentages for minimum and maximum prices
        let minimumPricePercentage =
            (100 * minimumPriceDifference) / priceDifference;
        let maximumPricePercentage =
            (100 * maximumPriceDifference) / priceDifference;

        // convert left and right coordinates from numbers to pixels using
        // numbers percentages and css width of slider
        minimumPricePixels = (minimumPricePercentage * sliderRangeWidth) / 100;
        maximumPricePixels = (maximumPricePercentage * sliderRangeWidth) / 100;

        // if minimum price is really minimum, then move it a little to the left
        // for the width of container track left border
        if (!minimumPricePixels) minimumPricePixels = -sliderRangeBorderWidth;

        return {
            minimumPricePixels,
            maximumPricePixels,
            minimumPriceNumbers,
            maximumPriceNumbers,
        };
    }

    // initialize slider coodinates (lines, buttons and track) either from
    // query string or by using default slider values from the global store
    useEffect(() => {
        if (!draggingStarted) {
            // get left and right slider coordinates for the slider initialization
            const {
                minimumPricePixels,
                maximumPricePixels,
                minimumPriceNumbers,
                maximumPriceNumbers,
            } = convertSliderCoordinates();

            // initialize coordinates for left and right sliders
            initializeSlidersCoordinates(
                minimumPricePixels,
                maximumPricePixels
            );

            // initialize coordinates for left and right buttons
            initializeButtonsCoordinates(
                minimumPricePixels,
                maximumPricePixels
            );

            // initialize left and right coordinates for slider track
            initializeTrackCoordinates(minimumPricePixels, maximumPricePixels);

            // set minimum and maximum price for given left / right sliders positions in numbers
            setPricesFromNumbers(minimumPriceNumbers, maximumPriceNumbers);
        }
    });

    // initialize coordinates for left and right sliders
    function initializeSlidersCoordinates(
        minimumPricePixels: number,
        maximumPricePixels: number
    ) {
        if (leftSlider.current && rightSlider.current) {
            leftSlider.current.style.left = minimumPricePixels + 'px';
            rightSlider.current.style.left = maximumPricePixels + 'px';
        }
    }

    // initialize coordinates for left and right buttons
    function initializeButtonsCoordinates(
        minimumPricePixels: number,
        maximumPricePixels: number
    ) {
        if (
            leftButtonTop.current &&
            leftButtonBottom.current &&
            rightButtonTop.current &&
            rightButtonBottom.current
        ) {
            // subtract some offset for buttons to move them to the left
            let buttonOffset =
                leftButtonTop.current.getBoundingClientRect().width / 3;

            let minimumPixels = minimumPricePixels - buttonOffset + 'px';
            let maximumPixels = maximumPricePixels - buttonOffset + 'px';

            leftButtonTop.current.style.left = minimumPixels;
            leftButtonBottom.current.style.left = minimumPixels;

            rightButtonTop.current.style.left = maximumPixels;
            rightButtonBottom.current.style.left = maximumPixels;
        }
    }

    // initialize left and right coordinates for slider track
    function initializeTrackCoordinates(
        minimumPricePixels: number,
        maximumPricePixels: number
    ) {
        if (sliderTrack.current) {
            sliderTrack.current.style.left = minimumPricePixels + 'px';

            const { sliderRangeWidth } = getSliderRangeBorderWidth();

            // for right coodinate calculate offset from the right edge of the track container
            sliderTrack.current.style.right =
                sliderRangeWidth - maximumPricePixels + 'px';
        }

        // also initialize left and right sliders coordinate in pixels
        currentSliderLeftCoordinate.current = minimumPricePixels;
        currentSliderRightCoordinate.current = maximumPricePixels;
    }

    // set minimum and maximum price for given left / right sliders positions in numbers
    function setPricesFromNumbers(
        minimumPriceNumbers: number,
        maximumPriceNumbers: number
    ) {
        // save minimum and maximum price for current left and right sliders in numbers
        currentMinimumPrice.current = minimumPriceNumbers;
        currentMaximumPrice.current = maximumPriceNumbers;

        // update prices on page and filter component also
        props.updateFilterPoundsPrices(
            minimumPriceNumbers,
            maximumPriceNumbers
        );

        // dispatch prices to the global store if they are changed
        if (
            priceRange === null ||
            (priceRange &&
                minimumPriceNumbers !== priceRange[0] &&
                maximumPriceNumbers !== priceRange[1])
        ) {
            dispatch(
                setPriceRangeFilters([minimumPriceNumbers, maximumPriceNumbers])
            );
        }
    }

    // detect mouse dragging in some area around buttons
    function buttonDragging(event: React.MouseEvent<HTMLDivElement>) {
        if (leftButtonDragged) {
            dragButton(
                event,
                leftButtonTop,
                leftButtonBottom,
                leftButtonInsideOffset,
                leftSlider,
                'LeftSliderTrackSide'
            );
        } else if (rightButtonDragged) {
            dragButton(
                event,
                rightButtonTop,
                rightButtonBottom,
                rightButtonInsideOffset,
                rightSlider,
                'RightSliderTrackSide'
            );
        }
    }

    // detect end of mouse dragging when mouse is released anywhere in the window
    useEffect(() => {
        function buttonDragEnd() {
            if (leftButtonDragged) setLeftButtonDragged(false);
            else if (rightButtonDragged) setRightButtonDragged(false);
        }

        window.addEventListener('mouseup', buttonDragEnd);

        return () => window.removeEventListener('mouseup', buttonDragEnd);
    }, [leftButtonDragged, rightButtonDragged]);

    return (
        <div className='slider' onMouseMove={buttonDragging}>
            <div className='slider__area'></div>
            <div className='slider__buttons' ref={sliderButtons}>
                <button
                    className={leftButtonTopClass}
                    ref={leftButtonTop}
                    onMouseDown={leftButtonDragStart}
                ></button>
                <button
                    className={leftButtonBottomClass}
                    ref={leftButtonBottom}
                    onMouseDown={leftButtonDragStart}
                ></button>

                <button
                    className={rightButtonTopClass}
                    ref={rightButtonTop}
                    onMouseDown={rightButtonDragStart}
                ></button>
                <button
                    className={rightButtonBottomClass}
                    ref={rightButtonBottom}
                    onMouseDown={rightButtonDragStart}
                ></button>
            </div>
            <div className='slider__range' ref={sliderRange}>
                <div className='slider__track' ref={sliderTrack}></div>
                <div
                    className='slider__line slider__line--left'
                    ref={leftSlider}
                ></div>
                <div
                    className='slider__line slider__line--right'
                    ref={rightSlider}
                ></div>
            </div>
        </div>
    );
}
