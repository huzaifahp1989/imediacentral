import { useState } from 'react'

// Quick widget for Home page: simple Zakat estimate.
// Note: Uses placeholder market rates. For detailed assets and live nisab, see the full calculator.

export default function QuickZakatCalculator() {
  const [values, setValues] = useState({ cash: '', goldGrams: '', liabilities: '' })
  const toNum = (v: string) => parseFloat(v || '0')

  // Placeholder GBP/gram rates; can be replaced with live prices later.
  const GOLD_RATE_GBP_PER_GRAM = 61.5

  const cash = toNum(values.cash)
  const goldGBP = toNum(values.goldGrams) * GOLD_RATE_GBP_PER_GRAM
  const liabilities = toNum(values.liabilities)

  const net = cash + goldGBP - liabilities
  const zakat = +(net * 0.025).toFixed(2)

  const update = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues(v => ({ ...v, [key]: e.target.value }))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
      <div>
        <label>Cash (GBP)</label>
        <input type="number" value={values.cash} onChange={update('cash')} style={inputStyle} />
      </div>
      <div>
        <label>Gold (grams)</label>
        <input type="number" value={values.goldGrams} onChange={update('goldGrams')} style={inputStyle} />
        <small style={{ color: '#6b7280' }}>@ £{GOLD_RATE_GBP_PER_GRAM}/g</small>
      </div>
      <div>
        <label>Liabilities (GBP)</label>
        <input type="number" value={values.liabilities} onChange={update('liabilities')} style={inputStyle} />
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <strong>Net Zakatable:</strong> £{isNaN(net) ? 0 : net.toFixed(2)}<br />
        <strong>Zakat (2.5%):</strong> £{isNaN(zakat) ? 0 : zakat}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = { width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb', display: 'block' }

