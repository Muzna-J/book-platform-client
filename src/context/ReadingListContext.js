import { createContext, useState } from 'react';

const ReadingListContext = createContext();

const ReadingListProvider = ({children}) => {
    const [readingList, setReadingList] = useState([]);

    const addToReadingList = (book) => {
        console.log("HERe!!");
        console.log(book);
        setReadingList(currentList => [...currentList, book]);
    };

    const clearReadingList = () => {
        setReadingList([]);
    }

    return(
        <ReadingListContext.Provider value={{readingList, addToReadingList, clearReadingList}}>
            {children}
        </ReadingListContext.Provider>
    )
}

export { ReadingListContext, ReadingListProvider};