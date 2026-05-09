import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

const Lawyers = ({ page }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All Lawyers");
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectedId, setConnectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  // Filters — translated
  const filters = [
    { key: "filterAll", fallback: "All Lawyers" },
    { key: "filterCriminal", fallback: "Criminal" },
    { key: "filterCorporate", fallback: "Corporate" },
    { key: "filterFamily", fallback: "Family" },
    { key: "filterProperty", fallback: "Property" },
    { key: "filterCyber", fallback: "Cyber" },
    { key: "filterConsumer", fallback: "Consumer" },
  ];

  // Original category names for filtering logic (English)
  const filterCategories = ["All Lawyers", "Criminal", "Corporate", "Family", "Property", "Cyber", "Consumer"];

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

  const handleConnect = async (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowModal(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/lawyers/connect/${lawyer._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConnectedId(lawyer._id);
    } catch (err) {
      console.log(err);
    }
  };

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
            {filters.map((f, i) => (
              <button
                key={f.fallback}
                onClick={() => setActiveFilter(filterCategories[i])}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filterCategories[i]
                    ? "bg-[#031636] text-white shadow-sm"
                    : "bg-yellow-50 text-yellow-800 border border-yellow-200 hover:bg-yellow-100"
                }`}
              >
                {t(f.key) !== f.key ? t(f.key) : f.fallback}
              </button>
            ))}
          </div>
        </section>

        {/* Lawyers List */}
        <section className="px-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-[#031636]">{t("topCounsel")}</h2>

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
                    <div className="w-20 h-20 rounded-lg bg-[#031636] flex items-center justify-center ring-2 ring-yellow-200">
                      <span className="text-white text-xl font-bold">{lawyer.initials}</span>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
                    {t("startingAt")} <span className="text-[#031636] font-bold">{lawyer.price}</span>{t("perSession")}
                  </p>
                  <button
                    onClick={() => handleConnect(lawyer)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                      connectedId === lawyer._id
                        ? "bg-green-500 text-white"
                        : "bg-[#031636] text-white hover:opacity-90"
                    }`}
                  >
                    {connectedId === lawyer._id ? t("connected") : t("connect")}
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Connect Modal */}
      {showModal && selectedLawyer && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-[#0d1f38] rounded-t-3xl px-6 pt-6 pb-10 z-10 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-yellow-500 flex items-center justify-center text-[#031636] font-black text-lg">
                {selectedLawyer.initials}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{selectedLawyer.name}</h3>
                <p className="text-gray-400 text-sm">{selectedLawyer.specialty}</p>
              </div>
            </div>

            <p className="text-white/60 text-sm mb-6 text-center">{t("chooseConnect")}</p>

            <div className="flex flex-col gap-3">
              <a
                href="tel:+911800123456"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 px-5 py-4 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">{t("callNow")}</p>
                  <p className="text-gray-400 text-xs">{t("freeConsult")}</p>
                </div>
              </a>

              <a
                href="https://wa.me/911800123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 px-5 py-4 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">WhatsApp</p>
                  <p className="text-gray-400 text-xs">{t("chatLawyer")}</p>
                </div>
              </a>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 py-3 rounded-2xl border border-white/10 text-white/50 text-sm font-medium hover:bg-white/5 transition-all"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1);
        }
      `}</style>
    </div>
  );
};

export default Lawyers;