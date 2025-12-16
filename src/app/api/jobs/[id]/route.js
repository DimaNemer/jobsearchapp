

// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Job from "@/models/Job";
// import mongoose from "mongoose";
// import Company from "@/models/Company";


// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = params;

//     // Validate Mongo ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { error: "Invalid job ID" },
//         { status: 400 }
//       );
//     }

//     const job = await Job.findById(id)
//       .populate("company", "name location website")
//       .populate("employer", "fullName email");

//     if (!job) {
//       return NextResponse.json(
//         { error: "Job not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ job });
//   } catch (err) {
//     console.error(`GET /api/jobs/${params?.id} error:`, err);
//     return NextResponse.json(
//       { error: err.message || "Failed to fetch job" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Job from "@/models/Job";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export async function GET(request, context) {
//   try {
//     await connectDB();

//    const { id } = context.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
//     }

//     const job = await Job.findById(id).populate("employer", "fullName email");
//     if (!job) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     return NextResponse.json(job);
//   } catch (err) {
//     console.error(`GET /api/jobs/${params?.id} error:`, err);
//     return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
//   }
// }

// export async function PUT(request, context) {
//   try {
//     await connectDB();

//     const { id } = context.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
//     }

//     // ✅ auth from cookie
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "employer") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     // ✅ make sure employer owns this job
//     const existing = await Job.findById(id);
//     if (!existing) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     if (String(existing.employer) !== String(decoded.id)) {
//       return NextResponse.json({ error: "Not allowed" }, { status: 403 });
//     }

//     const payload = await req.json();

//     const updated = await Job.findByIdAndUpdate(
//       id,
//       { ...payload },
//       { new: true }
//     );

//     return NextResponse.json({ message: "Job updated", job: updated });
//   } catch (err) {
//     console.error("PUT /api/jobs/[id] error:", err);
//     return NextResponse.json(
//       { error: err.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Job from "@/models/Job";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//    const rawId = params?.id;
// const id = Array.isArray(rawId) ? rawId[0] : rawId;

// if (!id) {
//   return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
// }

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
//     }

//     const job = await Job.findById(id).populate("employer", "fullName email");
//     if (!job) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     return NextResponse.json(job);
//   } catch (err) {
//     console.error("GET /api/jobs/[id] error:", err);
//     return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
//   }
// }

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const rawId = params.id;
//     const id = Array.isArray(rawId) ? rawId[0] : rawId;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
//     }

//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "employer") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const existing = await Job.findById(id);
//     if (!existing) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     if (String(existing.employer) !== String(decoded.id)) {
//       return NextResponse.json({ error: "Not allowed" }, { status: 403 });
//     }

//     const payload = await req.json();

//     const updated = await Job.findByIdAndUpdate(id, payload, { new: true });

//     return NextResponse.json({ message: "Job updated", job: updated });
//   } catch (err) {
//     console.error("PUT /api/jobs/[id] error:", err);
//     return NextResponse.json(
//       { error: err.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Job from "@/models/Job";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const rawId = params?.id;
//     const id = Array.isArray(rawId) ? rawId[0] : rawId;
//     // ✅ ADD: try slug first (DO NOT REMOVE ANYTHING BELOW)
//     if (id && !mongoose.Types.ObjectId.isValid(id)) {
//       const jobBySlug = await Job.findOne({ slug: id }).populate(
//         "employer",
//         "fullName email"
//       );

//       if (!jobBySlug) {
//         return NextResponse.json({ error: "Job not found" }, { status: 404 });
//       }

//       return NextResponse.json(jobBySlug);
//     }

//     // ⬇️ EXISTING CODE (UNCHANGED)
//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
//     }

//     const job = await Job.findById(id).populate("employer", "fullName email");
//     if (!job) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     return NextResponse.json(job);
//   } catch (err) {
//     console.error("GET /api/jobs/[id] error:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch job" },
//       { status: 500 }
//     );
//   }
// }

// // export async function GET(req, { params }) {
// //   try {
// //     await connectDB();

// //     const rawId = params?.id;
// //     const id = Array.isArray(rawId) ? rawId[0] : rawId;

// //     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
// //       return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
// //     }

// //     const job = await Job.findById(id).populate("employer", "fullName email");
// //     if (!job) {
// //       return NextResponse.json({ error: "Job not found" }, { status: 404 });
// //     }

// //     return NextResponse.json(job);
// //   } catch (err) {
// //     console.error("GET /api/jobs/[id] error:", err);
// //     return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
// //   }
// // }

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const rawId = params?.id;
//     const id = Array.isArray(rawId) ? rawId[0] : rawId;

//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
//     }

//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "employer") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const existing = await Job.findById(id);
//     if (!existing) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     if (String(existing.employer) !== String(decoded.id)) {
//       return NextResponse.json({ error: "Not allowed" }, { status: 403 });
//     }

//     const payload = await req.json();
//     const updated = await Job.findByIdAndUpdate(id, payload, { new: true });

//     return NextResponse.json({ message: "Job updated", job: updated });
//   } catch (err) {
//     console.error("PUT /api/jobs/[id] error:", err);
//     return NextResponse.json(
//       { error: err.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }
// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();

//     const id = params?.id;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
//     }

//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "employer") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const job = await Job.findById(id);
//     if (!job) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     if (String(job.employer) !== String(decoded.id)) {
//       return NextResponse.json({ error: "Not allowed" }, { status: 403 });
//     }

//     await Job.deleteOne({ _id: id });

//     return NextResponse.json({ message: "Job deleted successfully" });
//   } catch (err) {
//     console.error("DELETE /api/jobs/[id] error:", err);
//     return NextResponse.json(
//       { error: err.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function GET(req, context) {
  try {
    await connectDB();

    // ✅ FIX: Properly await params
    const params = await context.params;
    const id = params.id;

    console.log("📍 GET JOB - Received ID:", id);

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    // Try to find by slug first
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("🔍 Searching by slug:", id);
      const jobBySlug = await Job.findOne({ slug: id })
        .populate("employer", "fullName email")
        .populate("company", "name location website");

      if (!jobBySlug) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      }

      return NextResponse.json(jobBySlug);
    }

    // If valid ObjectId, search by _id
    console.log("🔍 Searching by ObjectId:", id);
    const job = await Job.findById(id)
      .populate("employer", "fullName email")
      .populate("company", "name location website");

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (err) {
    console.error("❌ GET /api/jobs/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  try {
    await connectDB();

    // ✅ FIX: Properly await params
    const params = await context.params;
    const id = params.id;

    console.log("📝 PUT JOB - Received ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    // Verify authentication
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if job exists and belongs to employer
    const existing = await Job.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (String(existing.employer) !== String(decoded.id)) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const payload = await req.json();
    const updated = await Job.findByIdAndUpdate(id, payload, { new: true });

    console.log("✅ Job updated successfully");
    return NextResponse.json({ message: "Job updated", job: updated });
  } catch (err) {
    console.error("❌ PUT /api/jobs/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();

    // ✅ FIX: Properly await params
    const params = await context.params;
    const id = params.id;

    console.log("🗑️ DELETE JOB - Received ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    // Verify authentication
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if job exists and belongs to employer
    const job = await Job.findById(id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (String(job.employer) !== String(decoded.id)) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    await Job.deleteOne({ _id: id });

    console.log("✅ Job deleted successfully");
    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("❌ DELETE /api/jobs/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}