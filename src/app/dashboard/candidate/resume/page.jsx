// "use client";

// import { useEffect, useState } from "react";



// const STORAGE_KEY = "candidate_resume";
// const uid = () => crypto.randomUUID();

// export default function ResumePage() {



//   const [resume, setResume] = useState({
//     fileName: "",
//     jobTitle: "",
//     experienceYears: "",
//     about: "",
//     categories: [],
//     skills: [],
//     education: [],
//     experience: [],
//   });

//   const [skillInput, setSkillInput] = useState("");

//   /* ================= LOAD / SAVE ================= */
//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     if (saved) setResume(JSON.parse(saved));
//   }, []);

//   function save(data) {
//     setResume(data);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//   }

//   /* ================= SKILLS ================= */
//   function addSkill(e) {
//     if (e.key === "Enter" && skillInput.trim()) {
//       e.preventDefault();
//       save({
//         ...resume,
//         skills: [...new Set([...resume.skills, skillInput.trim()])],
//       });
//       setSkillInput("");
//     }
//   }

//   function removeSkill(skill) {
//     save({
//       ...resume,
//       skills: resume.skills.filter(s => s !== skill),
//     });
//   }

//   /* ================= UI ================= */
//   return (
//     <div className="max-w-5xl bg-white p-30 rounded-xl shadow">
//       <h1 className="text-2xl font-bold mb-8">Resume</h1>

//       {/* ================= FILE UPLOAD ================= */}
//       <div className="border-dashed border-2 rounded-lg p-6 mb-10 text-center">
//         <input
//           type="file"
//           hidden
//           id="resumeUpload"
//           onChange={e =>
//             save({ ...resume, fileName: e.target.files?.[0]?.name || "" })
//           }
//         />
//         <label htmlFor="resumeUpload" className="cursor-pointer text-blue-600">
//           Upload / Replace Resume
//         </label>
//         <p className="text-sm text-gray-500 mt-2">
//           {resume.fileName || "PDF, DOC, DOCX (max 5MB)"}
//         </p>
//       </div>

//       {/* ================= JOB INFO ================= */}
//       <div className="grid grid-cols-2 gap-6 mb-10">
//         <input
//           className="border p-3 rounded"
//           placeholder="Your current / desired job title *"
//           value={resume.jobTitle}
//           onChange={e => save({ ...resume, jobTitle: e.target.value })}
//         />
//         <input
//           className="border p-3 rounded"
//           placeholder="Years of Experience *"
//           value={resume.experienceYears}
//           onChange={e => save({ ...resume, experienceYears: e.target.value })}
//         />
//       </div>

//       {/* ================= ABOUT ================= */}
//       <textarea
//         className="border p-3 rounded w-full mb-6"
//         rows={4}
//         placeholder="About you"
//         value={resume.about}
//         onChange={e => save({ ...resume, about: e.target.value })}
//       />

//       {/* ================= CATEGORIES ================= */}
//       <label className="font-medium block mb-2">
//         Desired Job Category *
//       </label>
//       <select
//         multiple
//         className="border p-3 rounded w-full h-40 mb-8"
//         value={resume.categories}
//         onChange={e =>
//           save({
//             ...resume,
//             categories: Array.from(e.target.selectedOptions).map(o => o.value),
//           })
//         }
//       >
//         <option>Web Development</option>
//         <option>Mobile Development</option>
//         <option>Data Science</option>
//         <option>Computer Engineering</option>
//         <option>Business</option>
//         <option>Design</option>
//         <option>Marketing</option>
//         <option>Sales</option>
//         <option>Customer Support</option>
//         <option>Human Resources</option>
//         <option>Finance</option>
//         <option>Education</option>
//         <option>Healthcare</option>
//         <option>Engineering</option>
//         <option>Legal</option>
//         <option>Writing & Content</option>
//         <option>Project Management</option>
//         <option>Other</option>
//       </select>

//       {/* ================= SKILLS ================= */}
//       <label className="font-medium block mb-2">Skills</label>
//       <div className="border rounded p-3 mb-12 flex flex-wrap gap-2">
//         {resume.skills.map(skill => (
//           <span
//             key={skill}
//             className="bg-gray-200 px-3 py-1 rounded-full flex gap-2 items-center"
//           >
//             {skill}
//             <button onClick={() => removeSkill(skill)}>✕</button>
//           </span>
//         ))}
//         <input
//           className="flex-1 outline-none"
//           placeholder="Type skill and press Enter"
//           value={skillInput}
//           onChange={e => setSkillInput(e.target.value)}
//           onKeyDown={addSkill}
//         />
//       </div>

