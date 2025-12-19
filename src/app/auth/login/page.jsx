// "use client";

// import { useState } from "react";
// import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
// import { useSearchParams } from "next/navigation";


// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   async function handleLogin() {
//     if (!email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:3000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // ✅ REQUIRED FOR COOKIE
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "Login failed");
//         return;
//       }

//       // ✅ Save ONLY user (cookie handles auth)
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // ✅ SAFE REDIRECT (NO LOOP)
//       if (data.user.role === "employer") {
//         window.location.replace("/dashboard/employer");
//       } else if (data.user.role === "candidate") {
//         window.location.replace("/dashboard/candidate");
//       } else {
//         window.location.replace("/");
//       }
//     } catch (err) {
//       alert("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
//       <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
//         <h1 className="text-center text-3xl font-bold mb-6">Login</h1>

//         <div className="relative mb-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <FaUser className="absolute top-3.5 left-3 text-pink-600" />
//         </div>

//         <div className="relative mb-6">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {showPassword ? (
//             <FaEyeSlash
//               onClick={() => setShowPassword(false)}
//               className="absolute top-3.5 right-3 text-pink-600 cursor-pointer"
//             />
//           ) : (
//             <FaEye
//               onClick={() => setShowPassword(true)}
//               className="absolute top-3.5 right-3 text-pink-600 cursor-pointer"
//             />
//           )}
//         </div>

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold text-lg mb-4 disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Log In"}
//         </button>

//         <p className="text-center text-sm">
//           Don’t have an account?{" "}
//           <a href="/auth/signup" className="text-pink-600 font-semibold">
//             Register here
//           </a>
//         </p>
//         <a href="/auth/forgot-password" className="text-sm text-pink-600">
//   Forgot password?
// </a>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ CLEAR OLD USER DATA WHEN LANDING ON LOGIN PAGE
    localStorage.removeItem("user");
  }, []);

  async function handleLogin() {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ Save user ONLY AFTER successful login
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ SAFE REDIRECT
      if (data.user.role === "employer") {
        window.location.replace("/dashboard/employer");
      } else if (data.user.role === "candidate") {
        window.location.replace("/dashboard/candidate");
      } else {
        window.location.replace("/");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h1 className="text-center text-3xl font-bold mb-6">Login</h1>

        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className="absolute top-3.5 left-3 text-pink-600" />
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            value={password}
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

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold text-lg mb-4 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-center text-sm">
          Dont have an account?{" "}
          <a href="/auth/signup" className="text-pink-600 font-semibold">
            Register here
          </a>
        </p>
        <a href="/auth/forgot-password" className="text-sm text-pink-600 block text-center mt-2">
          Forgot password?
        </a>
      </div>
    </div>
  );
}