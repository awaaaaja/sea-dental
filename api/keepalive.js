export default async function handler(req, res) {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    return res.status(500).json({ error: 'Missing env vars' })
  }

  try {
    const r = await fetch(`${url}/rest/v1/`, {
      headers: { apikey: key },
    })
    res.status(200).json({ status: 'ok', supabase: r.status })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
