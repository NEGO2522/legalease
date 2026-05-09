import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title = "LegalEase" }) => {
  const navigate = useNavigate();
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const languages = [
    { name: "English", native: "English" },
    { name: "Hindi", native: "हिन्दी" },
    { name: "Tamil", native: "தமிழ்" },
    { name: "Telugu", native: "తెలుగు" },
  ];

  return (
    <>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 px-5 py-4 flex justify-between items-center">

        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <h1 className="text-xl font-bold text-[#031636]">{title}</h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2">

          {/* Language */}
          <button
            onClick={() => setLangOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-all relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {/* Selected language dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-yellow-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <button
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center text-[#031636] font-black text-sm ring-2 ring-yellow-300 hover:ring-yellow-400 transition-all active:scale-95"
          >
            {initials}
          </button>

        </div>
      </header>

      {/* Language Picker Overlay */}
      {langOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          onClick={() => setLangOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Sheet */}
          <div
            className="relative w-full max-w-md bg-[#0d1f38] rounded-t-3xl px-6 pt-6 pb-10 z-10 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
              Select Language
            </p>

            <div className="flex flex-col gap-3">
              {languages.map((lang) => {
                const active = selectedLang === lang.name;
                return (
                  <button
                    key={lang.name}
                    onClick={() => {
                      setSelectedLang(lang.name);
                      setLangOpen(false);
                    }}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${
                      active
                        ? "bg-yellow-500 text-[#031636]"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="font-bold text-base">{lang.name}</span>
                    <span className={`text-sm ${active ? "text-[#031636]/70" : "text-white/40"}`}>
                      {lang.native}
                    </span>
                    {active && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Slide up animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1);
        }
      `}</style>
    </>
  );
};

export default Navbar;