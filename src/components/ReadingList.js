import {  useContext, useEffect } from 'react';

import { ReadingListContext } from '../context/ReadingListContext';

const ReadingList = () =>  {
    const { readingList } = useContext(ReadingListContext); 

    useEffect(() => {
        console.log('Reading List Updated:', readingList);
      }, [readingList]);

    if (!Array.isArray(readingList) || readingList.length === 0) {
        return <div>No books in your reading list yet.</div>;
    }

    return (
        <div>
            <h2>My Reading List</h2>

            <ul>
                {readingList.map((book) => (
                    <li key={book._id}>
                    <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
                        <p>{book.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReadingList;