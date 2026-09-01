<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const saving = ref(false)
const uploading = ref(false)

const form = reactive({
  title: '',
  slug: '',
  description: '',
  short_description: '',
  discount_text: '',
  original_price: null as number | null,
  promo_price: null as number | null,
  image_url: '',
  start_date: '',
  end_date: '',
  terms_conditions: '',
  is_featured: false,
  sort_order: 0,
  status: 'draft' as 'draft' | 'published' | 'archived',
  seo_title: '',
  seo_description: '',
})

const errors = reactive<Record<string, string>>({})

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function onTitleChange() {
  if (!isEdit.value) form.slug = generateSlug(form.title)
}

async function loadPromo() {
  if (!isEdit.value) return
  loading.value = true
  const { data } = await supabase.from('promos').select('*').eq('id', route.params.id).single()
  if (data) {
    Object.assign(form, {
      ...data,
      start_date: data.start_date ? data.start_date.split('T')[0] : '',
      end_date: data.end_date ? data.end_date.split('T')[0] : '',
    })
  }
  loading.value = false
}

function validate() {
  const e: Record<string, string> = {}
  if (!form.title.trim()) e.title = 'Judul wajib diisi'
  if (!form.slug.trim()) e.slug = 'Slug wajib diisi'
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

async function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  uploading.value = true
  const fileName = `promos/${Date.now()}_${file.name}`
  const { data } = await supabase.storage.from('promo-images').upload(fileName, file)
  if (data) {
    const { data: urlData } = supabase.storage.from('promo-images').getPublicUrl(fileName)
    form.image_url = urlData.publicUrl
  }
  uploading.value = false
}

async function handleSave() {
  if (!validate()) return
  saving.value = true
  const payload = { ...form }
  if (isEdit.value) {
    await supabase.from('promos').update(payload).eq('id', route.params.id)
  } else {
    await supabase.from('promos').insert(payload)
  }
  saving.value = false
  router.push('/admin/promos')
}

onMounted(loadPromo)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 text-[12px] text-gray-400 font-body mb-1">
          <router-link to="/admin/promos" class="hover:text-primary transition-colors">Promo</router-link>
          <span class="material-symbols-outlined text-base">chevron_right</span>
          <span class="text-gray-600">{{ isEdit ? 'Edit' : 'Tambah' }}</span>
        </div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">
          {{ isEdit ? 'Edit Promo' : 'Tambah Promo Baru' }}
        </h1>
      </div>
      <router-link to="/admin/promos" class="text-sm text-gray-500 font-display font-medium hover:text-primary transition-colors">← Kembali</router-link>
    </div>

    <div v-if="loading" class="text-center py-20">
      <span class="material-symbols-outlined text-4xl text-gray-300 animate-spin">refresh</span>
    </div>

    <form v-else @submit.prevent="handleSave" class="max-w-4xl">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Main -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl border border-gray-100 p-4">
            <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Detail Promo</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Judul *</label>
                <input v-model="form.title" @input="onTitleChange"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="Nama promo yang menarik">
                <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Slug *</label>
                <input v-model="form.slug"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Deskripsi Singkat</label>
                <textarea v-model="form.short_description" rows="2"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                  placeholder="Ringkasan singkat promo"></textarea>
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Deskripsi Lengkap</label>
                <textarea v-model="form.description" rows="5"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"></textarea>
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Syarat & Ketentuan</label>
                <textarea v-model="form.terms_conditions" rows="3"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Image -->
          <div class="bg-white rounded-2xl border border-gray-100 p-4">
            <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-4">Gambar</h2>
            <div class="aspect-video rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 overflow-hidden relative group">
              <img v-if="form.image_url" :src="form.image_url" class="w-full h-full object-cover">
              <div v-else class="w-full h-full flex items-center justify-center">
                <div class="text-center">
                  <span class="material-symbols-outlined text-4xl text-gray-300 block">image</span>
                  <p class="text-[11px] text-gray-400 mt-1">Klik untuk upload</p>
                </div>
              </div>
              <label class="absolute inset-0 cursor-pointer bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity">camera_alt</span>
                <input type="file" accept="image/*" class="hidden" @change="handleImageUpload">
              </label>
            </div>
            <p v-if="uploading" class="text-[10px] text-primary text-center mt-2 animate-pulse">Uploading...</p>
          </div>

          <!-- Pricing -->
          <div class="bg-white rounded-2xl border border-gray-100 p-4">
            <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-4">Harga</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Teks Diskon</label>
                <input v-model="form.discount_text"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="contoh: Hemat 30%, GRATIS">
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Harga Normal</label>
                  <input v-model.number="form.original_price" type="number"
                    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
                </div>
                <div>
                  <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Harga Promo</label>
                  <input v-model.number="form.promo_price" type="number"
                    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
                </div>
              </div>
            </div>
          </div>

          <!-- Dates -->
          <div class="bg-white rounded-2xl border border-gray-100 p-4">
            <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-4">Periode</h2>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Mulai</label>
                <input v-model="form.start_date" type="date"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Berakhir</label>
                <input v-model="form.end_date" type="date"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
              </div>
            </div>
          </div>

          <!-- Settings -->
          <div class="bg-white rounded-2xl border border-gray-100 p-4">
            <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-4">Pengaturan</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Status</label>
                <select v-model="form.status"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors bg-white">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
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
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-2">
            <button type="submit" :disabled="saving"
              class="w-full py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              <span v-if="saving" class="material-symbols-outlined text-base animate-spin">refresh</span>
              <span v-else class="material-symbols-outlined text-base">save</span>
              {{ saving ? 'Menyimpan...' : 'Simpan' }}
            </button>
            <router-link to="/admin/promos"
              class="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors text-center">
              Batal
            </router-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
