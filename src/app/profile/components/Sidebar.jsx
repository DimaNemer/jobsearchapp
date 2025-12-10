"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const links = [
    { name: "Dashboard", href: "/profile" },
    { name: "Manage Applications", href: "/profile/applications" },
    { name: "Resume", href: "/profile/resume" },
    { name: "Edit Profile", href: "/profile" },
    { name: "Change Password", href: "/profile/change-password" },
    { name: "Logout", href: "/auth/logout" },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-5">
      <h2 className="text-lg font-bold mb-6">My Account</h2>

      <nav className="flex flex-col gap-3">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className={`p-2 rounded-lg font-medium ${
              path === link.href
                ? "bg-blue-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
