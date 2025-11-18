import React from 'react'
import { Sparkles, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function GrandReward({ onClaim, onPreview, state = 'locked' }) {
  const isUnlocked = state === 'unlocked'
  const isClaimed = state === 'claimed'
  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className="relative rounded-3xl p-5 md:p-8 bg-gradient-to-br from-blue-900/60 via-slate-900/60 to-slate-900/60 border border-blue-400/30 shadow-[0_0_50px_rgba(29,78,216,0.35)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-24 bg-[conic-gradient(from_0deg,rgba(59,130,246,0.06),rgba(251,191,36,0.08),rgba(59,130,246,0.06))] animate-spin-slow rounded-full" />
        <div className="absolute inset-0 ring-1 ring-amber-400/20 rounded-3xl" />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 relative">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 text-amber-200 uppercase tracking-widest text-xs mb-2">
            <Crown className="w-4 h-4"/>
            Level 100 Grand Reward
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Mythic Ascendant Skin</h3>
          <p className="text-blue-200/80 mb-4">A prestige-tier reward with animated emissives, dynamic highlights, and exclusive banner.</p>
          <div className="flex items-center gap-3">
            <button
              onClick={onPreview}
              className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-blue-100 border border-slate-600/50"
            >Preview</button>
            <button
              onClick={onClaim}
              disabled={!isUnlocked}
              className={`px-4 py-2 rounded-xl font-semibold inline-flex items-center gap-2 transition ${isUnlocked ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-[0_0_20px_rgba(245,197,24,0.45)]' : 'bg-slate-800/60 text-blue-200/60 border border-slate-600/50 cursor-not-allowed'}`}
            >
              <Sparkles className="w-4 h-4"/>
              Claim Grand Reward
            </button>
          </div>
        </div>
        <div className="w-full md:w-[420px] aspect-video rounded-2xl bg-slate-900/60 border border-amber-400/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.25),transparent_40%)]" />
          <div className="absolute inset-0 grid place-items-center text-amber-200 text-lg font-semibold">Grand Reward Preview</div>
        </div>
      </div>
    </motion.div>
  )
}
