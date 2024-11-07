import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <header className="px-5 py-3 bg-black shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/" passHref>
                    <div className="flex items-center cursor-pointer">
                        <Image src="/logo1.png" alt="logo" width={50} height={20} />
                        <span className="text-white text-xl font-extrabold uppercase ml-2">EduMentor</span>
                    </div>
                </Link>

                <div className="flex items-center gap-5">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-2 border text-black border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <Link href="/signup"> {/* Updated to lowercase */}
                        <button className="bg-gray-300 text-black px-4 py-2 rounded">Sign Up</button>
                    </Link>
                    <Link href="/login"> {/* Updated to lowercase */}
                        <button className="bg-gray-300 text-black px-4 py-2 rounded">Login</button>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
