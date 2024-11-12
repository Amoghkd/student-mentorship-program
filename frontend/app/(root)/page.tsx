"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Logic to determine if the user just signed up
    const newUser = localStorage.getItem('newUser'); // Example of tracking the state
    if (newUser) {
      setIsNewUser(true);
      localStorage.removeItem('newUser'); // Clear after detection
    }
  }, []);

  return (
    <>
      <div className="relative w-full h-[625px]">
        <img
          src="/s3.png"
          alt="Student Mentorship Program"
          className="object-cover w-full h-full"
        />

        {/* Prompt for new users */}
        {isNewUser && (
          <div className="absolute top-[60%] left-[68%] transform -translate-x-1/2 flex gap-2">
            <Link href="/reg_mentor" passHref>
              <button className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-600 transition">
                Complete Mentor Registration
              </button>
            </Link>
            <Link href="/stu_reg" passHref>
              <button className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-600 transition">
                Complete Student Registration
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}