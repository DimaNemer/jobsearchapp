"use client";

export default function LogoutPage() {
  function logout() {
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0";
    window.location.replace("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Logout</h1>
      <button
        onClick={logout}
        className="bg-blue-900 text-white px-6 py-3 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
