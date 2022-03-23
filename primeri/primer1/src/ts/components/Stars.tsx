interface Props {
    isEditable?: boolean;
    numberOfStars: number;
}

export default function Stars({ isEditable = false, numberOfStars }: Props) {
    const stars = createStars(numberOfStars);

    // create stars for given number of stars
    function createStars(starsNumber: number) {
        let stars: JSX.Element[] = [];
        let totalNumberOfStars = 5;
        let starElement: JSX.Element;

        // if there is half filled star, then it should be added as half star icon
        let halfStarRemainder = starsNumber % 1;
        let isHalfStar = halfStarRemainder ? true : false;
        let starsNumberWithoutHalf = isHalfStar
            ? starsNumber - halfStarRemainder
            : starsNumber;

        for (let i = 0; i < totalNumberOfStars; i++) {
            // it's whole star
            if (i < starsNumberWithoutHalf) {
                starElement = (
                    <i key={i} className='fa-solid fa-star stars__icon'></i>
                );
            }
            // if it's half filled star
            else if (i === starsNumberWithoutHalf && isHalfStar) {
                starElement = (
                    <i
                        key={i}
                        className='fa-solid fa-star-half-stroke stars__icon'
                    ></i>
                );
            }
            // finally it's empty star
            else {
                starElement = (
                    <i
                        key={i}
                        className='fa-solid fa-star stars__icon stars__icon--empty'
                    ></i>
                );
            }

            stars.push(starElement);
        }

        return stars;
    }

    return <div className='stars'>{stars}</div>;
}
