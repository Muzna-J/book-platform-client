const StarRating = ({rating, setRating}) => {
    return(
        <div className="flex items-center">
             {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index} className="cursor-pointer">
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            className="hidden"
                        />
                        <span className={ratingValue <= rating ? 'text-yellow-500 text-xl' : 'text-gray-400 text-xl'}>
                        ★
                        </span>
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
