import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const UserContext = createContext();

// This component will wrap around parts of the app that need access to UserContext
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  
    // Fetch the user from the backend
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5005/current-user', {
          withCredentials: true
        });
        if (response.data.currentUser) {
          setCurrentUser(response.data.currentUser);
        } else {
            setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error fetching current user', error);
      }
    };

    useEffect(() => {
        fetchUser();
      }, []);

      const refreshCurrentUser = () => {
        fetchUser(); // refresh the current user
      };



  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, refreshCurrentUser }}> 
      {children}
    </UserContext.Provider>
  );
};
