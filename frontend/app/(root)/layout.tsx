import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="font-work-sans">
            {/* <Navbar /> */}
            {/* <SignUp />
            <Login /> */}

            {/* <Sidebar /> */}
            {children}
        </main>
    )
}
