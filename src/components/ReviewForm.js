import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';


const ReviewForm = ({ volumeId, existingReview, triggerRefresh, hideForm, onSubmitSuccess }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    


    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.rating);
            setComment(existingReview.comment);
            setIsEditing(true);
        }
    }, [existingReview]);


    const handleSubmit= async (e) => {
        e.preventDefault();
        const url = isEditing ? `http://localhost:5005/edit-review/${existingReview._id}` : 'http://localhost:5005/add-review';
        const method = isEditing ? axios.put : axios.post;
        try {
            await method(url, { rating, comment, volumeId }, { withCredentials: true });
            triggerRefresh();
            hideForm();
            onSubmitSuccess();
            
        } catch (error) {
            console.error('Error submitting review', error.response);
        }
    };

        return (
            <form onSubmit={handleSubmit}>
                <h3>{isEditing ? 'Edit Review' : 'Add Review'}</h3>
                <StarRating rating={rating} setRating={setRating} />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={ 'Add your review here'}></textarea>
                <button type='submit'>{isEditing ? 'Update Review' : 'Submit Review'}</button>
            </form>
        );

    };

export default ReviewForm;




