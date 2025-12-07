import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.js";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { fullName, email, password, role } = await req.json();

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      fullName,
      email,
      password: hashed,
      role,
    });

    return NextResponse.json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Signup route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
