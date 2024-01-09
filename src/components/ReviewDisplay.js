import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import { UserContext } from '../context/UserContext';

const ReviewDisplay = ({volumeId, triggerRefresh}) => {
    const [reviews, setReviews] = useState([]);
    const [noReviewsMessage, setNoReviewsMessage] = useState('');
    const [editingReview, setEditingReview] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const { currentUser } = useContext(UserContext);
    

    const startEditing = (review) => {
        setEditingReview(review);
        if (!showForm) {
            setShowForm(true);
        }  
    };

    const handleSubmissionSuccess = () => {
        setShowForm(false); 
        triggerRefresh();   
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
                reviews.map((review, index) => {
                    const isCurrentUser = currentUser && review.user._id === currentUser.id;
                    console.log("Current User ID:", currentUser?.id, "Review User ID:", review.user._id, "Is Current User:", isCurrentUser);
                    // Log the information outside of the JSX, but inside the map callback
                    //  console.log("Review User ID:", review.user, "Type:", typeof review.user);
    
                    // Return the JSX explicitly
                    return (
                        <div key={index}>
                            <div>User: {review.user.name}</div>
                            <div>Rating: {review.rating} stars</div>
                            <div>Comment: {review.comment}</div>

                            {isCurrentUser && (
                                <>
    
                            <button onClick={() => startEditing(review)}>Edit Review</button>
                            <button onClick={() => deleteReview(review._id)}>Delete Review</button>
                            </>
                            )}
                        </div>
                    );
                })
            )}
    
            {showForm && (
                <ReviewForm
                    volumeId={volumeId}
                    existingReview={editingReview}
                    triggerRefresh={handleRefresh}
                    hideForm={hideForm}
                    onSubmitSuccess={handleSubmissionSuccess}
                />
            )}
        </div>
    );
    
 }
export default ReviewDisplay;




