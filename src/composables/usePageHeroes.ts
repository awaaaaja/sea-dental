import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export interface PageHero {
  id: string
  page_key: string
  eyebrow: string
  title: string
  subtitle: string
  image: string
  image_alt: string
  badge: string
  variant: string
}

export function usePageHeroes() {
  const heroes = ref<PageHero[]>([])
  const loading = ref(true)

  async function loadHeroes() {
    loading.value = true
    const { data } = await supabase.from('page_heroes').select('*').order('page_key')
    heroes.value = (data || []) as PageHero[]
    loading.value = false
  }

  async function getHero(pageKey: string) {
    const { data } = await supabase.from('page_heroes').select('*').eq('page_key', pageKey).single()
    return data as PageHero | null
  }

  async function updateHero(pageKey: string, payload: Partial<PageHero>) {
    const { data, error } = await supabase.from('page_heroes').update(payload).eq('page_key', pageKey)
    if (error) throw error
    return data
  }

  return { heroes, loading, loadHeroes, getHero, updateHero }
}

export function usePageHero(pageKey: string) {
  const hero = ref<PageHero | null>(null)
  const loading = ref(true)

  async function loadHero() {
    loading.value = true
    const { data } = await supabase.from('page_heroes').select('*').eq('page_key', pageKey).single()
    hero.value = data as PageHero | null
    loading.value = false
  }

  return { hero, loading, loadHero }
}
