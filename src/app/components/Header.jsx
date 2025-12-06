// import Image from "next/image";
// import logo from ""; // Replace with your actual image filename

export default function Header() {
  return (
    <header className="bg-[#05173B] text-white flex justify-between items-center px-10 py-4">
      <div className="logo">
        {/* <Image src={logo} alt="Job Portal Logo" width={150} height={50} /> */}
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