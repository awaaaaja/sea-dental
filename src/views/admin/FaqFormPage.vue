<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const saving = ref(false)

const categories = ['Perawatan', 'Kesehatan', 'Umum']

const form = reactive({
  question: '',
  answer: '',
  category: 'Umum',
  sort_order: 0,
  status: 'published' as 'draft' | 'published' | 'archived',
})

async function loadFaq() {
  if (!isEdit.value) return
  loading.value = true
  const { data } = await supabase.from('faqs').select('*').eq('id', route.params.id).single()
  if (data) Object.assign(form, data)
  loading.value = false
}

async function handleSave() {
  if (!form.question.trim()) return
  saving.value = true
  if (isEdit.value) {
    await supabase.from('faqs').update(form).eq('id', route.params.id)
  } else {
    await supabase.from('faqs').insert(form)
  }
  saving.value = false
  router.push('/admin/faq')
}

onMounted(loadFaq)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 text-[12px] text-gray-400 font-body mb-1">
          <router-link to="/admin/faq" class="hover:text-primary transition-colors">FAQ</router-link>
          <span class="material-symbols-outlined text-base">chevron_right</span>
          <span class="text-gray-600">{{ isEdit ? 'Edit' : 'Tambah' }}</span>
        </div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">
          {{ isEdit ? 'Edit FAQ' : 'Tambah FAQ Baru' }}
        </h1>
      </div>
      <router-link to="/admin/faq" class="text-sm text-gray-500 font-display font-medium hover:text-primary transition-colors">← Kembali</router-link>
    </div>

    <div v-if="loading" class="text-center py-20">
      <span class="material-symbols-outlined text-4xl text-gray-300 animate-spin">refresh</span>
    </div>

    <form v-else @submit.prevent="handleSave" class="max-w-2xl">
      <div class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Pertanyaan & Jawaban</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Pertanyaan *</label>
              <input v-model="form.question"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="Apa yang ingin ditanyakan pasien?">
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Jawaban *</label>
              <textarea v-model="form.answer" rows="5"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                placeholder="Jawaban yang lengkap dan jelas"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Pengaturan</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Kategori</label>
              <select v-model="form.category"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors bg-white">
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Urutan</label>
              <input v-model.number="form.sort_order" type="number"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Status</label>
              <select v-model="form.status"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors bg-white">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 pb-8">
          <button type="submit" :disabled="saving"
            class="px-6 py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2">
            <span v-if="saving" class="material-symbols-outlined text-base animate-spin">refresh</span>
            <span v-else class="material-symbols-outlined text-base">save</span>
            {{ saving ? 'Menyimpan...' : 'Simpan' }}
          </button>
          <router-link to="/admin/faq"
            class="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors">
            Batal
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>
