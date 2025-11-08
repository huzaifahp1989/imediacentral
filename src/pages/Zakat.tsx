import { useState } from 'react'

export default function Zakat() {
  return (
    <div className="content">
      <div className="card">
        <h2>Zakat Calculator</h2>
        <p>Gold/Silver Nisab with live prices (placeholder). Save/print PDF.</p>
        <FullZakatCalculator />
      </div>
    </div>
  )
}

function FullZakatCalculator() {
  const [values, setValues] = useState({
    cash: '', goldGrams: '', silverGrams: '', investments: '', tradeGoods: '', liabilities: ''
  })
  const toNum = (v: string) => parseFloat(v || '0')
  const totalAssets = toNum(values.cash) + toNum(values.investments) + toNum(values.tradeGoods)
  const goldValueGBP = toNum(values.goldGrams) * 61.5 // placeholder GBP/g
  const silverValueGBP = toNum(values.silverGrams) * 0.78 // placeholder GBP/g
  const net = totalAssets + goldValueGBP + silverValueGBP - toNum(values.liabilities)
  const zakat = +(net * 0.025).toFixed(2)

  const update = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues(v => ({ ...v, [key]: e.target.value }))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
      <div>
        <label>Cash (GBP)</label>
        <input type="number" value={values.cash} onChange={update('cash')} style={inputStyle} />
      </div>
      <div>
        <label>Investments (GBP)</label>
        <input type="number" value={values.investments} onChange={update('investments')} style={inputStyle} />
      </div>
      <div>
        <label>Trade Goods (GBP)</label>
        <input type="number" value={values.tradeGoods} onChange={update('tradeGoods')} style={inputStyle} />
      </div>
      <div>
        <label>Gold (grams)</label>
        <input type="number" value={values.goldGrams} onChange={update('goldGrams')} style={inputStyle} />
      </div>
      <div>
        <label>Silver (grams)</label>
        <input type="number" value={values.silverGrams} onChange={update('silverGrams')} style={inputStyle} />
      </div>
      <div>
        <label>Liabilities (GBP)</label>
        <input type="number" value={values.liabilities} onChange={update('liabilities')} style={inputStyle} />
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <strong>Net Zakatable: </strong>£{isNaN(net) ? 0 : net.toFixed(2)}<br />
        <strong>Zakat (2.5%): </strong>£{isNaN(zakat) ? 0 : zakat}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = { width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb', display: 'block' }
