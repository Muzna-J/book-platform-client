import { useEffect, useState } from 'react';
import axios from 'axios';

function ReadingList () {
    const [readingList, setReadingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchReadingList = async() => {
        try {
            const response = await axios.get('http://localhost:5005/reading-list');
            setReadingList(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addBook = async (newBook) => {
        try {
            const response = await axios.post('http://localhost:5005/reading-list/add', newBook);
            const addedBook = response.data;
            setReadingList(prevList => [...prevList, addedBook]);
        } catch(error) {
            console.error('Error adding book', error)
        }
    };

    useEffect(() => {
        fetchReadingList();
    }, []);
            

     if (loading) {
        return <div>Loading reading list...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (readingList.length === 0) {
        return <div>No books in your reading list yet.</div>;
    }

    return (
        <div>
            <h2>My Reading List</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                addBook({title: 'Durch Mag Moor', bookId: 'dzuaEAAAQBAJ'})
            }}>
                <input type='text' placeholder='book title' />
                <button type='submit'>Add Book</button>
            </form>

            <ul>
                {readingList.map(book => (
                    <li key={book._id}>
                        {book.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReadingList;