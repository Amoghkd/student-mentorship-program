"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For redirecting after submission
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StudentFormData {
    name: string;
    email: string;
    phoneNumber: string;
    interests: string;
    needsGoals: string;
    preferredCommunication: string;
    location: string;
}

const StudentForm: React.FC = () => {
    const [formData, setFormData] = useState<StudentFormData>({
        name: '',
        email: '',
        phoneNumber: '',
        interests: '',
        needsGoals: '',
        preferredCommunication: '',
        location: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

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

        // Basic Frontend Validation
        if (!formData.name || !formData.email || !formData.phoneNumber || !formData.interests || !formData.needsGoals || !formData.preferredCommunication || !formData.location) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsLoading(true);

        // Construct the payload in the required format
        const payload = {
            name: formData.name,
            contact_info: {
                email: formData.email,
                phone: formData.phoneNumber,
            },
            interests: formData.interests.split(',').map(interest => interest.trim()), // Split and trim interests
            needs_goals: formData.needsGoals,
            preferred_communication: formData.preferredCommunication,
            location: formData.location,
        };

        console.log('Form Data:', payload);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

            const response = await fetch(`${backendUrl}/api/mentees`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Student registration successful!');

                // Redirect based on role after a short delay to allow the toast to display
                setTimeout(() => {
                    router.push('/success'); // Replace with your desired path
                }, 2000);

                // Reset form fields
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    interests: '',
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
                        <label htmlFor="name" className="sr-only">
                            Name
                        </label>
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
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>
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
                        <label htmlFor="phoneNumber" className="sr-only">
                            Phone Number
                        </label>
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
                        <label htmlFor="interests" className="sr-only">
                            Interests (comma-separated)
                        </label>
                        <input
                            type="text"
                            name="interests"
                            id="interests"
                            placeholder="Interests (comma-separated)"
                            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={formData.interests}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="needsGoals" className="sr-only">
                            Needs/Goals
                        </label>
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
                        <label htmlFor="preferredCommunication" className="sr-only">
                            Preferred Communication
                        </label>
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
                        <label htmlFor="location" className="sr-only">
                            Location
                        </label>
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
