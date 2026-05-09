import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const filters = ["All Lawyers", "Criminal", "Corporate", "Family", "Property"];

const Lawyers = ({ page }) => {
  const [activeFilter, setActiveFilter] = useState("All Lawyers");
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/lawyers")
      .then((res) => {
        setLawyers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredLawyers = activeFilter === "All Lawyers"
    ? lawyers
    : lawyers.filter((l) => l.category === activeFilter);

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf8fc]">

      <Navbar />

      <main className="max-w-md mx-auto w-full pb-24">

        {/* Filter Chips */}
        <section className="py-4 px-5">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === f
                    ? "bg-[#031636] text-white shadow-sm"
                    : "bg-yellow-50 text-yellow-800 border border-yellow-200 hover:bg-yellow-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Lawyers List */}
        <section className="px-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-[#031636]">Top Rated Counsel</h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-[#031636] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredLawyers.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">
              No lawyers found
            </div>
          ) : (
            filteredLawyers.map((lawyer, index) => (
              <div key={lawyer._id || index} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-4">

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-lg bg-[#031636] flex items-center justify-center ring-2 ring-yellow-200 overflow-hidden">
                      {lawyer.image ? (
                        <img
                          src={lawyer.image}
                          alt={lawyer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-xl font-bold">{lawyer.initials}</span>
                      )}
                    </div>
                    {lawyer.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#031636] mb-1">{lawyer.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                        {lawyer.specialty}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-bold text-gray-800">{lawyer.rating}</span>
                        <span className="text-xs text-gray-400">({lawyer.reviews}+)</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-500 font-medium">
                        {lawyer.experience}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Starting at <span className="text-[#031636] font-bold">{lawyer.price}</span>/session
                  </p>
                  <button className="bg-[#031636] text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all active:scale-95">
                    Connect
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Lawyers;