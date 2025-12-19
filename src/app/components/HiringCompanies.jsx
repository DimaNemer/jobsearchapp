"use client";

import { useState } from "react";

const COMPANIES = [
  {
    id: 1,
    name: "CedarTech",
    location: "Beirut, Lebanon",
    industry: "Software & AI",
    description:
      "CedarTech is a Beirut-based technology company specializing in the development of scalable web platforms, mobile applications, and AI-powered solutions. The company partners with local and international clients to deliver reliable, secure, and innovative digital products.",
    linkedin: "https://www.linkedin.com/company/cedartech",
  },
  {
    id: 2,
    name: "Phoenicia Digital",
    location: "Tripoli, Lebanon",
    industry: "Digital Marketing",
    description:
      "Phoenicia Digital is a results-driven digital marketing agency helping startups and SMEs grow through strategic branding, social media management, and performance marketing campaigns across multiple platforms.",
    linkedin: "https://www.linkedin.com/company/phoenicia-digital",
  },
  {
    id: 3,
    name: "Beirut Advisory Group",
    location: "Beirut, Lebanon",
    industry: "Finance & Consulting",
    description:
      "Beirut Advisory Group provides financial planning, business strategy, and advisory services to organizations across Lebanon and the MENA region, supporting sustainable growth and operational excellence.",
    linkedin: null,
  },
   {
    id: 4,
    name: "Beirut Advisory Group",
    location: "Beirut, Lebanon",
    industry: "Finance & Consulting",
    description:
      "Beirut Advisory Group provides financial planning, business strategy, and advisory services to organizations across Lebanon and the MENA region, supporting sustainable growth and operational excellence.",
    linkedin: null,
  },
   {
    id: 5,
    name: "Beirut Advisory Group",
    location: "Beirut, Lebanon",
    industry: "Finance & Consulting",
    description:
      "Beirut Advisory Group provides financial planning, business strategy, and advisory services to organizations across Lebanon and the MENA region, supporting sustainable growth and operational excellence.",
    linkedin: null,
  },
   {
    id: 6,
    name: "Beirut Advisory Group",
    location: "Beirut, Lebanon",
    industry: "Finance & Consulting",
    description:
      "Beirut Advisory Group provides financial planning, business strategy, and advisory services to organizations across Lebanon and the MENA region, supporting sustainable growth and operational excellence.",
    linkedin: null,
  },
];

export default function HiringCompanies() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Hiring Companies
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore companies actively hiring and learn more about their work
            culture and expertise.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {COMPANIES.map((company) => (
            <div
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className="cursor-pointer bg-white border rounded-2xl p-6 hover:shadow-lg transition"
            >
              {/* LOGO PLACEHOLDER */}
              <div className="h-24 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-gray-400 font-semibold">
                  {company.name}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900">
                {company.name}
              </h3>

              <p className="text-sm text-blue-600 font-medium mt-1">
                {company.industry}
              </p>

              <p className="text-sm text-gray-600 mt-2">
                📍 {company.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP / MODAL */}
      {selectedCompany && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          onClick={() => setSelectedCompany(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-xl w-full p-8 relative"
          >
            {/* CLOSE */}
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedCompany.name}
              </h3>
              <p className="text-sm text-blue-600 font-medium mt-1">
                {selectedCompany.industry}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                📍 {selectedCompany.location}
              </p>
            </div>

            {/* ABOUT */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                About the Company
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {selectedCompany.description}
              </p>
            </div>

            {/* LINKS */}
            {selectedCompany.linkedin && (
              <div className="pt-4 border-t">
                <a
                  href={selectedCompany.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Company on LinkedIn →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
