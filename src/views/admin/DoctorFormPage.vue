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
const uploadError = ref('')

const form = reactive({
  name: '',
  slug: '',
  photo_url: '',
  content_image: '',
  professional_title: '',
  specialization: '',
  bio: '',
  instagram_url: '',
  education: [] as Array<{ degree: string; institution: string; year: string }>,
  experience: [] as Array<{ role: string; institution: string; period: string }>,
  awards: [] as Array<{ title: string; year: string }>,
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
  if (!isEdit.value) form.slug = generateSlug(form.name)
}

function addEducation() {
  form.education.push({ degree: '', institution: '', year: '' })
}
function removeEducation(i: number) { form.education.splice(i, 1) }
function addExperience() {
  form.experience.push({ role: '', institution: '', period: '' })
}
function removeExperience(i: number) { form.experience.splice(i, 1) }
function addAward() {
  form.awards.push({ title: '', year: '' })
}
function removeAward(i: number) { form.awards.splice(i, 1) }

async function loadDoctor() {
  if (!isEdit.value) return
  loading.value = true
  const { data } = await supabase.from('doctors').select('*').eq('id', route.params.id).single()
  if (data) {
    Object.assign(form, data)
    if (!form.education) form.education = []
    if (!form.experience) form.experience = []
    if (!form.awards) form.awards = []
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

async function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  uploading.value = true
  uploadError.value = ''
  const fileName = `doctors/${Date.now()}_${file.name}`
  const { data, error } = await supabase.storage.from('doctor-images').upload(fileName, file)
  if (error) {
    uploadError.value = 'Upload gagal: ' + (error.message || 'Unknown error')
  } else if (data) {
    const { data: urlData } = supabase.storage.from('doctor-images').getPublicUrl(fileName)
    form.photo_url = urlData.publicUrl
  }
  uploading.value = false
  // reset input to allow re-upload same file
  input.value = ''
}

async function handleSave() {
  if (!validate()) return
  saving.value = true

  const payload = { ...form }
  delete (payload as any).id
  delete (payload as any).created_at
  delete (payload as any).updated_at

  if (isEdit.value) {
    await supabase.from('doctors').update(payload).eq('id', route.params.id)
  } else {
    await supabase.from('doctors').insert(payload)
  }

  saving.value = false
  router.push('/admin/doctors')
}

onMounted(loadDoctor)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 text-[12px] text-gray-400 font-body mb-1">
          <router-link to="/admin/doctors" class="hover:text-primary transition-colors">Dokter</router-link>
          <span class="material-symbols-outlined text-base">chevron_right</span>
          <span class="text-gray-600">{{ isEdit ? 'Edit' : 'Tambah' }}</span>
        </div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">
          {{ isEdit ? 'Edit Dokter' : 'Tambah Dokter Baru' }}
        </h1>
      </div>
      <router-link to="/admin/doctors"
        class="text-sm text-gray-500 font-display font-medium hover:text-primary transition-colors">
        ← Kembali
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-20">
      <span class="material-symbols-outlined text-4xl text-gray-300 animate-spin">refresh</span>
    </div>

    <form v-else @submit.prevent="handleSave" class="max-w-3xl">
      <div class="space-y-6">
        <!-- Photo + Basic Info -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Informasi Dasar</h2>
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Photo upload -->
            <div class="flex-shrink-0">
              <div class="w-32 h-32 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center relative group">
                <img v-if="form.photo_url" :src="form.photo_url" @error="form.photo_url=''" class="w-full h-full object-cover">
                <div v-else class="text-center">
                  <span class="material-symbols-outlined text-3xl text-gray-300">person</span>
                  <p class="text-[10px] text-gray-400 mt-1">Upload</p>
                </div>
                <label class="absolute inset-0 cursor-pointer bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity">camera_alt</span>
                  <input type="file" accept="image/*" class="hidden" @change="handleImageUpload">
                </label>
              </div>
              <p v-if="uploading" class="text-[10px] text-primary text-center mt-1 animate-pulse">Uploading...</p>
              <p v-if="uploadError" class="text-[10px] text-red-500 text-center mt-1">{{ uploadError }}</p>
            </div>

            <div class="flex-1 space-y-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Nama Lengkap *</label>
                <input v-model="form.name" @input="onNameChange"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="drg. Nama Lengkap">
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Slug *</label>
                <input v-model="form.slug"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Jabatan Profesional</label>
                <input v-model="form.professional_title"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="Aesthetic Dentist & Implantologist">
              </div>
            </div>
          </div>
        </div>

        <!-- Details -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Detail</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Spesialisasi</label>
              <input v-model="form.specialization"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="Dental Implants, Aesthetic Dentistry">
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Bio Singkat</label>
              <textarea v-model="form.bio" rows="2"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Content Image URL</label>
              <input v-model="form.content_image"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="https://images.unsplash.com/...">
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Instagram URL</label>
              <input v-model="form.instagram_url"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="https://www.instagram.com/username/">
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-display text-[13px] font-semibold text-gray-900">Pendidikan</h2>
            <button type="button" @click="addEducation" class="text-xs text-primary font-semibold hover:underline">+ Tambah</button>
          </div>
          <div v-if="form.education.length === 0" class="text-xs text-gray-400 italic">Belum ada data pendidikan</div>
          <div v-for="(e, i) in form.education" :key="i" class="flex gap-3 mb-3 items-start">
            <input v-model="e.degree" placeholder="Gelar (e.g. drg., Sp.Pros)" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <input v-model="e.institution" placeholder="Institusi" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <input v-model="e.year" placeholder="Tahun" class="w-20 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <button type="button" @click="removeEducation(i)" class="text-red-400 hover:text-red-600 text-xs">Hapus</button>
          </div>
        </div>

        <!-- Experience -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-display text-[13px] font-semibold text-gray-900">Pengalaman</h2>
            <button type="button" @click="addExperience" class="text-xs text-primary font-semibold hover:underline">+ Tambah</button>
          </div>
          <div v-if="form.experience.length === 0" class="text-xs text-gray-400 italic">Belum ada data pengalaman</div>
          <div v-for="(e, i) in form.experience" :key="i" class="flex gap-3 mb-3 items-start">
            <input v-model="e.role" placeholder="Posisi" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <input v-model="e.institution" placeholder="Institusi" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <input v-model="e.period" placeholder="Periode (e.g. 2018-Sekarang)" class="w-36 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <button type="button" @click="removeExperience(i)" class="text-red-400 hover:text-red-600 text-xs">Hapus</button>
          </div>
        </div>

        <!-- Awards -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-display text-[13px] font-semibold text-gray-900">Penghargaan</h2>
            <button type="button" @click="addAward" class="text-xs text-primary font-semibold hover:underline">+ Tambah</button>
          </div>
          <div v-if="form.awards.length === 0" class="text-xs text-gray-400 italic">Belum ada penghargaan</div>
          <div v-for="(a, i) in form.awards" :key="i" class="flex gap-3 mb-3 items-start">
            <input v-model="a.title" placeholder="Judul penghargaan" class="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <input v-model="a.year" placeholder="Tahun" class="w-20 px-3 py-2 rounded-lg border border-gray-200 text-xs">
            <button type="button" @click="removeAward(i)" class="text-red-400 hover:text-red-600 text-xs">Hapus</button>
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

        <!-- Actions -->
        <div class="flex items-center gap-3 pb-8">
          <button type="submit" :disabled="saving"
            class="px-6 py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2">
            <span v-if="saving" class="material-symbols-outlined text-base animate-spin">refresh</span>
            <span v-else class="material-symbols-outlined text-base">save</span>
            {{ saving ? 'Menyimpan...' : 'Simpan' }}
          </button>
          <router-link to="/admin/doctors"
            class="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors">
            Batal
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>
