import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ReadingListContext = createContext();

const ReadingListProvider = ({children}) => {
    const [readingList, setReadingList] = useState([]);

    const fetchReadingList = async() => {
        console.log("Fetching reading list from server...");

        try {
            const response = await axios.get('http://localhost:5005/reading-list', { withCredentials: true });
            console.log('fetched reading list:', response.data)
             
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
        console.log("Clearing reading list...");

        setReadingList([]);
    };

    // Fetch the reading list on component mount
    useEffect(() => {
        console.log("useEffect triggered: Fetching reading list...");
        fetchReadingList();
    }, []);

    const contextValue = { readingList, addToReadingList, clearReadingList, fetchReadingList };

    return (
        <ReadingListContext.Provider value={contextValue}>
            {children}
        </ReadingListContext.Provider>
    );
};

export { ReadingListContext, ReadingListProvider };
