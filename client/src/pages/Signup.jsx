import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8fc] flex flex-col justify-center px-5">
      <div className="max-w-md mx-auto w-full">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <h1 className="text-2xl font-bold text-[#031636]">LegalEase</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <h2 className="text-xl font-bold text-[#031636] mb-1">Create account</h2>
          <p className="text-gray-400 text-sm mb-6">Join LegalEase for free</p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Full Name</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#031636] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="text"
                placeholder="Kshitij Jain"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 text-sm outline-none text-gray-800 placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Email Address</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#031636] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                placeholder="kshitij@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-sm outline-none text-gray-800 placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Password</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#031636] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                className="flex-1 text-sm outline-none text-gray-800 placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-[#031636] text-white py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Create Account"
            )}
          </button>

        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#031636] font-bold hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Signup;