import { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewDisplay = ({volumeId}) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try{
                const response = await axios.get(`http://localhost:5005/get-reviews/${volumeId}`, {withCredentials: true});
                if (response.data.message) {
                    // Handle the case where there are no reviews
                    console.log(response.data.message);
                  } else {
                setReviews(response.data)};
            } catch (error) {
                console.error('Error fetching reviews', error)
            }
        };
        fetchReviews();
    }, [volumeId]);

    return (
        <div>
            {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index}>
                        <div>User: {review.user.name}</div>
                        <div>Rating: {review.rating} stars</div>
                        <div>Comment: {review.comment}</div>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
    
    
};

export default ReviewDisplay;