export default function SearchBar() {
  return (
    <div
      className="flex flex-col md:flex-row justify-center gap-4 px-10 py-6 rounded-md shadow-md"
      style={{
        backgroundImage: "url('/image/search-bar-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <input
        type="text"
        placeholder="Job title, keywords or company name"
        className="border p-3 rounded-md w-full md:w-[400px] bg-white/90"
      />

      <select className="border p-3 rounded-md w-full md:w-[200px] bg-white/90">
        <option value="">Select city</option>
        <option value="Beirut">Beirut</option>
        <option value="Tripoli">Tripoli</option>
        <option value="Saida">Saida</option>
        <option value="Beqaa">Beqaa</option>
        <option value="Sour">Sour</option>
      </select>

      <button className="bg-blue-600 text-white p-3 px-6 rounded-md">
        Search
      </button>
    </div>
  );
}