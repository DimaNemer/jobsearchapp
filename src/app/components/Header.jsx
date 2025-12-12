"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setMe(JSON.parse(raw));
    } catch {
      setMe(null);
    }
  }, []);

  const showAdd = me?.role === "employer";

  return (
    <header className="bg-[#05173B] text-white flex flex-wrap justify-between items-center px-6 md:px-12 py-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Image src="/image/mainlogo.png" alt="Main logo" width={140} height={40} />
        </Link>
      </div>

      <nav className="flex items-center gap-4 md:gap-8 mt-4 md:mt-0">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/jobs" className="hover:underline">Jobs</Link>
        <Link href="/hiring-company" className="hover:underline">Hiring Company</Link>
        <Link href="/profile" className="hover:underline">Profile</Link>

        {showAdd ? (
          <Link
            href="/jobs/add"
            className="ml-4 inline-block bg-[#FF6B6B] hover:bg-[#ff4c4c] text-white px-4 py-2 rounded-md font-semibold"
          >
            + Add Job
          </Link>
        ) : (
          <Link
            href="/auth/signup"
            className="ml-4 inline-block bg-transparent border border-white text-white px-3 py-1 rounded-md text-sm"
          >
           add job
          </Link>
        )}
      </nav>
    </header>
  );
}