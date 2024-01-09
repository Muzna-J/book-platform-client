import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ReadingListContext } from '../context/ReadingListContext';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';
import ReviewDisplay from '../components/ReviewDisplay';
import { UserContext } from '../context/UserContext';



function BookDetailsPage() {
    const { addToReadingList } = useContext(ReadingListContext);
    const [bookDetails, setBookDetails] = useState(null);
    const { volumeId } = useParams();
    const [refreshKey, setRefreshKey] = useState(0);
    

    const triggerRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1); // Increment the key to trigger a re-render
    };

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5005/book/${volumeId}`);
                if(!response.ok) {
                    throw new Error('Book details not found');
                }
                const data = await response.json();
                setBookDetails(data);
            } catch (error) {
                console.error('Error fetching book details:' , error);
            }
        };
        fetchBookDetails();
    }, [volumeId]);

    const handleAddToReadingList = async () => {
        if (bookDetails) {
            try {
                const response = await axios.post('http://localhost:5005/reading-list/add', {
                    volumeId: bookDetails.id,
                    title: bookDetails.volumeInfo.title,
                    thumbnail: bookDetails.volumeInfo.imageLinks?.thumbnail
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true 
                });
                addToReadingList(response.data.book);
                
    
                console.log(response.data.message);

            } catch (error) {
                console.error('Error:', error.response);
            }
        }
    };
        
    if(!bookDetails) {
        return <div>Loading....</div>
    }

    const { volumeInfo } = bookDetails;
    const { title, authors, publisher, publishedDate, description, industryIdentifiers, pageCount, imageLinks, language } = volumeInfo;

    return (
        <div className="book-details">
            <h2>{title}</h2>
            {imageLinks?.thumbnail && <img src={imageLinks.thumbnail} alt={`Cover of ${title}`} />}
            {authors && <p><strong>Author(s):</strong> {authors.join(', ')}</p>}
            {publisher && <p><strong>Publisher:</strong> {publisher}</p>}
            {publishedDate && <p><strong>Published Date:</strong> {publishedDate}</p>}
            {description && <p><strong>Description:</strong> {description}</p>}
            {industryIdentifiers && (
                <p>
                    <strong>ISBN:</strong> {industryIdentifiers.map(id => `${id.type}: ${id.identifier}`).join(', ')}
                </p>
            )}
            {pageCount && <p><strong>Page Count:</strong> {pageCount}</p>}
            {language && <p><strong>Language:</strong> {language.toUpperCase()}</p>}
            <ReviewForm volumeId={bookDetails.id}  triggerRefresh={triggerRefresh} />
            <ReviewDisplay volumeId={bookDetails.id} key={refreshKey} triggerRefresh={triggerRefresh} />
            <button onClick={handleAddToReadingList}>Add to Reading List</button>
        </div>
    );  
}; 


export default BookDetailsPage;



