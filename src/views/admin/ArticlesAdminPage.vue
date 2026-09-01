<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const articles = ref<any[]>([])
const loading = ref(true)
const deleteId = ref<string | null>(null)
const deleting = ref(false)

async function loadArticles() {
  loading.value = true
  const { data } = await supabase
    .from('articles')
    .select('*, article_categories(name)')
    .order('created_at', { ascending: false })
  articles.value = data || []
  loading.value = false
}

async function handleDelete() {
  if (!deleteId.value) return
  deleting.value = true
  await supabase.from('articles').delete().eq('id', deleteId.value)
  deleteId.value = null
  deleting.value = false
  await loadArticles()
}

async function toggleStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === 'published' ? 'draft' : 'published'
  const update: any = { status: newStatus }
  if (newStatus === 'published') update.published_at = new Date().toISOString()
  await supabase.from('articles').update(update).eq('id', id)
  await loadArticles()
}

function formatDate(date: string) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(loadArticles)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">Artikel</h1>
        <p class="font-body text-sm text-gray-500 mt-1">Kelola artikel kesehatan gigi</p>
      </div>
      <router-link to="/admin/articles/new"
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors">
        <span class="material-symbols-outlined text-base">add</span>
        Tulis Artikel
      </router-link>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50/50">
              <th class="text-left px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider">Judul</th>
              <th class="text-left px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Kategori</th>
              <th class="text-left px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Tanggal</th>
              <th class="text-center px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="text-right px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
              <td class="px-5 py-4"><div class="h-4 bg-gray-100 rounded w-40"></div></td>
              <td class="px-5 py-4 hidden md:table-cell"><div class="h-4 bg-gray-100 rounded w-20"></div></td>
              <td class="px-5 py-4 hidden lg:table-cell"><div class="h-4 bg-gray-100 rounded w-24"></div></td>
              <td class="px-5 py-4"><div class="h-5 bg-gray-100 rounded-full w-16 mx-auto"></div></td>
              <td class="px-5 py-4"><div class="h-4 bg-gray-100 rounded w-16 ml-auto"></div></td>
            </tr>
            <tr v-else-if="articles.length === 0">
              <td colspan="5" class="px-5 py-12 text-center">
                <span class="material-symbols-outlined text-5xl text-gray-200 mb-3 block">article</span>
                <p class="text-sm text-gray-400 font-body mb-4">Belum ada artikel</p>
                <router-link to="/admin/articles/new" class="text-sm text-primary font-display font-semibold hover:text-cyan-tech">
                  + Tulis Artikel
                </router-link>
              </td>
            </tr>
            <tr v-for="article in articles" :key="article.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-violet-50 overflow-hidden flex-shrink-0">
                    <img v-if="article.cover_image" :src="article.cover_image" class="w-full h-full object-cover">
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <span class="material-symbols-outlined text-violet-400 text-base">image</span>
                    </div>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-display font-medium text-gray-900 truncate max-w-[200px] md:max-w-none">{{ article.title }}</p>
                    <p class="text-[11px] text-gray-400 font-body truncate">{{ article.slug }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 hidden md:table-cell">
                <span class="text-xs text-gray-600 font-body">{{ article.article_categories?.name || '-' }}</span>
              </td>
              <td class="px-5 py-4 hidden lg:table-cell">
                <span class="text-xs text-gray-500 font-body">{{ formatDate(article.published_at || article.created_at) }}</span>
              </td>
              <td class="px-5 py-4 text-center">
                <button @click="toggleStatus(article.id, article.status)"
                  :class="[
                    'inline-flex px-2.5 py-1 rounded-full text-[11px] font-display font-semibold transition-colors',
                    article.status === 'published' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' :
                    article.status === 'draft' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                    'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  ]">
                  {{ article.status }}
                </button>
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center justify-end gap-1">
                  <router-link :to="`/admin/articles/${article.id}/edit`"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
                    <span class="material-symbols-outlined text-lg">edit</span>
                  </router-link>
                  <button @click="deleteId = article.id"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <span class="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="deleteId" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="deleteId = null">
          <div class="bg-white rounded-2xl p-4 w-full max-w-sm shadow-xl">
            <div class="text-center">
              <span class="material-symbols-outlined text-5xl text-red-500 mb-3 block">warning</span>
              <h3 class="font-display text-base font-semibold text-gray-900 mb-2">Hapus Artikel?</h3>
              <p class="font-body text-sm text-gray-500 mb-6">Artikel yang dihapus tidak dapat dikembalikan.</p>
              <div class="flex gap-3">
                <button @click="deleteId = null" class="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors">Batal</button>
                <button @click="handleDelete" :disabled="deleting" class="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-display text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50">{{ deleting ? 'Menghapus...' : 'Hapus' }}</button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
