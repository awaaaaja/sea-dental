<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const QuillEditor = defineAsyncComponent(() => import('@vueup/vue-quill').then(m => m.QuillEditor))

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const saving = ref(false)
const uploading = ref(false)
const uploadError = ref('')
const categories = ref<any[]>([])

const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  author_name: 'SEA Dental',
  category_id: '',
  status: 'draft' as 'draft' | 'published' | 'archived',
  seo_title: '',
  seo_description: '',
  og_image: '',
})

const errors = reactive<Record<string, string>>({})

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function onTitleChange() {
  if (!isEdit.value) form.slug = generateSlug(form.title)
}

async function loadCategories() {
  const { data } = await supabase.from('article_categories').select('*').order('name')
  categories.value = data || []
}

async function loadArticle() {
  if (!isEdit.value) return
  loading.value = true
  const { data } = await supabase.from('articles').select('*').eq('id', route.params.id).single()
  if (data) Object.assign(form, data)
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
  uploadError.value = ''
  const fileName = `articles/${Date.now()}_${file.name}`
  const { data, error } = await supabase.storage.from('article-images').upload(fileName, file)
  if (error) {
    uploadError.value = error.message
    uploading.value = false
    return
  }
  if (data) {
    const { data: urlData } = supabase.storage.from('article-images').getPublicUrl(fileName)
    form.cover_image = urlData.publicUrl
  }
  uploading.value = false
}

async function handleSave() {
  if (!validate()) return
  saving.value = true
  const payload = { ...form }
  if (isEdit.value) {
    await supabase.from('articles').update(payload).eq('id', route.params.id)
  } else {
    await supabase.from('articles').insert(payload)
  }
  saving.value = false
  router.push('/admin/articles')
}

onMounted(() => { loadCategories(); loadArticle() })
</script>

<style>
.ql-toolbar.ql-snow {
  border: none !important;
  border-bottom: 1px solid #e5e7eb !important;
  background: #f9fafb;
}
.ql-container.ql-snow {
  border: none !important;
}
.ql-editor {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.7;
  color: #374151;
  padding: 16px;
}
.ql-editor.ql-blank::before {
  color: #9ca3af;
  font-style: normal;
}
.ql-snow .ql-stroke {
  stroke: #6b7280;
}
.ql-snow .ql-fill {
  fill: #6b7280;
}
.ql-snow .ql-picker-label {
  color: #6b7280;
}
.ql-editor h1 { font-size: 24px; font-weight: 700; margin-bottom: 12px; }
.ql-editor h2 { font-size: 20px; font-weight: 600; margin-bottom: 10px; }
.ql-editor h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
.ql-editor p { margin-bottom: 12px; }
.ql-editor blockquote {
  border-left: 3px solid #19377D;
  padding-left: 12px;
  color: #64748B;
  margin: 12px 0;
}
</style>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 text-[12px] text-gray-400 font-body mb-1">
          <router-link to="/admin/articles" class="hover:text-primary transition-colors">Artikel</router-link>
          <span class="material-symbols-outlined text-base">chevron_right</span>
          <span class="text-gray-600">{{ isEdit ? 'Edit' : 'Tulis' }}</span>
        </div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">
          {{ isEdit ? 'Edit Artikel' : 'Tulis Artikel Baru' }}
        </h1>
      </div>
      <router-link to="/admin/articles" class="text-sm text-gray-500 font-display font-medium hover:text-primary transition-colors">← Kembali</router-link>
    </div>

    <div v-if="loading" class="text-center py-20">
      <span class="material-symbols-outlined text-4xl text-gray-300 animate-spin">refresh</span>
    </div>

    <form v-else @submit.prevent="handleSave" class="max-w-4xl">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl border border-gray-100 p-4">
            <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Konten</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Judul *</label>
                <input v-model="form.title" @input="onTitleChange"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="Judul artikel yang menarik">
                <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Slug *</label>
                <input v-model="form.slug"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Excerpt</label>
                <textarea v-model="form.excerpt" rows="2"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                  placeholder="Ringkasan singkat artikel"></textarea>
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Penulis</label>
                <input v-model="form.author_name"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="Nama penulis">
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Konten Artikel</label>
                <div class="rounded-xl border border-gray-200 overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-colors">
                  <QuillEditor
                    v-model:content="form.content"
                    content-type="html"
                    :style="{ minHeight: '300px' }"
                    :toolbar="[
                      [{ header: [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['blockquote', 'link', 'image'],
                      [{ align: [] }],
                      ['clean'],
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Cover image -->
          <div class="bg-white rounded-2xl border border-gray-100 p-4">
            <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-4">Cover Image</h2>
            <div class="aspect-video rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 overflow-hidden relative group">
              <img v-if="form.cover_image" :src="form.cover_image" class="w-full h-full object-cover" @error="(e)=>(e.target as HTMLImageElement).style.display='none'">
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
            <p v-if="uploadError" class="text-red-500 text-xs mt-2 text-center">{{ uploadError }}</p>
          </div>

          <!-- Settings -->
          <div class="bg-white rounded-2xl border border-gray-100 p-4">
            <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-4">Pengaturan</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Kategori</label>
                <select v-model="form.category_id"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors bg-white">
                  <option value="">Pilih kategori</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
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

          <!-- SEO -->
          <div class="bg-white rounded-2xl border border-gray-100 p-4">
            <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-4">SEO</h2>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">SEO Title</label>
                <input v-model="form.seo_title"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">SEO Description</label>
                <textarea v-model="form.seo_description" rows="2"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"></textarea>
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
            <router-link to="/admin/articles"
              class="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors text-center">
              Batal
            </router-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
