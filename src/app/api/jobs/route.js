// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Job from "@/models/Job";
// import User from "@/models/User";
// import jwt from "jsonwebtoken";

// // GET all jobs OR employer's jobs
// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const mine = searchParams.get("mine");

//     console.log("📋 GET /api/jobs - mine parameter:", mine);

//     // If ?mine=true, return only employer's jobs
//     if (mine === "true") {
//       const token = req.cookies.get("token")?.value;
      
//       if (!token) {
//         console.error("❌ No token found");
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//       }

//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("✅ Token decoded:", { id: decoded.id, role: decoded.role });

//         if (decoded.role !== "employer") {
//           return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//         }

//         const jobs = await Job.find({ employer: decoded.id })
//           .populate("company", "name location website")
//           .populate("employer", "fullName email")
//           .sort({ createdAt: -1 });

//         console.log(`✅ Found ${jobs.length} jobs for employer ${decoded.id}`);
        
//         return NextResponse.json({ jobs });
//       } catch (err) {
//         console.error("❌ Token verification failed:", err);
//         return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//       }
//     }

//     // Otherwise return all active jobs
//     const jobs = await Job.find({ status: "active" })
//       .populate("company", "name location website")
//       .populate("employer", "fullName email")
//       .sort({ createdAt: -1 });

//     console.log(`✅ Found ${jobs.length} active jobs`);

//     return NextResponse.json({ jobs });
//   } catch (err) {
//     console.error("❌ GET /api/jobs error:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch jobs" },
//       { status: 500 }
//     );
//   }
// }

// // POST new job
// export async function POST(req) {
//   try {
//     await connectDB();

//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "employer") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     // Get employer's company
//     const employer = await User.findById(decoded.id).populate("company");
//     if (!employer?.company) {
//       return NextResponse.json(
//         { error: "Employer must have a company" },
//         { status: 400 }
//       );
//     }

//     const payload = await req.json();

//     // Create job with employer and company
//     const newJob = await Job.create({
//       ...payload,
//       employer: decoded.id,
//       company: employer.company._id,
//       status: "active",
//     });

//     console.log("✅ Job created:", newJob._id);

//     return NextResponse.json({
//       message: "Job created successfully",
//       job: newJob,
//     });
//   } catch (err) {
//     console.error("❌ POST /api/jobs error:", err);
//     return NextResponse.json(
//       { error: err.message || "Failed to create job" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import Company from "@/models/Company";
import User from "@/models/User";
import jwt from "jsonwebtoken";

// GET all jobs or employer's jobs
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const mine = searchParams.get("mine");

    let query = { status: "active" };

    // If "mine=true", filter by employer
    if (mine === "true") {
      const token = req.cookies.get("token")?.value;
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== "employer") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      query.employer = decoded.id;
    }

    const jobs = await Job.find(query)
      .populate("employer", "fullName email")
      .populate("company", "name location website logo")
      .sort({ createdAt: -1 });

    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("GET /api/jobs error:", err);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST - Create new job
export async function POST(req) {
  try {
    await connectDB();

    // Verify authentication
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "employer") {
      return NextResponse.json(
        { error: "Only employers can post jobs" },
        { status: 403 }
      );
    }

    // Get employer with company
    const employer = await User.findById(decoded.id).populate("company");
    if (!employer) {
      return NextResponse.json(
        { error: "Employer not found" },
        { status: 404 }
      );
    }

    if (!employer.company) {
      return NextResponse.json(
        { error: "No company associated with this employer" },
        { status: 400 }
      );
    }

    const payload = await req.json();

    // Validate required fields
    if (!payload.title || !payload.location || !payload.description) {
      return NextResponse.json(
        { error: "Title, location, and description are required" },
        { status: 400 }
      );
    }

    // Create job
    const job = await Job.create({
      title: payload.title,
      location: payload.location,
      employmentType: payload.employmentType || "Full-time",
      experienceLevel: payload.experienceLevel || "Any",
      categories: payload.categories || [],
      description: payload.description,
      responsibilities: payload.responsibilities || [],
      requirements: payload.requirements || [],
      salary: payload.salary || null,
      logo: payload.logo || null,
      employer: decoded.id,
      company: employer.company._id,
      status: "active",
    });

    // Populate company for response
    await job.populate("company", "name location");

    console.log("✅ Job created successfully:", job._id);

    return NextResponse.json({
      message: "Job posted successfully",
      job,
    });
  } catch (err) {
    console.error("POST /api/jobs error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create job" },
      { status: 500 }
    );
  }
}