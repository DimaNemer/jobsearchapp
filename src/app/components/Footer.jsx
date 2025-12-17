
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#05173B] text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-bold mb-4">NextHire</h3>
          <p className="text-white/70 leading-relaxed">
            Connecting talent with opportunity. Discover jobs, grow your career,
            and hire smarter.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link href="/jobs" className="hover:text-white transition">
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/hiring-companies"
                className="hover:text-white transition"
              >
                Hiring Companies
              </Link>
            </li>
            <li>
              <Link href="/auth/signup" className="hover:text-white transition">
                Create Account
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold mb-4">Get in Touch</h4>
          <p className="text-white/70 mb-2">
            Email:{" "}
            <a
              href="mailto:nexthire@gmail.com"
              className="hover:text-white transition"
            >
              nexthire@gmail.com
            </a>
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              in
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              X
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              IG
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-6 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} NextHire. All rights reserved.
      </div>
    </footer>
  );
}