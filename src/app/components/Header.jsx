import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#05173B] text-white flex justify-between items-center px-12 py-8">
      <div className="logo">
        {/* If your logo file is in public/image/mainlogo.png use src="/image/mainlogo.png" */}
        <Image src="/image/mainlogo.png" alt="Main logo" width={140} height={40} />
      </div>

      <nav className="flex gap-8 text-lg">
        <a href="app/page.js">Home</a>
        <a href="/jobs">Jobs</a>
        <a href="/hiring-company">Hiring Company</a>
        <a href="/profile">Profile</a>
      </nav>
    </header>
  );
}