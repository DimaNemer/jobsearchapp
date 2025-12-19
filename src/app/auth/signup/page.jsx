// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { FaUser, FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";

// export default function SignupPage() {
//   const searchParams = useSearchParams();
//   const defaultRole = searchParams.get("role") || "candidate";
// const roleFromQuery = searchParams.get("role");
// const isRoleLocked = roleFromQuery === "employer" || roleFromQuery === "candidate";


//   const [role, setRole] = useState(defaultRole);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Employer-only fields
//   const [companyName, setCompanyName] = useState("");
//   const [companyLocation, setCompanyLocation] = useState("");
//   const [companyWebsite, setCompanyWebsite] = useState("");

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const r = searchParams.get("role");
//     if (r) setRole(r);
//   }, [searchParams]);

//   async function handleSignup() {
//     if (!fullName || !email || !password) {
//       alert("Please fill all required fields");
//       return;
//     }

//     if (role === "employer" && !companyName) {
//       alert("Company name is required for employers");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:3000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // ✅ REQUIRED
//         body: JSON.stringify({
//           fullName,
//           email,
//           password,
//           role,
//           company:
//             role === "employer"
//               ? {
//                   name: companyName,
//                   location: companyLocation,
//                   website: companyWebsite,
//                 }
//               : null,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "Signup failed");
//         return;
//       }

//       // ✅ Save user ONLY for UI
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // ✅ SAFE REDIRECT (NO LOOP)
//       if (data.user.role === "employer") {
//         window.location.replace("/dashboard/employer");
//       } else {
//         window.location.replace("/dashboard/candidate");
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

//         {/* ROLE SELECT */}
//         {/* <div className="flex justify-center gap-4 mb-6">
//           <button
//             onClick={() => setRole("candidate")}
//             className={`px-6 py-2 rounded-lg border-2 font-semibold ${
//               role === "candidate"
//                 ? "border-pink-600 text-pink-600"
//                 : "border-gray-400"
//             }`}
//           >
//             Candidate
//           </button> */}
//           {/* ROLE SELECT */}
// {!isRoleLocked && (
//   <div className="flex justify-center gap-4 mb-6">
//     <button
//       onClick={() => setRole("candidate")}
//       className={`px-6 py-2 rounded-lg border-2 font-semibold ${
//         role === "candidate"
//           ? "border-pink-600 text-pink-600"
//           : "border-gray-400"
//       }`}
//     >
//       Candidate
//     </button>
          

//           {/* <button
//             onClick={() => setRole("employer")}
//             className={`px-6 py-2 rounded-lg border-2 font-semibold ${
//               role === "employer"
//                 ? "border-pink-600 text-pink-600"
//                 : "border-gray-400"
//             }`}
//           >
//             Employer
//           </button>
//         </div> */}
//         <button
//       onClick={() => setRole("employer")}
//       className={`px-6 py-2 rounded-lg border-2 font-semibold ${
//         role === "employer"
//           ? "border-pink-600 text-pink-600"
//           : "border-gray-400"
//       }`}
//     >
//       Employer
//     </button>
//   </div>
// )}

//         {/* COMMON FIELDS */}
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

//         {/* EMPLOYER-ONLY FIELDS */}
//         {role === "employer" && (
//           <>
//             <div className="relative mb-4">
//               <input
//                 type="text"
//                 placeholder="Company Name"
//                 className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
//                 onChange={(e) => setCompanyName(e.target.value)}
//               />
//               <FaBuilding className="absolute top-3.5 left-3 text-pink-600" />
//             </div>

//             <input
//               type="text"
//               placeholder="Company Location"
//               className="w-full p-3 border rounded-xl bg-gray-100 outline-none mb-4"
//               onChange={(e) => setCompanyLocation(e.target.value)}
//             />

//             <input
//               type="url"
//               placeholder="Company Website (optional)"
//               className="w-full p-3 border rounded-xl bg-gray-100 outline-none mb-4"
//               onChange={(e) => setCompanyWebsite(e.target.value)}
//             />
//           </>
//         )}

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
import { FaUser, FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "candidate";
  const roleFromQuery = searchParams.get("role");
  const isRoleLocked = roleFromQuery === "employer" || roleFromQuery === "candidate";

  const [role, setRole] = useState(defaultRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Employer-only fields
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ CLEAR OLD USER DATA WHEN LANDING ON SIGNUP PAGE
    localStorage.removeItem("user");
    
    const r = searchParams.get("role");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (r) setRole(r);
  }, [searchParams]);

  async function handleSignup() {
    if (!fullName || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (role === "employer" && !companyName) {
      alert("Company name is required for employers");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName,
          email,
          password,
          role,
          company:
            role === "employer"
              ? {
                  name: companyName,
                  location: companyLocation,
                  website: companyWebsite,
                }
              : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      // ✅ Save user ONLY AFTER successful signup
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ SAFE REDIRECT
      if (data.user.role === "employer") {
        window.location.replace("/dashboard/employer");
      } else {
        window.location.replace("/dashboard/candidate");
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
        <h1 className="text-center text-3xl font-bold mb-6">Create Account</h1>

        {/* ROLE SELECT */}
        {!isRoleLocked && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setRole("candidate")}
              className={`px-6 py-2 rounded-lg border-2 font-semibold ${
                role === "candidate"
                  ? "border-pink-600 text-pink-600"
                  : "border-gray-400"
              }`}
            >
              Candidate
            </button>

            <button
              onClick={() => setRole("employer")}
              className={`px-6 py-2 rounded-lg border-2 font-semibold ${
                role === "employer"
                  ? "border-pink-600 text-pink-600"
                  : "border-gray-400"
              }`}
            >
              Employer
            </button>
          </div>
        )}

        {/* COMMON FIELDS */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <FaUser className="absolute top-3.5 left-3 text-pink-600" />
        </div>

        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="absolute top-3.5 left-3 text-pink-600" />
        </div>

        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="absolute top-3.5 left-3 text-pink-600" />
        </div>

        {/* EMPLOYER-ONLY FIELDS */}
        {role === "employer" && (
          <>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full p-3 pl-10 border rounded-xl bg-gray-100 outline-none"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <FaBuilding className="absolute top-3.5 left-3 text-pink-600" />
            </div>

            <input
              type="text"
              placeholder="Company Location"
              className="w-full p-3 border rounded-xl bg-gray-100 outline-none mb-4"
              value={companyLocation}
              onChange={(e) => setCompanyLocation(e.target.value)}
            />

            <input
              type="url"
              placeholder="Company Website (optional)"
              className="w-full p-3 border rounded-xl bg-gray-100 outline-none mb-4"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
            />
          </>
        )}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold text-lg mb-4 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
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
