import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeCartProductStarsRating } from '../slices/cartSlice';
import { updateProductStarsRating } from '../slices/productsSlice';
import { DispatchType } from '../store/store';

interface Props {
    isEditable?: boolean;
    numberOfStars: number;
    productId?: string;
}

export default function Stars(props: Props) {
    const { isEditable = false, numberOfStars, productId } = props;
    const totalNumberOfStars = useRef(5);

    const [numberOfStarsHovered, setNumberOfStarsHovered] = useState<
        number | undefined
    >();

    const previousNumberOfStarsHovered = useRef<number | undefined>();

    const dispatch = useDispatch<DispatchType>();

    // if stars are hovered use that number of stars, otherwise use default
    // number of stars taken from component props
    const stars = createStars(
        numberOfStarsHovered ? numberOfStarsHovered : numberOfStars
    );

    // create stars for given number of stars
    function createStars(starsNumber: number) {
        let stars: JSX.Element[] = [];
        let starElement: JSX.Element;

        // if there is half filled star, then it should be added as half star icon
        let halfStarRemainder = starsNumber % 1;
        let isHalfStar = halfStarRemainder ? true : false;
        let starsNumberWithoutHalf = isHalfStar
            ? starsNumber - halfStarRemainder
            : starsNumber;

        for (let i = 0; i < totalNumberOfStars.current; i++) {
            // it's whole star
            if (i < starsNumberWithoutHalf) {
                starElement = (
                    <i
                        key={i}
                        className='fa-solid fa-star stars__icon'
                        onMouseMove={event => starIsHovered(event, i)}
                    ></i>
                );
            }
            // if it's half filled star
            else if (i === starsNumberWithoutHalf && isHalfStar) {
                starElement = (
                    <i
                        key={i}
                        className='fa-solid fa-star-half-stroke stars__icon'
                        onMouseMove={event => starIsHovered(event, i)}
                    ></i>
                );
            }
            // finally it's empty star
            else {
                starElement = (
                    <i
                        key={i}
                        className='fa-solid fa-star stars__icon stars__icon--empty'
                        onMouseMove={event => starIsHovered(event, i)}
                    ></i>
                );
            }

            stars.push(starElement);
        }

        return stars;
    }

    // set number of hovered stars
    function starIsHovered(
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        starNumber: number
    ) {
        if (isEditable) {
            let numberOfFilledStars: number;

            // get star element box informations (positioning, width, etc)
            const starRectInfo = (
                event.target as Element
            ).getBoundingClientRect();

            // if mouse is in the left side of star then it's half star filled
            // detect it if left corner position of star plus half of the star width
            // is greater than current mouse position
            // otherwise we are in the right side of the star and it's full star filled
            let starWidth = starRectInfo.width;
            let starLeftCornerPosition = starRectInfo.x;
            let currentMousePosition = event.pageX;
            let starHalfFilled =
                starLeftCornerPosition + starWidth / 2 > currentMousePosition;

            // star is half filled
            if (starHalfFilled) numberOfFilledStars = starNumber + 0.5;
            // star is filled full
            else numberOfFilledStars = starNumber + 1;

            // set number of hovered stars in the local state
            setNumberOfStarsHovered(numberOfFilledStars);
        }
    }

    // when stars container is leaved, then dispatch new number of stars
    // for given product to the store to avoid performance issues with all the
    // time dispatching on every star hover
    // dispatch number of stars only if they are hovered, otherwise default
    // number of stars are already in the store, no need to dispatch them
    // also don't dispatch the same number of stars twice
    function dispatchStars() {
        if (isEditable && numberOfStarsHovered && productId) {
            if (
                (!previousNumberOfStarsHovered.current &&
                    numberOfStarsHovered !== numberOfStars) ||
                (previousNumberOfStarsHovered.current &&
                    previousNumberOfStarsHovered.current !==
                        numberOfStarsHovered)
            ) {
                // update number of stars for product
                dispatch(
                    updateProductStarsRating(productId, numberOfStarsHovered)
                );

                // if product is in cart, then also update number of stars
                dispatch(
                    changeCartProductStarsRating(
                        productId,
                        numberOfStarsHovered
                    )
                );
            }

            // save previous number of stars for next comparison
            previousNumberOfStarsHovered.current = numberOfStarsHovered;
        }
    }

    return (
        <div className='stars' onMouseLeave={dispatchStars}>
            {stars}
        </div>
    );
}
