import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
function LoginPage() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert('Please provide your email and password');
            return;
        }

        axios.post ('http://localhost:5005/login', {email, password})
        .then(response => {
            console.log(response.data);
            window.location = '/profile';
        })
        .catch(error => {
            if(error.response) {
                console.log(error.response.data);
                alert(error.response.data.errorMessage)
            } else {
                console.log('Error', error.message)
            }
        });
    }

    return (
    <div className='LoginPage'>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
            type='email'
            name='email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
            type='password'
            name='password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />

            <button type='submit'>Login</button>

        </form>
    </div>
    )
};

export default LoginPage;