import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/register';

function App() {
    const [name, setName] = useState('');

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/api/user', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const content = await response.json();
            setName(content.name);
        })();
    }, []); // Add empty dependency array to run only on mount

    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={name} setName={setName} />

                <main className="form-signin">
                    <Routes>
                        <Route path="/" element={<Home name={name} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
