"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    image: "",
    description: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.company.trim() || !form.location.trim()) {
      setError("Title, company and location are required.");
      return;
    }

    // Read current user from localStorage to attach as employer
    let me = null;
    try {
      me = JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      me = null;
    }

    if (!me || !(me._id || me.id)) {
      setError("You must be logged in as an employer to post a job.");
      return;
    }

    const employerId = me._id || me.id;

    const payload = {
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      salary: form.salary.trim() || undefined,
      image: form.image.trim() || undefined,
      description: form.description.trim() || undefined,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      employerId: employerId, // included for server-side validation/attachment
    };

    try {
      setLoading(true);
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || "Failed to create job");
      }

      // Success -> go to jobs list
      router.push("/jobs");
    } catch (err) {
      console.error("Create job error:", err);
      setError(err.message || "Failed to create job");
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Add Job</h1>
        <Link href="/jobs" className="text-sm text-gray-600 underline">← Back to jobs</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow space-y-4">
        {error && <div className="text-red-600">{error}</div>}

        <div>
          <label className="block text-sm font-medium">Job Title *</label>
          <input name="title" value={form.title} onChange={updateField}
            className="mt-1 w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Company *</label>
          <input name="company" value={form.company} onChange={updateField}
            className="mt-1 w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Location *</label>
          <input name="location" value={form.location} onChange={updateField}
            className="mt-1 w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Salary</label>
          <input name="salary" value={form.salary} onChange={updateField}
            className="mt-1 w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input name="image" value={form.image} onChange={updateField}
            placeholder="/image/company.png or https://..." className="mt-1 w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={updateField}
            className="mt-1 w-full border px-3 py-2 rounded" rows={4} />
        </div>

        <div>
          <label className="block text-sm font-medium">Skills (comma separated)</label>
          <input name="skills" value={form.skills} onChange={updateField}
            placeholder="React,Node.js,Next.js" className="mt-1 w-full border px-3 py-2 rounded" />
        </div>

        <div className="flex gap-3 items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#14213D] text-white px-4 py-2 rounded-md"
          >
            {loading ? "Creating…" : "Create Job"}
          </button>

          <Link href="/jobs" className="text-sm text-gray-600 underline">Cancel</Link>
        </div>
      </form>
    </main>
  );
}