import React, {useEffect, useState} from 'react';

export default function Rating({ratings = []}) {
    const [averageRating, setAverageRating] = useState(0);
    console.log("Rating prop", ratings)

    const filledStar = "fa-solid fa-star filled-star";
    const halfStar = "fa-regular fa-star-half-stroke";
    const emptyStar = "fa-regular fa-star";

    useEffect(() => {
        if (Array.isArray(ratings)) {

            if (ratings.length > 0) {
                const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
                const average = totalRating / ratings.length;
                setAverageRating(average);
            }
        } else {
            setAverageRating(ratings);
        }
    }, [ratings]);

    if (!ratings || ratings.length === 0) {
        return <div>No ratings available</div>;
    }


    const generateStars = (rating) => {
        const stars = [];


        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(filledStar);
            } else if (rating >= i - 0.5) {
                stars.push(halfStar);
            } else {
                stars.push(emptyStar);
            }
        }
        return stars;
    };

    return (
        <div className="rating">
            {generateStars(averageRating).map((star, index) => {
                    return <i className={star} key={index}></i>;
                }
            )}
        </div>
    );
}
