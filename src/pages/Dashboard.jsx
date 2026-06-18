import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import AICoach from "../components/AICoach"
import API from "../services/api"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{label}</p>
      <p className="text-3xl font-semibold text-white">{value}</p>
      {sub && <p className="text-xs text-gray-600 mt-2">{sub}</p>}
    </div>
  )
}

function Dashboard() {
  const [interviews, setInterviews] = useState([])
  const [stats, setStats] = useState({ total: 0, average: 0, latest: 0, streak: 0 })

  useEffect(() => { loadData() }, [])

  async function loadData() {
    try {
      const response = await API.get("/interviews/history")
      const data = response.data
      setInterviews(data)

      const total = data.length
      const average = total > 0
        ? Math.round(data.reduce((sum, item) => sum + (item.overallScore || 0), 0) / total)
        : 0
      const latest = total > 0 ? data[data.length - 1].overallScore || 0 : 0

      let streak = 0
      for (let i = data.length - 1; i >= 0; i--) {
        if ((data[i].overallScore || 0) >= 70) streak++
        else break
      }

      setStats({ total, average, latest, streak })
    } catch (error) {
      console.log(error)
    }
  }

  function getLevel() {
    if (stats.average >= 90) return { label: "Expert", color: "text-emerald-400 bg-emerald-400/10" }
    if (stats.average >= 75) return { label: "Advanced", color: "text-indigo-400 bg-indigo-400/10" }
    if (stats.average >= 50) return { label: "Intermediate", color: "text-amber-400 bg-amber-400/10" }
    return { label: "Beginner", color: "text-gray-400 bg-gray-400/10" }
  }

  const level = getLevel()

  const chartData = {
    labels: interviews.map((_, i) => `#${i + 1}`),
    datasets: [
      {
        label: "Score",
        data: interviews.map((item) => item.overallScore || 0),
        borderColor: "#6366F1",
        backgroundColor: "rgba(99,102,241,0.08)",
        borderWidth: 2,
        pointBackgroundColor: "#6366F1",
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1C1C28",
        titleColor: "#9CA3AF",
        bodyColor: "#F1F5F9",
        borderColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: { color: "#4B5563", font: { size: 11 } },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: { color: "#4B5563", font: { size: 11 } },
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Sidebar />

      <div className="ml-[260px] flex gap-6 p-8">
        {/* Main column */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Track your interview performance</p>
            </div>
            <div className="flex items-center gap-3">
              {stats.streak > 0 && (
                <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span>🔥</span>
                  {stats.streak} day streak
                </div>
              )}
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${level.color}`}>
                {level.label}
              </span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatCard label="Total Interviews" value={stats.total} sub="All time" />
            <StatCard label="Average Score" value={stats.average} sub="Across all sessions" />
            <StatCard label="Latest Score" value={stats.latest} sub="Most recent session" />
          </div>

          {/* Chart */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 mb-6">
            <p className="text-sm font-medium text-gray-300 mb-6">Score over time</p>
            {interviews.length > 0
              ? <Line data={chartData} options={chartOptions} />
              : <p className="text-sm text-gray-600 py-10 text-center">Complete your first interview to see your trend</p>
            }
          </div>

          {/* Recent interviews */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
            <p className="text-sm font-medium text-gray-300 mb-5">Recent sessions</p>
            {interviews.length === 0 ? (
              <p className="text-sm text-gray-600 py-4 text-center">No interviews yet</p>
            ) : (
              <div className="divide-y divide-white/5">
                {interviews.slice().reverse().slice(0, 6).map((interview, index) => (
                  <div key={index} className="flex items-center justify-between py-3.5">
                    <div>
                      <p className="text-sm text-white font-medium">{interview.role}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {interview.createdAt
                          ? new Date(interview.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                          : "—"}
                      </p>
                    </div>
                    <div className={`text-sm font-semibold tabular-nums ${
                      interview.overallScore >= 75 ? "text-emerald-400"
                      : interview.overallScore >= 50 ? "text-amber-400"
                      : "text-red-400"
                    }`}>
                      {interview.overallScore ?? "—"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Coach sidebar */}
        <div className="w-[260px] shrink-0 sticky top-8 self-start">
          <AICoach averageScore={stats.average} latestScore={stats.latest} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
