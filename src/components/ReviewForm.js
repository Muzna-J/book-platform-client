import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import { toast } from 'react-toastify';
import { ConfigContext } from '../context/ConfigContext';



const ReviewForm = ({ volumeId, existingReview, triggerRefresh, hideForm, onSubmitSuccess, cancelEditing, currentUser }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { baseUrl } = useContext(ConfigContext);
    


    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.rating);
            setComment(existingReview.comment);
            setIsEditing(true);
        }
    }, [existingReview]);


    const handleSubmit= async (e) => {
        e.preventDefault();
        if (!currentUser) {
            navigate('/signup');
            return;
        }
        if (rating === 0 || comment.trim() === '') {
            toast.error("Please provide both a rating and a comment.");
            return;
        }
        const url = isEditing ? `${baseUrl}/edit-review/${existingReview._id}` : `${baseUrl}/add-review`;
        const method = isEditing ? axios.put : axios.post;
        try {
            await method(url, { rating, comment, volumeId }, { withCredentials: true });
            triggerRefresh();
            hideForm();
            onSubmitSuccess();
            toast.success(isEditing ? 'Review updated successfully!' : 'Review added successfully!');
           
            
        } catch (error) {
            console.error('Error submitting review', error.response);
            toast.error("Error submitting review.");
        }
    };

    

        return (
            <form onSubmit={handleSubmit} className='max-w-lg mx-auto my-8 p-6 bg-custom-dusty shadow-md rounded'>
                <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Review' : 'Add Review'}</h3>
                <StarRating rating={rating} setRating={setRating} className="mb-4" />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={ 'Add your review here'} className="w-full p-2 border border-gray-300 rounded mb-4"></textarea>
                <div className='flex justify-center'>
                <button type='submit' className="bg-custom-crimson hover:bg-custom-orange text-white font-bold py-2 px-4 rounded-full">{isEditing ? 'Update Review' : 'Submit Review'}</button>
                </div>
                {isEditing && (
                    <div className='flex justify-center'>
                    <button type='button' onClick={cancelEditing} className="bg-custom-crimson hover:bg-custom-orange text-white font-bold py-2 px-4 rounded-full mt-2">
                        Cancel
                    </button>
                    </div>
                )}
            </form>
        );

    };

export default ReviewForm;




