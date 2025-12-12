import Link from "next/link";

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
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <Link
            key={job._id}
            href={`/jobs/${job.slug}`}
            className="border p-5 rounded hover:shadow"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company?.name}</p>
            <p className="text-sm text-gray-500">
              {job.location} • {job.employmentType}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
