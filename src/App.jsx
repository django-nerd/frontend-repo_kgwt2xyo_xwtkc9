import React from 'react'
import { Link } from 'react-router-dom'
import { Crown, ScrollText, Rows3, PanelsTopLeft } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(251,191,36,0.08),transparent_40%)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Battle Pass UI Showcase</h1>
          <p className="text-blue-200/80 mt-3">Clean gaming UI with blue-gold palette, soft neon accents, and rounded cards.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-slate-900/60 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-3">
              <PanelsTopLeft className="w-5 h-5 text-blue-300" />
              <h2 className="text-xl font-semibold">Horizontal Scroll Battle Pass</h2>
            </div>
            <p className="text-blue-200/80 mb-4">Levels arranged left to right with sticky XP bar, arrow controls, and drag indicator.</p>
            <Link to="/horizontal" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-[0_0_18px_rgba(59,130,246,0.35)]">
              <ScrollText className="w-4 h-4"/> Open Horizontal Version
            </Link>
          </div>
          <div className="rounded-2xl p-6 bg-slate-900/60 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Rows3 className="w-5 h-5 text-amber-300" />
              <h2 className="text-xl font-semibold">Vertical Scroll Battle Pass</h2>
            </div>
            <p className="text-blue-200/80 mb-4">Levels stacked top to bottom with a premium Level 100 highlight section at the end.</p>
            <Link to="/vertical" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold shadow-[0_0_18px_rgba(245,197,24,0.45)]">
              <Crown className="w-4 h-4"/> Open Vertical Version
            </Link>
          </div>
        </div>

        <div className="mt-10 text-center text-blue-200/70 text-sm">
          Desktop-first design. On mobile, rows stack and the XP bar remains sticky.
        </div>
      </div>
    </div>
  )
}
