// import Link from "next/link";

// async function getJobs() {
//   const res = await fetch("http://localhost:3000/api/jobs", {
//     cache: "no-store",
//   });
//   const data = await res.json();
//   return data.jobs || [];
// }

// export default async function JobsPage() {
//   const jobs = await getJobs();

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

//       <div className="grid gap-6">
//         {jobs.map((job) => (
//           <Link
//             key={job._id}
//             href={`/jobs/${job.slug}`}
//             className="border p-5 rounded hover:shadow"
//           >
//             <h2 className="text-xl font-semibold">{job.title}</h2>
//             <p className="text-gray-600">{job.company?.name}</p>
//             <p className="text-sm text-gray-500">
//               {job.location} • {job.employmentType}
//             </p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }


import SearchBar from "@/app/components/SearchBar";
import JobCard from "@/app/components/JobCard";

async function getJobs() {
  const res = await fetch("http://localhost:3000/api/jobs", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.jobs || [];
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* SEARCH BAR (same as home) */}
      <div className="py-10">
        <SearchBar />
      </div>

      {/* JOB LIST */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>

        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
