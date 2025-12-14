// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function MyJobsPage() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   async function loadJobs() {
//     try {
//       const res = await fetch("/api/jobs?mine=true", {
//         credentials: "include",
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setJobs(data.jobs);
//       }
//     } catch (err) {
//       console.error("Failed to load jobs", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function deleteJob(id) {
//     if (!confirm("Are you sure you want to delete this job?")) return;

//     try {
//       const res = await fetch(`/api/jobs/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (res.ok) {
//         setJobs((prev) => prev.filter((job) => job._id !== id));
//       }
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   }

//   useEffect(() => {
//     loadJobs();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">My Jobs</h1>

//       {jobs.length === 0 ? (
//         <p className="text-gray-600">You haven’t posted any jobs yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="border rounded-lg p-5 flex justify-between items-start bg-white"
//             >
//               <div>
//                 <h2 className="font-semibold text-lg">{job.title}</h2>
//                 <p className="text-gray-600 text-sm">
//                   {job.company?.name} — {job.location}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {job.employmentType} • {job.experienceLevel}
//                 </p>
//               </div>

//               <div className="flex gap-3">
//                 {/* ✅ FIXED EDIT */}
//                 <button
//                   onClick={() =>
//                     router.push(
//                       `/dashboard/employer/post-job?id=${job._id}`
//                     )
//                   }
//                   className="px-4 py-2 bg-blue-900 text-white rounded"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => deleteJob(job._id)}
//                   className="px-4 py-2 bg-red-600 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function MyJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadJobs() {
    try {
      const res = await fetch("/api/jobs?mine=true", {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteJob(id) {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job._id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600">You haven’t posted any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-5 flex justify-between items-start bg-white"
            >
              <div>
                <h2 className="font-semibold text-lg">{job.title}</h2>
                <p className="text-gray-600 text-sm">
                  {job.company?.name} — {job.location}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {job.employmentType} • {job.experienceLevel}
                </p>
              </div>

              <div className="flex gap-3">
                {/* <a
                  href={`/dashboard/employer/my-jobs/${job._id}`}
                  className="px-4 py-2 bg-blue-900 text-white rounded"
                >
                  Edit
                </a> */}
<a
  href={`/dashboard/employer/post-job?id=${job._id}`}
  className="px-4 py-2 bg-blue-900 text-white rounded"
>
  Edit
</a>


                <button
                  onClick={() => deleteJob(job._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
