<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const inquiries = ref<any[]>([])
const loading = ref(true)
const selected = ref<any | null>(null)
const adminNote = ref('')
const updating = ref(false)

const statusOptions = [
  { value: 'new', label: 'Baru', color: 'bg-blue-100 text-blue-700' },
  { value: 'read', label: 'Dibaca', color: 'bg-amber-100 text-amber-700' },
  { value: 'contacted', label: 'Dihubungi', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'resolved', label: 'Selesai', color: 'bg-gray-100 text-gray-600' },
]

async function loadInquiries() {
  loading.value = true
  const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
  inquiries.value = data || []
  loading.value = false
}

async function updateStatus(id: string, status: string) {
  updating.value = true
  await supabase.from('inquiries').update({ status }).eq('id', id)
  await loadInquiries()
  if (selected.value?.id === id) selected.value.status = status
  updating.value = false
}

async function saveNote() {
  if (!selected.value) return
  updating.value = true
  await supabase.from('inquiries').update({ admin_notes: adminNote.value }).eq('id', selected.value.id)
  selected.value.admin_notes = adminNote.value
  updating.value = false
}

function getStatusColor(status: string) {
  return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-600'
}

function getStatusLabel(status: string) {
  return statusOptions.find(s => s.value === status)?.label || status
}

function formatDate(date: string) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function selectInquiry(inq: any) {
  selected.value = inq
  adminNote.value = inq.admin_notes || ''
  if (inq.status === 'new') updateStatus(inq.id, 'read')
}

onMounted(loadInquiries)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">Inquiry</h1>
        <p class="font-body text-sm text-gray-500 mt-1">Kelola pesan dari formulir kontak</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- List -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-100 bg-gray-50/50">
                  <th class="text-left px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider">Nama</th>
                  <th class="text-left px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Subjek</th>
                  <th class="text-left px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Tanggal</th>
                  <th class="text-center px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="text-right px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
                  <td class="px-5 py-4"><div class="h-4 bg-gray-100 rounded w-28"></div></td>
                  <td class="px-5 py-4 hidden md:table-cell"><div class="h-4 bg-gray-100 rounded w-32"></div></td>
                  <td class="px-5 py-4 hidden lg:table-cell"><div class="h-4 bg-gray-100 rounded w-24"></div></td>
                  <td class="px-5 py-4"><div class="h-5 bg-gray-100 rounded-full w-16 mx-auto"></div></td>
                  <td class="px-5 py-4"><div class="h-4 bg-gray-100 rounded w-12 ml-auto"></div></td>
                </tr>
                <tr v-else-if="inquiries.length === 0">
                  <td colspan="5" class="px-5 py-12 text-center">
                    <span class="material-symbols-outlined text-5xl text-gray-200 mb-3 block">mail</span>
                    <p class="text-sm text-gray-400 font-body">Belum ada inquiry</p>
                  </td>
                </tr>
                <tr v-for="inq in inquiries" :key="inq.id"
                  @click="selectInquiry(inq)"
                  :class="[
                    'hover:bg-gray-50/50 transition-colors cursor-pointer',
                    selected?.id === inq.id && 'bg-primary/5',
                    inq.status === 'new' && 'bg-blue-50/30'
                  ]">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-2">
                      <div v-if="inq.status === 'new'" class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                      <div>
                        <p class="text-sm font-display font-medium text-gray-900">{{ inq.name }}</p>
                        <p class="text-[11px] text-gray-400 font-body">{{ inq.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-4 hidden md:table-cell">
                    <span class="text-xs text-gray-600 font-body line-clamp-1">{{ inq.subject || '-' }}</span>
                  </td>
                  <td class="px-5 py-4 hidden lg:table-cell">
                    <span class="text-xs text-gray-500 font-body">{{ formatDate(inq.created_at) }}</span>
                  </td>
                  <td class="px-5 py-4 text-center">
                    <span :class="['inline-flex px-2.5 py-1 rounded-full text-[11px] font-display font-semibold', getStatusColor(inq.status)]">
                      {{ getStatusLabel(inq.status) }}
                    </span>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button @click.stop="selectInquiry(inq)" class="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
                      <span class="material-symbols-outlined text-lg">visibility</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Detail panel -->
      <div class="lg:col-span-1">
        <div v-if="selected" class="bg-white rounded-2xl border border-gray-100 p-4 sticky top-24">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-4">Detail Inquiry</h2>
          <div class="space-y-4">
            <div>
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Nama</p>
              <p class="text-sm font-display font-medium text-gray-900">{{ selected.name }}</p>
            </div>
            <div>
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Email</p>
              <p class="text-sm font-body text-gray-700">{{ selected.email }}</p>
            </div>
            <div v-if="selected.phone">
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Telepon</p>
              <p class="text-sm font-body text-gray-700">{{ selected.phone }}</p>
            </div>
            <div v-if="selected.subject">
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Subjek</p>
              <p class="text-sm font-body text-gray-700">{{ selected.subject }}</p>
            </div>
            <div>
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Pesan</p>
              <p class="text-sm font-body text-gray-700 whitespace-pre-wrap">{{ selected.message }}</p>
            </div>
            <div>
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Diterima</p>
              <p class="text-xs font-body text-gray-500">{{ formatDate(selected.created_at) }}</p>
            </div>

            <div class="pt-3 border-t border-gray-100">
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-2">Ubah Status</p>
              <div class="grid grid-cols-2 gap-2">
                <button v-for="s in statusOptions" :key="s.value"
                  @click="updateStatus(selected.id, s.value)"
                  :disabled="updating || selected.status === s.value"
                  :class="[
                    'py-2 rounded-xl text-xs font-display font-semibold transition-colors',
                    selected.status === s.value ? s.color : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
                    updating && 'opacity-50'
                  ]">
                  {{ s.label }}
                </button>
              </div>
            </div>

            <div class="pt-3 border-t border-gray-100">
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-2">Catatan Admin</p>
              <textarea v-model="adminNote" rows="3"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                placeholder="Catatan internal..."></textarea>
              <button @click="saveNote" :disabled="updating"
                class="mt-2 w-full py-2 rounded-xl bg-primary/10 text-primary font-display text-xs font-semibold hover:bg-primary/20 transition-colors disabled:opacity-50">
                {{ updating ? 'Menyimpan...' : 'Simpan Catatan' }}
              </button>
            </div>
          </div>
        </div>
        <div v-else class="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <span class="material-symbols-outlined text-4xl text-gray-200 mb-2 block">touch_app</span>
          <p class="text-xs text-gray-400 font-body">Pilih inquiry untuk melihat detail</p>
        </div>
      </div>
    </div>
  </div>
</template>
