import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error message
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    setLoading(true); // Set loading to true when submitting the form
    setErrorMessage(''); // Reset any previous error messages
    e.preventDefault(); // Prevent the default page reload
    const data = { username, password };

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        localStorage.setItem("accessToken", result.accessToken);
        navigate("/"); // Redirect to the home page or wherever after successful login
      } else {
        setLoading(false); // Stop loading
        setErrorMessage("Login failed. Please check your credentials."); // Show error message
        console.error("Login failed:", response.statusText);
      }
    } catch (error: any) {
      setLoading(false); // Stop loading on error
      setErrorMessage("An error occurred during login. Please try again later."); // Show error message
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-slate-100 font-host rounded p-8 min-w-96 mx-auto min-h-80">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-4xl font-bold">Sign In</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-200 p-2 w-full rounded-lg mt-4"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-200 p-2 w-full rounded-lg"
              required
            />
            {/* Show error message */}
            {errorMessage && <span className="text-red-600 font-light">{errorMessage}</span>}

            {/* Show loading state */}
            <button
              type="submit"
              className={`${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 cursor-pointer'} p-2 font-space rounded-full text-slate-100 font-medium w-full px-10 mt-10`}
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-red-600">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
