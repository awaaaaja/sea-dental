<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const images = ref<any[]>([])
const loading = ref(true)
const uploading = ref(false)
const uploadError = ref('')
const deleteId = ref<string | null>(null)
const deleting = ref(false)
const showAddModal = ref(false)

const categories = ['Klinik', 'Perawatan', 'Hasil']
const categoryMap: Record<string,string> = { Klinik: 'klinik', Perawatan: 'perawatan', Hasil: 'hasil' }
const selectedCategory = ref('')

// Add form
const addForm = ref({ title: '', category: 'Klinik', file: null as File | null, preview: '' })

function openAddModal() {
  addForm.value = { title: '', category: 'Klinik', file: null, preview: '' }
  uploadError.value = ''
  showAddModal.value = true
}
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0] || null
  addForm.value.file = file
  if (file) {
    addForm.value.preview = URL.createObjectURL(file)
    if (!addForm.value.title) addForm.value.title = file.name.replace(/\.[^.]+$/, '')
  } else {
    addForm.value.preview = ''
  }
}
function closeAddModal() {
  if (addForm.value.preview) URL.revokeObjectURL(addForm.value.preview)
  showAddModal.value = false
}

async function loadImages() {
  loading.value = true
  let query = supabase.from('gallery_items').select('*').order('sort_order')
  if (selectedCategory.value) query = query.eq('category', categoryMap[selectedCategory.value] || selectedCategory.value.toLowerCase())
  const { data } = await query
  images.value = data || []
  loading.value = false
}

async function handleAddSubmit() {
  if (!addForm.value.file) { uploadError.value = 'Pilih foto terlebih dahulu'; return }
  if (!addForm.value.title.trim()) { uploadError.value = 'Judul wajib diisi'; return }
  uploading.value = true
  uploadError.value = ''
  const file = addForm.value.file!
  const fileName = `gallery/${Date.now()}_${file.name.replace(/\s+/g, '_')}`
  const { data, error } = await supabase.storage.from('gallery').upload(fileName, file)
  if (error) {
    uploadError.value = error.message
    uploading.value = false
    return
  }
  if (data) {
    const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName)
    await supabase.from('gallery_items').insert({
      title: addForm.value.title.trim(),
      image_url: urlData.publicUrl,
      category: categoryMap[addForm.value.category] || addForm.value.category.toLowerCase(),
      sort_order: images.value.length,
      status: 'published',
    })
  }
  uploading.value = false
  closeAddModal()
  await loadImages()
}

async function handleDelete() {
  if (!deleteId.value) return
  deleting.value = true
  const img = images.value.find(i => i.id === deleteId.value)
  if (img?.image_url) {
    const path = img.image_url.split('/').slice(-2).join('/')
    await supabase.storage.from('gallery').remove([path])
  }
  await supabase.from('gallery_items').delete().eq('id', deleteId.value)
  deleteId.value = null
  deleting.value = false
  await loadImages()
}

onMounted(loadImages)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">Galeri</h1>
        <p class="font-body text-sm text-gray-500 mt-1">Kelola foto galeri klinik</p>
      </div>
      <button @click="openAddModal"
        class="px-4 py-2 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
        <span class="material-symbols-outlined text-base">add_a_photo</span>
        Tambah Foto
      </button>
    </div>

    <!-- Add Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showAddModal" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="closeAddModal">
          <div class="bg-white rounded-2xl p-5 w-full max-w-md shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-display text-base font-semibold text-gray-900">Tambah Foto Galeri</h3>
              <button @click="closeAddModal" class="p-1 text-gray-400 hover:text-gray-600"><span class="material-symbols-outlined">close</span></button>
            </div>
            <div class="space-y-4">
              <!-- Preview -->
              <div class="w-full aspect-[4/3] rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center relative">
                <img v-if="addForm.preview" :src="addForm.preview" class="w-full h-full object-cover">
                <div v-else class="text-center">
                  <span class="material-symbols-outlined text-4xl text-gray-300">image</span>
                  <p class="text-xs text-gray-400 mt-1">Preview foto</p>
                </div>
              </div>
              <label class="block w-full py-2.5 rounded-xl border border-gray-200 text-center text-sm font-display font-medium text-gray-600 hover:bg-gray-50 cursor-pointer">
                Pilih Foto
                <input type="file" accept="image/*" class="hidden" @change="onFileChange">
              </label>
              <div>
                <label class="block text-xs font-display font-medium text-gray-700 mb-1">Judul *</label>
                <input v-model="addForm.title" placeholder="Judul foto" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary">
              </div>
              <div>
                <label class="block text-xs font-display font-medium text-gray-700 mb-1">Kategori *</label>
                <select v-model="addForm.category" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-primary">
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
                <p class="text-[11px] text-gray-400 mt-1">Klinik / Perawatan / Hasil — akan tampil di filter galeri public</p>
              </div>
              <p v-if="uploadError" class="text-red-500 text-xs">{{ uploadError }}</p>
              <div class="flex gap-3 pt-2">
                <button @click="closeAddModal" class="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50">Batal</button>
                <button @click="handleAddSubmit" :disabled="uploading" class="flex-1 py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 disabled:opacity-50">
                  {{ uploading ? 'Mengupload...' : 'Posting' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Category filter -->
    <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
      <button @click="selectedCategory = ''; loadImages()"
        :class="['px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-colors whitespace-nowrap',
          !selectedCategory ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
        Semua
      </button>
      <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat; loadImages()"
        :class="['px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-colors whitespace-nowrap',
          selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
        {{ cat }}
      </button>
    </div>

    <!-- Grid -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <div v-for="i in 8" :key="i" class="aspect-square rounded-xl bg-gray-100 animate-pulse"></div>
    </div>

    <div v-else-if="images.length === 0" class="bg-white rounded-2xl border border-gray-100 p-12 text-center">
      <span class="material-symbols-outlined text-5xl text-gray-200 mb-3 block">photo_library</span>
      <p class="text-sm text-gray-400 font-body">Belum ada foto</p>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <div v-for="img in images" :key="img.id" class="group relative aspect-square rounded-xl overflow-hidden bg-gray-100">
        <img :src="img.image_url" :alt="img.title" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" @error="(e)=>(e.target as HTMLImageElement).style.display='none'">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div class="absolute bottom-0 left-0 right-0 p-3">
            <p class="text-white text-xs font-display font-medium truncate">{{ img.title }}</p>
            <p v-if="img.category" class="text-white/60 text-[10px] font-body">{{ img.category }}</p>
          </div>
        </div>
        <button @click.stop="deleteId = img.id"
          class="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all">
          <span class="material-symbols-outlined text-sm">delete</span>
        </button>
      </div>
    </div>

    <!-- Delete modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="deleteId" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="deleteId = null">
          <div class="bg-white rounded-2xl p-4 w-full max-w-sm shadow-xl">
            <div class="text-center">
              <span class="material-symbols-outlined text-5xl text-red-500 mb-3 block">warning</span>
              <h3 class="font-display text-base font-semibold text-gray-900 mb-2">Hapus Foto?</h3>
              <p class="font-body text-sm text-gray-500 mb-6">Foto akan dihapus dari galeri dan storage.</p>
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
.fade-leave-active { pointer-events: none; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
