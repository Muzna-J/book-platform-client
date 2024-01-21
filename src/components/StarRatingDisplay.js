const StarRatingDisplay = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <span key={index} className={ratingValue <= rating ? 'text-yellow-500 text-xl' : 'text-gray-400 text-xl'}>
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default StarRatingDisplay;
