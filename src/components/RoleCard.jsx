import { motion } from "framer-motion"

function RoleCard({ title, description, selected, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className={`cursor-pointer rounded-xl p-5 border transition-all duration-150 ${
        selected
          ? "bg-indigo-500/15 border-indigo-500/50 shadow-[0_0_0_1px_rgba(99,102,241,0.3)]"
          : "bg-[#111118] border-white/5 hover:border-white/15"
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 text-sm ${
        selected ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-gray-500"
      }`}>
        {title.charAt(0)}
      </div>

      <h2 className={`text-sm font-semibold leading-snug ${selected ? "text-white" : "text-gray-200"}`}>
        {title}
      </h2>
      <p className={`text-xs mt-1.5 ${selected ? "text-indigo-300/70" : "text-gray-600"}`}>
        {description}
      </p>

      {selected && (
        <div className="mt-3 flex items-center gap-1 text-indigo-400 text-xs font-medium">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 5l1.5 1.5L7 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Selected
        </div>
      )}
    </motion.div>
  )
}

export default RoleCard
