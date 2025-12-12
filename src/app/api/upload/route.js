import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Temporary fake URL (replace with Cloudinary later)
    const imageUrl = `/uploads/${Date.now()}-${file.name}`;

    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
