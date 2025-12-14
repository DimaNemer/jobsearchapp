// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function EmployerSidebar() {
//   const pathname = usePathname();

//   const links = [
//     { label: "Post Job", href: "/dashboard/employer/post-job" },
//     { label: "My Jobs", href: "/dashboard/employer/my-jobs" },
//     { label: "Profile", href: "/dashboard/employer/profile" },
//     { label: "Change Password", href: "/dashboard/employer/change-password" },
//     { label: "Logout", href: "/dashboard/employer/logout" },
//   ];

//   return (
//     <aside className="w-64 bg-white border-r min-h-screen p-5">
//       <h2 className="text-lg font-bold mb-6">Employer</h2>

//       <nav className="flex flex-col gap-3">
//         {links.map((link) => (
//           <Link
//             key={link.href}
//             href={link.href}
//             className={`p-2 rounded-lg font-medium ${
//               pathname === link.href
//                 ? "bg-blue-900 text-white"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             {link.label}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EmployerSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Post Job", href: "/dashboard/employer/post-job" },
    { label: "My Jobs", href: "/dashboard/employer/my-jobs" },
    { label: "Profile", href: "/dashboard/employer/profile" },
    { label: "Change Password", href: "/dashboard/employer/change-password" },
    { label: "Logout", href: "/dashboard/employer/logout" },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-5">
      <h2 className="text-lg font-bold mb-6">Employer</h2>

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
