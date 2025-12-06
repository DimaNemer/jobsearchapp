export default function     BodySection() {
  return (
    <section
      className="relative h-[450px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
        <h1 className="text-3xl font-bold max-w-3xl">
          JOIN BDD TODAY, A UNIQUE CLUSTER OF INNOVATION DESIGNED FOR THE DIGITAL AND CREATIVE MINDS!
        </h1>

        <p className="mt-3">Apply now to the jobs of the future!</p>

       <a href="/auth/login" className="bg-blue-600 px-4 py-2 rounded text-white">
  Get Started
</a>

      </div>
    </section>
  );
}
