import Link from "next/link";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      {/* Full-Width Image Section */}
      <div className="relative w-full h-1/4 min-h-[625px]">
        <img
          src="/s3.png"
          alt="STMH logo"
          className="object-cover w-full h-full"
        />

        {/* Logo-like Stacked Text */}
        <div className="absolute top-[20%] left-[69%] transform -translate-x-1/2 flex flex-col items-center text-black font-extrabold">
          {/* <p className="text-5xl md:text-6xl lg:text-7xl leading-none">Student</p>
          <p className="text-5xl md:text-6xl lg:text-7xl leading-none">Mentoring</p> */}
        </div>

        {/* Buttons in the adjusted position */}
        <div className="absolute top-[60%] left-[68%] transform -translate-x-1/2 flex gap-2">
          <Link href="/reg_mentor" passHref>
            <button className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-600 transition">
              Register as Mentor
            </button>
          </Link>
          <Link href="/stu_reg" passHref>
            <button className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-600 transition">
              Register as Student
            </button>

          </Link>
        </div>
      </div>


    </>
  );
}
