import Image from "next/image";
import hero from "@/app/image/jobsearchbg.png";

export default function BodySection() {
  return (
    <section className="relative h-[450px]">
      <Image
        src={hero}
        alt="Job search background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
        <h1 className="text-3xl font-bold max-w-3xl">
        JOIN A DYNAMIC DIGITAL COMMUNITY WHERE INNOVATION, TALENT, AND OPPORTUINITY COME TOGETHER ! 
        </h1>

        <p className="mt-3">APPLY NOW TO THE JOB OF THE FUTURE!</p>

        <a href="/auth/login" className="bg-blue-600 px-5 py-2  rounded text-white">
          Get Started
        </a>
      </div>
    </section>
  );
}