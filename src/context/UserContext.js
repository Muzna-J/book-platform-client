import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const UserContext = createContext();

// This component will wrap around parts of your app that need access to UserContext
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch the user from your backend
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5005/current-user', {
          withCredentials: true
        });
        console.log("Fetched user data:", response.data.currentUser);
        if (response.data.currentUser) {
          setCurrentUser(response.data.currentUser);
        }
      } catch (error) {
        console.error('Error fetching current user', error);
      }
    };

    fetchUser();
  }, []);

  

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}> 
      {children}
    </UserContext.Provider>
  );
};
