export default function SearchBar() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 px-10 py-6 bg-white shadow-lg -mt-20 relative z-10">
      
      <input
        type="text"
        placeholder="Job title, keywords or company name"
        className="border p-3 rounded-md w-full md:w-[400px]"
      />

      <select className="border p-3 rounded-md w-full md:w-[200px]">
        <option value="">Select city</option>
        <option value="Beirut">Beirut</option>
        <option value="Tripoli">Tripoli</option>
        <option value="Saida">Saida</option>
        <option value="Saida">Beqaa</option>
        <option value="Saida">Sour</option>
        {/* Add more cities */}
      </select>

      <button className="bg-blue-600 text-white p-3 px-6 rounded-md">
        Search
      </button>

    </div>
  );
}
