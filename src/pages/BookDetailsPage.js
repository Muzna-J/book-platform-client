import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReadingListContext } from '../context/ReadingListContext';
import axios from 'axios';
import ReviewDisplay from '../components/ReviewDisplay';
import { UserContext } from '../context/UserContext';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';



function BookDetailsPage() {
    const { addToReadingList } = useContext(ReadingListContext);
    const [bookDetails, setBookDetails] = useState(null);
    const { volumeId } = useParams();
    const [refreshKey, setRefreshKey] = useState(0);
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    

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
        if (!currentUser) {
            // Redirect to signup/login page
            navigate('/signup');
            return;
        }
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
                toast.success('Book added to reading list!');
                
    
                console.log(response.data.message);

            } catch (error) {
                console.error('Error:', error.response);
            }
        }
    };
        
    if(!bookDetails) {
        return <Spinner />
    }

    const { volumeInfo } = bookDetails;
    const { title, authors, publisher, publishedDate, description, industryIdentifiers, pageCount, imageLinks, language } = volumeInfo;
    const cleanDescription = DOMPurify.sanitize(description);
    console.log('Description value:', description);
    console.log(typeof description);


    return (
        <div className="book-details p-6 bg-custom-beige font-mono">
        <div className="max-w-2xl mx-auto bg-custom-dusty shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
            {imageLinks?.thumbnail && (
                <div className="md:flex-shrink-0">
                <img src={imageLinks.thumbnail} alt={`Cover of ${title}`} className="p-2" />
                </div>
                    )}
                    <div className="p-8">
                
                
            {title && <p className="mt-2 text-black-600"><strong>Title:</strong> {title}</p>}
            {authors && <p className=" text-black-600"><strong>Author(s):</strong> {authors.join(', ')}</p>}
            {publisher && <p className="text-black-600"><strong>Publisher:</strong> {publisher}</p>}
            {publishedDate && <p className="text-black-600"><strong>Published Date:</strong> {publishedDate}</p>}
            {description && (
    <div className="text-black-600 text-justify">
        <strong>Description:</strong>
        <div>{parse(cleanDescription)}</div>
    </div>
)}
            {industryIdentifiers && (
                <p className="text-black-600">
                    <strong>ISBN:</strong> {industryIdentifiers.map(id => `${id.type}: ${id.identifier}`).join(', ')}
                </p>
            )}
            {pageCount && <p className="text-black-600"><strong>Page Count:</strong> {pageCount}</p>}
            {language && <p className="text-black-600"><strong>Language:</strong> {language.toUpperCase()}</p>}
            </div>
            </div>
            <div className='flex justify-center mb-4'>
            <button onClick={handleAddToReadingList} className="bg-custom-crimson hover:bg-custom-beige text-white font-bold py-2 px-4 rounded-full">Add to Reading List</button>
            </div>
        </div>
        <ReviewDisplay volumeId={bookDetails.id} key={refreshKey} triggerRefresh={triggerRefresh} className="mt-6" />
        </div>
    );  
}; 


export default BookDetailsPage;



