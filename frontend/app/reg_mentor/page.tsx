"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MentorFormData {
    name: string;
    contact_info: {
        email: string;
        phone: string;
    };
    expertise: string[];
    availability: string;
    languages: string;
    bio: string;
    password: string; // Added password field
}

const MentorForm: React.FC = () => {
    const [formData, setFormData] = useState<MentorFormData>({
        name: '',
        contact_info: {
            email: '',
            phone: '',
        },
        expertise: [],
        availability: '',
        languages: '',
        bio: '',
        password: '', // Initial value for password
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'email' || name === 'phone') {
            setFormData({
                ...formData,
                contact_info: {
                    ...formData.contact_info,
                    [name]: value,
                },
            });
        } else if (name === 'expertise') {
            setFormData({
                ...formData,
                expertise: value.split(',').map(skill => skill.trim()),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:4000/api/mentors', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
            toast.success('Mentor Registered Successfully');
            setFormData({
                name: '',
                contact_info: {
                    email: '',
                    phone: '',
                },
                expertise: [],
                availability: '',
                languages: '',
                bio: '',
                password: '', // Reset password field after submission
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Server Error:', error.response.data);
                    toast.error(`Error: ${error.response.data.message || 'Server error'}`);
                } else if (error.request) {
                    console.error('Network Error - No response received');
                    toast.error('Cannot connect to server. Please check if the server is running.');
                } else {
                    console.error('Error:', error.message);
                    toast.error(error.message);
                }
            } else {
                console.error('Unexpected error:', error);
                toast.error('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md ml-6">
                <h2 className="text-2xl text-black font-semibold text-center mb-6">Mentor Registration Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password" // Changed to 'password' for better security
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.contact_info.email}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.contact_info.phone}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Expertise (comma-separated):</label>
                        <input
                            type="text"
                            id="expertise"
                            name="expertise"
                            value={formData.expertise.join(', ')}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability:</label>
                        <input
                            type="text"
                            id="availability"
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="languages" className="block text-sm font-medium text-gray-700">Languages:</label>
                        <input
                            type="text"
                            id="languages"
                            name="languages"
                            value={formData.languages}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio:</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MentorForm;
