import { useState } from 'react';
function LoginPage() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert('Please provide your email and password');
            return;
        }
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