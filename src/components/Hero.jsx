function Hero() {
  return (
    <div className="max-w-6xl mx-auto px-8 pt-24 pb-16 flex flex-col items-center text-center">

      <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        AI-powered mock interviews
      </div>

      <h1 className="text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl">
        Practise until the
        <br />
        <span className="text-indigo-400">real thing feels easy</span>
      </h1>

      <p className="max-w-xl text-gray-400 mt-6 text-base leading-relaxed">
        Role-specific questions, voice input, and instant AI feedback — so you walk into every interview knowing exactly what to expect.
      </p>
    </div>
  )
}

export default Hero
