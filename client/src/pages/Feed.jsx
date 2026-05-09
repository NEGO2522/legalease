import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Feed = ({ page }) => {
  const [activeLanguage, setActiveLanguage] = useState("English");
  const [feedCards, setFeedCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const languages = ["English", "Hindi", "Tamil", "Telugu", "Marathi"];

  useEffect(() => {
    axios.get("http://localhost:5000/api/feed")
      .then((res) => {
        setFeedCards(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf8fc]">
      <Navbar />

      <main className="max-w-md mx-auto w-full pb-24">
        {/* Language Selector */}
        <section className="mt-4 px-5">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={`px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  activeLanguage === lang
                    ? "bg-[#031636] text-white"
                    : "border border-gray-300 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </section>

        {/* Legal Insights */}
        <section className="mt-6 px-5">
          <h2 className="text-lg font-bold text-[#031636] mb-4">Legal Insights</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 relative h-48 rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80" alt="Legal" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031636]/90 to-transparent"></div>
              <div className="absolute bottom-0 p-4 text-white">
                <span className="bg-yellow-500 text-[#031636] px-2 py-0.5 rounded-full text-xs font-bold mb-2 inline-block">Trending</span>
                <h3 className="text-lg font-bold leading-tight mb-1">New Rental Laws 2024</h3>
                <p className="text-xs opacity-90">Protecting tenants from unfair eviction and deposit rules.</p>
              </div>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase mb-2 inline-block">Property Law</span>
                <h3 className="text-sm font-bold text-[#031636] leading-tight mb-2">RERA Registration Guide</h3>
              </div>
              <a href="#" className="text-[#031636] font-bold text-xs flex items-center gap-1 mt-2">Read →</a>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase mb-2 inline-block">Consumer</span>
                <h3 className="text-sm font-bold text-[#031636] leading-tight mb-2">Refusal of Warranty Claims</h3>
              </div>
              <a href="#" className="text-[#031636] font-bold text-xs flex items-center gap-1 mt-2">Read →</a>
            </div>
          </div>
        </section>

        {/* Daily Legal Feed */}
        <section className="mt-8 px-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#031636]">Daily Legal Feed</h2>
            <button className="text-[#031636] text-sm font-bold">See All</button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-[#031636] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : feedCards.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">
              No posts found
            </div>
          ) : (
            feedCards.map((card, index) => (
              <div key={card._id || index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">{card.category}</span>
                  <span className="text-gray-400 text-xs">
                    {new Date(card.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#031636] mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{card.desc}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  {card.verified ? (
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-bold text-gray-500">Verified by LegalEase</span>
                    </div>
                  ) : card.reads > 0 ? (
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-xs text-gray-400">{card.reads > 999 ? (card.reads/1000).toFixed(1) + "k" : card.reads} reads</span>
                    </div>
                  ) : (
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-[#031636] flex items-center justify-center text-[9px] text-white border-2 border-white">LE</div>
                      <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-[9px] text-white border-2 border-white">AS</div>
                    </div>
                  )}
                  <a href="#" className="text-[#031636] font-bold text-sm flex items-center gap-1">Read Full Advice →</a>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Feed;