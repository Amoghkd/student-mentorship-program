"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for the App Router
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegisterRequest {
  username: string;
  password: string;
  role: "mentor" | "mentee";
}

interface RegisterSuccessResponse {
  message: string;
  userId: number;
}

interface RegisterErrorResponse {
  error: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    password: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // Ensure this is inside the component function

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Frontend Validation (Optional)
    if (!formData.username || !formData.password || !formData.role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Notify user of success and redirect
        toast.success(data.message);
        // Optionally, you can redirect after a short delay to allow the toast to be visible
        if(formData.role=="mentee"){
          router.push("/stu_reg");
        }
        else if (formData.role=="mentor") {
            router.push("/reg")
        }
        // Reset form fields
        setFormData({
          username: "",
          password: "",
          role: "",
        });
      } else {
        // Handle API errors
        toast.error(data.error || "Registration failed. Please check your input.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
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
        <h1 className="text-4xl font-bold mb-6 text-black text-center">
          Sign Up
        </h1>
        <h2 className="text-xl font-semibold mb-4 text-black text-center">
          Sign up to continue
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="mb-4 p-2 border border-gray-300 rounded text-black"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4 p-2 border border-gray-300 rounded text-black"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="mb-4 p-2 border border-gray-300 rounded text-black"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Sign up"}
          </button>
        </form>
        <p className="mt-4 text-black text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
