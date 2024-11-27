import React, { useState, useRef, useEffect } from "react";
import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import { CircleUserRound,Search } from "lucide-react";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Link } from "react-router";

const Dashboard = () => {
  const slides = ["https://images3.alphacoders.com/132/thumb-1920-1328396.png", 
    "https://images2.alphacoders.com/516/thumb-1920-516664.jpg",
     "https://images5.alphacoders.com/481/thumb-1920-481903.png",
      "https://images7.alphacoders.com/611/thumb-1920-611138.png"];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sm:px-8">
      <div className="flex py-8 justify-between items-center">
        <h1 className="text-white font-neue text-4xl">Strafe</h1>
        <div className="flex">
            <input placeholder="Search a movie name..." className="outline-0 p-3 rounded-l-lg w-96 mx-auto" type="text " />
            <button className="bg-red-600 p-3 px-4 mx-auto rounded-r-lg">
                <Search className="text-white" />
            </button>
        </div>
        <div className="relative flex px-20 items-center">
          <span className="text-white">Welcome Lawrence!</span>
          <CircleUserRound
            size={32}
            className="text-white ml-4 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
          {menuOpen && (
            <div
              className="bg-slate-100 z-50 font-space font-light absolute right-0 top-10 rounded-xl font-medium px-4 py-5"
              ref={menuRef}
            >
              <ul>
                <li className="text-black hover:font-normal cursor-pointer ">Dashboard</li>
                <li className="text-black hover:font-normal cursor-pointer">Profile</li>
                <li className="text-black hover:font-normal cursor-pointer">Settings</li>
                <li className="text-black hover:font-normal cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-white text-5xl py-4 font-space font-medium">Top Shows</h1>
        <Carousel autoSlide={true}>
          {slides.map((s, index) => (
            <img key={index} src={s} alt={`Slide ${index + 1}`} />
          ))}
        </Carousel>
      </div>
      <div className="mt-20">
        <h1 className="text-white text-4xl py-4 font-space font-medium">Recommended</h1>
          <SkeletonLoader count={6} />
      </div>
    </div>
  );
};

export default Dashboard;
