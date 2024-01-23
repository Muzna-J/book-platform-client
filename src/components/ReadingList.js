import {  useContext, useEffect } from 'react';
import { ReadingListContext } from '../context/ReadingListContext';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { toast } from 'react-toastify';

const ReadingList = () =>  {
    const { readingList, fetchReadingList, removeFromReadingList } = useContext(ReadingListContext);

    useEffect(() => {
        if (readingList.length === 0) {
            console.log("Reading list is empty, fetching data...");
            fetchReadingList();
        }
    }, []);

    // useEffect(() => {
    //     console.log('Reading List Updated:', readingList);
    //   }, [readingList]);
    
    console.log('Current state of readingList:', readingList);
      

    if (!Array.isArray(readingList) || readingList.length === 0) {
        return <div className="text-center my-4">No books in your reading list yet.</div>;
    }

    const handleDelete = (book) => {
        removeFromReadingList(book);
        toast.success('Book removed!');
    };

    return (
        <div className="bg-custom-beige min-h-screen ">
        <div className="text-center font-mono p-6">
            <h2 className="text-2xl font-bold mb-4">My Reading List</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {readingList.map((book) => (
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