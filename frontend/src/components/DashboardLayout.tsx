import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)
  return (
    <div className="min-h-screen flex bg-gray-900">
      <aside className={`bg-gray-800 border-r border-gray-700 ${open ? 'w-64' : 'w-16'} transition-all`}> 
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <button className="p-2 hover:text-blue-400" onClick={() => setOpen(!open)} aria-label="Toggle sidebar">
            ☰
          </button>
          {open && <span className="font-semibold text-white">LLM Security</span>}
        </div>
        <nav className="p-2 space-y-1 text-sm">
          <NavItem to="/" icon="🛡️" label="Overview" open={open} />
          <NavItem to="/findings" icon="🔍" label="Findings" open={open} />
          <NavItem to="/attack-demo" icon="🚨" label="Attack Demo" open={open} />
          <NavItem to="/policies" icon="⚙️" label="Policies" open={open} />
          <NavItem to="/evidence" icon="📡" label="Evidence" open={open} />
          <NavItem to="/reports" icon="📋" label="Reports" open={open} />
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}

function NavItem({ to, icon, label, open }: { to: string, icon: string, label: string, open: boolean }) {
  return (
    <Link to={to} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 text-gray-300 hover:text-white">
      <span className="text-lg">{icon}</span>
      {open && <span>{label}</span>}
    </Link>
  )
}