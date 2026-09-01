import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  category_id: string | null
  author_name: string
  read_time: string
  is_featured: boolean
  sort_order: number
  status: string
  created_at: string
}

export interface ArticleCategory {
  id: string
  name: string
  slug: string
}

export function useArticles() {
  const articles = ref<Article[]>([])
  const categories = ref<ArticleCategory[]>([])
  const loading = ref(true)

  async function loadArticles() {
    loading.value = true
    const [articlesRes, categoriesRes] = await Promise.all([
      supabase.from('articles').select('*').eq('status', 'published').order('created_at', { ascending: false }),
      supabase.from('article_categories').select('*').order('name'),
    ])
    articles.value = articlesRes.data || []
    categories.value = categoriesRes.data || []
    loading.value = false
  }

  function getCategoryName(categoryId: string | null) {
    if (!categoryId) return ''
    return categories.value.find(c => c.id === categoryId)?.name || ''
  }

  async function getArticleBySlug(slug: string) {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single()
    return data as Article | null
  }

  async function getRelatedArticles(currentId: string, limit = 3) {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .neq('id', currentId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return (data || []) as Article[]
  }

  return { articles, categories, loading, loadArticles, getArticleBySlug, getRelatedArticles, getCategoryName }
}
