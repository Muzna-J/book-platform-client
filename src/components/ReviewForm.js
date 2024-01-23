import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import { toast } from 'react-toastify';



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


    // const handleSubmit= async (e) => {
    //     e.preventDefault();
    //     const url = isEditing ? `http://localhost:5005/edit-review/${existingReview._id}` : 'http://localhost:5005/add-review';
    //     const method = isEditing ? axios.put : axios.post;
    //     try {
    //         await method(url, { rating, comment, volumeId }, { withCredentials: true });
    //         triggerRefresh();
    //         hideForm();
    //         onSubmitSuccess();
    //         toast.success(isEditing ? 'Review updated successfully!' : 'Review added successfully!');
           
            
    //     } catch (error) {
    //         console.error('Error submitting review', error.response);
    //         toast.error("Error submitting review.");
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing ? `http://localhost:5005/edit-review/${existingReview._id}` : 'http://localhost:5005/add-review';
        const method = isEditing ? axios.put : axios.post;
    
        try {
            const response = await method(url, { rating, comment, volumeId }, { withCredentials: true });
            console.log('Response:', response); // Log the response for debugging
            triggerRefresh();
            hideForm();
            onSubmitSuccess();
            toast.success(isEditing ? 'Review updated successfully!' : 'Review added successfully!');
        } catch (error) {
            console.error('Error submitting review', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
                toast.error(`Error submitting review: ${error.response.status}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
                toast.error("Error submitting review: No response received.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                toast.error(`Error submitting review: ${error.message}`);
            }
        }
    };
    

        return (
            <form onSubmit={handleSubmit} className='max-w-lg mx-auto my-8 p-6 bg-custom-dusty shadow-md rounded'>
                <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Review' : 'Add Review'}</h3>
                <StarRating rating={rating} setRating={setRating} className="mb-4" />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={ 'Add your review here'} className="w-full p-2 border border-gray-300 rounded mb-4"></textarea>
                <button type='submit' className="w-full bg-custom-crimson 500 hover:bg-custom-beige 700 text-white font-bold py-2 px-4 rounded">{isEditing ? 'Update Review' : 'Submit Review'}</button>
            </form>
        );

    };

export default ReviewForm;




