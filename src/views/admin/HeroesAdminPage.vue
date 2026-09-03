<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const heroes = ref<any[]>([])
const loading = ref(true)
const saving = ref(false)
const editing = ref<any | null>(null)
const editForm = ref({ eyebrow: '', title: '', subtitle: '', image: '', image_alt: '', badge: '', variant: 'split' })
const uploading = ref(false)

const pageLabels: Record<string,string> = {
  beranda: 'Beranda',
  about: 'Tentang Kami',
  services: 'Layanan',
  doctors: 'Dokter',
  promos: 'Promo',
  gallery: 'Galeri',
  articles: 'Artikel',
  contact: 'Kontak',
}

async function loadHeroes() {
  loading.value = true
  const { data } = await supabase.from('page_heroes').select('*').order('page_key')
  heroes.value = data || []
  loading.value = false
}

function openEdit(hero: any) {
  editing.value = hero
  editForm.value = {
    eyebrow: hero.eyebrow || '',
    title: hero.title || '',
    subtitle: hero.subtitle || '',
    image: hero.image || '',
    image_alt: hero.image_alt || '',
    badge: hero.badge || '',
    variant: hero.variant || 'split',
  }
}

async function handleImageUpload(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  uploading.value = true
  const fileName = `heroes/${Date.now()}_${file.name.replace(/\s+/g, '_')}`
  const { data, error } = await supabase.storage.from('public-assets').upload(fileName, file)
  if (!error && data) {
    const { data: urlData } = supabase.storage.from('public-assets').getPublicUrl(fileName)
    editForm.value.image = urlData.publicUrl
  }
  uploading.value = false
}

async function handleSave() {
  if (!editing.value) return
  saving.value = true
  await supabase.from('page_heroes').update(editForm.value).eq('page_key', editing.value.page_key)
  saving.value = false
  editing.value = null
  await loadHeroes()
}

onMounted(loadHeroes)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">Hero Section</h1>
        <p class="font-body text-sm text-gray-500 mt-1">Kelola hero untuk 8 halaman (Beranda, Tentang Kami, Layanan, Dokter, Promo, Galeri, Artikel, Kontak)</p>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="i in 8" :key="i" class="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse h-[180px]"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="hero in heroes" :key="hero.page_key" class="bg-white rounded-2xl border border-gray-100 p-5 hover:border-primary/20 transition-colors">
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="font-display text-[14px] font-semibold text-primary">{{ pageLabels[hero.page_key] || hero.page_key }}</h3>
            <p class="font-mono text-[11px] text-gray-400">{{ hero.page_key }}</p>
          </div>
          <span class="text-[10px] font-display font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-600">{{ hero.variant }}</span>
        </div>
        <div class="space-y-2 mb-4">
          <p class="text-[11px] text-gray-400 font-display">Eyebrow: <span class="text-gray-700">{{ hero.eyebrow || '-' }}</span></p>
          <p class="text-sm font-display font-semibold text-gray-900 line-clamp-1">{{ hero.title }}</p>
          <p class="text-xs text-gray-500 line-clamp-2">{{ hero.subtitle }}</p>
          <div v-if="hero.image" class="mt-2 rounded-lg overflow-hidden border border-gray-100">
            <img :src="hero.image" :alt="hero.image_alt" class="w-full h-24 object-cover" loading="lazy" @error="(e)=>(e.target as HTMLImageElement).style.display='none'">
          </div>
        </div>
        <button @click="openEdit(hero)" class="w-full py-2 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors">Edit Hero</button>
      </div>
    </div>

    <!-- Edit Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="editing" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto" @click.self="editing = null">
          <div class="bg-white rounded-2xl p-5 w-full max-w-lg shadow-xl my-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-display text-base font-semibold text-gray-900">Edit Hero — {{ pageLabels[editing.page_key] }}</h3>
              <button @click="editing = null" class="p-1 text-gray-400 hover:text-gray-600"><span class="material-symbols-outlined">close</span></button>
            </div>
            <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label class="block text-xs font-display font-medium text-gray-700 mb-1">Eyebrow</label>
                <input v-model="editForm.eyebrow" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" placeholder="01 / Welcome">
              </div>
              <div>
                <label class="block text-xs font-display font-medium text-gray-700 mb-1">Title *</label>
                <input v-model="editForm.title" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" placeholder="Judul hero">
              </div>
              <div>
                <label class="block text-xs font-display font-medium text-gray-700 mb-1">Subtitle</label>
                <textarea v-model="editForm.subtitle" rows="2" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary resize-none" placeholder="Subtitle hero"></textarea>
              </div>
              <div>
                <label class="block text-xs font-display font-medium text-gray-700 mb-1">Badge</label>
                <input v-model="editForm.badge" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" placeholder="Badge text">
              </div>
              <div>
                <label class="block text-xs font-display font-medium text-gray-700 mb-1">Variant</label>
                <select v-model="editForm.variant" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-primary">
                  <option value="split">Split (kiri teks, kanan gambar)</option>
                  <option value="mosaic">Mosaic (grid gambar)</option>
                  <option value="centered">Centered (tengah)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-display font-medium text-gray-700 mb-1">Image URL</label>
                <input v-model="editForm.image" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" placeholder="https://...">
                <label class="mt-2 block w-full py-2 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-500 hover:bg-gray-50 cursor-pointer">
                  Upload Gambar
                  <input type="file" accept="image/*" class="hidden" @change="handleImageUpload">
                </label>
                <p v-if="uploading" class="text-xs text-primary mt-1 animate-pulse">Uploading...</p>
                <div v-if="editForm.image" class="mt-2 rounded-xl overflow-hidden border border-gray-100">
                  <img :src="editForm.image" class="w-full h-32 object-cover" @error="(e)=>(e.target as HTMLImageElement).style.display='none'">
                </div>
              </div>
              <div>
                <label class="block text-xs font-display font-medium text-gray-700 mb-1">Image Alt</label>
                <input v-model="editForm.image_alt" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" placeholder="Alt text">
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button @click="editing = null" class="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50">Batal</button>
              <button @click="handleSave" :disabled="saving" class="flex-1 py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 disabled:opacity-50">{{ saving ? 'Menyimpan...' : 'Simpan' }}</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-leave-active { pointer-events: none; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
