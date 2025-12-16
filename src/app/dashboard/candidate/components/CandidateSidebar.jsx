"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CandidateSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard/candidate" },
    { label: "Manage Applications", href: "/dashboard/candidate/applications" },
    { label: "Resume", href: "/dashboard/candidate/resume" },
    { label: "Profile", href: "/dashboard/candidate/profile" },
    { label: "Change Password", href: "/dashboard/candidate/change-password" },
    { label: "Logout", href: "/dashboard/candidate/logout" },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-5">
      <h2 className="text-lg font-bold mb-6">Candidate</h2>

      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-2 rounded-lg font-medium ${
              pathname === link.href
                ? "bg-blue-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
