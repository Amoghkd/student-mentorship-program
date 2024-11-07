import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
    // An array of names for the pages you can change later
    const pageNames = ['Home', 'About', 'Report', 'Mentors', 'Domain'];

    return (
        <div>
            {/* Sidebar (Horizontal Layout) */}
            <div className="p-5 mt-0 bg-black">
                <ul className="flex justify-between p-0 m-0">
                    {pageNames.map((pageName, index) => (
                        <li key={index} className="flex-1 text-center">
                            <Link
                                href={`/${pageName.toLowerCase()}`}
                                className="text-white no-underline 
                                transition-transform duration-300 
                                hover:scale-105"
                            >
                                {pageName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
