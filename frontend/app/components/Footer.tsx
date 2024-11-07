import React from "react";

const Footer = () => {
    return (
        // Footer Section
        <footer className="bg-black text-white py-4 text-center">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} EduMentor. All rights reserved.
            </p>
            <p className="text-sm mt-1">
                Contact us at <a href="mailto:contact@edumentor.com" className="text-blue-400 underline">contact@edumentor.com</a>
            </p>
        </footer>
    );
};

export default Footer;
