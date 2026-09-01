<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const images = ref<any[]>([])
const loading = ref(true)
const uploading = ref(false)
const deleteId = ref<string | null>(null)
const deleting = ref(false)
const dragOver = ref(false)
const fileInput = ref<HTMLInputElement>()

const categories = ['Klinik', 'Perawatan', 'Hasil']
const selectedCategory = ref('')

async function loadImages() {
  loading.value = true
  let query = supabase.from('gallery_items').select('*').order('sort_order')
  if (selectedCategory.value) query = query.eq('category', selectedCategory.value)
  const { data } = await query
  images.value = data || []
  loading.value = false
}

async function handleUpload(files: FileList | null) {
  if (!files || files.length === 0) return
  uploading.value = true
  const fileArr = Array.from(files)
  for (const file of fileArr) {
    const fileName = `gallery/${Date.now()}_${file.name}`
    const { data } = await supabase.storage.from('gallery').upload(fileName, file)
    if (data) {
      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName)
      await supabase.from('gallery_items').insert({
        title: file.name.replace(/\.[^.]+$/, ''),
        image_url: urlData.publicUrl,
        category: selectedCategory.value || null,
        sort_order: images.value.length,
      })
    }
  }
  uploading.value = false
  await loadImages()
}

function onDrop(e: DragEvent) {
  dragOver.value = false
  handleUpload(e.dataTransfer?.files || null)
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
    </div>

    <!-- Upload zone -->
    <div
      class="mb-6 border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer"
      :class="dragOver ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/40'"
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent="onDrop"
      @click="fileInput?.click()"
    >
      <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="handleUpload(($event.target as HTMLInputElement).files)">
      <span v-if="uploading" class="material-symbols-outlined text-4xl text-primary animate-spin block mb-2">refresh</span>
      <span v-else class="material-symbols-outlined text-4xl text-gray-300 block mb-2">cloud_upload</span>
      <p class="text-sm font-display font-medium text-gray-600">
        {{ uploading ? 'Mengupload...' : 'Drag & drop atau klik untuk upload' }}
      </p>
      <p class="text-[11px] text-gray-400 mt-1">Support: JPG, PNG, WebP</p>
    </div>

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
        <img :src="img.image_url" :alt="img.title" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
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
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
