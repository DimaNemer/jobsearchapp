"use client";

import { useEffect } from "react";

export default function ClientAuthProvider({ children }) {
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    loadUser();
  }, []);

  return children;
}
