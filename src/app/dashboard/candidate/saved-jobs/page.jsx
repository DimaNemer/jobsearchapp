"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedJobs();
  }, []);

  async function loadSavedJobs() {
    try {
      // Get saved job IDs from localStorage
      const savedIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");

      if (savedIds.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch all jobs
      const res = await fetch("/api/jobs");
      const data = await res.json();

      // Filter to only saved jobs
      const saved = data.jobs.filter((job) => savedIds.includes(job._id));
      setSavedJobs(saved);
    } catch (err) {
      console.error("Failed to load saved jobs:", err);
    } finally {
      setLoading(false);
    }
  }

  function removeSavedJob(jobId) {
    try {
      // Remove from localStorage
      let savedIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      savedIds = savedIds.filter((id) => id !== jobId);
      localStorage.setItem("savedJobs", JSON.stringify(savedIds));

      // Update state
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobId));

      // Show feedback
      showToast("Job removed from saved");
    } catch (err) {
      console.error("Failed to remove job:", err);
      alert("Failed to remove job. Please try again.");
    }
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading saved jobs...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No Saved Jobs Yet</h3>
          <p className="text-gray-600 mb-4">
            Start saving jobs youre interested in for easy access later.
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            You have {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
          </p>

          {savedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                {/* LOGO */}
                <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={job.logo || "/image/default-logo.png"}
                    alt={job.company?.name || "Company"}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* JOB INFO */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                      <p className="text-gray-600 mb-2">
                        {job.company?.name} • {job.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        💼 {job.employmentType} • 🎯 {job.experienceLevel}
                      </p>
                      {job.salary && (
                        <p className="text-sm text-green-700 font-semibold mt-1">
                          💰 {job.salary}
                        </p>
                      )}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2">
                      <Link
                        href={`/jobs/${job.slug}`}
                        className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 text-sm"
                      >
                        View Job
                      </Link>
                      <button
                        onClick={() => removeSavedJob(job._id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                        title="Remove from saved"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* DESCRIPTION PREVIEW */}
                  {job.description && (
                    <p className="text-sm text-gray-700 mt-3 line-clamp-2">
                      {job.description}
                    </p>
                  )}

                  {/* CATEGORIES */}
                  {job.categories && job.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.categories.slice(0, 3).map((cat, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                        >
                          {cat}
                        </span>
                      ))}
                      {job.categories.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{job.categories.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}