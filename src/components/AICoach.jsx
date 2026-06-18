function AICoach({ averageScore = 0, latestScore = 0 }) {

  function getStrength() {
    if (averageScore >= 85) return "Strong communication and technical depth"
    if (averageScore >= 70) return "Good structure and clarity in answers"
    return "Consistent effort showing through"
  }

  function getWeakness() {
    if (latestScore < 50) return "Technical explanations need more depth"
    if (latestScore < 75) return "Build confidence with concrete examples"
    return "Minor polish needed — keep it up"
  }

  function getSuggestions() {
    if (latestScore < 50) return ["Review DSA fundamentals", "Practise React core concepts", "Try a timed mock interview"]
    if (latestScore < 75) return ["Improve project storytelling", "Anchor answers with real examples", "Work on HR question fluency"]
    return ["Tackle advanced system design", "Improve answer speed", "Maintain your consistency"]
  }

  const scoreColor =
    averageScore >= 75 ? "text-emerald-400" :
    averageScore >= 50 ? "text-amber-400" :
    "text-red-400"

  const arcRadius = 36
  const circumference = 2 * Math.PI * arcRadius
  const dashOffset = circumference - (averageScore / 100) * circumference

  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl p-5">

      {/* Header */}
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-5">AI Coach</p>

      {/* Score ring */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
            <circle cx="44" cy="44" r={arcRadius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle
              cx="44" cy="44" r={arcRadius}
              fill="none"
              stroke="#6366F1"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.8s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-xl font-semibold ${scoreColor}`}>{averageScore}</span>
            <span className="text-[10px] text-gray-600 mt-0.5">avg</span>
          </div>
        </div>
      </div>

      {/* Strength */}
      <div className="mb-3">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1.5">Strength</p>
        <p className="text-sm text-gray-300">{getStrength()}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 my-4" />

      {/* Focus */}
      <div className="mb-3">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1.5">Focus area</p>
        <p className="text-sm text-gray-300">{getWeakness()}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 my-4" />

      {/* Suggestions */}
      <div>
        <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Suggested practice</p>
        <div className="flex flex-col gap-2">
          {getSuggestions().map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
              <p className="text-sm text-gray-400">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AICoach
