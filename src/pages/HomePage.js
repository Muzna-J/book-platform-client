import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';

const keywords = ['fiction', 'history', 'science', 'adventure', 'mystery', 'fantasy', 'biography'];

function HomePage() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
     

    useEffect(() => {
        const fetchBooks = async() => {
            setIsLoading(true);
             
            try {
                const query = searchTerm.trim() ? searchTerm : keywords[Math.floor(Math.random() * keywords.length)];
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
    if (initialLoad || searchTerm.trim()) {
        fetchBooks();
    }
}, [searchTerm, initialLoad]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(inputValue);
    };


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    return (
        <div className="HomePage bg-custom-beige min-h-screen">
            <div className="text-center font-mono p-6">
                <h2 className="text-2xl font-bold mb-4">Welcome to BookFinder!</h2>
                <p className="mb-4 text-center">Discover your next great read with BookFinder. Explore a wide range of books across various genres, from fiction to biographies. Start by searching for a book, browse through our featured selections, add favorites to your reading list, and share your thoughts with book reviews. Whether you're looking for new recommendations or eager to review your latest read, BookFinder makes it easy and enjoyable.</p>
                <div className="flex justify-center items-center">
                    <form onSubmit={handleSearch} className="mb-4">
                        <input 
                            type="text" 
                            value={inputValue}
                            name="bookSearch"
                            onChange={handleInputChange}  
                            placeholder="Search books..."
                            className="mr-2 p-2 border rounded-full"  
                />
                        <button type="submit" className="bg-custom-button hover:bg-custom-orange text-white font-bold py-2 px-4 rounded-full">Search</button>
                     </form>
                </div>
            </div>
            {isLoading ? <Spinner /> : (
                
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {books.map(book => (
                    <div key={book.volumeId} className="flex flex-col items-center">
                    <BookCard book={book} />
                    </div>
                ))}
            </div>
            
            )}
        </div>
    )
};

export default HomePage;