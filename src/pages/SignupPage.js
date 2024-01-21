import { useState } from "react";
import axios from 'axios';

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name || !email || !password) {
            alert('please fill in the fields');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5005/signup', {name, email, password});
            if(response.status===201) {
                alert('Signup successful')
            } else {
                alert(`Signup failed: ${response.data.errorMessage || 'Error'}`);
            }
        } catch (error) {
            console.error('Signup error:', error)
            if(error.response) {
                alert(`Signup failed: ${error.response.data.errorMessage || 'Error'}`);
            } else {
                alert('An error occured during signup');
            }
        }
    };

    return (
        <div className="SignupPage flex justify-center items-center min-h-screen bg-custom-beige">
        <form onSubmit={handleSubmit} className='bg-custom-dusty shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80'>
            <label className='font-mono font-bold'>Name</label>
            <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            /> 
            <label className='font-mono font-bold'>Email</label>
            <input
            type="email"
            name="email"
            value= {email}
            onChange={(e)=> setEmail(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />

            <label className='font-mono font-bold'>Password</label>
            <input
            type="password"
            name= "password"
            value= {password}
            onChange={(e)=> setPassword(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <div className='flex  justify-center items-center mt-5'>

            <button type="submit" className='bg-custom-crimson hover:bg-custom-beige text-white font-mono font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>Signup</button>
            </div>
        </form>
        </div>
    )
};

export default SignupPage;

