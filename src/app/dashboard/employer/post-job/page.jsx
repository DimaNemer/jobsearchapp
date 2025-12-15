"use client";

// import { useMemo, useState } from "react";

// import { useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";



export default function PostJobPage() {
    const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("id");
 console.log("JOB ID FROM URL:", jobId);


  const isEdit = Boolean(jobId);

  const [loading, setLoading] = useState(false);
const [initialLoading, setInitialLoading] = useState(isEdit);



  const [form, setForm] = useState({
    title: "",
    location: "",
    employmentType: "Full-time",
    experienceLevel: "Any",
    categories: "",
    salary: "",
    description: "",
    responsibilitiesText: "",
    requirementsText: "",
    logo: "", // base64 string
  });



  const logoPreview = useMemo(() => form.logo || "", [form.logo]);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function parseBullets(text) {
    return text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  }

  useEffect(() => {
  if (!isEdit) return;

  async function loadJob() {
    try {
      if (!jobId || jobId.length !== 24) {
  alert("Invalid job id in URL");
  return;
}
      const res = await fetch(`/api/jobs/${jobId}`, {
        credentials: "include",
      });

      const job = await res.json();

      if (!res.ok) {
        alert(job.error || "Failed to load job");
        return;
      }

      setForm({
        title: job.title || "",
        location: job.location || "",
        employmentType: job.employmentType || "Full-time",
        experienceLevel: job.experienceLevel || "Any",
        categories: (job.categories || []).join(", "),
        salary: job.salary || "",
        description: job.description || "",
        responsibilitiesText: (job.responsibilities || []).join("\n"),
        requirementsText: (job.requirements || []).join("\n"),
        logo: job.logo || "",
      });
    } catch (err) {
      console.error(err);
      alert("Could not load job");
    } finally {
      setInitialLoading(false);
    }
  }

  loadJob();
}, [isEdit, jobId]);


//   useEffect(() => {
//   if (!isEdit) return;

//   async function loadJob() {
//     try {
//       const res = await fetch(`/api/jobs/${jobId}`, {
//         credentials: "include",
//       });

//       const data = await res.json();
//       const job = data.job || data;

//       if (!res.ok) {
//         alert("Failed to load job");
//         return;
//       }

//       setForm({
//         title: job.title || "",
//         location: job.location || "",
//         employmentType: job.employmentType || "Full-time",
//         experienceLevel: job.experienceLevel || "Any",
//         categories: (job.categories || []).join(", "),
//         salary: job.salary || "",
//         description: job.description || "",
//         responsibilitiesText: (job.responsibilities || []).join("\n"),
//         requirementsText: (job.requirements || []).join("\n"),
//         logo: job.logo || "",
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Could not load job");
//     } finally {
//       setInitialLoading(false);
//     }
//   }

//   loadJob();
// }, [isEdit, jobId]);



  async function handleLogoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_BYTES = 1 * 1024 * 1024; // 1MB
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowed.includes(file.type)) {
      alert("Logo must be an image: png, jpg, jpeg, webp");
      return;
    }
    if (file.size > MAX_BYTES) {
      alert("Logo is too large. Max 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setField("logo", String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.location.trim() || !form.description.trim()) {
      alert("Please fill Job Title, Location, and Description.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        id: jobId,
        title: form.title.trim(),
        location: form.location.trim(),
        employmentType: form.employmentType,
        experienceLevel: form.experienceLevel,
        salary: form.salary.trim() || null,
        description: form.description.trim(),

        // store as arrays in DB
        responsibilities: parseBullets(form.responsibilitiesText),
        requirements: parseBullets(form.requirementsText),

        // categories: comma separated → array
        categories: form.categories
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),

        // logo image (base64)
        logo: form.logo || null,
      };

const res = await fetch(
  isEdit ? `/api/jobs/${jobId}` : "/api/jobs",
  {
    method: isEdit ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  }
);

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data?.error || "Failed to post job");
        return;
      }

   alert(isEdit ? "Job updated successfully!" : "Job posted successfully!");
