import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const keywords = ['fiction', 'history', 'science', 'adventure', 'mystery', 'fantasy', 'biography'];

function HomePage() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    
   // const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    

    useEffect(() => {
        const fetchBooks = async() => {
            setIsLoading(true);
             
            try {
                const query = initialLoad ? keywords[Math.floor(Math.random() * keywords.length)] : searchTerm;
                const response = await fetch(`http://localhost:5005/books?q=${query}`);
                if(!response.ok) {
                    throw new Error('failed to fetch books')
                }
                const data = await response.json();
                setBooks(data);
                if (initialLoad) setInitialLoad(false); // Set to false after initial load
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.search.value);
    };





    return (
        <div className="HomePage">
            <h2>Featured Books</h2>
            <form onSubmit={handleSearch}>
            <input 
                    type="text" 
                    name="search" 
                    placeholder="Search books..."  
                />
                <button type="submit">Search</button>
            </form>
            {isLoading ? <p>Loading...</p> : (
            <div className="book-list">
                {books.map(book => (
                    <BookCard key={book.volumeId} book={book} />
                ))}
            </div>
            )}
        </div>
    )
};

export default HomePage;