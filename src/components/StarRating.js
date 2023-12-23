const StarRating = ({rating, setRating}) => {
    return(
        <div>
             {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <span className={ratingValue <= rating ? 'star-filled' : 'star-empty'}>
                            ☆
                        </span>
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
