import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import RewardCard from './RewardCard'
import XPBar from './XPBar'
import RewardModal from './RewardModal'
import { ArrowLeft, ArrowRight, Crown } from 'lucide-react'

function generateRewards() {
  const rarities = ['common','rare','epic','legendary']
  const rewards = []
  for (let i=1;i<=100;i++) {
    const rarity = i===100 ? 'legendary' : rarities[(i%10===0)?3:(i%3)]
    rewards.push({
      level: i,
      free: { name: `Free Reward ${i}`, rarity },
      premium: { name: `Premium Reward ${i}`, rarity },
    })
  }
  return rewards
}

export default function HorizontalBattlePass() {
  const data = useMemo(generateRewards, [])
  const [xp, setXp] = useState({ level: 27, current: 4200, next: 5000 })
  const [premium, setPremium] = useState(false)
  const [modal, setModal] = useState({ open: false, reward: null })

  const claimableCount = 12

  const scrollContainerId = 'bp-horizontal-scroll'

  const openPreview = (reward) => setModal({ open: true, reward })

  const scrollBy = (dir) => {
    const el = document.getElementById(scrollContainerId)
    if (!el) return
    el.scrollBy({ left: dir * 600, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <XPBar
        currentLevel={xp.level}
        currentXP={xp.current}
        nextLevelXP={xp.next}
        onClaimAll={() => alert('Claim all clicked')}
        claimableCount={claimableCount}
      />

      {/* User panel */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700 text-sm text-blue-200/90">Pass Type: <span className="font-semibold text-blue-100">{premium ? 'Premium' : 'Free'}</span></div>
            {!premium && (
              <button onClick={()=>setPremium(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold">
                <Crown className="w-4 h-4"/> Upgrade to Premium
              </button>
            )}
          </div>
          <div className="text-blue-200/80 text-sm">Horizontal Battle Pass</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Scroll controls */}
        <div className="relative">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-20">
            <button onClick={()=>scrollBy(-1)} className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/70 hover:bg-slate-800/80"><ArrowLeft className="w-5 h-5"/></button>
          </div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20">
            <button onClick={()=>scrollBy(1)} className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/70 hover:bg-slate-800/80"><ArrowRight className="w-5 h-5"/></button>
          </div>

          <div id={scrollContainerId} className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700/60 scrollbar-track-transparent">
            <div className="min-w-max">
              {/* Headers for tracks */}
              <div className="grid grid-cols-[repeat(100,220px)] gap-4 px-10">
                {Array.from({length:100}).map((_,i)=> (
                  <div key={'h-head-'+i} className="col-span-1 text-center text-blue-200/70 text-xs">Level {i+1}</div>
                ))}
              </div>
              {/* Free + Premium Rows */}
              <div className="space-y-3 mt-2">
                {/* Free row */}
                <div className="grid grid-cols-[repeat(100,220px)] gap-4 px-10">
                  {data.map(item => (
                    <RewardCard
                      key={'free-'+item.level}
                      level={item.level}
                      track="free"
                      name={item.free.name}
                      rarity={item.free.rarity}
                      state={item.level <= xp.level ? (item.level % 5 === 0 ? 'claimed' : 'unlocked') : 'locked'}
                      onPreview={() => openPreview({ ...item.free, level: item.level })}
                      onClaim={() => alert('Claim level '+item.level+ ' free')}
                    />
                  ))}
                </div>
                {/* Premium row */}
                <div className="grid grid-cols-[repeat(100,220px)] gap-4 px-10">
                  {data.map(item => (
                    <RewardCard
                      key={'prem-'+item.level}
                      level={item.level}
                      track="premium"
                      name={item.premium.name}
                      rarity={item.premium.rarity}
                      state={!premium ? 'locked' : item.level <= xp.level ? (item.level % 7 === 0 ? 'claimed' : 'unlocked') : 'locked'}
                      onPreview={() => openPreview({ ...item.premium, level: item.level })}
                      onClaim={() => alert('Claim level '+item.level+ ' premium')}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drag indicator */}
          <div className="mt-3 text-center text-blue-200/60 text-sm">Drag or use arrows to scroll</div>
        </div>
      </div>

      {/* Level 100 Grand Reward */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="mb-4 text-blue-200/80 uppercase tracking-wider text-sm">Grand Reward</div>
        {/* Reuse grand reward with premium highlight visuals inline? In horizontal version we can show below. */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-amber-500/10 to-blue-500/10 border border-amber-400/30">
          <div className="text-amber-200 font-semibold mb-2">Level 100 Highlight</div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video rounded-2xl bg-slate-900/60 border border-amber-400/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.25),transparent_40%)]" />
              <div className="absolute inset-0 grid place-items-center text-amber-200 text-lg font-semibold">Mythic Ascendant Skin</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-blue-200/80">A prestige-tier reward with animated emissives and glow. Unlock at level 100.</div>
              <div className="mt-3 flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-blue-100 border border-slate-600/50">Preview</button>
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold">Claim</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RewardModal open={modal.open} reward={modal.reward} onClose={()=>setModal({ open:false, reward:null })} />
    </div>
  )
}