//       {/* ================= EDUCATION ================= */}
//       <section className="mb-12">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Education *</h2>
//           <button
//             onClick={() =>
//               save({
//                 ...resume,
//                 education: [
//                   ...resume.education,
//                   {
//                     id: uid(),
//                     isEditing: true,
//                     degree: "",
//                     field: "",
//                     institution: "",
//                     years: "",
//                   },
//                 ],
//               })
//             }
//             className="text-pink-600 font-semibold"
//           >
//             + Add Education
//           </button>
//         </div>

//         {resume.education.map((edu, index) => (
//           <div key={edu.id} className="border rounded-lg p-5 mb-4">
//             {edu.isEditing ? (
//               <>
//                 <input
//                   className="border p-2 rounded w-full mb-2"
//                   placeholder="Degree"
//                   value={edu.degree}
//                   onChange={e => {
//                     const updated = [...resume.education];
//                     updated[index].degree = e.target.value;
//                     save({ ...resume, education: updated });
//                   }}
//                 />
//                 <input
//                   className="border p-2 rounded w-full mb-2"
//                   placeholder="Field of Study"
//                   value={edu.field}
//                   onChange={e => {
//                     const updated = [...resume.education];
//                     updated[index].field = e.target.value;
//                     save({ ...resume, education: updated });
//                   }}
//                 />
//                 <input
//                   className="border p-2 rounded w-full mb-2"
//                   placeholder="Institution"
//                   value={edu.institution}
//                   onChange={e => {
//                     const updated = [...resume.education];
//                     updated[index].institution = e.target.value;
//                     save({ ...resume, education: updated });
//                   }}
//                 />
//                 <input
//                   className="border p-2 rounded w-full mb-4"
//                   placeholder="Years (e.g. 2021 - 2024)"
//                   value={edu.years}
//                   onChange={e => {
//                     const updated = [...resume.education];
//                     updated[index].years = e.target.value;
//                     save({ ...resume, education: updated });
//                   }}
//                 />

