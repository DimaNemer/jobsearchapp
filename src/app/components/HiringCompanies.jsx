"use client";

import Image from "next/image";


export default function HiringCompanies() {
  // Build unique companies from jobs (use fields that exist in src/app/data/jobs.js)
  const companies = Object.values(
    jobs.reduce((acc, job) => {
      acc[job.company] = {
        name: job.company,
        logo: job.logo || "/image/company1.png",
        linkedin: job.companyLinkedIn || "#",
        location: job.location || "",
      };
      return acc;
    }, {})
  );

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Hiring Companies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {companies.map((c, i) => (
          <a
            key={i}
            href={c.linkedin}
            target="_blank"
            rel="noreferrer"
            className="border rounded-2xl p-6 shadow-sm hover:shadow-lg transition bg-white"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={c.logo}
                alt={c.name}
                width={80}
                height={80}
                className="rounded-md object-contain"
              />
            </div>

            <h3 className="text-xl font-semibold text-center mb-2">{c.name}</h3>

            <p className="text-center text-gray-600 text-sm">{c.location}</p>
          </a>
        ))}
      </div>
    </section>
  );
}