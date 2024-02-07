import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReadingListContext } from '../context/ReadingListContext';
import { toast } from 'react-toastify';

const Profile = () => {
    const { currentUser, setCurrentUser, refreshCurrentUser } = useContext(UserContext);
    const [formName, setFormName] = useState('');
    const [formPassword, setFormPassword] = useState('');
    //const [toastMessage, setToastMessage] = useState('');
    //const [error, setError] = useState('');
    const navigate= useNavigate();
    const { clearReadingList } = useContext(ReadingListContext);

    useEffect(() => {
        console.log("Current User Data test:", currentUser);
        if (currentUser) {
            setFormName(currentUser.name || '');
        }
    }, [currentUser]);

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    };

    const handleProfileUpdate = async () => {
        if (formPassword && !validatePassword(formPassword)) {
            toast.error('Password must have a minimum of 8 characters, including at least one number, one lowercase letter, one uppercase letter, and one special character');
            return;
        }

        try {
           const response =  await axios.put('http://localhost:5005/update-profile', {
                name: formName,
                password: formPassword,
            }, { withCredentials: true });
            if (formPassword) {
                clearReadingList(); // Assuming you have a function to clear reading list
                refreshCurrentUser(); // Update user context
                navigate('/login'); // Navigate to login page
                return; //prevent further execution
            }
            // only username was updated
            setCurrentUser({ ...currentUser, name: formName });
            toast.success(response.data.message);
            
        } catch (error) {
            toast.error('Error updating profile');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleProfileUpdate();
    };

    const handleNameChange = (e) => {
        setFormName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setFormPassword(e.target.value);
    };

    return (
        <div className="profile-page p-6 bg-custom-beige font-mono">
        <h1 className="text-2xl font-bold mb-4">Welcome to your profile, {currentUser?.name}!</h1> 
        <div className="max-w-xl mx-auto bg-custom-dusty shadow-lg rounded-lg overflow-hidden p-8">
        <div className="mb-4 font-bold">
                    <p>Name: {currentUser?.name}</p>
                    <p>Email: {currentUser?.email}</p>
                </div>  
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-black-600 font-bold mb-2">New Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={formName} 
                            onChange={handleNameChange} 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-black-600 font-bold mb-2">New Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={formPassword} 
                            onChange={handlePasswordChange} 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        
                    </div>
                    <div className="flex justify-center">
                        <button 
                            type="submit" 
                            className="bg-custom-crimson hover:bg-custom-orange text-white font-bold py-2 px-4 rounded-full">
                            Update Profile
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Profile;


