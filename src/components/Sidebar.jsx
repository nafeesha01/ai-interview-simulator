import { Link, useLocation } from "react-router-dom"
import { FaHome, FaChartBar, FaUserGraduate, FaSignOutAlt } from "react-icons/fa"

function Sidebar() {
  const location = useLocation()

  function logout() {
    localStorage.removeItem("token")
    window.location = "/login"
  }

  const menu = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Interview", path: "/interview", icon: <FaUserGraduate /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-[260px] bg-[#0D0D14] border-r border-white/5 flex flex-col px-5 py-8">

      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" />
            <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-white tracking-wide">InterviewAI</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {menu.map((item, index) => {
          const active = location.pathname === item.path
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                active
                  ? "bg-indigo-500/15 text-indigo-400 font-medium"
                  : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <span className={`text-base ${active ? "text-indigo-400" : "text-gray-600"}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 mt-auto"
      >
        <FaSignOutAlt className="text-base" />
        Sign out
      </button>
    </div>
  )
}

export default Sidebar
