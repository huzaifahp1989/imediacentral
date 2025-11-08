import { useState } from 'react'

export type TabItem = { key: string; label: string; content: React.ReactNode }

type Props = {
  items: TabItem[]
  defaultKey?: string
}

export default function Tabs({ items, defaultKey }: Props) {
  const firstKey = defaultKey ?? items[0]?.key
  const [active, setActive] = useState(firstKey)
  return (
    <div>
      <div className="tabs" role="tablist">
        {items.map(it => (
          <button
            key={it.key}
            role="tab"
            aria-selected={active === it.key}
            className={`tab ${active === it.key ? 'active' : ''}`}
            onClick={() => setActive(it.key)}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        {items.map(it => (
          <div key={it.key} role="tabpanel" hidden={active !== it.key}>
            {it.content}
          </div>
        ))}
      </div>
    </div>
  )
}
