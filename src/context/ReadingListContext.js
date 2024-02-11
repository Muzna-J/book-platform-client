import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ConfigContext } from './ConfigContext';

const ReadingListContext = createContext();

const ReadingListProvider = ({children}) => {
    const [readingList, setReadingList] = useState([]);
    const { baseUrl } = useContext(ConfigContext);

    const fetchReadingList = async() => {

        try {
            const response = await axios.get(`${baseUrl}/reading-list`, { withCredentials: true }); 
            setReadingList(response.data);
        } catch (error) {
            console.error("Error fetching reading list:", error);
        }
    };

    const addToReadingList = async (book) => {
        try {
            await axios.post(`${baseUrl}/reading-list/add`, book, { withCredentials: true });
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
            await axios.post(`${baseUrl}/delete-book`, { volumeId }, { withCredentials:true });
            fetchReadingList(); 
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
