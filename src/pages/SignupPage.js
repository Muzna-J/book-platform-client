import { useState } from "react";

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert('please fill in the fields');
            return;
        }
    }

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

