"use client";
import React, { useState } from "react";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                // Redirect to login or other desired page
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-4xl font-bold mb-6 text-black text-center">Sign Up</h1>
                <h2 className="text-xl font-semibold mb-4 text-black text-center">Sign up to continue</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="mb-4 p-2 border border-gray-300 rounded text-black placeholder-black"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
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
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded">Sign up</button>
                </form>
                <p className="mt-4 text-black text-center">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;