import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError(""); // Clear any previous errors
    // You can now call your API here
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06071f] px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#101122] p-8 shadow-xl border border-[#262739] transition-all duration-300">
        <div className="flex flex-col items-center text-white mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1a37] to-[#30306d] flex items-center justify-center mb-4 border border-[#3c3c42] shadow-[0_0_10px_#1e1e33]">
            <span className="text-2xl font-semibold">✎</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-wide">
            Welcome to NOTO
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Craft Celestial Notes. Daily. Mindfully.
          </p>
        </div>

        {/* Form Starts */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full px-4 py-2 rounded-md bg-[#181828] border border-[#2f2f40] text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Enter your password..."
              className="w-full px-4 py-2 rounded-md bg-[#181828] border border-[#2f2f40] text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#2e3b8c] to-[#1a1e52] hover:from-[#3b49a0] hover:to-[#2c2f6c] text-white py-2 rounded-md text-sm font-medium mb-4 transition-all border border-[#3e4aa0] cursor-pointer shadow-md hover:shadow-lg hover:shadow-blue-500/20"
          >
            Login &rarr;
          </button>
        </form>

        <p className="text-gray-400 text-sm mb-4 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>

        <div className="flex items-center justify-center text-gray-500 text-xs mb-4">
          <span className="w-full border-t border-[#2e2e33] mr-2" />
          OR
          <span className="w-full border-t border-[#2e2e33] ml-2" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-[#181828] hover:bg-[#222232] text-white py-2 rounded-md text-sm border border-[#2e2e3e] transition-all duration-200 cursor-pointer">
          <FcGoogle className="text-lg" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
