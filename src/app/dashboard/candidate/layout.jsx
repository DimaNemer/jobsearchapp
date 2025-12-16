import CandidateSidebar from "./components/CandidateSidebar";

export default function CandidateDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <CandidateSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}