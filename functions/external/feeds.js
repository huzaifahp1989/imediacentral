export async function onRequest({ request }) {
  const upstream = 'https://imediac.com/feeds'
  try {
    const res = await fetch(upstream, {
      headers: { 'User-Agent': 'Cloudflare-Pages-Proxy' },
    })
    const body = await res.text()
    return new Response(body, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    })
  } catch (e) {
    return new Response(`Upstream fetch failed: ${e?.message || e}`, { status: 502 })
  }
}

