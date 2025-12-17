// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function JobCard({ job }) {
//   const router = useRouter();
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     try {
//       const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setSaved(savedJobs.includes(job._id));
//     } catch {
//       setSaved(false);
//     }
//   }, [job._id]);

//   const toggleSave = () => {
//     const newSaved = !saved;
//     setSaved(newSaved);

//     let savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
//     if (newSaved) savedJobs.push(job._id);
//     else savedJobs = savedJobs.filter((id) => id !== job._id);

//     localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 border">
//       <div className="flex items-center gap-4">

//         {/* LOGO */}
//         <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden">
//           <Image
//             src={job.logo || "/image/default-logo.png"}
//             alt={job.company?.name || "Company"}
//             fill
//             className="object-contain"
//           />
//         </div>

//         <div className="flex-1">
//           <div className="flex justify-between">
//             <h2 className="text-lg font-semibold">{job.title}</h2>
//             <button onClick={toggleSave}>⭐</button>
//           </div>

//           <p className="text-sm text-gray-600">
//             {job.company?.name}
//           </p>

//           <p className="text-sm text-gray-500 mt-1">
//             📍 {job.location} • 💼 {job.employmentType}
//           </p>

//           <button
//             onClick={() => router.push(`/jobs/${job.slug}`)}
//             className="mt-4 bg-[#26374D] text-white px-4 py-1 rounded"
//           >
//             View Job
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JobCard({ job }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(raw));
      }
    } catch {
      setUser(null);
    }

    // Check if this job is already saved
    try {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      setSaved(savedJobs.includes(job._id));
    } catch {
      setSaved(false);
    }
  }, [job._id]);

  const toggleSave = (e) => {
    e.stopPropagation(); // Prevent card click when clicking star

    // Check if user is logged in
    if (!user) {
      alert("Please login to save jobs");
      router.push("/auth/login");
      return;
    }

    // Only candidates can save jobs
    if (user.role !== "candidate") {
      alert("Only candidates can save jobs");
      return;
    }

    const newSaved = !saved;
    setSaved(newSaved);

    // Update localStorage
    try {
      let savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      
      if (newSaved) {
        // Add to saved jobs
        if (!savedJobs.includes(job._id)) {
          savedJobs.push(job._id);
        }
      } else {
        // Remove from saved jobs
        savedJobs = savedJobs.filter((id) => id !== job._id);
      }

      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      
      // Show feedback
      if (newSaved) {
        // Create a temporary toast notification
        showToast("Job saved! ✓");
      } else {
        showToast("Job removed from saved");
      }
    } catch (err) {
      console.error("Failed to save job:", err);
      alert("Failed to save job. Please try again.");
      setSaved(!newSaved); // Revert on error
    }
  };

  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 border relative">
      <div className="flex items-center gap-4">
        {/* LOGO */}
        <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
          <Image
            src={job.logo || "/image/default-logo.png"}
            alt={job.company?.name || "Company"}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            
            {/* SAVE BUTTON - Only show for candidates */}
            {(!user || user.role === "candidate") && (
              <button
                onClick={toggleSave}
                className="ml-2 flex-shrink-0 transition-transform hover:scale-110"
                title={saved ? "Remove from saved" : "Save this job"}
              >
                {saved ? (
                  // Filled star (saved)
                  <svg
                    className="w-6 h-6 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ) : (
                  // Outline star (not saved)
                  <svg
                    className="w-6 h-6 text-gray-400 hover:text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>

          <p className="text-sm text-gray-600">
            {job.company?.name || "Company"}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            📍 {job.location} • 💼 {job.employmentType}
          </p>

          <button
            onClick={() => router.push(`/jobs/${job.slug}`)}
            className="mt-4 bg-[#26374D] text-white px-4 py-1 rounded hover:bg-[#1a2633] transition"
          >
            View Job
          </button>
        </div>
      </div>
    </div>
  );
}