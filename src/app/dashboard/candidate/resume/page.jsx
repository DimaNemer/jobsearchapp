"use client";

import { useEffect, useState } from "react";



const STORAGE_KEY = "candidate_resume";
const uid = () => crypto.randomUUID();

export default function ResumePage() {



  const [resume, setResume] = useState({
    fileName: "",
    jobTitle: "",
    experienceYears: "",
    about: "",
    categories: [],
    skills: [],
    education: [],
    experience: [],
  });

  const [skillInput, setSkillInput] = useState("");

  /* ================= LOAD / SAVE ================= */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setResume(JSON.parse(saved));
  }, []);

  function save(data) {
    setResume(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /* ================= SKILLS ================= */
  function addSkill(e) {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      save({
        ...resume,
        skills: [...new Set([...resume.skills, skillInput.trim()])],
      });
      setSkillInput("");
    }
  }

  function removeSkill(skill) {
    save({
      ...resume,
      skills: resume.skills.filter(s => s !== skill),
    });
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-5xl bg-white p-30 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-8">Resume</h1>

      {/* ================= FILE UPLOAD ================= */}
      <div className="border-dashed border-2 rounded-lg p-6 mb-10 text-center">
        <input
          type="file"
          hidden
          id="resumeUpload"
          onChange={e =>
            save({ ...resume, fileName: e.target.files?.[0]?.name || "" })
          }
        />
        <label htmlFor="resumeUpload" className="cursor-pointer text-blue-600">
          Upload / Replace Resume
        </label>
        <p className="text-sm text-gray-500 mt-2">
          {resume.fileName || "PDF, DOC, DOCX (max 5MB)"}
        </p>
      </div>

      {/* ================= JOB INFO ================= */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <input
          className="border p-3 rounded"
          placeholder="Your current / desired job title *"
          value={resume.jobTitle}
          onChange={e => save({ ...resume, jobTitle: e.target.value })}
        />
        <input
          className="border p-3 rounded"
          placeholder="Years of Experience *"
          value={resume.experienceYears}
          onChange={e => save({ ...resume, experienceYears: e.target.value })}
        />
      </div>

      {/* ================= ABOUT ================= */}
      <textarea
        className="border p-3 rounded w-full mb-6"
        rows={4}
        placeholder="About you"
        value={resume.about}
        onChange={e => save({ ...resume, about: e.target.value })}
      />

      {/* ================= CATEGORIES ================= */}
      <label className="font-medium block mb-2">
        Desired Job Category *
      </label>
      <select
        multiple
        className="border p-3 rounded w-full h-40 mb-8"
        value={resume.categories}
        onChange={e =>
          save({
            ...resume,
            categories: Array.from(e.target.selectedOptions).map(o => o.value),
          })
        }
      >
        <option>Web Development</option>
        <option>Mobile Development</option>
        <option>Data Science</option>
        <option>Computer Engineering</option>
        <option>Business</option>
        <option>Design</option>
        <option>Marketing</option>
        <option>Sales</option>
        <option>Customer Support</option>
        <option>Human Resources</option>
        <option>Finance</option>
        <option>Education</option>
        <option>Healthcare</option>
        <option>Engineering</option>
        <option>Legal</option>
        <option>Writing & Content</option>
        <option>Project Management</option>
        <option>Other</option>
      </select>

      {/* ================= SKILLS ================= */}
      <label className="font-medium block mb-2">Skills</label>
      <div className="border rounded p-3 mb-12 flex flex-wrap gap-2">
        {resume.skills.map(skill => (
          <span
            key={skill}
            className="bg-gray-200 px-3 py-1 rounded-full flex gap-2 items-center"
          >
            {skill}
            <button onClick={() => removeSkill(skill)}>✕</button>
          </span>
        ))}
        <input
          className="flex-1 outline-none"
          placeholder="Type skill and press Enter"
          value={skillInput}
          onChange={e => setSkillInput(e.target.value)}
          onKeyDown={addSkill}
        />
      </div>

      {/* ================= EDUCATION ================= */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Education *</h2>
          <button
            onClick={() =>
              save({
                ...resume,
                education: [
                  ...resume.education,
                  {
                    id: uid(),
                    isEditing: true,
                    degree: "",
                    field: "",
                    institution: "",
                    years: "",
                  },
                ],
              })
            }
            className="text-pink-600 font-semibold"
          >
            + Add Education
          </button>
        </div>

        {resume.education.map((edu, index) => (
          <div key={edu.id} className="border rounded-lg p-5 mb-4">
            {edu.isEditing ? (
              <>
                <input
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={e => {
                    const updated = [...resume.education];
                    updated[index].degree = e.target.value;
                    save({ ...resume, education: updated });
                  }}
                />
                <input
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={e => {
                    const updated = [...resume.education];
                    updated[index].field = e.target.value;
                    save({ ...resume, education: updated });
                  }}
                />
                <input
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={e => {
                    const updated = [...resume.education];
                    updated[index].institution = e.target.value;
                    save({ ...resume, education: updated });
                  }}
                />
                <input
                  className="border p-2 rounded w-full mb-4"
                  placeholder="Years (e.g. 2021 - 2024)"
                  value={edu.years}
                  onChange={e => {
                    const updated = [...resume.education];
                    updated[index].years = e.target.value;
                    save({ ...resume, education: updated });
                  }}
                />

                <button
                  onClick={() => {
                    const updated = [...resume.education];
                    updated[index].isEditing = false;
                    save({ ...resume, education: updated });
                  }}
                  className="bg-pink-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.field}</p>
                  <p>{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.years}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const updated = [...resume.education];
                      updated[index].isEditing = true;
                      save({ ...resume, education: updated });
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() =>
                      save({
                        ...resume,
                        education: resume.education.filter(
                          (_, i) => i !== index
                        ),
                      })
                    }
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Work & Experience</h2>
          <button
            onClick={() =>
              save({
                ...resume,
                experience: [
                  ...resume.experience,
                  {
                    id: uid(),
                    isEditing: true,
                    title: "",
                    company: "",
                    years: "",
                    description: "",
                  },
                ],
              })
            }
            className="text-pink-600 font-semibold"
          >
            + Add Experience
          </button>
        </div>

        {resume.experience.map((exp, index) => (
          <div key={exp.id} className="border rounded-lg p-5 mb-4">
            {exp.isEditing ? (
              <>
                <input
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={e => {
                    const updated = [...resume.experience];
                    updated[index].title = e.target.value;
                    save({ ...resume, experience: updated });
                  }}
                />
                <input
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Company"
                  value={exp.company}
                  onChange={e => {
                    const updated = [...resume.experience];
                    updated[index].company = e.target.value;
                    save({ ...resume, experience: updated });
                  }}
                />
                <input
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Years (e.g. 2024 - present)"
                  value={exp.years}
                  onChange={e => {
                    const updated = [...resume.experience];
                    updated[index].years = e.target.value;
                    save({ ...resume, experience: updated });
                  }}
                />
                <textarea
                  className="border p-2 rounded w-full mb-4"
                  rows={3}
                  placeholder="Description"
                  value={exp.description}
                  onChange={e => {
                    const updated = [...resume.experience];
                    updated[index].description = e.target.value;
                    save({ ...resume, experience: updated });
                  }}
                />

                <button
                  onClick={() => {
                    const updated = [...resume.experience];
                    updated[index].isEditing = false;
                    save({ ...resume, experience: updated });
                  }}
                  className="bg-pink-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {exp.title}{" "}
                    <span className="font-normal">{exp.company}</span>
                  </h3>
                  <p className="text-sm text-gray-500">{exp.years}</p>
                  <p className="text-gray-700 mt-2">
                    {exp.description}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const updated = [...resume.experience];
                      updated[index].isEditing = true;
                      save({ ...resume, experience: updated });
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() =>
                      save({
                        ...resume,
                        experience: resume.experience.filter(
                          (_, i) => i !== index
                        ),
                      })
                    }
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      <button className="bg-pink-600 text-white px-8 py-2 rounded">
        Update Resume
      </button>
    </div>
  );
}
