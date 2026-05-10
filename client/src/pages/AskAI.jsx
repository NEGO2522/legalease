import { useState } from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

const categoryColors = {
  Criminal: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  Consumer: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Property: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  Family:   { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  Cyber:    { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
};

const statsCategoryMeta = {
  stateWiseLegalAid: { label: "State-wise Legal Aid Persons", icon: "🗺️" },
  indiansInForeignJails: { label: "Indians in Foreign Jails", icon: "🌏" },
  giaBudget: { label: "NALSA GIA Budget (Crore ₹)", icon: "💰" },
  districtBeneficiaries: { label: "District-wise Beneficiaries", icon: "🏛️" },
};

const sampleQuestions = [
  { en: "My landlord is threatening to evict me illegally", hi: "मकान मालिक मुझे जबरदस्ती निकाल रहा है" },
  { en: "Someone cheated me online and took my money", hi: "किसी ने ऑनलाइन पैसे ठग लिए" },
  { en: "My husband is beating me at home", hi: "पति घर में मारपीट कर रहा है" },
  { en: "Builder gave me flat 2 years late", hi: "बिल्डर ने फ्लैट 2 साल देर से दिया" },
  { en: "Someone hacked my account and stole data", hi: "किसी ने मेरा अकाउंट हैक किया" },
  { en: "Legal aid in Rajasthan state", hi: "राजस्थान में कानूनी सहायता" },
  { en: "Indians in jail abroad", hi: "विदेश में जेल में भारतीय" },
  { en: "NALSA budget allocated", hi: "NALSA बजट आवंटन" },
];

const AskAI = () => {
  const { t, language } = useLanguage();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [asked, setAsked] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isHindi = language === "Hindi";

  const handleAsk = async (q) => {
    const finalQ = q || question;
    if (!finalQ.trim()) return;
    setLoading(true);
    setError("");
    setResults(null);
    setAsked(true);
    try {
      const res = await fetch("http://localhost:5000/api/askai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: finalQ, userId: user._id, language }),
      });
      const data = await res.json();
      setResults(data);
      setQuestion(finalQ);
    } catch (err) {
      setError(isHindi ? "Server se connect nahi ho paya. Dobara try karein." : "Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSample = (q) => {
    const text = isHindi ? q.hi : q.en;
    setQuestion(text);
    handleAsk(text);
  };

  const handleReset = () => {
    setQuestion("");
    setResults(null);
    setError("");
    setAsked(false);
  };

  const renderStatsSection = (stats, category, source) => {
    if (!stats || stats.length === 0) return null;
    const meta = statsCategoryMeta[category] || { label: "Legal Statistics", icon: "📊" };
    return (
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">{meta.icon}</span>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{meta.label}</p>
        </div>

        {category === "giaBudget" && (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="text-left px-4 py-2.5 text-emerald-700 text-xs font-bold">Year</th>
                  <th className="text-right px-4 py-2.5 text-emerald-700 text-xs font-bold">GIA (₹ Crore)</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-2.5 text-gray-700 text-xs font-medium">{s.year}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-emerald-600 text-xs">₹{s.giaAllocatedCrore} Cr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {category === "stateWiseLegalAid" && (
          <div className="flex flex-col gap-2">
            {stats.slice(0, 5).map((s, i) => {
              const latest = Object.entries(s.yearWisePersons).sort().pop();
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-xs font-bold text-[#031636]">{s.state}</p>
                    <p className="text-xs text-gray-400">{latest?.[0]}</p>
                  </div>
                  <span className="text-sm font-bold text-indigo-600">{latest?.[1]?.toLocaleString("en-IN")} persons</span>
                </div>
              );
            })}
            {stats.length > 5 && <p className="text-xs text-center text-gray-400 mt-1">+{stats.length - 5} more states in database</p>}
          </div>
        )}

        {category === "indiansInForeignJails" && (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-rose-50">
                <tr>
                  <th className="text-left px-4 py-2.5 text-rose-700 text-xs font-bold">Country</th>
                  <th className="text-right px-4 py-2.5 text-rose-700 text-xs font-bold">In Jail</th>
                  <th className="text-right px-4 py-2.5 text-rose-700 text-xs font-bold">Death Row</th>
                </tr>
              </thead>
              <tbody>
                {stats.filter(s => s.indiansInJail > 0).sort((a, b) => b.indiansInJail - a.indiansInJail).slice(0, 8).map((s, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-2 text-gray-700 text-xs font-medium">{s.country}</td>
                    <td className="px-4 py-2 text-right font-bold text-rose-600 text-xs">{s.indiansInJail}</td>
                    <td className="px-4 py-2 text-right text-xs text-gray-500">
                      {s.deathSentence > 0 ? <span className="text-red-600 font-bold">{s.deathSentence}</span> : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {category === "districtBeneficiaries" && (
          <div className="flex flex-col gap-2">
            {stats.sort((a, b) => b.total - a.total).slice(0, 5).map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-[#031636]">{s.district}</p>
                  <span className="text-xs font-bold text-amber-600">{s.total} total</span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {s.women > 0 && <span className="text-xs text-purple-600">Women: {s.women}</span>}
                  {s.SC > 0 && <span className="text-xs text-blue-600">SC: {s.SC}</span>}
                  {s.ST > 0 && <span className="text-xs text-green-600">ST: {s.ST}</span>}
                  {s.inCustody > 0 && <span className="text-xs text-red-600">In Custody: {s.inCustody}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {source && (
          <div className="mt-2 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xs text-gray-400">Source: {source} • data.gov.in</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf8fc]">
      <Navbar />

      <main className="max-w-md mx-auto w-full pb-24 px-5">

        {/* ── Header ── */}
        <div className="mt-6 mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-[#031636] flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#031636]">{isHindi ? "कानूनी सवाल पूछें" : "Ask a Legal Question"}</h2>
              <p className="text-xs text-gray-400">{isHindi ? "भारतीय कानून + सरकारी डेटा" : "Indian Law + Govt Data"} • {language}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex gap-2 items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-yellow-800 text-xs leading-relaxed">
              {isHindi
                ? "यह जानकारी केवल जागरूकता के लिए है। किसी भी कानूनी कार्रवाई के लिए पंजीकृत वकील से सलाह लें।"
                : "This information is for awareness only. Please consult a registered lawyer for any legal action."
              }
            </p>
          </div>
        </div>

        {/* ── Question Input ── */}
        {!asked && (
          <>
            {/* How it works */}
            <div className="flex gap-3 mb-5">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  ),
                  text: isHindi ? "सवाल लिखें" : "Type question",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                  text: isHindi ? "AI खोजे" : "AI searches",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: isHindi ? "जवाब पाएं" : "Get answer",
                },
              ].map((step, i) => (
                <div key={i} className="flex-1 bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
                  <div className="flex justify-center mb-1">{step.icon}</div>
                  <p className="text-[10px] font-semibold text-gray-500">{step.text}</p>
                </div>
              ))}
            </div>

            <div className="relative mb-4">
              <textarea
                rows={3}
                placeholder={isHindi ? "अपना कानूनी सवाल यहाँ लिखें..." : "Type your legal question here..."}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#031636] transition-all text-gray-800 placeholder:text-gray-300 resize-none"
              />
            </div>

            <button
              onClick={() => handleAsk()}
              disabled={!question.trim() || loading}
              className="w-full bg-[#031636] text-white py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {isHindi ? "कानूनी जानकारी खोजें" : "Search Legal Information"}
            </button>

            {/* Sample Questions */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                {isHindi ? "आम सवाल — एक क्लिक में पूछें" : "Common Questions — Tap to Ask"}
              </p>
              <div className="flex flex-col gap-2">
                {sampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSample(q)}
                    className="text-left bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 hover:border-[#031636] hover:text-[#031636] hover:bg-yellow-50 transition-all flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="flex-1 text-xs">{isHindi ? q.hi : q.en}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-12 h-12 border-4 border-[#031636] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm">{isHindi ? "कानूनी जानकारी खोज रहे हैं..." : "Searching legal information..."}</p>
          </div>
        )}

        {/* ── Results ── */}
        {!loading && results && (
          <div>
            {/* Question bubble */}
            <div className="bg-[#031636] rounded-2xl px-4 py-3 mb-4 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-white text-sm leading-relaxed">{question}</p>
            </div>

            {/* Not found */}
            {!results.found ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#031636] mb-1">
                  {isHindi ? "जानकारी नहीं मिली" : "No Information Found"}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">{results.message}</p>
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                  <p className="text-yellow-800 text-xs">
                    {isHindi ? "अलग शब्दों में पूछें या नीचे किसी वकील से जुड़ें" : "Try different words or connect with a lawyer"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {/* Gemini AI Answer */}
                {results.aiAnswer && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-[#031636] flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        {isHindi ? "AI कानूनी सलाह" : "AI Legal Advice"}
                      </p>
                      <span className="ml-auto bg-yellow-50 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full font-semibold border border-yellow-200">
                        Powered by Gemini
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {results.aiAnswer}
                    </div>
                  </div>
                )}

                {/* Govt Stats */}
                {results.stats && results.stats.length > 0 && (
                  <>
                    <div className="flex items-center gap-3 my-1">
                      <div className="flex-1 h-px bg-gray-100" />
                      <span className="text-xs text-gray-300">govt data</span>
                      <div className="flex-1 h-px bg-gray-100" />
                    </div>
                    {renderStatsSection(results.stats, results.statsCategory, results.statsSource)}
                  </>
                )}
              </div>
            )}

            {/* Ask another */}
            <button
              onClick={handleReset}
              className="w-full mt-5 border-2 border-[#031636] text-[#031636] py-3.5 rounded-xl font-semibold text-sm hover:bg-[#031636] hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {isHindi ? "नया सवाल पूछें" : "Ask Another Question"}
            </button>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mt-4 flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default AskAI;