import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      // ✅ Security: don't reveal if email exists
      return NextResponse.json({
        message: "If the email exists, a reset link was sent",
      });
    }

    // 🔑 generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 30; // 30 minutes

    await user.save();

    // 🚨 EMAIL WILL BE ADDED LATER
    console.log("RESET LINK:");
    console.log(
      `http://localhost:3000/auth/reset-password?token=${resetToken}`
    );

    return NextResponse.json({
      message: "Password reset link sent",
    });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
