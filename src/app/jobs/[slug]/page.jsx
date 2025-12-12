async function getJob(slug) {
  const res = await fetch(
    `http://localhost:3000/api/jobs?slug=${slug}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.job;
}

export default async function JobDetails({ params }) {
  const job = await getJob(params.slug);

  if (!job) return <p className="p-8">Job not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex gap-6 items-center mb-6">
        <img src={job.logo} className="w-20 h-20 object-contain" />
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-gray-600">{job.company?.name}</p>
        </div>
      </div>

      <p className="mb-6">{job.description}</p>

      {job.responsibilities?.length > 0 && (
        <>
          <h2 className="font-semibold mb-2">Responsibilities</h2>
          <ul className="list-disc pl-6 mb-6">
            {job.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </>
      )}

      {job.requirements?.length > 0 && (
        <>
          <h2 className="font-semibold mb-2">Requirements</h2>
          <ul className="list-disc pl-6">
            {job.requirements.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
