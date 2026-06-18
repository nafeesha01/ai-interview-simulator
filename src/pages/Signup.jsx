import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async () => {
    setError("")
    setLoading(true)
    try {
      await API.post("/users/signup", { name, email, password })
      navigate("/")
    } catch (err) {
      console.log(err)
      setError("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSignup()
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" />
              <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">InterviewAI</span>
        </div>

        <div className="bg-[#111118] border border-white/5 rounded-2xl p-8">
          <h1 className="text-lg font-semibold text-white mb-1">Create account</h1>
          <p className="text-sm text-gray-500 mb-7">Start practising today</p>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Your name"
                className="w-full px-3.5 py-2.5 text-sm bg-[#0A0A0F] border border-white/5 rounded-lg text-white placeholder-gray-700 outline-none focus:border-indigo-500/40 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 text-sm bg-[#0A0A0F] border border-white/5 rounded-lg text-white placeholder-gray-700 outline-none focus:border-indigo-500/40 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm bg-[#0A0A0F] border border-white/5 rounded-lg text-white placeholder-gray-700 outline-none focus:border-indigo-500/40 transition-colors"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 mt-3">{error}</p>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full mt-6 py-2.5 rounded-lg text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white transition-colors duration-150"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="text-center text-xs text-gray-600 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-indigo-400 cursor-pointer hover:text-indigo-300"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
