import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import Company from "@/models/Company";

export async function POST(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const employer = await User.findById(decoded.id).populate("company");

    if (!employer) {
      return NextResponse.json({ error: "Employer not found" }, { status: 404 });
    }

    if (!employer.company) {
      return NextResponse.json(
        { error: "Employer has no company" },
        { status: 400 }
      );
    }

    const data = await req.json();

    const job = await Job.create({
      ...data,
      employer: employer._id,
      company: employer.company._id,
      status: "active", // ✅ ensure status
    });

    return NextResponse.json({ message: "Job created", job }, { status: 201 });
  } catch (err) {
    console.error("POST /api/jobs error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const mine = searchParams.get("mine");

    if (mine === "true") {
      const token = req.cookies.get("token")?.value;
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== "employer") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const jobs = await Job.find({ employer: decoded.id })
        .populate("company", "name location")
        .sort({ createdAt: -1 });

      return NextResponse.json({ jobs });
    }

    const jobs = await Job.find({ status: "active" })
      .populate("company", "name location")
      .sort({ createdAt: -1 });

    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("GET /api/jobs error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}



// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const mine = searchParams.get("mine");

//     if (mine === "true") {
//       const token = req.cookies.get("token")?.value;
//       if (!token) {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//       }

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       if (decoded.role !== "employer") {
//         return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//       }

//       const jobs = await Job.find({ employer: decoded.id })
//         .populate("company", "name location")
//         .sort({ createdAt: -1 });

//       return NextResponse.json({ jobs });
//     }

//     const jobs = await Job.find({ status: "active" })
//       .populate("company", "name location")
//       .sort({ createdAt: -1 });

//     return NextResponse.json({ jobs });
//   } catch (err) {
//     console.error("GET /api/jobs error:", err);
//     return NextResponse.json(
//       { error: err.message || "Failed to fetch jobs" },
//       { status: 500 }
//     );
//   }
// }
