"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [me, setMe] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setMe(JSON.parse(raw));
    } catch {
      setMe(null);
    }
  }, []);

const handlePostJob = () => {
  router.push("/auth/signup?role=employer");
};

const handleFindJob = () => {
  router.push("/auth/signup?role=candidate");
};

  return (
    <header className="bg-[#05173B] text-white flex flex-wrap justify-between items-center px-6 md:px-12 py-6">
      <Link href="/" className="flex items-center">
        <Image src="/image/mainlogo.png" alt="Main logo" width={140} height={40} />
      </Link>

      <nav className="flex items-center gap-4 md:gap-8 mt-4 md:mt-0">
        <Link href="/">Home</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/hiring-company">Hiring Company</Link>
        {me && <Link href="/profile">Profile</Link>}

        {/* ACTION BUTTONS */}
        <button
          onClick={handleFindJob}
          className="border border-white px-3 py-1 rounded-md text-sm"
        >
          Find Job
        </button>

        <button
          onClick={handlePostJob}
          className="bg-[#FF6B6B] hover:bg-[#ff4c4c] px-4 py-2 rounded-md font-semibold"
        >
          Post Job
        </button>
      </nav>
    </header>
  );
}
