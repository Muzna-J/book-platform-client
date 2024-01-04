import { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const ReviewDisplay = ({volumeId, triggerRefresh}) => {
    const [reviews, setReviews] = useState([]);
    const [noReviewsMessage, setNoReviewsMessage] = useState('');
    const [editingReview, setEditingReview] = useState(null);
    const [showForm, setShowForm] = useState(false);
    

    const startEditing = (review) => {
        setEditingReview(review);
        if (!showForm) {
            setShowForm(true);
        }
    };

    const hideForm = () => {
        setEditingReview(null);
        setShowForm(false);
    };

    const deleteReview = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:5005/delete-review/${reviewId}`, { withCredentials: true });
            setReviews(reviews.filter(review => review._id !== reviewId));
        } catch (error) {
            console.error('Error deleting review', error);
        }
    };

    const handleRefresh = () => {
        triggerRefresh();
        hideForm();
    };

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
    }, [volumeId, triggerRefresh]);

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
                        <button onClick={() => startEditing(review)}>Edit Review</button>
                        <button onClick={() => deleteReview(review._id)}>Delete Review</button>
                    </div>
                ))
            )}

            {showForm && (

                <ReviewForm
                    volumeId={volumeId}
                    existingReview={editingReview}
                    triggerRefresh={handleRefresh}
                        
                />
            )}

        </div>
    );
};

export default ReviewDisplay;