//                 <button
//                   onClick={() => {
//                     const updated = [...resume.education];
//                     updated[index].isEditing = false;
//                     save({ ...resume, education: updated });
//                   }}
//                   className="bg-pink-600 text-white px-4 py-1 rounded"
//                 >
//                   Save
//                 </button>
//               </>
//             ) : (
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="font-semibold text-lg">{edu.degree}</h3>
//                   <p className="text-gray-600">{edu.field}</p>
//                   <p>{edu.institution}</p>
//                   <p className="text-sm text-gray-500">{edu.years}</p>
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => {
//                       const updated = [...resume.education];
//                       updated[index].isEditing = true;
//                       save({ ...resume, education: updated });
//                     }}
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     onClick={() =>
//                       save({
//                         ...resume,
//                         education: resume.education.filter(
//                           (_, i) => i !== index
//                         ),
//                       })
//                     }
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </section>

//       {/* ================= EXPERIENCE ================= */}
//       <section className="mb-12">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Work & Experience</h2>
//           <button
//             onClick={() =>
//               save({
//                 ...resume,
//                 experience: [
//                   ...resume.experience,
//                   {
//                     id: uid(),
//                     isEditing: true,
//                     title: "",
//                     company: "",
//                     years: "",
//                     description: "",
//                   },
//                 ],
//               })
//             }
//             className="text-pink-600 font-semibold"
//           >
//             + Add Experience
//           </button>
//         </div>

//         {resume.experience.map((exp, index) => (
//           <div key={exp.id} className="border rounded-lg p-5 mb-4">
//             {exp.isEditing ? (
//               <>
//                 <input
//                   className="border p-2 rounded w-full mb-2"
//                   placeholder="Job Title"
//                   value={exp.title}
//                   onChange={e => {
//                     const updated = [...resume.experience];
//                     updated[index].title = e.target.value;
//                     save({ ...resume, experience: updated });
//                   }}
//                 />
//                 <input
//                   className="border p-2 rounded w-full mb-2"
//                   placeholder="Company"
//                   value={exp.company}
//                   onChange={e => {
//                     const updated = [...resume.experience];
//                     updated[index].company = e.target.value;
//                     save({ ...resume, experience: updated });
//                   }}
//                 />
//                 <input
//                   className="border p-2 rounded w-full mb-2"
//                   placeholder="Years (e.g. 2024 - present)"
//                   value={exp.years}
//                   onChange={e => {
//                     const updated = [...resume.experience];
//                     updated[index].years = e.target.value;
//                     save({ ...resume, experience: updated });
//                   }}
//                 />
//                 <textarea
//                   className="border p-2 rounded w-full mb-4"
//                   rows={3}
//                   placeholder="Description"
//                   value={exp.description}
//                   onChange={e => {
//                     const updated = [...resume.experience];
//                     updated[index].description = e.target.value;
//                     save({ ...resume, experience: updated });
//                   }}
//                 />

//                 <button
//                   onClick={() => {
//                     const updated = [...resume.experience];
//                     updated[index].isEditing = false;
//                     save({ ...resume, experience: updated });
//                   }}
//                   className="bg-pink-600 text-white px-4 py-1 rounded"
//                 >
//                   Save
//                 </button>
//               </>
//             ) : (
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="font-semibold text-lg">
//                     {exp.title}{" "}
//                     <span className="font-normal">{exp.company}</span>
//                   </h3>
//                   <p className="text-sm text-gray-500">{exp.years}</p>
//                   <p className="text-gray-700 mt-2">
//                     {exp.description}
//                   </p>
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => {
//                       const updated = [...resume.experience];
//                       updated[index].isEditing = true;
//                       save({ ...resume, experience: updated });
//                     }}
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     onClick={() =>
//                       save({
//                         ...resume,
//                         experience: resume.experience.filter(
//                           (_, i) => i !== index
//                         ),
//                       })
//                     }
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </section>

//       <button className="bg-pink-600 text-white px-8 py-2 rounded">
//         Update Resume
//       </button>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

const uid = () => crypto.randomUUID();

export default function ResumePage() {
  const [resume, setResume] = useState({
    fileName: "",
    currentJobTitle: "",
    yearsOfExperience: "",
    aboutYou: "",
    desiredJobCategory: [],
    skills: [],
    education: [],
    experience: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  /* ================= LOAD FROM DATABASE ================= */
  useEffect(() => {
    loadResume();
  }, []);

  async function loadResume() {
    try {
      const res = await fetch("/api/candidate/resume", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.resume && Object.keys(data.resume).length > 0) {
          setResume({
            fileName: data.resume.fileName || "",
            currentJobTitle: data.resume.currentJobTitle || "",
            yearsOfExperience: data.resume.yearsOfExperience || "",
            aboutYou: data.resume.aboutYou || "",
            desiredJobCategory: data.resume.desiredJobCategory || [],
            skills: data.resume.skills || [],
            education: data.resume.education || [],
            experience: data.resume.experience || [],
          });
        }
      }
    } catch (err) {
      console.error("Failed to load resume:", err);
    }
  }

  /* ================= SAVE TO DATABASE ================= */
  async function saveResume() {
    setLoading(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/candidate/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(resume),
      });

      if (res.ok) {
        setSaveMessage("✅ Resume saved successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        const data = await res.json();
        setSaveMessage(`❌ ${data.error || "Failed to save resume"}`);
      }
    } catch (err) {
      console.error("Save error:", err);
      setSaveMessage("❌ Failed to save resume");
    } finally {
      setLoading(false);
    }
  }

  function updateField(key, value) {
    setResume((prev) => ({ ...prev, [key]: value }));
  }

  /* ================= SKILLS ================= */
  function addSkill(e) {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      setResume((prev) => ({
        ...prev,
        skills: [...new Set([...prev.skills, skillInput.trim()])],
      }));
      setSkillInput("");
    }
  }

  function removeSkill(skill) {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  }

  /* ================= EDUCATION ================= */
  function addEducation() {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: uid(),
          isEditing: true,
          degree: "",
          field: "",
          university: "",
          startYear: "",
          endYear: "",
        },
      ],
    }));
  }

  function updateEducation(index, field, value) {
    setResume((prev) => {
      const updated = [...prev.education];
      updated[index][field] = value;
      return { ...prev, education: updated };
    });
  }

  function toggleEducationEdit(index) {
    setResume((prev) => {
      const updated = [...prev.education];
      updated[index].isEditing = !updated[index].isEditing;
      return { ...prev, education: updated };
    });
  }

  function deleteEducation(index) {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }

  /* ================= EXPERIENCE ================= */
  function addExperience() {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: uid(),
          isEditing: true,
          title: "",
          company: "",
          startYear: "",
          endYear: "",
          description: "",
        },
      ],
    }));
  }

  function updateExperience(index, field, value) {
    setResume((prev) => {
      const updated = [...prev.experience];
      updated[index][field] = value;
      return { ...prev, experience: updated };
    });
  }

  function toggleExperienceEdit(index) {
    setResume((prev) => {
      const updated = [...prev.experience];
      updated[index].isEditing = !updated[index].isEditing;
      return { ...prev, experience: updated };
    });
  }

  function deleteExperience(index) {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-5xl bg-white p-8 rounded-xl shadow">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Resume</h1>
        {saveMessage && (
          <span
            className={`text-sm font-medium ${
              saveMessage.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {saveMessage}
          </span>
        )}
      </div>

      {/* ================= FILE UPLOAD ================= */}
      <div className="border-dashed border-2 rounded-lg p-6 mb-10 text-center">
        <input
          type="file"
          hidden
          id="resumeUpload"
          onChange={(e) =>
            updateField("fileName", e.target.files?.[0]?.name || "")
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
          value={resume.currentJobTitle}
          onChange={(e) => updateField("currentJobTitle", e.target.value)}
        />
        <input
          className="border p-3 rounded"
          placeholder="Years of Experience *"
          value={resume.yearsOfExperience}
          onChange={(e) => updateField("yearsOfExperience", e.target.value)}
        />
      </div>

      {/* ================= ABOUT ================= */}
      <textarea
        className="border p-3 rounded w-full mb-6"
        rows={4}
        placeholder="About you"
        value={resume.aboutYou}
        onChange={(e) => updateField("aboutYou", e.target.value)}
      />

      {/* ================= CATEGORIES ================= */}
      <label className="font-medium block mb-2">
        Desired Job Category *
      </label>
      <select
        multiple
        className="border p-3 rounded w-full h-40 mb-8"
        value={resume.desiredJobCategory}
        onChange={(e) =>
          updateField(
            "desiredJobCategory",
            Array.from(e.target.selectedOptions).map((o) => o.value)
          )
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
        {resume.skills.map((skill) => (
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
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={addSkill}
        />
      </div>

      {/* ================= EDUCATION ================= */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Education *</h2>
          <button
            onClick={addEducation}
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
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                />
                <input
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                />
                <input
                  className="border p-2 rounded w-full mb-2"
                  placeholder="University"
                  value={edu.university}
                  onChange={(e) =>
                    updateEducation(index, "university", e.target.value)
                  }
                />
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <input
                    className="border p-2 rounded"
                    placeholder="Start Year"
                    value={edu.startYear}
                    onChange={(e) =>
                      updateEducation(index, "startYear", e.target.value)
                    }
                  />
                  <input
                    className="border p-2 rounded"
                    placeholder="End Year"
                    value={edu.endYear}
                    onChange={(e) =>
                      updateEducation(index, "endYear", e.target.value)
                    }
                  />
                </div>

                <button
                  onClick={() => toggleEducationEdit(index)}
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
                  <p>{edu.university}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startYear} - {edu.endYear}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => toggleEducationEdit(index)}>✏️</button>
                  <button onClick={() => deleteEducation(index)}>🗑️</button>
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
            onClick={addExperience}
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
                  onChange={(e) =>
                    updateExperience(index, "title", e.target.value)
                  }
                />
                <input
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                />
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    className="border p-2 rounded"
                    placeholder="Start Year"
                    value={exp.startYear}
                    onChange={(e) =>
                      updateExperience(index, "startYear", e.target.value)
                    }
                  />
                  <input
                    className="border p-2 rounded"
                    placeholder="End Year (or present)"
                    value={exp.endYear}
                    onChange={(e) =>
                      updateExperience(index, "endYear", e.target.value)
                    }
                  />
                </div>
                <textarea
                  className="border p-2 rounded w-full mb-4"
                  rows={3}
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                />

                <button
                  onClick={() => toggleExperienceEdit(index)}
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
                    <span className="font-normal text-gray-600">
                      @ {exp.company}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    {exp.startYear} - {exp.endYear}
                  </p>
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => toggleExperienceEdit(index)}>
                    ✏️
                  </button>
                  <button onClick={() => deleteExperience(index)}>🗑️</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      <button
        onClick={saveResume}
        disabled={loading}
        className="bg-pink-600 text-white px-8 py-3 rounded disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save Resume"}
      </button>
    </div>
  );
}