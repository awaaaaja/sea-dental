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
  content_image: '',
  mid_image: '',
  symptoms: [] as Array<{ icon: string; title: string; description: string }>,
  process_steps: [] as Array<{ step: number; title: string; description: string }>,
  benefits: [] as Array<{ icon: string; title: string; description: string }>,
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

function addSymptom() {
  form.symptoms.push({ icon: 'medical_services', title: '', description: '' })
}
function removeSymptom(i: number) {
  form.symptoms.splice(i, 1)
}
function addProcessStep() {
  form.process_steps.push({ step: form.process_steps.length + 1, title: '', description: '' })
}
function removeProcessStep(i: number) {
  form.process_steps.splice(i, 1)
}
function addBenefit() {
  form.benefits.push({ icon: 'check_circle', title: '', description: '' })
}
function removeBenefit(i: number) {
  form.benefits.splice(i, 1)
}

async function loadCategories() {
  const { data } = await supabase.from('service_categories').select('*').order('sort_order')
  categories.value = data || []
}

async function loadService() {
  if (!isEdit.value) return
  loading.value = true
  const { data } = await supabase.from('services').select('*').eq('id', route.params.id).single()
  if (data) {
    Object.assign(form, data)
    if (!form.symptoms) form.symptoms = []
    if (!form.process_steps) form.process_steps = []
    if (!form.benefits) form.benefits = []
  }
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
  delete (payload as any).created_at
  delete (payload as any).updated_at

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

        <!-- Images -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Gambar</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Hero Image URL</label>
              <input v-model="form.hero_image"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="https://images.unsplash.com/...">
              <img v-if="form.hero_image" :src="form.hero_image" class="mt-2 w-full h-32 object-cover rounded-xl border border-gray-100" @error="(e)=>(e.target as HTMLImageElement).style.display='none'">
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Content Image URL (Mid-page)</label>
              <input v-model="form.content_image"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="https://images.unsplash.com/...">
              <img v-if="form.content_image" :src="form.content_image" class="mt-2 w-full h-32 object-cover rounded-xl border border-gray-100" @error="(e)=>(e.target as HTMLImageElement).style.display='none'">
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Mid-page Image URL</label>
              <input v-model="form.mid_image"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="https://images.unsplash.com/...">
              <img v-if="form.mid_image" :src="form.mid_image" class="mt-2 w-full h-32 object-cover rounded-xl border border-gray-100" @error="(e)=>(e.target as HTMLImageElement).style.display='none'">
            </div>
          </div>
        </div>

        <!-- Symptoms -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-display text-[13px] font-semibold text-gray-900">Kapan Membutuhkan? (Gejala)</h2>
            <button type="button" @click="addSymptom" class="text-xs text-primary font-semibold hover:underline">+ Tambah</button>
          </div>
          <div v-if="form.symptoms.length === 0" class="text-xs text-gray-400 italic">Belum ada gejala</div>
          <div v-for="(s, i) in form.symptoms" :key="i" class="flex gap-3 mb-3 items-start">
            <input v-model="s.icon" placeholder="icon" class="w-24 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <input v-model="s.title" placeholder="Judul" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <input v-model="s.description" placeholder="Deskripsi" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <button type="button" @click="removeSymptom(i)" class="text-red-400 hover:text-red-600 text-xs">Hapus</button>
          </div>
        </div>

        <!-- Process Steps -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-display text-[13px] font-semibold text-gray-900">Proses Perawatan</h2>
            <button type="button" @click="addProcessStep" class="text-xs text-primary font-semibold hover:underline">+ Tambah</button>
          </div>
          <div v-if="form.process_steps.length === 0" class="text-xs text-gray-400 italic">Belum ada proses</div>
          <div v-for="(s, i) in form.process_steps" :key="i" class="flex gap-3 mb-3 items-start">
            <span class="text-xs text-gray-400 mt-2 w-6 text-center">{{ i + 1 }}</span>
            <input v-model="s.title" placeholder="Judul langkah" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <input v-model="s.description" placeholder="Deskripsi" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <button type="button" @click="removeProcessStep(i)" class="text-red-400 hover:text-red-600 text-xs">Hapus</button>
          </div>
        </div>

        <!-- Benefits -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-display text-[13px] font-semibold text-gray-900">Manfaat</h2>
            <button type="button" @click="addBenefit" class="text-xs text-primary font-semibold hover:underline">+ Tambah</button>
          </div>
          <div v-if="form.benefits.length === 0" class="text-xs text-gray-400 italic">Belum ada manfaat</div>
          <div v-for="(b, i) in form.benefits" :key="i" class="flex gap-3 mb-3 items-start">
            <input v-model="b.icon" placeholder="icon" class="w-24 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <input v-model="b.title" placeholder="Judul" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <input v-model="b.description" placeholder="Deskripsi" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <button type="button" @click="removeBenefit(i)" class="text-red-400 hover:text-red-600 text-xs">Hapus</button>
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
