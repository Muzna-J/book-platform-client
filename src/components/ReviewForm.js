import { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

const ReviewForm = ({ volumeId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit= async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5005/add-review', {rating, comment, volumeId}, {withCredentials:true});
            console.log('Review submitted', response.data);
        } catch (error) {
            console.error('Error submitting review', error);
        }
        };

        return (
            <form onSubmit={handleSubmit}>
                <StarRating rating={rating} setRating={setRating} />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add your review here'></textarea>
                <button type='submit'>Submit Review</button>
            </form>
        );

    };

export default ReviewForm;