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
  name: '',
  slug: '',
  address: '',
  phone: '',
  whatsapp: '',
  operating_hours: '',
  google_maps_url: '',
  latitude: '',
  longitude: '',
  description: '',
  status: 'draft' as 'draft' | 'published' | 'archived',
  sort_order: 0,
})

const errors = reactive<Record<string, string>>({})

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function onNameChange() {
  if (!isEdit.value) form.slug = generateSlug(form.name)
}

async function loadLocation() {
  if (!isEdit.value) return
  loading.value = true
  const { data } = await supabase.from('locations').select('*').eq('id', route.params.id).single()
  if (data) {
    Object.assign(form, {
      ...data,
      latitude: data.latitude?.toString() || '',
      longitude: data.longitude?.toString() || '',
    })
  }
  loading.value = false
}

function validate() {
  const e: Record<string, string> = {}
  if (!form.name.trim()) e.name = 'Nama wajib diisi'
  if (!form.address.trim()) e.address = 'Alamat wajib diisi'
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

async function handleSave() {
  if (!validate()) return
  saving.value = true
  const payload = {
    ...form,
    latitude: form.latitude ? parseFloat(form.latitude) : null,
    longitude: form.longitude ? parseFloat(form.longitude) : null,
  }
  if (isEdit.value) {
    await supabase.from('locations').update(payload).eq('id', route.params.id)
  } else {
    await supabase.from('locations').insert(payload)
  }
  saving.value = false
  router.push('/admin/locations')
}

onMounted(loadLocation)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 text-[12px] text-gray-400 font-body mb-1">
          <router-link to="/admin/locations" class="hover:text-primary transition-colors">Lokasi</router-link>
          <span class="material-symbols-outlined text-base">chevron_right</span>
          <span class="text-gray-600">{{ isEdit ? 'Edit' : 'Tambah' }}</span>
        </div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">
          {{ isEdit ? 'Edit Lokasi' : 'Tambah Lokasi Baru' }}
        </h1>
      </div>
      <router-link to="/admin/locations" class="text-sm text-gray-500 font-display font-medium hover:text-primary transition-colors">← Kembali</router-link>
    </div>

    <div v-if="loading" class="text-center py-20">
      <span class="material-symbols-outlined text-4xl text-gray-300 animate-spin">refresh</span>
    </div>

    <form v-else @submit.prevent="handleSave" class="max-w-3xl">
      <div class="space-y-6">
        <!-- Basic info -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Informasi Dasar</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Nama Lokasi *</label>
                <input v-model="form.name" @input="onNameChange"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="Simpang Haru / Baru">
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Slug</label>
                <input v-model="form.slug"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
              </div>
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Alamat *</label>
              <textarea v-model="form.address" rows="2"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"></textarea>
              <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Deskripsi</label>
              <textarea v-model="form.description" rows="3"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"></textarea>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Kontak & Jam Operasional</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Telepon</label>
                <input v-model="form.phone"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="+62813 6632 9279">
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">WhatsApp</label>
                <input v-model="form.whatsapp"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="+62812 6697 1089">
              </div>
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Jam Operasional</label>
              <input v-model="form.operating_hours"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="Senin-Sabtu 11.00-21.00 WIB">
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Peta</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Google Maps URL</label>
              <input v-model="form.google_maps_url"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="https://maps.google.com/...">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Latitude</label>
                <input v-model="form.latitude" type="number" step="any"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="-0.9471">
              </div>
              <div>
                <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Longitude</label>
                <input v-model="form.longitude" type="number" step="any"
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                  placeholder="100.3626">
              </div>
            </div>
          </div>
        </div>

        <!-- Settings -->
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
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Urutan</label>
              <input v-model.number="form.sort_order" type="number"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
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
          <router-link to="/admin/locations"
            class="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors">
            Batal
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>
