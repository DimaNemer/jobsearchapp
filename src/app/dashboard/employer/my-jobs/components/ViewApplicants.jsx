"use client";

import { useState, useEffect } from "react";

export default function ViewApplicants({ jobId, jobTitle }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    if (jobId) {
      loadApplications();
    }
  }, [jobId]);

  async function loadApplications() {
    try {
      const res = await fetch(`/api/applications?jobId=${jobId}`, {
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

  async function updateStatus(applicationId, newStatus) {
    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        alert(`Application ${newStatus} successfully!`);
        loadApplications();
        setSelectedApp(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update status");
      }
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update application status");
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading applicants...</div>;
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
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">
          Applicants for: {jobTitle}
        </h2>

        {applications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No applications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {app.candidateSnapshot?.fullName || app.candidate?.fullName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {app.candidateSnapshot?.email || app.candidate?.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Applied:{" "}
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>

                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* APPLICATION DETAILS MODAL */}
      {selectedApp && (
        <ApplicationModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onUpdateStatus={updateStatus}
        />
      )}
    </>
  );
}

function ApplicationModal({ application, onClose, onUpdateStatus }) {
  const { candidateSnapshot } = application;
  const profile = candidateSnapshot?.profile || {};
  const resume = candidateSnapshot?.resume || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">
            {candidateSnapshot?.fullName} Application
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* PROFILE */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              👤 Profile Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p>
                <strong>Full Name:</strong> {candidateSnapshot?.fullName}
              </p>
              <p>
                <strong>Email:</strong> {candidateSnapshot?.email}
              </p>
              {profile.mobile && (
                <p>
                  <strong>Phone:</strong> {profile.mobile}
                </p>
              )}
              {profile.country && (
                <p>
                  <strong>Location:</strong> {profile.country}
                </p>
              )}
              {profile.linkedin && (
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profile.linkedin}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* RESUME */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📄 Resume
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              {resume.currentJobTitle && (
                <div>
                  <h4 className="font-semibold mb-2">Current Position</h4>
                  <p>{resume.currentJobTitle}</p>
                  {resume.yearsOfExperience && (
                    <p className="text-sm text-gray-600">
                      Experience: {resume.yearsOfExperience} years
                    </p>
                  )}
                </div>
              )}

              {resume.skills && resume.skills.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resume.education && resume.education.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Education</h4>
                  {resume.education.map((edu, idx) => (
                    <div key={idx} className="mb-2">
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-sm text-gray-600">
                        {edu.field} • {edu.university}
                      </p>
                      <p className="text-sm text-gray-500">
                        {edu.startYear} - {edu.endYear}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {resume.experience && resume.experience.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Work Experience</h4>
                  {resume.experience.map((exp, idx) => (
                    <div key={idx} className="mb-3">
                      <p className="font-medium">{exp.title}</p>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startYear} - {exp.endYear}
                      </p>
                      {exp.description && (
                        <p className="text-sm mt-1">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* COVER LETTER */}
          {application.coverLetter && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Cover Letter</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="whitespace-pre-wrap">{application.coverLetter}</p>
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        {application.status === "pending" && (
          <div className="p-6 border-t bg-gray-50 flex gap-4">
            <button
              onClick={() => onUpdateStatus(application._id, "accepted")}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700"
            >
              ✓ Accept Candidate
            </button>
            <button
              onClick={() => onUpdateStatus(application._id, "rejected")}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700"
            >
              ✕ Reject Candidate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}