// "use client";

// import { useState } from "react";
// import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// export default function SignupPage() {
//   const [role, setRole] = useState("candidate");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSignup() {
//     if (!fullName || !email || !password) {
//       alert("Please fill all the fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fullName, email, password, role }),
//       });

//       // Parse response safely
//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         data = { error: `Server returned status ${res.status}` };
//       }

//       if (!res.ok) {
//         alert(data.error || "Signup failed");
//       } else {
//         // Save a simple session so user stays logged in (demo)
//         const session = { id: data.user.id, fullName: data.user.fullName, email: data.user.email };
//         localStorage.setItem("token", JSON.stringify(session));

//         alert("Account created successfully!");
//         // Redirect to jobs (freshly signed up users can now view everything)
//         window.location.href = "/jobs";
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

//         <h1 className="text-center text-3xl font-bold mb-6">Create Account</h1>

//         <div className="flex justify-center gap-4 mb-6">
//           <button
//             onClick={() => setRole("candidate")}
//             className={`px-6 py-2 rounded-lg border-2 font-semibold 
//             ${role === "candidate" ? "border-pink-600 text-pink-600" : "border-gray-400"}`}
//           >
//             Candidate
//           </button>

//           <button
//             onClick={() => setRole("employer")}
//             className={`px-6 py-2 rounded-lg border-2 font-semibold 
//             ${role === "employer" ? "border-pink-600 text-pink-600" : "border-gray-400"}`}
//           >
//             Employer
//           </button>
//         </div>

//         <div className="relative mb-4">
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
//             onChange={(e) => setFullName(e.target.value)}
//           />
//           <FaUser className="absolute top-3.5 left-3 text-pink-600" />
//         </div>

//         <div className="relative mb-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <FaEnvelope className="absolute top-3.5 left-3 text-pink-600" />
//         </div>

//         <div className="relative mb-4">
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <FaLock className="absolute top-3.5 left-3 text-pink-600" />
//         </div>

//         <button
//           onClick={handleSignup}
//           disabled={loading}
//           className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold text-lg mb-4 disabled:opacity-50"
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>

//         <p className="text-center text-sm">
//           Already have an account?{" "}
//           <a href="/auth/login" className="text-pink-600 font-semibold">
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "candidate";
  const nextPath = searchParams.get("next") || "/jobs";

  const [role, setRole] = useState(defaultRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // keep role in sync if query param changes (rare)
  useEffect(() => {
    const rp = searchParams.get("role");
    if (rp) setRole(rp);
  }, [searchParams]);

  async function handleSignup() {
    if (!fullName || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: `Server returned status ${res.status}` };
      }

      if (!res.ok) {
        alert(data.error || "Signup failed");
      } else {
        // Save user object so client can read _id and role
        // Ensure the API returns the created user as `user` with `_id`, `fullName`, `email`, `role`
        const user = data.user || {
          id: data._id || data.id,
          fullName: data.fullName,
          email: data.email,
          role,
        };

        // normalize id key to _id if present
        const normalizedUser = {
          _id: user._id || user.id || data.user?._id || data.user?.id,
          fullName: user.fullName,
          email: user.email,
          role: role,
        };

        localStorage.setItem("user", JSON.stringify(normalizedUser));
        localStorage.setItem("token", JSON.stringify({ id: normalizedUser._id }));

        alert("Account created successfully!");

        // Redirect to requested next path (typically /jobs/add)
        window.location.href = nextPath;
      }
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h1 className="text-center text-3xl font-bold mb-6">Create Account</h1>

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

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            onChange={(e) => setFullName(e.target.value)}
          />
          <FaUser className="absolute top-3.5 left-3 text-pink-600" />
        </div>

        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="absolute top-3.5 left-3 text-pink-600" />
        </div>

        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="absolute top-3.5 left-3 text-pink-600" />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold text-lg mb-4 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href={`/auth/login?next=${encodeURIComponent(nextPath)}`} className="text-pink-600 font-semibold">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}