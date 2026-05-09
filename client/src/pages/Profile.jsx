import { useState } from "react";
import Navbar from "../components/Navbar";

const Profile = ({ setPage, page }) => {
  const [activeTab, setActiveTab] = useState("activity");

  const activityItems = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Asked AI about Rent Agreement",
      time: "2 hours ago",
      tag: "Property Law",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Generated Rent Agreement Document",
      time: "Yesterday",
      tag: "Document",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Connected with Adv. Rajesh Kumar",
      time: "3 days ago",
      tag: "Family Law",
    },
  ];

  const savedItems = [
    { title: "New Rental Laws 2024", tag: "Property Law" },
    { title: "Digital Personal Data Protection Act", tag: "Cyber Law" },
    { title: "Mutual Consent Divorce Procedure", tag: "Family Law" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf8fc]">

      {/* Header */}
      <Navbar title="LegalEase" showSettings />

      <main className="max-w-md mx-auto w-full pb-24">

        {/* Profile Card */}
        <section className="px-5 pt-6">
          <div className="bg-[#031636] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-[#031636] font-black text-2xl ring-4 ring-yellow-500/30">
                KJ
              </div>
              <div>
                <h2 className="text-lg font-bold">Kshitij Jain</h2>
                <p className="text-gray-300 text-sm">kshitij@example.com</p>
                <span className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full mt-1 inline-block font-medium">
                  Free Plan
                </span>
              </div>
            </div>
            {/* Stats */}
            <div className="flex gap-6 mt-6 pt-5 border-t border-white/10 relative z-10">
              {[
                { num: "12", label: "Questions Asked" },
                { num: "3", label: "Docs Generated" },
                { num: "1", label: "Lawyer Connected" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-bold text-yellow-400">{stat.num}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="px-5 mt-6">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            {["activity", "saved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? "bg-[#031636] text-white shadow-md"
                    : "text-gray-500 hover:text-[#031636]"
                }`}
              >
                {tab === "activity" ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Activity
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Saved
                  </>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <section className="px-5 mt-4 flex flex-col gap-3">
          {activeTab === "activity" ? (
            activityItems.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#031636]">{item.title}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="bg-yellow-50 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-medium">{item.tag}</span>
                    <span className="text-gray-400 text-[10px]">{item.time}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            savedItems.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                <div>
                  <p className="text-sm font-semibold text-[#031636]">{item.title}</p>
                  <span className="bg-yellow-50 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-medium mt-1.5 inline-block">{item.tag}</span>
                </div>
                <button className="text-gray-300 hover:text-red-400 transition-all ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </section>

        {/* Logout */}
        <section className="px-5 mt-6">
          <button className="w-full border-2 border-red-100 text-red-400 py-3.5 rounded-xl font-semibold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </section>

      </main>
    </div>
  );
};

export default Profile;