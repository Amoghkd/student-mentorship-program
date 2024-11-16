"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MentorFormData {
    name: string;
    contact_info: {
        email: string;
        phone: string;
    };
    field: string;
    subfield: string;
    availability: string;
    languages: string;
    bio: string;
    password: string;
}

const MentorForm: React.FC = () => {
    const [formData, setFormData] = useState<MentorFormData>({
        name: '',
        contact_info: {
            email: '',
            phone: '',
        },
        field: '',
        subfield: '',
        availability: '',
        languages: '',
        bio: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    // Retrieve userId from URL query parameters
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

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

        // Construct the payload based on the provided format and include userId
        const payload = {
            user_id: Number(userId), // Include userId in the payload
            name: formData.name,
            contact_info: {
                email: formData.contact_info.email,
                phone: formData.contact_info.phone,
            },
            expertise: {
                field: formData.field,
                subfield: formData.subfield,
            },
            availability: formData.availability,
            languages: formData.languages,
            bio: formData.bio,
        };

        try {
            const response = await axios.post('http://localhost:4000/api/mentors', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            toast.success('Mentor Registered Successfully');
            setFormData({
                name: '',
                contact_info: {
                    email: '',
                    phone: '',
                },
                field: '',
                subfield: '',
                availability: '',
                languages: '',
                bio: '',
                password: '',
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while submitting the form.');
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
                        <label htmlFor="field" className="block text-sm font-medium text-gray-700">Field of Expertise:</label>
                        <input
                            type="text"
                            id="field"
                            name="field"
                            value={formData.field}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="subfield" className="block text-sm font-medium text-gray-700">Subfield of Expertise:</label>
                        <input
                            type="text"
                            id="subfield"
                            name="subfield"
                            value={formData.subfield}
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
