// "use client";

// import { useEffect, useState } from "react";

// export default function MyJobsPage() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

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

//   async function deleteJob(jobId) {
//     if (!confirm("Are you sure you want to delete this job?")) return;

//     console.log("🗑️ Attempting to delete job with ID:", jobId);

//     try {
//       const res = await fetch(`/api/jobs/${jobId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Job deleted successfully!");
//         setJobs((prev) => prev.filter((job) => job._id !== jobId));
//       } else {
//         alert(`❌ Error: ${data.error || "Failed to delete job"}`);
//         console.error("Delete error:", data);
//       }
//     } catch (err) {
//       console.error("Delete failed", err);
//       alert("❌ Something went wrong. Check console.");
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
//         <p className="text-gray-600">You havent posted any jobs yet.</p>
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
//                 <p className="text-xs text-gray-400 mt-2">
//                   ID: {job._id}
//                 </p>
//               </div>

//               <div className="flex gap-3">
//                 {/* ✅ FIXED: Use _id instead of slug */}
//                 <a
//                   href={`/dashboard/employer/post-job?id=${job._id}`}
//                   className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
//                 >
//                   Edit
//                 </a>

//                 <button
//                   onClick={() => deleteJob(job._id)}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>

//                 {/* ✅ OPTIONAL: View Job Button */}
//                 <a
//                   href={`/jobs/${job.slug}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//                 >
//                   View
//                 </a>
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
import ViewApplicants from "./components/ViewApplicants";

export default function MyJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

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

  async function deleteJob(jobId) {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Job deleted successfully!");
        setJobs((prev) => prev.filter((job) => job._id !== jobId));
      } else {
        alert(`❌ Error: ${data.error || "Failed to delete job"}`);
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("❌ Something went wrong. Check console.");
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  if (loading) return <p>Loading...</p>;

  // If viewing applicants, show that view
  if (selectedJob) {
    return (
      <div>
        <button
          onClick={() => setSelectedJob(null)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to My Jobs
        </button>
        <ViewApplicants jobId={selectedJob._id} jobTitle={selectedJob.title} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600">You have not posted any jobs yet.</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-7 bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
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
                  {/* VIEW APPLICANTS BUTTON */}
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    View Applicants
                  </button>

                  {/* EDIT BUTTON */}
                  <a
                    href={`/dashboard/employer/post-job?id=${job._id}`}
                    className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
                  >
                    Edit
                  </a>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>

                  {/* VIEW JOB BUTTON */}
                  <a
                    href={`/jobs/${job.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}