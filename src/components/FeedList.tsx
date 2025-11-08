import { useEffect, useState } from 'react'

type Item = { title: string; link: string; summary?: string; date?: string }

function parseRSS(xmlText: string): Item[] {
  try {
    const doc = new DOMParser().parseFromString(xmlText, 'text/xml')
    const items: Item[] = []
    const rssItems = Array.from(doc.getElementsByTagName('item'))
    if (rssItems.length) {
      for (const it of rssItems) {
        const title = it.getElementsByTagName('title')[0]?.textContent || 'Untitled'
        const link = it.getElementsByTagName('link')[0]?.textContent || '#'
        const description = it.getElementsByTagName('description')[0]?.textContent || ''
        const pubDate = it.getElementsByTagName('pubDate')[0]?.textContent || undefined
        items.push({ title, link, summary: stripHTML(description).slice(0, 180), date: pubDate || undefined })
      }
      return items
    }
    // Atom fallback
    const entries = Array.from(doc.getElementsByTagName('entry'))
    for (const it of entries) {
      const title = it.getElementsByTagName('title')[0]?.textContent || 'Untitled'
      const linkEl = it.getElementsByTagName('link')[0]
      const link = linkEl?.getAttribute('href') || '#'
      const summary = it.getElementsByTagName('summary')[0]?.textContent || it.getElementsByTagName('content')[0]?.textContent || ''
      const updated = it.getElementsByTagName('updated')[0]?.textContent || undefined
      items.push({ title, link, summary: stripHTML(summary).slice(0, 180), date: updated })
    }
    return items
  } catch {
    return []
  }
}

function stripHTML(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

async function fetchWithCorsFallback(url: string): Promise<{ type: 'json' | 'text'; data: any }> {
  // If same-origin path, fetch directly (used with Vite dev proxy).
  if (url.startsWith('/')) {
    const res = await fetch(url)
    const ct = res.headers.get('content-type') || ''
    if (ct.includes('application/json')) {
      return { type: 'json', data: await res.json() }
    }
    return { type: 'text', data: await res.text() }
  }

  // Otherwise, use CORS-friendly proxies.
  // 1) corsproxy.io
  try {
    const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`)
    if (res.ok) {
      return { type: 'text', data: await res.text() }
    }
  } catch {}
  // 2) AllOrigins
  try {
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    if (res.ok) {
      const json = await res.json()
      return { type: 'text', data: json?.contents || '' }
    }
  } catch {}
  // 3) r.jina.ai reader (returns raw text of the URL)
  // Use the "http/" path segment with the original scheme to support https sources.
  try {
    const jinaUrl = `https://r.jina.ai/http/${url}`
    const res = await fetch(jinaUrl)
    if (res.ok) {
      return { type: 'text', data: await res.text() }
    }
  } catch {}
  // 4) rss2json public API (best effort, may be rate-limited)
  try {
    const rss2json = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
    const res = await fetch(rss2json)
    if (res.ok) {
      return { type: 'json', data: await res.json() }
    }
  } catch {}
  // 5) codetabs proxy
  try {
    const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`)
    if (res.ok) {
      return { type: 'text', data: await res.text() }
    }
  } catch {}
  // As a last resort, return empty text to avoid console errors.
  return { type: 'text', data: '' }
}

export default function FeedList({ feedUrl = 'https://imediac.com/feeds', limit = 6 }: { feedUrl?: string; limit?: number }) {
  const [items, setItems] = useState<Item[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    const run = async () => {
      setError(null)
      try {
        const tryParse = async (url: string): Promise<Item[]> => {
          const res = await fetchWithCorsFallback(url)
          if (res.type === 'json') {
            const d = res.data
            if (Array.isArray(d?.items)) {
              return d.items.map((x: any) => ({ title: x.title, link: x.url || x.link, summary: x.summary || x.description }))
            } else if (Array.isArray(d)) {
              return d.map((x: any) => ({ title: x.title, link: x.url || x.link, summary: x.summary || x.description }))
            }
            return []
          }
          return parseRSS(res.data)
        }

        const candidates = [
          // Dev proxy endpoints (same-origin)
          '/external/feeds', '/external/feed', '/external/feeds/', '/external/feed/',
          // Provided URL and common alternatives
          feedUrl,
          feedUrl.includes('/feeds') ? feedUrl.replace('/feeds', '/feed') : feedUrl.replace('/feed', '/feeds'),
          'https://imediac.com/feed', 'https://imediac.com/feeds',
          'https://www.imediac.com/feed', 'https://www.imediac.com/feeds',
          'https://imediac.com/feed/', 'https://imediac.com/feeds/',
          'https://www.imediac.com/feed/', 'https://www.imediac.com/feeds/',
        ]

        let parsed: Item[] = []
        for (const url of candidates) {
          parsed = await tryParse(url)
          if (parsed.length > 0) break
        }

        if (!alive) return
        setItems(parsed.slice(0, limit))
      } catch (e: any) {
        if (!alive) return
        setError(e?.message || 'Failed to load feed')
      }
    }
    run()
    return () => { alive = false }
  }, [feedUrl, limit])

  if (error) {
    return (
      <div className="card" style={{ borderColor: '#ef4444' }}>
        <p style={{ color: '#ef4444' }}>Could not load posts: {error}</p>
        <p style={{ fontSize: 13, color: '#374151' }}>This can happen due to CORS or upstream rate-limits.</p>
        <p style={{ fontSize: 13 }}>
          Try opening the feed directly: <a href={feedUrl} target="_blank" rel="noopener noreferrer">{feedUrl}</a>
        </p>
      </div>
    )
  }
  if (!items) {
    return <div className="card"><p>Loading posts…</p></div>
  }
  if (items.length === 0) {
    return <div className="card"><p>No posts found.</p></div>
  }
  return (
    <div className="feature-grid" style={{ marginTop: 12 }}>
      {items.map((it, idx) => (
        <a key={idx} className="feature-card" href={it.link} target="_blank" rel="noopener noreferrer">
          <h4>{it.title}</h4>
          {it.summary && <p>{it.summary}</p>}
        </a>
      ))}
    </div>
  )
}
