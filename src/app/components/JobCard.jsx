"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JobCard({ job, onBookmarkToggle }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSaved(savedJobs.includes(job.id));
    } catch {
      setSaved(false);
    }
  }, [job.id]);

  const toggleSave = () => {
    const newSaved = !saved;
    setSaved(newSaved);

    try {
      let savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");

      if (newSaved) {
        if (!savedJobs.includes(job.id)) savedJobs.push(job.id);
      } else {
        savedJobs = savedJobs.filter((id) => id !== job.id);
      }

      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

      if (typeof onBookmarkToggle === "function") {
        onBookmarkToggle(job.id, newSaved);
      }
    } catch (err) {
      console.error("Failed to update savedJobs:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 border border-gray-100 w-full">
      <div className="flex items-center gap-4">
        {/* Company Logo */}
        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
          <Image src={job.image} alt={job.company} fill className="object-contain" />
        </div>

        {/* Right side */}
        <div className="flex-1">
          {/* Title + Bookmark icon */}
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold">{job.title}</h2>

            <button onClick={toggleSave} className="p-1" aria-label="Save job">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${saved ? "text-blue-600" : "text-gray-400"}`}
                fill={saved ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 text-sm font-medium">{job.company}</p>

          <div className="text-sm text-gray-500 space-y-1 mt-1">
            <p>📍 {job.location}</p>
            <p>💼 {job.salary ?? "Not specified"}</p>
          </div>

          <button
            onClick={() => router.push(`/jobs/${job.id}`)}
            className="mt-4 w-full max-w-[150px] bg-[#26374D] text-white py-1 rounded-lg font-medium hover:bg-[#536D82] transition"
          >
            View Job
          </button>
        </div>
      </div>
    </div>
  );
}