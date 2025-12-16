// "use client";

// import { useState } from "react";

// export default function ProfileForm() {
//   const [form, setForm] = useState(() => {
//     // Lazy initializer — runs once on client; avoids calling setState inside an effect
//     try {
//       if (typeof window === "undefined") return {
//         firstName: "",
//         lastName: "",
//         dob: "",
//         gender: "",
//         mobile: "",
//         phone: "",
//         country: "",
//         nationality: "",
//         position: "",
//         district: "",
//         address: "",
//         linkedin: "",
//         photo: "",
//       };

//       const saved = localStorage.getItem("profile");
//       if (!saved) {
//         return {
//           firstName: "",
//           lastName: "",
//           dob: "",
//           gender: "",
//           mobile: "",
//           phone: "",
//           country: "",
//           nationality: "",
//           position: "",
//           district: "",
//           address: "",
//           linkedin: "",
//           photo: "",
//         };
//       }

//       const parsed = JSON.parse(saved);
//       if (parsed && typeof parsed === "object") return parsed;
//     } catch (err) {
//       console.error("Failed to read profile from localStorage:", err);
//     }

//     return {
//       firstName: "",
//       lastName: "",
//       dob: "",
//       gender: "",
//       mobile: "",
//       phone: "",
//       country: "",
//       nationality: "",
//       position: "",
//       district: "",
//       address: "",
//       linkedin: "",
//       photo: "",
//     };
//   });

//   function handleChange(e) {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   }

//   function handlePhoto(e) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const MAX_BYTES = 1 * 1024 * 1024;
//     if (file.size > MAX_BYTES) {
//       alert("File is too large. Max 1MB.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => setForm(prev => ({ ...prev, photo: reader.result }));
//     reader.readAsDataURL(file);
//   }

//   function saveProfile() {
//     try {
//       localStorage.setItem("profile", JSON.stringify(form));
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Failed to save profile:", err);
//       alert("Could not save profile. See console for details.");
//     }
//   }

//   return (
//     <div className="bg-white shadow rounded-xl p-8">
//       {/* Photo */}
//       <div className="flex items-center gap-4 mb-6">
//         {form.photo ? (
//         <img
//   src={form.photo}
//   className="w-24 h-24 rounded-full object-cover"
//   alt="profile"
// />

//         ) : (
//           <div className="w-24 h-24 bg-gray-200 rounded-full" />
//         )}

//         <div>
//           <input
//             type="file"
//             accept="image/png, image/jpeg"
//             onChange={handlePhoto}
//           />
//           <p className="text-xs text-gray-600">
//             Max file size: 1MB. Accepted: jpg, jpeg, png.
//           </p>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="grid grid-cols-2 gap-5">
//         <input
//           name="firstName"
//           value={form.firstName}
//           onChange={handleChange}
//           placeholder="First Name"
//           className="border p-3 rounded-lg"
//         />

//         <input
//           name="lastName"
//           value={form.lastName}
//           onChange={handleChange}
//           placeholder="Last Name"
//           className="border p-3 rounded-lg"
//         />

//         <input
//           type="date"
//           name="dob"
//           value={form.dob}
//           onChange={handleChange}
//           className="border p-3 rounded-lg"
//         />

//         <select
//           name="gender"
//           value={form.gender}
//           onChange={handleChange}
//           className="border p-3 rounded-lg"
//         >
//           <option value="">Gender</option>
//           <option value="female">Female</option>
//           <option value="male">Male</option>
//         </select>

//         <input
//           name="mobile"
//           value={form.mobile}
//           onChange={handleChange}
//           placeholder="Mobile"
//           className="border p-3 rounded-lg"
//         />

//         <input
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//           placeholder="Phone"
//           className="border p-3 rounded-lg"
//         />

//         <input
//           name="country"
//           value={form.country}
//           onChange={handleChange}
//           placeholder="Country"
//           className="border p-3 rounded-lg"
//         />

//         <input
//           name="nationality"
//           value={form.nationality}
//           onChange={handleChange}
//           placeholder="Nationality"
//           className="border p-3 rounded-lg"
//         />

//         <input
//           name="position"
//           value={form.position}
//           onChange={handleChange}
//           placeholder="Position"
//           className="border p-3 rounded-lg"
//         />

//         <input
//           name="district"
//           value={form.district}
//           onChange={handleChange}
//           placeholder="District"
//           className="border p-3 rounded-lg"
//         />

//         <input
//           name="address"
//           value={form.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="border p-3 rounded-lg col-span-2"
//         />

//         <input
//           name="linkedin"
//           value={form.linkedin}
//           onChange={handleChange}
//           placeholder="LinkedIn (optional)"
//           className="border p-3 rounded-lg col-span-2"
//         />
//       </div>

//       <button
//         onClick={saveProfile}
//         className="mt-6 px-6 py-3 bg-blue-900 text-white rounded-lg"
//       >
//         Update
//       </button>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";

export default function ProfileForm() {
  const [form, setForm] = useState(() => {
    // KEEP INITIAL STRUCTURE EXACTLY
    return {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      mobile: "",
      phone: "",
      country: "",
      nationality: "",
      position: "",
      district: "",
      address: "",
      linkedin: "",
      photo: "",
    };
  });

  /* ================================
     🔹 LOAD PROFILE FROM DATABASE
     (ADDED — NO STRUCTURE CHANGE)
  ================================= */
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/employer/profile", {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.profile) {
          setForm((prev) => ({
            ...prev,
            ...data.profile,
          }));
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    }

    loadProfile();
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_BYTES = 1 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      alert("File is too large. Max 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () =>
      setForm((prev) => ({ ...prev, photo: reader.result }));
    reader.readAsDataURL(file);
  }

  /* ================================
     🔹 SAVE PROFILE TO DATABASE
     (EDITED — REPLACED localStorage)
  ================================= */
  async function saveProfile() {
    try {
      const res = await fetch("/api/employer/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Failed to update profile");
        return;
      }

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Could not save profile. See console for details.");
    }
  }

  return (
    <div className="bg-white shadow rounded-xl p-8">
      {/* Photo */}
      <div className="flex items-center gap-4 mb-6">
        {form.photo ? (
          <img
            src={form.photo}
            className="w-24 h-24 rounded-full object-cover"
            alt="profile"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
        )}

        <div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handlePhoto}
          />
          <p className="text-xs text-gray-600">
            Max file size: 1MB. Accepted: jpg, jpeg, png.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-5">
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-3 rounded-lg"
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-3 rounded-lg"
        />

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="">Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="border p-3 rounded-lg"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-3 rounded-lg"
        />

        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          className="border p-3 rounded-lg"
        />

        <input
          name="nationality"
          value={form.nationality}
          onChange={handleChange}
          placeholder="Nationality"
          className="border p-3 rounded-lg"
        />


        <input
          name="district"
          value={form.district}
          onChange={handleChange}
          placeholder="District"
          className="border p-3 rounded-lg"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-3 rounded-lg"
        />

   <input
          name="GitHub"
          value={form.GitHub}
          onChange={handleChange}
          placeholder="GitHub"
          className="border p-3 rounded-lg col-span-2"
        />
        <input
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn (optional)"
          className="border p-3 rounded-lg col-span-2"
        />
      </div>

      <button
        onClick={saveProfile}
        className="mt-6 px-6 py-3 bg-blue-900 text-white rounded-lg"
      >
        Update
      </button>
    </div>
  );
}
