import React, { SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        setRedirect(true);
    }

    useEffect(() => {
        if (redirect) {
            navigate("/");
        }
    }, [redirect, navigate]);

    return (
        <form onSubmit={submit}>
          <h1 className="h2 mb-3 fw-normal">Please sign in</h1>
          <input type="email" className="form-control" placeholder="Email address" required
            onChange={e => setEmail(e.target.value)}
          />
          <input type="password" className="form-control" placeholder="Password" required
            onChange={e => setPassword(e.target.value)}
          />
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign In</button>
        </form>
    );
};

export default Login;
