import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigContext } from '../context/ConfigContext';


function LoginPage() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();
    const { refreshCurrentUser } = useContext(UserContext);
    const { baseUrl } = useContext(ConfigContext);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            toast.error('Please provide your email and password');
            return;
        }

        axios.post (`${baseUrl}/login`, {email, password}, { withCredentials: true })
        .then(() => {
            refreshCurrentUser();
            navigate('/') ;
        })
        .catch(error => {
            if(error.response) {
                toast.error('Invalid email or password');
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        });
    }

    return (
    <div className='LoginPage flex justify-center items-center min-h-screen bg-custom-beige' >
        <form onSubmit={handleSubmit} className='bg-custom-dusty shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80'>
            <label className='font-mono font-bold'>Email</label>
            <input
            type='email'
            name='email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <label className='font-mono font-bold'>Password</label>
            <input
            type='password'
            name='password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <div className='flex  justify-center items-center mt-5'>

            <button type='submit' className='bg-custom-crimson hover:bg-custom-orange text-white font-mono font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>Login</button>
            </div>

        </form>
    </div>
    )
};

export default LoginPage;