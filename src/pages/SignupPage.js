import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ConfigContext } from "../context/ConfigContext";

function SignupPage() {
    const { baseUrl } = useContext(ConfigContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        number: false,
        lowercase: false,
        uppercase: false,
        specialChar: false
    });
    const navigate= useNavigate();

    const checkPasswordCriteria = (password) => {
        const criteria = {
            minLength: password.length >= 8,
            number: /[0-9]/.test(password),
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        setPasswordCriteria(criteria);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordCriteria(newPassword);
    };

    const criteriaClass = (isMet) => 
        isMet ? "text-green-500" : "text-red-500";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name || !email || !password) {
            toast.error('please fill in the fields');
            return;
        }
        try {
            const response = await axios.post(`${baseUrl}/signup`, {name, email, password});
            if(response.status===201) {
                toast.success('Signup successful')
                navigate('/login');
                
            } else {
                const errorMessage = response.data.errorMessage || 'Error occurred during signup';
                toast.error(`Signup failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Signup error:', error)
            if(error.response) {
                const errorMessage = error.response.data.errorMessage || 'Error occurred during signup';
                toast.error(`Signup failed: ${errorMessage}`);
            } else {
                toast.error('An error occured during signup. Please check your network and try again.');
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
            onChange={handlePasswordChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />

            <ul className="list-disc ml-5 mt-2">
                <li className={criteriaClass(passwordCriteria.minLength)}>At least 8 characters</li>
                <li className={criteriaClass(passwordCriteria.number)}>Includes a number</li>
                <li className={criteriaClass(passwordCriteria.lowercase)}>Includes a lowercase letter</li>
                <li className={criteriaClass(passwordCriteria.uppercase)}>Includes an uppercase letter</li>
                <li className={criteriaClass(passwordCriteria.specialChar)}>Includes a special character</li>
            </ul>
            <div className='flex  justify-center items-center mt-5'>

            <button type="submit" className='bg-custom-crimson hover:bg-custom-orange text-white font-mono font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>Signup</button>
            </div>
        </form>
        </div>
    )
};

export default SignupPage;

