import { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewDisplay = ({volumeId}) => {
    const [reviews, setReviews] = useState([]);
    const [noReviewsMessage, setNoReviewsMessage] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try{
                const response = await axios.get(`http://localhost:5005/get-reviews/${volumeId}`, {withCredentials: true});
                if (response.data.message) {
                    // Handle the case where there are no reviews
                    setNoReviewsMessage(response.data.message);
                  } else {
                setReviews(response.data)};
                setNoReviewsMessage(''); // Reset message in case of actual reviews
            } catch (error) {
                console.error('Error fetching reviews', error)
            }
        };
        fetchReviews();
    }, [volumeId]);

    return (
        <div>
            {noReviewsMessage ? (
                <p>{noReviewsMessage}</p>
            ) : (
                reviews.map((review, index) => (
                    <div key={index}>
                        <div>User: {review.user.name}</div>
                        <div>Rating: {review.rating} stars</div>
                        <div>Comment: {review.comment}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewDisplay;