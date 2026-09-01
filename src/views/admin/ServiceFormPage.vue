<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const saving = ref(false)
const categories = ref<any[]>([])

const form = reactive({
  name: '',
  slug: '',
  short_description: '',
  full_description: '',
  icon: 'medical_services',
  hero_image: '',
  category_id: '',
  is_featured: false,
  sort_order: 0,
  status: 'draft' as 'draft' | 'published' | 'archived',
  seo_title: '',
  seo_description: '',
})

const errors = reactive<Record<string, string>>({})

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function onNameChange() {
  if (!isEdit.value) {
    form.slug = generateSlug(form.name)
  }
}

async function loadCategories() {
  const { data } = await supabase.from('service_categories').select('*').order('sort_order')
  categories.value = data || []
}

async function loadService() {
  if (!isEdit.value) return
  loading.value = true
  const { data } = await supabase.from('services').select('*').eq('id', route.params.id).single()
  if (data) Object.assign(form, data)
  loading.value = false
}

function validate() {
  const e: Record<string, string> = {}
  if (!form.name.trim()) e.name = 'Nama wajib diisi'
  if (!form.slug.trim()) e.slug = 'Slug wajib diisi'
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

async function handleSave() {
  if (!validate()) return
  saving.value = true

  const payload = { ...form }
  delete (payload as any).id

  if (isEdit.value) {
    await supabase.from('services').update(payload).eq('id', route.params.id)
  } else {
    await supabase.from('services').insert(payload)
  }

  saving.value = false
  router.push('/admin/services')
}

onMounted(() => {
  loadCategories()
  loadService()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 text-[12px] text-gray-400 font-body mb-1">
          <router-link to="/admin/services" class="hover:text-primary transition-colors">Layanan</router-link>
          <span class="material-symbols-outlined text-base">chevron_right</span>
          <span class="text-gray-600">{{ isEdit ? 'Edit' : 'Tambah' }}</span>
        </div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">
          {{ isEdit ? 'Edit Layanan' : 'Tambah Layanan Baru' }}
        </h1>
      </div>
      <router-link to="/admin/services"
        class="text-sm text-gray-500 font-display font-medium hover:text-primary transition-colors">
        ← Kembali
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-20">
      <span class="material-symbols-outlined text-4xl text-gray-300 animate-spin">refresh</span>
    </div>

    <form v-else @submit.prevent="handleSave" class="max-w-3xl">
      <div class="space-y-6">
        <!-- Basic Info -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Informasi Dasar</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Nama Layanan *</label>
              <input v-model="form.name" @input="onNameChange"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="Contoh: Konservasi Gigi">
              <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Slug *</label>
              <input v-model="form.slug"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="konservasi-gigi">
              <p v-if="errors.slug" class="text-red-500 text-xs mt-1">{{ errors.slug }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Kategori</label>
                <select v-model="form.category_id"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors bg-white">
                  <option value="">Pilih kategori</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Icon</label>
                <input v-model="form.icon"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="medical_services">
              </div>
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Deskripsi Singkat</label>
              <textarea v-model="form.short_description" rows="2"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Deskripsi Lengkap</label>
              <textarea v-model="form.full_description" rows="6"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"></textarea>
            </div>
          </div>
        </div>

        <!-- Settings -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Pengaturan</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Status</label>
              <select v-model="form.status"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors bg-white">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Urutan</label>
              <input v-model.number="form.sort_order" type="number"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
            </div>
            <div class="flex items-end">
              <label class="flex items-center gap-2 cursor-pointer py-2.5">
                <input v-model="form.is_featured" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20">
                <span class="text-sm font-display font-medium text-gray-700">Featured</span>
              </label>
            </div>
          </div>
        </div>

        <!-- SEO -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">SEO</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">SEO Title</label>
              <input v-model="form.seo_title"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="Judul untuk SEO">
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">SEO Description</label>
              <textarea v-model="form.seo_description" rows="2"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                placeholder="Deskripsi untuk SEO"></textarea>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 pb-8">
          <button type="submit" :disabled="saving"
            class="px-6 py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2">
            <span v-if="saving" class="material-symbols-outlined text-base animate-spin">refresh</span>
            <span v-else class="material-symbols-outlined text-base">save</span>
            {{ saving ? 'Menyimpan...' : 'Simpan' }}
          </button>
          <router-link to="/admin/services"
            class="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors">
            Batal
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>
