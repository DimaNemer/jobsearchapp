"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CandidateSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard/candidate", icon: "📊" },
    { label: "Manage Applications", href: "/dashboard/candidate/applications", icon: "📝" },
    { label: "Saved Jobs", href: "/dashboard/candidate/saved-jobs", icon: "⭐" },
    { label: "Resume", href: "/dashboard/candidate/resume", icon: "📄" },
    { label: "Profile", href: "/dashboard/candidate/profile", icon: "👤" },
    { label: "Change Password", href: "/dashboard/candidate/change-password", icon: "🔒" },
    { label: "Logout", href: "/dashboard/candidate/logout", icon: "🚪" },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-5">
      <h2 className="text-lg font-bold mb-6 text-gray-800">Candidate</h2>

      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              pathname === link.href
                ? "bg-blue-900 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}