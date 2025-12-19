"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCandidates: 0,
    totalEmployers: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAdmin();
    loadStats();
  }, []);

  async function checkAdmin() {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();

      if (!data.user || data.user.role !== "admin") {
        alert("Access denied. Admins only.");
        router.push("/auth/login");
        return;
      }

      setUser(data.user);
    } catch (err) {
      console.error("Auth check failed:", err);
      router.push("/auth/login");
    }
  }

  async function loadStats() {
    try {
      const res = await fetch("/api/admin/stats", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.fullName || "Admin"}! 👋
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon="👥"
            color="blue"
            subtitle={`${stats.totalCandidates} candidates, ${stats.totalEmployers} employers`}
          />
          <StatCard
            title="Total Jobs"
            value={stats.totalJobs}
            icon="💼"
            color="green"
            subtitle={`${stats.activeJobs} active`}
          />
          <StatCard
            title="Applications"
            value={stats.totalApplications}
            icon="📝"
            color="purple"
            subtitle={`${stats.pendingApplications} pending`}
          />
          <StatCard
            title="System Status"
            value="Active"
            icon="✅"
            color="emerald"
            subtitle="All systems operational"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            title="Manage Users"
            description="View, edit, and manage all user accounts"
            icon="👤"
            onClick={() => router.push("/admin/users")}
          />
          <QuickActionCard
            title="Manage Jobs"
            description="View, edit, and delete job postings"
            icon="💼"
            onClick={() => router.push("/admin/jobs")}
          />
          <QuickActionCard
            title="View Applications"
            description="Monitor all job applications"
            icon="📋"
            onClick={() => router.push("/admin/applications")}
          />
          <QuickActionCard
            title="Companies"
            description="Manage registered companies"
            icon="🏢"
            onClick={() => router.push("/admin/companies")}
          />
          <QuickActionCard
            title="System Settings"
            description="Configure platform settings"
            icon="⚙️"
            onClick={() => router.push("/admin/settings")}
          />
          <QuickActionCard
            title="Reports"
            description="Generate and view reports"
            icon="📊"
            onClick={() => router.push("/admin/reports")}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, subtitle }) {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    emerald: "bg-emerald-500",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <div
          className={`${colors[color]} text-white px-3 py-1 rounded-full text-sm font-semibold`}
        >
          {typeof value === "number" ? value : value}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
}

function QuickActionCard({ title, description, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-shadow"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}