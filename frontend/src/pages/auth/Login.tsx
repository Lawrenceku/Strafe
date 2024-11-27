import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault(); // Prevent default page reload
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
        // Redirect or handle login success (e.g., save token, navigate to dashboard)
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
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
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-200 p-2 w-full rounded-lg"
            />
            <button
              type="submit"
              className="bg-red-600 p-2 font-space rounded-full text-slate-100 font-medium w-full px-10 mt-10"
            >
              Login
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
