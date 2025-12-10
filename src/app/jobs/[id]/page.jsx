import Link from "next/link";
import { jobs } from "@/app/data/jobs";

export default async function JobPage({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  console.log("Resolved ID:", id);

  //const id = Number(idStr);
  console.log("Parsed Number id:", id);
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/jobs" className="text-sm text-gray-600 underline mb-6 inline-block">
          ← Back to jobs
        </Link>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Job not found</h2>
          <p>Requested id: <strong>{params.id}</strong></p>
          <p>Available ids: <strong>{jobs.map(j => j.id).join(", ")}</strong></p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/jobs" className="text-sm text-gray-600 underline mb-6 inline-block">
        ← Back to jobs
      </Link>

      <div className="bg-white p-8 rounded-lg shadow">
        <header className="flex items-center gap-6 mb-6">
          {job.image && <img src={job.image} alt={`${job.company} logo`} className="w-20 h-20 object-contain rounded-md" />}
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
          </div>
        </header>

        {job.salary && <p className="font-semibold mb-4">{job.salary}</p>}
        {job.description && <p className="mb-4">{job.description}</p>}

        {job.skills?.length > 0 && (
          <section className="mt-4">
            <h3 className="font-semibold mb-2">Skills</h3>
            <ul className="flex gap-2 flex-wrap">
              {job.skills.map((s) => (
                <li key={s} className="px-3 py-1 bg-gray-100 rounded">{s}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
