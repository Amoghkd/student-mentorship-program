"use client";
import React, { useState } from "react";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login successful');
                // Store the token in local storage
                localStorage.setItem('token', data.token);
                // Redirect to the home page or dashboard
                window.location.href = '/';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
            <h1 className="text-4xl font-bold mb-6 text-black text-center">Login</h1>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-black text-center">Log in to continue</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="mb-4 p-2 border border-gray-300 rounded text-black placeholder-black"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="mb-4 p-2 border border-gray-300 rounded text-black placeholder-black"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded">Login</button>
                </form>
            </div>
            <p className="mt-4 text-black text-center">
                Don't have an account? <a href="/stu_reg" className="text-blue-500">Sign up</a>
            </p>
        </div>
    );
};

export default Login;