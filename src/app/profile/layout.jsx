import Sidebar from "./components/Sidebar";

export default function ProfileLayout({ children }) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
