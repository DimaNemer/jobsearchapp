"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JobCard({ job }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSaved(savedJobs.includes(job._id));
    } catch {
      setSaved(false);
    }
  }, [job._id]);

  const toggleSave = () => {
    const newSaved = !saved;
    setSaved(newSaved);

    let savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    if (newSaved) savedJobs.push(job._id);
    else savedJobs = savedJobs.filter((id) => id !== job._id);

    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 border">
      <div className="flex items-center gap-4">

        {/* LOGO */}
        <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden">
          <Image
            src={job.logo || "/image/default-logo.png"}
            alt={job.company?.name || "Company"}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <button onClick={toggleSave}>⭐</button>
          </div>

          <p className="text-sm text-gray-600">
            {job.company?.name}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            📍 {job.location} • 💼 {job.employmentType}
          </p>

          <button
            onClick={() => router.push(`/jobs/${job.slug}`)}
            className="mt-4 bg-[#26374D] text-white px-4 py-1 rounded"
          >
            View Job
          </button>
        </div>
      </div>
    </div>
  );
}
