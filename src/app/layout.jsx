import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./globals.css";

export const metadata = {
  title: "Job Search App",
  description: "Find your next job",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
