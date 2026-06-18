import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
              <path d="M4.5 7l1.8 1.8L9.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">InterviewAI</span>
        </div>

        <button
          onClick={logout}
          className="text-xs text-gray-500 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg transition-colors duration-150"
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}

export default Navbar
