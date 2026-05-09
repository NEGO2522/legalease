import { useState } from "react";
import Navbar from "../components/Navbar";

const AskAI = ({ setPage, page }) => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! I am your LegalEase AI Assistant. How can I help you with your legal questions today?",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");

  const suggestions = [
    "How to file a consumer complaint?",
    "Tenancy agreement rules",
    "Employment rights",
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input, time: "Just now" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <Navbar />

      {/* Chat Area */}
      <main className="flex-grow overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} gap-2 max-w-[85%] ${msg.role === "user" ? "ml-auto" : ""}`}
          >
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-[#031636] flex items-center justify-center shrink-0">
                <span className="text-white text-sm">AI</span>
              </div>
            )}
            <div
              className={`p-3 rounded-xl ${
                msg.role === "user"
                  ? "bg-[#031636] text-white rounded-tr-none"
                  : "bg-gray-100 text-gray-800 rounded-tl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-[10px] opacity-60 mt-1 block">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </main>

      {/* Suggestions + Input */}
      <div className="px-5 pb-24 pt-2 bg-white">
        {/* Suggestions */}
        <div className="flex gap-2 overflow-x-auto pb-3">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setInput(s)}
              className="bg-yellow-50 text-yellow-800 border border-yellow-200 px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-medium hover:bg-yellow-100"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl p-2 shadow-sm">
          <input
            className="flex-grow bg-transparent border-none outline-none text-sm px-2 text-gray-800 placeholder:text-gray-400"
            placeholder="Ask your legal question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[#031636]">
            🎤
          </button>
          <button
            onClick={handleSend}
            className="w-9 h-9 flex items-center justify-center bg-[#031636] text-white rounded-lg hover:opacity-90"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskAI;
