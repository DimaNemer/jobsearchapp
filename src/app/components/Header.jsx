// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const [me, setMe] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem("user");
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       if (raw) setMe(JSON.parse(raw));
//     } catch {
//       setMe(null);
//     }
//   }, []);

// const handlePostJob = () => {
//   router.push("/auth/signup?role=employer");
// };

// const handleFindJob = () => {
//   router.push("/auth/signup?role=candidate");
// };

//   return (
//     <header className="bg-[#05173B] text-white flex flex-wrap justify-between items-center px-6 md:px-12 py-6">
//       <Link href="/" className="flex items-center">
//         <Image src="/image/mainlogo.png" alt="Main logo" width={140} height={40} />
//       </Link>

//       <nav className="flex items-center gap-4 md:gap-8 mt-4 md:mt-0">
//         <Link href="/">Home</Link>
//         <Link href="/jobs">Jobs</Link>
//         <Link href="/hiring-company">Hiring Company</Link>


//         {/* ACTION BUTTONS */}
//         <button
//           onClick={handleFindJob}
//           className="border border-white px-3 py-1 rounded-md text-sm"
//         >
//           Find Job
//         </button>

//         <button
//           onClick={handlePostJob}
//           className="bg-[#FF6B6B] hover:bg-[#ff4c4c] px-4 py-2 rounded-md font-semibold"
//         >
//           Post Job
//         </button>
//       </nav>
//     </header>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Load user from localStorage
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(raw));
      }
    } catch {
      setUser(null);
    }

    // Listen for storage changes (for when user logs in/out in another tab)
    const handleStorageChange = () => {
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handlePostJob = () => {
    router.push("/auth/signup?role=employer");
  };

  const handleFindJob = () => {
    router.push("/auth/signup?role=candidate");
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("user");
    
    // Clear cookie
    document.cookie = "token=; path=/; max-age=0";
    
    // Update state
    setUser(null);
    
    // Redirect to home
    router.push("/");
  };

  return (
    <header className="bg-[#05173B] text-white flex flex-wrap justify-between items-center px-6 md:px-12 py-6">
      <Link href="/" className="flex items-center">
        <Image
          src="/image/mainlogo.png"
          alt="Main logo"
          width={140}
          height={40}
        />
      </Link>

      <nav className="flex items-center gap-4 md:gap-8 mt-4 md:mt-0">
        <Link href="/" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link href="/jobs" className="hover:text-gray-300 transition">
          Jobs
        </Link>
        <Link href="/hiring-company" className="hover:text-gray-300 transition">
          Hiring Company
        </Link>

        {/* CONDITIONAL RENDERING BASED ON USER LOGIN STATUS */}
        {!user ? (
          // NOT LOGGED IN - Show Find Job & Post Job buttons
          <>
            <button
              onClick={handleFindJob}
              className="border border-white px-3 py-1 rounded-md text-sm hover:bg-white hover:text-[#05173B] transition"
            >
              Find Job
            </button>

            <button
              onClick={handlePostJob}
              className="bg-[#FF6B6B] hover:bg-[#ff4c4c] px-4 py-2 rounded-md font-semibold transition"
            >
              Post Job
            </button>
          </>
        ) : (
          // LOGGED IN - Show Dashboard link and Logout
          <>
            {/* Dashboard Link - Different based on role */}
            <Link
              href={
                user.role === "employer"
                  ? "/dashboard/employer"
                  : user.role === "candidate"
                  ? "/dashboard/candidate"
                  : "/dashboard"
              }
              className="border border-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-[#05173B] transition font-semibold"
            >
              📊 Dashboard
            </Link>

        

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold transition"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}