import React, { useState, useRef, useEffect } from "react";
import Card from "@/components/Card"; // Assuming Card component exists for displaying movies
import Carousel from "@/components/Carousel";
import { CircleUserRound, Search } from "lucide-react";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const slides = [
    "https://images3.alphacoders.com/132/thumb-1920-1328396.png",
    "https://images2.alphacoders.com/516/thumb-1920-516664.jpg",
    "https://images5.alphacoders.com/481/thumb-1920-481903.png",
    "https://images7.alphacoders.com/611/thumb-1920-611138.png",
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]); // State to store fetched movies
  const [loading, setLoading] = useState(true); // State to manage loading
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch recommended movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/movies/550/recommendations"); // Replace with your API endpoint
        const data = await response.json();
        setMovies(data); // Store fetched movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="sm:px-8">
      <div className="flex py-8 justify-between items-center">
        <h1 className="text-white font-neue text-4xl">Strafe</h1>
        <div className="flex">
          <input
            placeholder="Search a movie name..."
            className="outline-0 p-3 rounded-l-lg lg:w-96 mx-auto"
            type="text"
          />
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
                <li className="text-black hover:font-normal cursor-pointer">
                  Dashboard
                </li>
                <li className="text-black hover:font-normal cursor-pointer">
                  Profile
                </li>
                <li className="text-black hover:font-normal cursor-pointer">
                  Settings
                </li>
                <li className="text-black hover:font-normal cursor-pointer">
                  Logout
                </li>
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
        <h1 className="text-white text-4xl py-4 font-space font-medium">
          Recommended
        </h1>
        {loading ? (
          <SkeletonLoader count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie: any) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
