import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import RoleCard from "../components/RoleCard"
import ResumeUpload from "../components/ResumeUpload"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Home() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState("")
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const roles = [
    { title: "Software Developer", description: "React · Node · DSA", category: "Tech" },
    { title: "Frontend Developer", description: "HTML · CSS · React", category: "Tech" },
    { title: "Backend Developer", description: "Node · APIs · Databases", category: "Tech" },
    { title: "Full Stack Developer", description: "Frontend · Backend · DevOps", category: "Tech" },
    { title: "Data Scientist", description: "ML · AI · Statistics", category: "Tech" },
    { title: "Mechanical Engineer", description: "Core · Technical · Design", category: "Engineering" },
    { title: "Civil Engineer", description: "Structures · Materials", category: "Engineering" },
    { title: "Chemical Engineer", description: "Processes · Industry", category: "Engineering" },
    { title: "Doctor", description: "Clinical · Medical", category: "Medical" },
    { title: "Lawyer", description: "Legal · Case analysis", category: "Business" },
  ]

  const categories = ["All", "Tech", "Engineering", "Medical", "Business"]

  const filteredRoles = roles.filter((role) => {
    const searchMatch = role.title.toLowerCase().includes(search.toLowerCase())
    const categoryMatch = selectedCategory === "All" || role.category === selectedCategory
    return searchMatch && categoryMatch
  })

  function startInterview() {
    if (!selectedRole) {
      toast.error("Select a role to continue")
      return
    }
    navigate("/interview", { state: { role: selectedRole } })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] pb-24">
      <Navbar />
      <Hero />

      <div className="max-w-6xl mx-auto px-8">

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#111118] border border-white/5 rounded-lg text-white placeholder-gray-600 outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-150 ${
                  selectedCategory === cat
                    ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                    : "bg-[#111118] border border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/15"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Role grid */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3 mb-10">
          {filteredRoles.map((role, i) => (
            <RoleCard
              key={i}
              title={role.title}
              description={role.description}
              selected={selectedRole === role.title}
              onClick={() => setSelectedRole(role.title)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            onClick={startInterview}
            disabled={!selectedRole}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
              selectedRole
                ? "bg-indigo-500 hover:bg-indigo-400 text-white"
                : "bg-[#111118] text-gray-600 border border-white/5 cursor-not-allowed"
            }`}
          >
            {selectedRole ? `Start interview — ${selectedRole}` : "Select a role to continue"}
            {selectedRole && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        <ResumeUpload />
      </div>
    </div>
  )
}

export default Home
