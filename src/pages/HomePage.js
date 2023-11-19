import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

function HomePage() {
    const [books, setBooks] = useState([]);
    const keywords = ['fiction', 'history', 'science', 'adventure', 'mystery', 'fantasy', 'biography'];
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    

    useEffect(() => {

        const fetchBooks = async() => {
            
            const query = randomKeyword;
           
            try {
                const response = await fetch(`http://localhost:5005/books?q=${query}`);
                if(!response.ok) {
                    throw new Error('failed to fetch books')
                }
                const data = await response.json();


                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);
    return (
        <div className="HomePage">
            <h2>Featured Books</h2>
            <div className="book-list">
                {books.map(book => (
                    <BookCard key={book.volumeId} book={book} />
                ))}
            </div>
        </div>
    )
};

export default HomePage;