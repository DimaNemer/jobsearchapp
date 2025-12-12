// "use client";

// import { useRouter } from "next/navigation";
// import JobCard from "./JobCard";
// const jobs = await fetch("/api/jobs").then(res => res.json());


// export default function JobList() {
//   const router = useRouter();
//   const firstFiveJobs = jobs.slice(0, 6);

//   function handleSeeMore() {
//     const token = typeof window !== "undefined" && localStorage.getItem("token");
//     if (!token) {
//       router.push("/auth/signup");
//     } else {
//       router.push("/jobs");
//     }
//   }

//   return (
//     <div className="px-6 py-10 bg-gray-50">
//       <h1 className="text-3xl font-bold mb-6 text-center">Latest Jobs</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//      {firstFiveJobs.map((job, idx) => (
//   <JobCard key={`${job.id}-${idx}`} job={job} />
// ))}
//       </div>

//       <div className="text-center mt-10">
//         <button
//           onClick={handleSeeMore}
//           className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
//         >
//           See More Jobs
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";

export default function JobList() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    }

    loadJobs();
  }, []);

  const firstSix = jobs.slice(0, 6);

  function handleSeeMore() {
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signup");
    } else {
      router.push("/jobs");
    }
  }

  return (
    <div className="px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Jobs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {firstSix.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleSeeMore}
          className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          See More Jobs
        </button>
      </div>
    </div>
  );
}
