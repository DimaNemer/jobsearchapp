import EmployerSidebar from "./components/EmployerSidebar";

export default function EmployerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <EmployerSidebar />
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
