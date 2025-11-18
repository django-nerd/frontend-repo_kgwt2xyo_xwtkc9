import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const loc = useLocation()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 bg-slate-950/90 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight">Battle Pass</Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/horizontal" className={`px-3 py-1.5 rounded-lg ${loc.pathname==='/horizontal'?'bg-blue-600/30 border border-blue-500/50':'hover:bg-slate-800/60 border border-transparent'}`}>Horizontal</Link>
            <Link to="/vertical" className={`px-3 py-1.5 rounded-lg ${loc.pathname==='/vertical'?'bg-amber-400/30 border border-amber-400/50':'hover:bg-slate-800/60 border border-transparent'}`}>Vertical</Link>
            <a href="/test" className="px-3 py-1.5 rounded-lg hover:bg-slate-800/60">Backend Test</a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
