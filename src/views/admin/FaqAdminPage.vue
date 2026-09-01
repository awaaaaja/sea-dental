<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const faqs = ref<any[]>([])
const loading = ref(true)
const deleteId = ref<string | null>(null)
const deleting = ref(false)

async function loadFaqs() {
  loading.value = true
  const { data } = await supabase.from('faqs').select('*').order('sort_order')
  faqs.value = data || []
  loading.value = false
}

async function handleDelete() {
  if (!deleteId.value) return
  deleting.value = true
  await supabase.from('faqs').delete().eq('id', deleteId.value)
  deleteId.value = null
  deleting.value = false
  await loadFaqs()
}

async function toggleStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === 'published' ? 'draft' : 'published'
  await supabase.from('faqs').update({ status: newStatus }).eq('id', id)
  await loadFaqs()
}

onMounted(loadFaqs)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">FAQ</h1>
        <p class="font-body text-sm text-gray-500 mt-1">Kelola pertanyaan yang sering ditanyakan</p>
      </div>
      <router-link to="/admin/faq/new"
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors">
        <span class="material-symbols-outlined text-base">add</span>
        Tambah FAQ
      </router-link>
    </div>

    <div class="space-y-3">
      <div v-if="loading" v-for="i in 4" :key="i" class="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
        <div class="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-100 rounded w-1/2"></div>
      </div>

      <div v-else-if="faqs.length === 0" class="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <span class="material-symbols-outlined text-5xl text-gray-200 mb-3 block">help</span>
        <p class="text-sm text-gray-400 font-body mb-4">Belum ada FAQ</p>
        <router-link to="/admin/faq/new" class="text-sm text-primary font-display font-semibold hover:text-cyan-tech">+ Tambah FAQ</router-link>
      </div>

      <div v-for="faq in faqs" :key="faq.id"
        class="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300">
        <div class="flex items-start gap-4">
          <div class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="material-symbols-outlined text-amber-600 text-base">help</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-sm font-display font-medium text-gray-900">{{ faq.question }}</h3>
              <button @click="toggleStatus(faq.id, faq.status)"
                :class="['px-2 py-0.5 rounded-full text-[10px] font-display font-semibold transition-colors',
                  faq.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700']">
                {{ faq.status }}
              </button>
            </div>
            <p class="text-xs text-gray-500 font-body line-clamp-2">{{ faq.answer }}</p>
            <div class="flex items-center gap-3 mt-2">
              <span class="text-[10px] text-gray-400 font-body px-2 py-0.5 bg-gray-50 rounded-full">{{ faq.category || 'Umum' }}</span>
              <span class="text-[10px] text-gray-400 font-body">Urutan: {{ faq.sort_order }}</span>
            </div>
          </div>
          <div class="flex items-center gap-1 flex-shrink-0">
            <router-link :to="`/admin/faq/${faq.id}/edit`"
              class="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
              <span class="material-symbols-outlined text-lg">edit</span>
            </router-link>
            <button @click="deleteId = faq.id"
              class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
              <span class="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="deleteId" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="deleteId = null">
          <div class="bg-white rounded-2xl p-4 w-full max-w-sm shadow-xl">
            <div class="text-center">
              <span class="material-symbols-outlined text-5xl text-red-500 mb-3 block">warning</span>
              <h3 class="font-display text-base font-semibold text-gray-900 mb-2">Hapus FAQ?</h3>
              <p class="font-body text-sm text-gray-500 mb-6">Data yang dihapus tidak dapat dikembalikan.</p>
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
