"use client";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function SignupPage() {
  const [role, setRole] = useState("candidate");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password, role }),
    });

    const data = await res.json();
    alert(data.message || data.error);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">

        <h1 className="text-center text-3xl font-bold mb-6">Create Account</h1>

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

        {/* Full Name */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            onChange={(e) => setFullName(e.target.value)}
          />
          <FaUser className="absolute top-3.5 left-3 text-pink-600" />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="absolute top-3.5 left-3 text-pink-600" />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="absolute top-3.5 left-3 text-pink-600" />
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold text-lg mb-4"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="text-pink-600 font-semibold">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
