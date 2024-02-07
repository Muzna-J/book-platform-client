import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ReadingListContext = createContext();

const ReadingListProvider = ({children}) => {
    const [readingList, setReadingList] = useState([]);

    const fetchReadingList = async() => {

        try {
            const response = await axios.get('http://localhost:5005/reading-list', { withCredentials: true }); 
            setReadingList(response.data);
        } catch (error) {
            console.error("Error fetching reading list:", error);
        }
    };

    const addToReadingList = async (book) => {
        try {
            await axios.post('http://localhost:5005/reading-list/add', book, { withCredentials: true });
            fetchReadingList(); // Refresh the reading list from the server
        } catch (error) {
            console.error("Error adding book to reading list:", error);
        }
    };

    // Function to clear the reading list (locally)
    const clearReadingList = () => {
        setReadingList([]);
    };

    const removeFromReadingList = async (book) => {
        try {
            const { volumeId } = book;
            await axios.post('http://localhost:5005/delete-book', { volumeId }, { withCredentials:true });
            fetchReadingList(); // Refresh the reading list from the server
        } catch (error) {
            console.error('Error removing book from reading list:', error);
        }
    };

    // Fetch the reading list on component mount
    useEffect(() => {
        fetchReadingList();
    }, []);

    const contextValue = { readingList, addToReadingList, clearReadingList, fetchReadingList, removeFromReadingList  };

    return (
        <ReadingListContext.Provider value={contextValue}>
            {children}
        </ReadingListContext.Provider>
    );
};

export { ReadingListContext, ReadingListProvider };
