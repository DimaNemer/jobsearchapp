"use client";

import { useState } from "react";

export default function EmployerDashboard() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    employmentType: "Full-time",
    experienceLevel: "Any",
    categories: "",
    description: "",
    salary: "",
    responsibilities: [],
    requirements: [],
    logo: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        categories: form.categories.split(",").map((c) => c.trim()),
      }),
    });

    alert("Job posted");
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          placeholder="Job Title"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Location"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <select
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, employmentType: e.target.value })
          }
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

        <select
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, experienceLevel: e.target.value })
          }
        >
          <option>Any</option>
          <option>Junior</option>
          <option>Mid-level</option>
          <option>Senior</option>
          <option>Lead</option>
        </select>

        <input
          placeholder="Categories (comma separated)"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, categories: e.target.value })}
        />

        <textarea
          placeholder="Job Description"
          className="w-full p-3 border rounded h-32"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Salary (optional)"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <button className="bg-blue-900 text-white px-6 py-3 rounded">
          Publish Job
        </button>
      </form>
    </div>
  );
}
