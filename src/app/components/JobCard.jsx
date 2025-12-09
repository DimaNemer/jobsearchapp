"use client";

export default function JobCard({ job }) {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">
      
      <div className="flex items-center gap-4 mb-4">
        <image
          src={job.logo}
          alt="company logo"
          className="w-14 h-14 object-cover rounded-lg"
        />
        <div>
          <h2 className="font-bold text-xl">{job.title}</h2>
          <p className="text-gray-600">{job.company}</p>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>{job.location}</span>
        <span className="font-semibold text-pink-600">{job.type}</span>
      </div>

      <button className="mt-4 w-full bg-blue-900 text-white py-2 rounded-lg">
        View Details
      </button>
    </div>
  );
}
