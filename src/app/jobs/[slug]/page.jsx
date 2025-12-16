// async function getJob(slug) {
//   const res = await fetch(
//     `http://localhost:3000/api/jobs?slug=${slug}`,
//     { cache: "no-store" }
//   );
//   const data = await res.json();
//   return data.job;
// }

// export default async function JobDetails({ params }) {
//   const job = await getJob(params.slug);

//   if (!job) return <p className="p-8">Job not found</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-8">
//       <div className="flex gap-6 items-center mb-6">
//         <img src={job.logo} className="w-20 h-20 object-contain" />
//         <div>
//           <h1 className="text-3xl font-bold">{job.title}</h1>
//           <p className="text-gray-600">{job.company?.name}</p>
//         </div>
//       </div>

//       <p className="mb-6">{job.description}</p>

//       {job.responsibilities?.length > 0 && (
//         <>
//           <h2 className="font-semibold mb-2">Responsibilities</h2>
//           <ul className="list-disc pl-6 mb-6">
//             {job.responsibilities.map((r, i) => (
//               <li key={i}>{r}</li>
//             ))}
//           </ul>
//         </>
//       )}

//       {job.requirements?.length > 0 && (
//         <>
//           <h2 className="font-semibold mb-2">Requirements</h2>
//           <ul className="list-disc pl-6">
//             {job.requirements.map((r, i) => (
//               <li key={i}>{r}</li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

async function getJob(slug) {
  const res = await fetch(
    `http://localhost:3000/api/jobs/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data;
}

export default async function JobDetails({ params }) {
  const { slug } = await params; // ✅ REQUIRED
  const job = await getJob(slug);


  if (!job) {
    return <p className="p-8">Job not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* LEFT: JOB DETAILS */}
      <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>

        <p className="text-gray-600 mb-4">
          📍 {job.location} • 💼 {job.employmentType} • 🎯 {job.experienceLevel}
        </p>

        {job.salary && (
          <p className="text-green-700 font-semibold mb-6">
            💰 {job.salary}
          </p>
        )}

        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 whitespace-pre-line mb-6">
          {job.description}
        </p>

        {job.responsibilities?.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {job.requirements?.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc pl-6 space-y-1">
              {job.requirements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* RIGHT: COMPANY CARD */}
      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={job.logo || "/image/default-logo.png"}
            alt="Company Logo"
            className="w-20 h-20 object-contain border rounded"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {job.company?.name || "Company"}
            </h3>
            <p className="text-sm text-gray-600">{job.location}</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Categories:</strong> {job.categories?.join(", ")}</p>
        </div>

        <button
          className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold"
        >
          Apply for Job
        </button>
      </div>
    </div>
  );
}