"use client";
import { useState } from "react";
import { FaUser, FaEye, FaEyeSlash, FaLinkedinIn, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [role, setRole] = useState("candidate");  
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();
    alert(data.message || data.error);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        
        <h1 className="text-center text-3xl font-bold mb-6">User Login</h1>

        {/* Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setRole("candidate")}
            className={`px-6 py-2 rounded-lg border-2 font-semibold 
            ${role === "candidate" ? "border-pink-600 text-pink-600" : "border-gray-400"}`}
          >
            Candidate
          </button>

          <button
            onClick={() => setRole("employer")}
            className={`px-6 py-2 rounded-lg border-2 font-semibold 
            ${role === "employer" ? "border-pink-600 text-pink-600" : "border-gray-400"}`}
          >
            Employer
          </button>
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className="absolute top-3.5 left-3 text-pink-600 text-lg" />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEyeSlash
              onClick={() => setShowPassword(false)}
              className="absolute top-3.5 right-3 text-pink-600 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => setShowPassword(true)}
              className="absolute top-3.5 right-3 text-pink-600 cursor-pointer"
            />
          )}
        </div>

        <div className="flex justify-between items-center mb-6 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Remember me
          </label>

          <a href="#" className="text-pink-600 font-medium">Forgot Password?</a>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold text-lg mb-4"
        >
          Log In
        </button>

        <p className="text-center text-sm mb-6">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-pink-600 font-semibold">
            Register here
          </a>
        </p>

        <div className="flex items-center justify-center mb-4">
          <div className="w-1/3 border" />
          <span className="mx-2 text-gray-500">Or</span>
          <div className="w-1/3 border" />
        </div>

        <div className="flex justify-center gap-6">
          <button className="p-3 border rounded-lg hover:bg-gray-100">
            <FaLinkedinIn className="text-xl" />
          </button>

          <button className="p-3 border rounded-lg hover:bg-gray-100">
            <FaGoogle className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
