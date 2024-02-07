import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import { UserContext } from '../context/UserContext';
import StarRatingDisplay from './StarRatingDisplay';
import { toast } from 'react-toastify';

const ReviewDisplay = ({ volumeId, triggerRefresh }) => {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [showForm, setShowForm] = useState(true);  // Initially show the form
    const { currentUser } = useContext(UserContext);
    

    const startEditing = (review) => {
        setEditingReview(review);
        setShowForm(true);  // Ensure form is visible when editing
    };

    const handleSubmissionSuccess = () => {
        setShowForm(false);  // Hide form after successful submission
        triggerRefresh();
    };

    const deleteReview = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:5005/delete-review/${reviewId}`, { withCredentials: true });
            setReviews(reviews.filter(review => review._id !== reviewId));
            toast.success('Review deleted!');
            triggerRefresh();
        } catch (error) {
            console.error('Error deleting review', error);
        }
    };
    const cancelEditing = () => {
        setEditingReview(null);
        setShowForm(false);
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:5005/get-reviews/${volumeId}`, { withCredentials: true });
                if (!response.data.message) {
                    setReviews(response.data);
                    const userHasReviewed = response.data.some(review => review.user._id === currentUser?.id);
                    setShowForm(!userHasReviewed);  // Hide form if user has reviewed
                }
            } catch (error) {
                console.error('Error fetching reviews', error);
            }
        };
        fetchReviews();
    }, [volumeId, triggerRefresh, currentUser?.id]);

    return (
        <div className='my-4'>
            {showForm && (
                <ReviewForm
                    volumeId={volumeId}
                    existingReview={editingReview}
                    triggerRefresh={triggerRefresh}
                    hideForm={() => setShowForm(false)}
                    onSubmitSuccess={handleSubmissionSuccess}
                    cancelEditing={cancelEditing}
                    currentUser={currentUser}
                />
            )}

            <h2 className="text-xl font-bold mb-4">Reviews</h2>
        
            {reviews.length === 0 ? (
                <p className='text-gray-600 italic'>No reviews yet</p>
            ) : (
                reviews.map((review, index) => (
                    <div key={index} className='bg-white p-4 rounded-lg shadow-md mb-4 max-w-xl'>
                        <div className='font-bold'>{review.user.name}</div>
                        <StarRatingDisplay rating={review.rating} />
                        <p className='text-gray-700'>{review.comment}</p>

                        {currentUser && review.user._id === currentUser.id && (
                            <div className="flex justify-center mt-2">
                                <button onClick={() => startEditing(review)} className='bg-custom-crimson hover:bg-custom-orange text-white font-bold py-1 px-3 rounded-full mr-2'>Edit Review</button>
                                <button onClick={() => deleteReview(review._id)} className="bg-custom-crimson hover:bg-custom-orange text-white font-bold py-1 px-3 rounded-full">Delete Review</button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default ReviewDisplay;

