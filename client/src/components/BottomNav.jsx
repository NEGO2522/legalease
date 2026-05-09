const BottomNav = ({ page, setPage }) => {
  const tabs = [
    {
      id: "feed",
      label: "Feed",
      icon: (active) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={active ? "#031636" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
        </svg>
      ),
    },
    {
      id: "askai",
      label: "Ask AI",
      icon: (active) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={active ? "#031636" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: "documents",
      label: "Docs",
      icon: (active) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={active ? "#031636" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: "lawyers",
      label: "Lawyers",
      icon: (active) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={active ? "#031636" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      icon: (active) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={active ? "#031636" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-2 py-2 bg-white border-t border-gray-200 shadow-md z-50">
      {tabs.map((tab) => {
        const active = page === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setPage(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition-all ${
              active ? "text-[#031636]" : "text-gray-400"
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${active ? "bg-yellow-50" : ""}`}>
              {tab.icon(active)}
            </div>
            <span className={`text-[10px] mt-0.5 font-semibold ${active ? "text-[#031636]" : "text-gray-400"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;