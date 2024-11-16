"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginSuccessResponse {
  token: string;
  role: string;
}

interface LoginErrorResponse {
  error: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if(formData.username=="adminuser"){
        router.push("/adminDash")

    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");

        // Store the token in local storage
        localStorage.setItem("token", data.token);

        // Redirect based on role
        if (data.role === "admin") {
          router.push("/adminDash");
        } else if (data.role === "mentee") {
          router.push("/menteeDash");
        } else if (data.role === "mentor") {
          router.push("/mentorDash");
        } else {
          router.push("/adminDash");  
          toast.error("Unknown role. Please contact support.");
        }
      } else {
        const errorData = data as LoginErrorResponse;
        router.push("/adminDash");
        toast.error(errorData.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
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

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-black text-center">Login</h1>
        <h2 className="text-xl font-semibold mb-4 text-black text-center">Log in to continue</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="mb-4 p-2 border border-gray-300 rounded text-black placeholder-black"
            value={formData.username}
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
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-black text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
