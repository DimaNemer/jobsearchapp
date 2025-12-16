"use client";

import { useEffect, useState } from "react";

export default function CandidateDashboardPage() {
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setName(u?.fullName || "");
      }
    } catch {
      setName("");
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Welcome{name ? `, ${name}` : ""} 👋
      </h1>
      <p className="text-gray-600">
        Use the sidebar to post jobs, manage your listings, and update your company profile.
      </p>
    </div>
  );
}
