"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const res = await fetch("/api/admin/jobs", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs);
      } else if (res.status === 403) {
        alert("Admin access required");
        router.push("/");
      }
    } catch (err) {
      console.error("Failed to load jobs:", err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteJob(jobId) {
    if (!confirm("Delete this job? This will also delete all applications for it.")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Job deleted successfully");
        setJobs(jobs.filter((j) => j._id !== jobId));
      } else {
        alert("Failed to delete job");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete job");
    }
  }

  async function toggleJobStatus(jobId, currentStatus) {
    const newStatus = currentStatus === "active" ? "closed" : "active";
    
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setJobs(jobs.map(j => 
          j._id === jobId ? { ...j, status: newStatus } : j
        ));
      } else {
        alert("Failed to update job status");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Manage Jobs</h1>
          <button
            onClick={() => router.push("/admin")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border rounded px-4 py-2"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-4 py-2"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No jobs found
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          job.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {job.company?.name} • {job.location} • {job.employmentType}
                    </p>
                    <p className="text-sm text-gray-500">
                      Posted by: {job.employer?.fullName} ({job.employer?.email})
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Posted: {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Link
                      href={`/jobs/${job.slug}`}
                      target="_blank"
                      className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 text-center"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => toggleJobStatus(job._id, job.status)}
                      className={`px-4 py-2 rounded text-sm ${
                        job.status === "active"
                          ? "bg-yellow-600 text-white hover:bg-yellow-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {job.status === "active" ? "Close" : "Activate"}
                    </button>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </div>
      </div>
    </div>
  );
}