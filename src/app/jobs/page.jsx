"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import JobCard from "@/app/components/JobCard";
import { jobs } from "../data/jobs";
import SearchBar from "@/app/components/SearchBar";

export default function JobsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signup");
    }
  }, [router]);

  return (
    <div className="px-6 py-10 bg-[#DDE6ED] min-h-screen">
      {/* 🟦 Title on Top */}
      <h1 className="text-3xl font-bold text-[#26374D] mb-8 text-center">
        All Jobs
      </h1>

      {/* 🔎 Search Bar BELOW the Title */}
      <div className="max-w-3xl mx-auto mb-12">
        <SearchBar />
      </div>

      {/* Job Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}