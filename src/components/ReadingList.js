import {  useContext, useEffect } from 'react';

import { ReadingListContext } from '../context/ReadingListContext';

const ReadingList = () =>  {
    

    const { readingList } = useContext(ReadingListContext);

    useEffect(() => {
        console.log('Reading List Updated:', readingList);
      }, [readingList]);

    if (!readingList.length) {
        return <div>No books in your reading list yet.</div>;
    }

    return (
        <div>
            <h2>My Reading List</h2>

            <ul>
                {readingList.map((book) => (
                    <li key={book.volumeId}>
                    <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
                        <p>{book.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReadingList;