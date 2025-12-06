import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password, role } = await req.json();

    const exists = await User.findOne({ email });
    if (exists) return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashed, role });

    return new Response(JSON.stringify({ message: "User registered" }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
