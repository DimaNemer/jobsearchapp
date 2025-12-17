"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const res = await fetch("/api/applications", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Failed to load applications:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading your applications...</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">
            You havent applied for any jobs yet.
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
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">
                    {app.jobSnapshot?.title || app.job?.title}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {app.jobSnapshot?.company} • {app.jobSnapshot?.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    Applied on{" "}
                    {new Date(app.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>

                  {app.job && (
                    <Link
                      href={`/jobs/${app.job.slug || app.job._id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Job →
                    </Link>
                  )}
                </div>
              </div>

              {app.coverLetter && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Cover Letter:
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {app.coverLetter}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}