router.push("/dashboard/employer/my-jobs");


      // Reset (keep selects)
      setForm((prev) => ({
        ...prev,
        title: "",
        location: "",
        categories: "",
        salary: "",
        description: "",
        responsibilitiesText: "",
        requirementsText: "",
        logo: "",
      }));
    } catch (err) {
      console.error(err);
      alert("Something went wrong while posting the job.");
    } finally {
      setLoading(false);
    }
  }
if (initialLoading) return <p>Loading job...</p>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Post a Job</h1>
        <p className="text-gray-600">
          Add job details carefully — candidates will see this on the public job list.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo upload / preview */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Company Logo</h2>

          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-xl border bg-gray-50 overflow-hidden flex items-center justify-center">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">No logo</span>
              )}
            </div>

            <div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleLogoChange}
              />
              <p className="text-xs text-gray-500 mt-2">
                Max size: 1MB • png/jpg/jpeg/webp
              </p>

              {form.logo && (
                <button
                  type="button"
                  onClick={() => setField("logo", "")}
                  className="mt-3 text-sm text-red-600 hover:underline"
                >
                  Remove logo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Job Overview */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Job Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Job Title *</label>
              <input
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="e.g. Customer Success Specialist"
                className="mt-1 w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Location *</label>
              <input
                value={form.location}
                onChange={(e) => setField("location", e.target.value)}
                placeholder="e.g. Beirut, Lebanon / Remote"
                className="mt-1 w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Employment Type</label>
              <select
                value={form.employmentType}
                onChange={(e) => setField("employmentType", e.target.value)}
                className="mt-1 w-full border rounded-lg p-3"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Experience Level</label>
              <select
                value={form.experienceLevel}
                onChange={(e) => setField("experienceLevel", e.target.value)}
                className="mt-1 w-full border rounded-lg p-3"
              >
                <option>Any</option>
                <option>Junior</option>
                <option>Mid-level</option>
                <option>Senior</option>
                <option>Lead</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Categories</label>
              <input
                value={form.categories}
                onChange={(e) => setField("categories", e.target.value)}
                placeholder="e.g. Business Development, Customer Service, HR"
                className="mt-1 w-full border rounded-lg p-3"
              />
              <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Job Description *</h2>
          <textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Write a clear overview of the role..."
            className="w-full border rounded-lg p-3 h-36"
          />
        </div>

        {/* Responsibilities + Requirements */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Responsibilities & Requirements</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Responsibilities (one per line)
              </label>
              <textarea
                value={form.responsibilitiesText}
                onChange={(e) => setField("responsibilitiesText", e.target.value)}
                placeholder={`Example:\n- Own customer onboarding\n- Respond to support tickets\n- Coordinate with the sales team`}
                className="mt-1 w-full border rounded-lg p-3 h-40"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Requirements (one per line)
              </label>
              <textarea
                value={form.requirementsText}
                onChange={(e) => setField("requirementsText", e.target.value)}
                placeholder={`Example:\n- 2+ years experience\n- Strong communication skills\n- English + Arabic is a plus`}
                className="mt-1 w-full border rounded-lg p-3 h-40"
              />
            </div>
          </div>
        </div>

        {/* Salary */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Salary</h2>
          <input
            value={form.salary}
            onChange={(e) => setField("salary", e.target.value)}
            placeholder="e.g. $1,200 - $1,800 (optional)"
            className="w-full border rounded-lg p-3"
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional — you can write a range or “Negotiable”.
          </p>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            disabled={loading}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg disabled:opacity-50"
          >
           {loading
  ? isEdit
    ? "Updating..."
    : "Publishing..."
  : isEdit
  ? "Update Job"
  : "Publish Job"}

          </button>

          <a
            href="/dashboard/employer/my-jobs"
            className="text-blue-900 font-medium hover:underline"
          >
            View My Jobs
          </a>
        </div>
      </form>
    </div>
  );
}
