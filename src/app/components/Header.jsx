// import Image from "next/image";
// import logo from ""; // Replace with your actual image filename

export default function Header() {
  return (
    <header className="bg-[#05173B] text-white flex justify-between items-center px-12 py-8">
      <div className="logo">
      <image  src="./image/mainlogo.png"></image>
      </div>

      <nav className="flex gap-8 text-lg">
        <a href="#">Home</a>
        <a href="/jobs">Jobs</a>
        <a href="/hiring-company">Hiring Company</a>
        <a href="/profile">Profile</a>
      </nav>
    </header>
  );
}