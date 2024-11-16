"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StudentFormData {
    name: string;
    email: string;
    phoneNumber: string;
    field: string;           // For interests.field
    subfield: string;        // For interests.subfield
    needsGoals: string;
    preferredCommunication: string;
    location: string;
}

const StudentForm: React.FC = () => {
    const [formData, setFormData] = useState<StudentFormData>({
        name: '',
        email: '',
        phoneNumber: '',
        field: '',
        subfield: '',
        needsGoals: '',
        preferredCommunication: '',
        location: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId'); // Extract userId from query params

    useEffect(() => {
        if (!userId) {
            toast.error("No user ID provided. Please log in.");
            router.push("/login");
        }
    }, [userId, router]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.phoneNumber ||
            !formData.field ||
            !formData.subfield ||
            !formData.needsGoals ||
            !formData.preferredCommunication ||
            !formData.location
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (!userId) {
            toast.error("User ID is missing. Please log in again.");
            return;
        }

        setIsLoading(true);

        // Construct the payload in the required format
        const payload = {
            user_id: Number(userId),
            name: formData.name,
            contact_info: {
                email: formData.email,
                phone: formData.phoneNumber,
            },
            interests: {
                field: formData.field,
                subfield: formData.subfield,
            },
            needs_goals: formData.needsGoals,
            preferred_communication: formData.preferredCommunication,
            location: formData.location,
        };

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

            const response = await fetch(`${backendUrl}/api/mentees`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Student registration successful!');
                setTimeout(() => {
                    router.push('/menteeDash'); // Redirect to mentee dashboard
                }, 2000);
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    field: '',
                    subfield: '',
                    needsGoals: '',
                    preferredCommunication: '',
                    location: '',
                });
            } else {
                toast.error(data.error || 'Error in student registration');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong. Please try again.');
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
                <h2 className="text-2xl text-black font-semibold text-center mb-6">Student Registration Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Phone Number"
                            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-black"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="field" className="sr-only">Interests Field</label>
                        <input
                            type="text"
                            name="field"
                            id="field"
                            placeholder="Field of Interest"
                            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={formData.field}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="subfield" className="sr-only">Interests Subfield</label>
                        <input
                            type="text"
                            name="subfield"
                            id="subfield"
                            placeholder="Subfield of Interest"
                            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={formData.subfield}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="needsGoals" className="sr-only">Needs/Goals</label>
                        <textarea
                            name="needsGoals"
                            id="needsGoals"
                            placeholder="Needs/Goals"
                            value={formData.needsGoals}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="preferredCommunication" className="sr-only">Preferred Communication</label>
                        <input
                            type="text"
                            name="preferredCommunication"
                            id="preferredCommunication"
                            placeholder="Preferred Communication"
                            value={formData.preferredCommunication}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="location" className="sr-only">Location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
