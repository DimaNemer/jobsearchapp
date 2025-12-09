
// import BodySection from "@/app/components/BodySection";
// import SearchBar from "./components/SearchBar";

// export default function Home() {
//   return (
//     <main>
//       <BodySection />
//       <SearchBar />
//     </main>
//   );
// // }

import BodySection from "@/app/components/BodySection";
import SearchBar from "@/app/components/SearchBar";
import JobList from "@/app/components/JobList";

export default function Home() {
  return (
    <main>
      <BodySection />
      <SearchBar />
      <JobList />
    </main>
  );
}


// "use client";

// import { useRouter } from "next/navigation";
// import BodySection from "./components/BodySection";
// import SearchBar from "./components/SearchBar";
// import JobCard from "./components/JobCard";
// import { jobs } from "./data/jobs";

// export default function Home() {
//   const router = useRouter();
//   const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");

//   const visibleJobs = isLoggedIn ? jobs : jobs.slice(0, 3);

//   function handleFindMore() {
//     if (!isLoggedIn) {
//       router.push("/auth/signup");
//     } else {
//       router.push("/jobs");
//     }
//   }

//   return (
//     <main>
//       <BodySection />
//       <SearchBar />

//       <div className="job-list mt-10">
//         {visibleJobs.map((job) => (
//           <JobCard key={job.id} job={job} />
//         ))}
//       </div>

//       <button
//         onClick={handleFindMore}
//         className="bg-blue-900 text-white px-5 py-3 rounded-lg mt-5"
//       >
//         Find More Jobs
//       </button>
//     </main>
//   );
// }
