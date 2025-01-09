import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginImg from "./login.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const { userID,role,firstName,lastName } = response.data;
        // Store userID and role in localStorage
        localStorage.setItem("userID", userID);
        localStorage.setItem("role", role);
        localStorage.setItem("firstName", firstName); // Store firstName
        localStorage.setItem("lastName", lastName);

        // Navigate based on role
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/intern-dashboard");
        }
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data?.message || error.message
      );
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: "#0156a6" }}>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-0 flex">
        {/* Left Side with Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={LoginImg} // Replace with your image URL
            alt="Login Illustration"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>

        {/* Right Side with Form */}
        <div className="w-full md:w-1/2 p-8 pt-20">
          <h2 className="text-2xl font-bold text-center mb-10 text-black">
            Login
          </h2>
          {error && <p className="text-red-500 text-right mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-10 text-left">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-white bg-black focus:outline-none focus:border-gray-500 " 
                placeholder="Enter your email"
                required
                style={{ backgroundColor: "#0156a6" }}
              />
            </div>
            <div className="mb-10 text-left">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-white bg-black  focus:outline-none focus:border-gray-500"
                placeholder="Enter your password"
                required
                style={{ backgroundColor: "#0156a6" }}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-yellow-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
