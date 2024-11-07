// app/signup.tsx

import React from "react";

const Signup = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> {/* White box for form */}
                <h1 className="text-4xl font-bold mb-6 text-black text-center">Sign Up</h1>
                <h2 className="text-xl font-semibold mb-4 text-black text-center">Sign up to continue</h2>
                <form className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Name"
                        className="mb-4 p-2 border border-gray-300 rounded text-black placeholder-black"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="mb-4 p-2 border border-gray-300 rounded text-black placeholder-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="mb-4 p-2 border border-gray-300 rounded text-black placeholder-black"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded">Sign up</button>
                </form>
                <p className="mt-4 text-black text-center">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
            </div>
        </div>
    );
};

export default Signup;
