import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });

    return new Response(JSON.stringify({ message: "Login success", user }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
