'use client'
import { useState } from 'react'

export default function TabPills({ tabs, activeIndex = 0 }) {
  const [active, setActive] = useState(activeIndex)
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`tab-pill${active === i ? ' active' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
