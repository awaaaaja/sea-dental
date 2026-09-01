<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const saving = ref(false)

const form = reactive({
  patient_name: '',
  patient_title: '',
  content: '',
  rating: 5,
  is_featured: false,
  status: 'published' as 'draft' | 'published' | 'archived',
})

async function loadTestimonial() {
  if (!isEdit.value) return
  loading.value = true
  const { data } = await supabase.from('testimonials').select('*').eq('id', route.params.id).single()
  if (data) Object.assign(form, data)
  loading.value = false
}

async function handleSave() {
  if (!form.patient_name.trim() || !form.content.trim()) return
  saving.value = true
  if (isEdit.value) {
    await supabase.from('testimonials').update(form).eq('id', route.params.id)
  } else {
    await supabase.from('testimonials').insert(form)
  }
  saving.value = false
  router.push('/admin/testimonials')
}

onMounted(loadTestimonial)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 text-[12px] text-gray-400 font-body mb-1">
          <router-link to="/admin/testimonials" class="hover:text-primary transition-colors">Testimoni</router-link>
          <span class="material-symbols-outlined text-base">chevron_right</span>
          <span class="text-gray-600">{{ isEdit ? 'Edit' : 'Tambah' }}</span>
        </div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">
          {{ isEdit ? 'Edit Testimoni' : 'Tambah Testimoni Baru' }}
        </h1>
      </div>
      <router-link to="/admin/testimonials" class="text-sm text-gray-500 font-display font-medium hover:text-primary transition-colors">← Kembali</router-link>
    </div>

    <div v-if="loading" class="text-center py-20">
      <span class="material-symbols-outlined text-4xl text-gray-300 animate-spin">refresh</span>
    </div>

    <form v-else @submit.prevent="handleSave" class="max-w-2xl">
      <div class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Data Pasien</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Nama Pasien *</label>
                <input v-model="form.patient_name"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="Nama lengkap pasien">
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Title/Gelar</label>
                <input v-model="form.patient_title"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="contoh: Mahasiswa, Ibu Rumah Tangga">
              </div>
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Rating</label>
              <div class="flex items-center gap-1">
                <button v-for="i in 5" :key="i" type="button"
                  @click="form.rating = i"
                  :class="['text-2xl transition-colors', i <= form.rating ? 'text-amber-500' : 'text-gray-200 hover:text-amber-300']">
                  ★
                </button>
                <span class="text-sm text-gray-500 font-body ml-2">{{ form.rating }}/5</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Testimoni</h2>
          <div>
            <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Isi Testimoni *</label>
            <textarea v-model="form.content" rows="4"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
              placeholder="Ceritakan pengalaman pasien..."></textarea>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Pengaturan</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Status</label>
              <select v-model="form.status"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors bg-white">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div class="flex items-end">
              <label class="flex items-center gap-2 cursor-pointer py-2.5">
                <input v-model="form.is_featured" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20">
                <span class="text-sm font-display font-medium text-gray-700">Featured</span>
              </label>
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
          <router-link to="/admin/testimonials"
            class="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors">
            Batal
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>
