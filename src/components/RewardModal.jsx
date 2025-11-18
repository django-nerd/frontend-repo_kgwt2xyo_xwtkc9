import React from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RewardModal({ open, onClose, reward }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[95vw] max-w-3xl rounded-2xl bg-slate-900 border border-blue-500/30 p-4 md:p-6 relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/80 border border-slate-700/70 text-blue-200 hover:bg-slate-700/80">
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 rounded-xl border border-slate-700/60 bg-slate-950/60 aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.25),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(251,191,36,0.25),transparent_45%)]" />
                <div className="absolute inset-0 grid place-items-center text-blue-100/90">{reward?.name ?? 'Reward Preview'}</div>
              </div>
              <div className="md:w-[260px]">
                <div className="text-xs uppercase tracking-wider text-blue-200/70">Level {reward?.level}</div>
                <h3 className="text-white text-xl font-bold mb-2">{reward?.name}</h3>
                <p className="text-blue-200/80 text-sm mb-4">{reward?.description ?? 'Preview the reward in full detail. Animations and 3D models could appear here.'}</p>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-blue-100 border border-slate-600/50">Equip</button>
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold">Claim</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
