import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    setLoading(true);
    setErrorMessage('');
    e.preventDefault(); // Prevent the default page reload
    const data = { username, email, password };

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful:", result);
        localStorage.setItem("accessToken", result.accessToken)
        navigate("/"); // Redirect to the home page or wherever after successful registration
      } else {
        const result = await response.json();
        setLoading(false);
        setErrorMessage(result.message);
        console.error("Failed to register:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-slate-100 font-host rounded p-8 min-w-96 mx-auto min-h-80">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-200 p-2 w-full rounded-lg mt-4"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-200 p-2 w-full rounded-lg"
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
            <span className="text-red-600 font-light">{errorMessage}</span>
            <button
              type="submit"
              className={`${loading ? `bg-gray-500 cursor-not-allowed` : `bg-red-600 cursor-pointer`} p-2 font-space rounded-full text-slate-100 font-medium w-full px-10 mt-10`}
            >
              {loading ? `Loading...` : `Register`}
            </button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-red-600">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
