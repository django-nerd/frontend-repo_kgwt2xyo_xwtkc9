import React, { useMemo, useState } from 'react'
import XPBar from './XPBar'
import RewardCard from './RewardCard'
import RewardModal from './RewardModal'
import GrandReward from './GrandReward'
import { Crown } from 'lucide-react'

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

export default function VerticalBattlePass() {
  const data = useMemo(generateRewards, [])
  const [xp, setXp] = useState({ level: 27, current: 4200, next: 5000 })
  const [premium, setPremium] = useState(true)
  const [modal, setModal] = useState({ open: false, reward: null })

  const claimableCount = 9

  const openPreview = (reward) => setModal({ open: true, reward })

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
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700 text-sm text-blue-200/90">Pass Type: <span className="font-semibold text-blue-100">{premium ? 'Premium' : 'Free'}</span></div>
            {!premium && (
              <button onClick={()=>setPremium(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold">
                <Crown className="w-4 h-4"/> Upgrade to Premium
              </button>
            )}
          </div>
          <div className="text-blue-200/80 text-sm">Vertical Battle Pass</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="space-y-3">
          {data.map(item => (
            <div key={'row-'+item.level} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
              <RewardCard
                level={item.level}
                track="free"
                name={item.free.name}
                rarity={item.free.rarity}
                state={item.level <= xp.level ? (item.level % 4 === 0 ? 'claimed' : 'unlocked') : 'locked'}
                onPreview={() => openPreview({ ...item.free, level: item.level })}
                onClaim={() => alert('Claim level '+item.level+ ' free')}
              />
              <RewardCard
                level={item.level}
                track="premium"
                name={item.premium.name}
                rarity={item.premium.rarity}
                state={!premium ? 'locked' : item.level <= xp.level ? (item.level % 6 === 0 ? 'claimed' : 'unlocked') : 'locked'}
                onPreview={() => openPreview({ ...item.premium, level: item.level })}
                onClaim={() => alert('Claim level '+item.level+ ' premium')}
              />
              <div className="hidden md:flex items-center justify-center">
                <div className="text-blue-200/70 text-sm">Level {item.level}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Level 100 Grand Reward Highlight at bottom */}
        <div className="mt-12">
          <GrandReward
            onPreview={() => openPreview({ level: 100, name: 'Mythic Ascendant Skin' })}
            onClaim={() => alert('Claim Grand Reward')}
            state={xp.level >= 100 ? 'unlocked' : 'locked'}
          />
        </div>
      </div>

      <RewardModal open={modal.open} reward={modal.reward} onClose={()=>setModal({ open:false, reward:null })} />
    </div>
  )
}
