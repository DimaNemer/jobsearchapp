import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Job from "@/models/Job";
import Application from "@/models/Application";
import Company from "@/models/Company";
import jwt from "jsonwebtoken";

export async function DELETE(req, context) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access only" }, { status: 403 });
    }

    const { id } = await context.params;

    // Get user
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete related data
    if (user.role === "employer") {
      // Delete all jobs posted by this employer
      await Job.deleteMany({ employer: id });
      
      // Delete company
      if (user.company) {
        await Company.deleteOne({ _id: user.company });
      }
    }

    // Delete all applications (as candidate or employer)
    await Application.deleteMany({
      $or: [{ candidate: id }, { employer: id }],
    });

    // Delete user
    await User.deleteOne({ _id: id });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Admin delete user error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}