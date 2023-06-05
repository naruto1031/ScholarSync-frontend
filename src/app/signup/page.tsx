"use client";

import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:8000/api/register', {
            name,
            email,
            password
        });

        localStorage.setItem('auth_token', response.data.access_token);

        console.log(response);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default Signup;