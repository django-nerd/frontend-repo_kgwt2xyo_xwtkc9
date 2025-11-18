import React from 'react'
import { Check, Lock, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function RewardCard({
  level,
  track = 'free', // 'free' | 'premium'
  name,
  rarity = 'rare', // common, rare, epic, legendary
  state = 'locked', // locked | unlocked | claimed
  onClaim,
  onPreview
}) {
  const palette = {
    free: {
      border: 'border-blue-400/40',
      bg: 'from-blue-900/40 to-slate-900/30',
      badge: 'bg-blue-500/20 text-blue-200 border border-blue-400/40'
    },
    premium: {
      border: 'border-amber-400/40',
      bg: 'from-amber-900/30 to-slate-900/30',
      badge: 'bg-amber-500/20 text-amber-200 border border-amber-400/40'
    }
  }

  const rarityRing = {
    common: 'ring-1 ring-slate-500/40',
    rare: 'ring-1 ring-blue-400/40',
    epic: 'ring-2 ring-violet-400/40',
    legendary: 'ring-2 ring-amber-400/60'
  }[rarity]

  const isLocked = state === 'locked'
  const isClaimed = state === 'claimed'
  const isUnlocked = state === 'unlocked'

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative w-[180px] md:w-[220px] rounded-2xl p-3 md:p-4 bg-gradient-to-br ${palette[track].bg} border ${palette[track].border} ${rarityRing} shadow-[0_0_20px_rgba(15,23,42,0.7)]`}
    >
      {/* Track badge */}
      <div className={`absolute -top-2 left-4 px-2 py-0.5 text-[10px] rounded-md ${palette[track].badge} uppercase tracking-wider`}>{track === 'free' ? 'Free' : 'Premium'}{track==='premium' && <Crown className="inline ml-1 w-3 h-3" />}</div>
      {/* State overlays */}
      {isLocked && (
        <div className="absolute inset-0 rounded-2xl bg-slate-950/60 backdrop-blur-[1px] grid place-items-center">
          <div className="flex items-center gap-2 text-blue-200/80 text-sm"><Lock className="w-4 h-4"/> Locked</div>
        </div>
      )}
      {isClaimed && (
        <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 border-2 border-emerald-400/30 grid place-items-center">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold"><Check className="w-5 h-5"/> Claimed</div>
        </div>
      )}

      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-blue-200/70 text-xs">Level</div>
          <div className="text-white font-semibold text-lg">{level}</div>
        </div>
        <div className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
          rarity === 'legendary' ? 'bg-amber-400/20 text-amber-200' : rarity === 'epic' ? 'bg-violet-400/20 text-violet-200' : rarity === 'rare' ? 'bg-blue-400/20 text-blue-200' : 'bg-slate-400/20 text-slate-200'
        }`}>{rarity}</div>
      </div>

      {/* Reward art placeholder */}
      <div className="aspect-video rounded-xl bg-slate-900/60 border border-slate-700/60 mb-3 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(251,191,36,0.15),transparent_40%)]" />
        <div className="absolute inset-0 grid place-items-center text-blue-100/80 text-sm px-3 text-center">
          {name}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onPreview}
          className="px-3 py-1.5 rounded-lg text-xs bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/50 text-blue-100 transition"
        >Preview</button>
        <button
          onClick={onClaim}
          disabled={!isUnlocked}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${isUnlocked ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-[0_0_14px_rgba(245,197,24,0.35)]' : 'bg-slate-800/60 text-blue-200/60 border border-slate-600/50 cursor-not-allowed'}`}
        >Claim</button>
      </div>
    </motion.div>
  )
}
