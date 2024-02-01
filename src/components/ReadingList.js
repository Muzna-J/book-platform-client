import {  useContext, useEffect, useState } from 'react';
import { ReadingListContext } from '../context/ReadingListContext';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const ReadingList = () =>  {
    const { readingList, fetchReadingList, removeFromReadingList } = useContext(ReadingListContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (readingList.length === 0) {
            console.log("Reading list is empty, fetching data...");
            setIsLoading(true);
            fetchReadingList().then(()=> {
                setIsLoading(false)
            })
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <Spinner />; 
    }

    // useEffect(() => {
    //     console.log('Reading List Updated:', readingList);
    //   }, [readingList]);
    
    console.log('Current state of readingList:', readingList);
      

    if (!Array.isArray(readingList) || readingList.length === 0) {
        return (
            <div className="flex flex-col bg-custom-beige justify-center items-center min-h-screen">
                <div className="text-center text-2xl my-4 font bold">
                    No books in your reading list yet.
                </div>
            </div>
        );
    }
        
    

    const handleDelete = (book) => {
        removeFromReadingList(book);
        toast.success('Book removed!');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredReadingList = searchTerm
        ? readingList.filter(book =>
              book.title.toLowerCase().includes(searchTerm) ||
              (book.authors && book.authors.some(author => author.toLowerCase().includes(searchTerm))))
        : readingList;

    return (
        <div className="bg-custom-beige min-h-screen ">
        <div className="text-center font-mono p-6">
            <h2 className="text-2xl font-bold mb-4">My Reading List</h2>
            <input 
                    type="text" 
                    onChange={handleSearchChange}
                    placeholder="Search reading list"
                    className="mb-4 p-2 border rounded-full"  
                />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredReadingList.map((book) => (
                    <div key={book._id} className="flex flex-col items-center">
                    
                    <BookCard book={{ 
                            //title: book.title, 
                            coverImage: book.thumbnail, 
                            volumeId: book.volumeId 
                        }} />

                
                    <button onClick={() => handleDelete(book)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2 rounded">Remove</button>
                    </div>  
                ))}
            </div>
            </div>
        </div>
    );
}

export default ReadingList;