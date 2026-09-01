import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export interface Faq {
  id: string
  question: string
  answer: string
  category: string | null
  sort_order: number
  status: string
}

export function useFaqs() {
  const faqs = ref<Faq[]>([])
  const loading = ref(true)

  async function loadFaqs() {
    loading.value = true
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .eq('status', 'published')
      .order('sort_order')
    faqs.value = data || []
    loading.value = false
  }

  return { faqs, loading, loadFaqs }
}
