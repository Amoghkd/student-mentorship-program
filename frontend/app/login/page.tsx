// app/login.tsx

import React from "react";

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
            <h1 className="text-4xl font-bold mb-6 text-black text-center">Login</h1>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> {/* White box for form */}
                <h2 className="text-xl font-semibold mb-4 text-black text-center">Log in to continue</h2>
                <form className="flex flex-col">
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
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded">Login</button>
                </form>
            </div>
            <p className="mt-4 text-black text-center">Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a></p>
        </div>
    );
};

export default Login;
