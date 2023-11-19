import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookDetailsPage() {
    const [bookDetails, setBookDetails] = useState(null);
    const { volumeId } = useParams();

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
        </div>
    );  
}; 


export default BookDetailsPage;