import { useState } from "react";
import axios from 'axios';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert('please fill in the fields');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5005/signup', {email, password});
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
        <div className="SignupPage">
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
            type="email"
            name="email"
            value= {email}
            onChange={(e)=> setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
            type="password"
            name= "password"
            value= {password}
            onChange={(e)=> setPassword(e.target.value)}
            />

            <button type="submit">Signup</button>
        </form>
        </div>
    )
};

export default SignupPage;

