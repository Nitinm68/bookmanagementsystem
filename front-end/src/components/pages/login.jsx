import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // message text
  const [showError, setShowError] = useState(false); // fade animation toggle
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000); // fade-out after 3 sec
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowError(false);

    try {
      const res = await axios.post("http://localhost:4004/api/auth/login", {
        email,
        password,
      },{withCredentials:true});

      console.log(res.data);
      toast.success("Login successful!");
      login(res.data.user, res.data.token); // token bhi save karega
      navigate("/");
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center font-[Poppins] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          🔐 Welcome Back to <span className="text-black">EduLib</span>
        </h2>

        {/* ✅ Error Message with Fade */}
        {errorMessage && (
          <div
            className={`mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded transition-opacity duration-500 ${
              showError ? "opacity-100" : "opacity-0"
            }`}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
