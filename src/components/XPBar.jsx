import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Zap } from 'lucide-react'

function ProgressBar({ value, max, color = 'from-blue-500 to-cyan-400' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700">
      <div
        className={`h-full bg-gradient-to-r ${color} relative`}
        style={{ width: pct + '%' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] animate-pulse" />
      </div>
    </div>
  )
}

export default function XPBar({ currentLevel, currentXP, nextLevelXP, onClaimAll, claimableCount }) {
  const pctLevel = Math.min(100, Math.max(0, (currentXP / nextLevelXP) * 100))
  return (
    <motion.div
      className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 bg-slate-900/90 border-b border-blue-500/20"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600/30 to-blue-400/10 border border-blue-500/30 text-blue-200">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-blue-200/80 text-xs uppercase tracking-wider">Current Level</div>
              <div className="text-white text-2xl font-bold">{currentLevel}</div>
            </div>
            <div className="hidden md:flex flex-col gap-2 min-w-[300px]">
              <div className="flex items-center justify-between text-xs text-blue-200/80">
                <span className="inline-flex items-center gap-1"><Star className="w-3.5 h-3.5" /> XP</span>
                <span>{currentXP} / {nextLevelXP}</span>
              </div>
              <ProgressBar value={currentXP} max={nextLevelXP} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-blue-200/80 text-sm hidden sm:block">Claimable: <span className="text-blue-100 font-semibold">{claimableCount}</span></div>
            <button
              onClick={onClaimAll}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold shadow-[0_0_20px_rgba(245,197,24,0.35)] hover:shadow-[0_0_30px_rgba(245,197,24,0.55)] transition"
            >
              <Zap className="w-4 h-4" />
              Claim All Available Rewards
            </button>
          </div>
        </div>
        <div className="mt-3 md:hidden">
          <ProgressBar value={currentXP} max={nextLevelXP} />
        </div>
      </div>
    </motion.div>
  )
}
