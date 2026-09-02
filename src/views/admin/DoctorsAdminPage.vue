<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const doctors = ref<any[]>([])
const loading = ref(true)
const deleteId = ref<string | null>(null)
const deleting = ref(false)

async function loadDoctors() {
  loading.value = true
  const { data } = await supabase.from('doctors').select('*').order('sort_order')
  doctors.value = data || []
  loading.value = false
}

async function handleDelete() {
  if (!deleteId.value) return
  deleting.value = true
  await supabase.from('doctors').delete().eq('id', deleteId.value)
  deleteId.value = null
  deleting.value = false
  await loadDoctors()
}

async function toggleStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === 'published' ? 'draft' : 'published'
  await supabase.from('doctors').update({ status: newStatus }).eq('id', id)
  await loadDoctors()
}

onMounted(loadDoctors)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">Dokter</h1>
        <p class="font-body text-sm text-gray-500 mt-1">Kelola data dokter</p>
      </div>
      <router-link to="/admin/doctors/new"
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors">
        <span class="material-symbols-outlined text-base">add</span>
        Tambah Dokter
      </router-link>
    </div>

    <!-- Grid cards -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 3" :key="i" class="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-gray-100"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-100 rounded w-32"></div>
            <div class="h-3 bg-gray-100 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="doctors.length === 0" class="bg-white rounded-2xl border border-gray-100 p-12 text-center">
      <span class="material-symbols-outlined text-5xl text-gray-200 mb-3 block">people</span>
      <p class="text-sm text-gray-400 font-body mb-4">Belum ada dokter</p>
      <router-link to="/admin/doctors/new" class="text-sm text-primary font-display font-semibold hover:text-cyan-tech">
        + Tambah Dokter
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="doc in doctors" :key="doc.id"
        class="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-16 h-16 rounded-full bg-primary/10 overflow-hidden flex-shrink-0">
            <img v-if="doc.photo_url" :src="doc.photo_url" :alt="doc.name" class="w-full h-full object-cover">
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-xl">person</span>
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-display font-semibold text-gray-900 truncate">{{ doc.name }}</h3>
            <p class="text-[11px] text-gray-500 font-body truncate">{{ doc.professional_title }}</p>
            <button @click="toggleStatus(doc.id, doc.status)"
              :class="[
                'inline-flex mt-1 px-2 py-0.5 rounded-full text-[10px] font-display font-semibold transition-colors',
                doc.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              ]">
              {{ doc.status }}
            </button>
          </div>
        </div>
        <p class="text-xs text-gray-500 font-body line-clamp-2 mb-4">{{ doc.bio }}</p>
        <div class="flex items-center gap-2 pt-3 border-t border-gray-100">
          <router-link :to="`/admin/doctors/${doc.id}/edit`"
            class="flex-1 py-2 rounded-lg text-center text-xs font-display font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors">
            Edit
          </router-link>
          <button @click="deleteId = doc.id"
            class="py-2 px-3 rounded-lg text-xs font-display font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Delete modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="deleteId" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="deleteId = null">
          <div class="bg-white rounded-2xl p-4 w-full max-w-sm shadow-xl">
            <div class="text-center">
              <span class="material-symbols-outlined text-5xl text-red-500 mb-3 block">warning</span>
              <h3 class="font-display text-base font-semibold text-gray-900 mb-2">Hapus Dokter?</h3>
              <p class="font-body text-sm text-gray-500 mb-6">Data yang dihapus tidak dapat dikembalikan.</p>
              <div class="flex gap-3">
                <button @click="deleteId = null"
                  class="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Batal
                </button>
                <button @click="handleDelete" :disabled="deleting"
                  class="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-display text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50">
                  {{ deleting ? 'Menghapus...' : 'Hapus' }}
                </button>
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
