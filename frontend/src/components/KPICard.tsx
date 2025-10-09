import React from 'react'


export default function KPICard({ title, value, subtitle, icon }: { title: string, value: string, subtitle?: string, icon?: React.ReactNode }) {
  return (
    <div className="glass card-border p-4 flex items-center gap-4">
      {/* <div className="text-accent text-2xl">{icon || <FaGaugeHigh />}</div> */}
      <div>
        <div className="text-sm text-muted">{title}</div>
        <div className="text-3xl font-semibold text-white">{value}</div>
        {subtitle && <div className="text-xs text-muted">{subtitle}</div>}
      </div>
    </div>
  )
}
