import { createClient } from '@supabase/supabase-js'
import { createCpanelClient } from './cpanelClient'

const apiUrl = import.meta.env.VITE_API_URL as string | undefined

// ponytail: if VITE_API_URL set -> use cPanel PHP API (sead2924_cms), else use Supabase
export const supabase: any = apiUrl
  ? createCpanelClient()
  : (() => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
      }
      return createClient(supabaseUrl, supabaseKey)
    })()
