"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ApplyButton({ jobId }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // 'error' | 'success'

  useEffect(() => {
    // Get user from localStorage
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (err) {
      console.error("Failed to parse user:", err);
    }
  }, []);

  useEffect(() => {
    // Check if already applied
    if (user?.role === "candidate") {
      checkIfAlreadyApplied();
    }
  }, [user, jobId]);

  async function checkIfAlreadyApplied() {
    try {
      const res = await fetch(`/api/applications?jobId=${jobId}`, {
        credentials: "include",
      });
      
      if (res.ok) {
        const data = await res.json();
        const hasApplied = data.applications?.some(
          (app) => String(app.job._id) === String(jobId)
        );
        setAlreadyApplied(hasApplied);
      }
    } catch (err) {
      console.error("Error checking applications:", err);
    }
  }

  async function handleApply() {
    setLoading(true);

    // Step 1: Check if logged in
    if (!user) {
      setModalType("error");
      setModalMessage("Please login or register as a candidate to apply.");
      setShowModal(true);
      setLoading(false);
      setTimeout(() => {
        router.push("/auth/signup?role=candidate");
      }, 2000);
      return;
    }

    // Step 2: Check if candidate
    if (user.role !== "candidate") {
      setModalType("error");
      setModalMessage("Only candidates can apply for jobs.");
      setShowModal(true);
      setLoading(false);
      return;
    }

    // Step 3: Submit application
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle specific errors
        if (data.missingProfile) {
          setModalType("error");
          setModalMessage(
            "Please complete your profile before applying. Redirecting..."
          );
          setShowModal(true);
          setTimeout(() => {
            router.push("/dashboard/candidate/profile");
          }, 2000);
        } else if (data.missingResume) {
          setModalType("error");
          setModalMessage(
            "Please complete your resume before applying. Redirecting..."
          );
          setShowModal(true);
          setTimeout(() => {
            router.push("/dashboard/candidate/resume");
          }, 2000);
        } else {
          setModalType("error");
          setModalMessage(data.error || "Failed to submit application");
          setShowModal(true);
        }
        setLoading(false);
        return;
      }

      // Success
      setModalType("success");
      setModalMessage(
        "Application submitted successfully! The employer will review your application."
      );
      setShowModal(true);
      setAlreadyApplied(true);
    } catch (err) {
      console.error("Application error:", err);
      setModalType("error");
      setModalMessage("Something went wrong. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }

  if (user?.role === "employer") {
    return null; // Don't show apply button to employers
  }

  if (alreadyApplied) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-center">
        ✓ You have already applied for this job
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleApply}
        disabled={loading}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Submitting..." : "Apply for this Job"}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div
                className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center ${
                  modalType === "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <span className="text-3xl">
                  {modalType === "success" ? "✓" : "!"}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">
                {modalType === "success"
                  ? "Application Submitted!"
                  : "Action Required"}
              </h3>

              <p className="text-gray-600 mb-6">{modalMessage}</p>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}