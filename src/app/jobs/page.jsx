"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import JobCard from "@/app/components/JobCard";
import { jobs } from "../data/jobs";

export default function JobsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Not logged in -> send to signup
      router.push("/auth/signup");
    }
  }, [router]);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">All Jobs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}