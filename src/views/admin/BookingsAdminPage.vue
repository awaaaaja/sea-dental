<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const bookings = ref<any[]>([])
const loading = ref(true)
const selectedBooking = ref<any | null>(null)
const updating = ref(false)

const statusOptions = [
  { value: 'new', label: 'Baru', color: 'bg-blue-100 text-blue-700' },
  { value: 'confirmed', label: 'Dikonfirmasi', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'completed', label: 'Selesai', color: 'bg-gray-100 text-gray-600' },
  { value: 'cancelled', label: 'Dibatalkan', color: 'bg-red-100 text-red-600' },
]

async function loadBookings() {
  loading.value = true
  const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
  bookings.value = data || []
  loading.value = false
}

async function updateStatus(id: string, status: string) {
  updating.value = true
  await supabase.from('bookings').update({ status }).eq('id', id)
  await loadBookings()
  if (selectedBooking.value?.id === id) selectedBooking.value.status = status
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

onMounted(loadBookings)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">Booking</h1>
        <p class="font-body text-sm text-gray-500 mt-1">Kelola janji temu pasien</p>
      </div>
      <div class="flex items-center gap-2">
        <a href="https://booking.seadentalaesthetics.id/booking/register" target="_blank"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors">
          <span class="material-symbols-outlined text-base">open_in_new</span>
          Buka Sistem Booking
        </a>
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
                  <th class="text-left px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Layanan</th>
                  <th class="text-left px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Tanggal</th>
                  <th class="text-center px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="text-right px-5 py-3 text-[11px] font-display font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
                  <td class="px-5 py-4"><div class="h-4 bg-gray-100 rounded w-28"></div></td>
                  <td class="px-5 py-4 hidden md:table-cell"><div class="h-4 bg-gray-100 rounded w-20"></div></td>
                  <td class="px-5 py-4 hidden lg:table-cell"><div class="h-4 bg-gray-100 rounded w-24"></div></td>
                  <td class="px-5 py-4"><div class="h-5 bg-gray-100 rounded-full w-16 mx-auto"></div></td>
                  <td class="px-5 py-4"><div class="h-4 bg-gray-100 rounded w-12 ml-auto"></div></td>
                </tr>
                <tr v-else-if="bookings.length === 0">
                  <td colspan="5" class="px-5 py-12 text-center">
                    <span class="material-symbols-outlined text-5xl text-gray-200 mb-3 block">event</span>
                    <p class="text-sm text-gray-400 font-body mb-2">Belum ada booking</p>
                    <p class="text-[11px] text-gray-400 font-body">Booking dari website akan muncul di sini</p>
                  </td>
                </tr>
                <tr v-for="b in bookings" :key="b.id"
                  @click="selectedBooking = b"
                  :class="['hover:bg-gray-50/50 transition-colors cursor-pointer', selectedBooking?.id === b.id && 'bg-primary/5']">
                  <td class="px-5 py-4">
                    <p class="text-sm font-display font-medium text-gray-900">{{ b.name }}</p>
                    <p class="text-[11px] text-gray-400 font-body md:hidden">{{ b.preferred_service || '-' }}</p>
                  </td>
                  <td class="px-5 py-4 hidden md:table-cell">
                    <span class="text-xs text-gray-600 font-body">{{ b.preferred_service || '-' }}</span>
                  </td>
                  <td class="px-5 py-4 hidden lg:table-cell">
                    <span class="text-xs text-gray-500 font-body">{{ formatDate(b.preferred_date || b.created_at) }}</span>
                  </td>
                  <td class="px-5 py-4 text-center">
                    <span :class="['inline-flex px-2.5 py-1 rounded-full text-[11px] font-display font-semibold', getStatusColor(b.status)]">
                      {{ getStatusLabel(b.status) }}
                    </span>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button @click.stop="selectedBooking = b" class="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
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
        <div v-if="selectedBooking" class="bg-white rounded-2xl border border-gray-100 p-4 sticky top-24">
          <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-4">Detail Booking</h2>
          <div class="space-y-4">
            <div>
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Pasien</p>
              <p class="text-sm font-display font-medium text-gray-900">{{ selectedBooking.name || '-' }}</p>
            </div>
            <div>
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Telepon</p>
              <p class="text-sm font-body text-gray-700">{{ selectedBooking.phone || '-' }}</p>
            </div>
            <div>
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Layanan</p>
              <p class="text-sm font-body text-gray-700">{{ selectedBooking.preferred_service || '-' }}</p>
            </div>
            <div>
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Tanggal</p>
              <p class="text-sm font-body text-gray-700">{{ formatDate(selectedBooking.preferred_date || selectedBooking.created_at) }}</p>
            </div>
            <div v-if="selectedBooking.notes">
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-1">Catatan</p>
              <p class="text-sm font-body text-gray-700">{{ selectedBooking.notes }}</p>
            </div>

            <div class="pt-3 border-t border-gray-100">
              <p class="text-[11px] text-gray-400 font-display uppercase tracking-wider mb-2">Ubah Status</p>
              <div class="grid grid-cols-2 gap-2">
                <button v-for="s in statusOptions" :key="s.value"
                  @click="updateStatus(selectedBooking.id, s.value)"
                  :disabled="updating || selectedBooking.status === s.value"
                  :class="[
                    'py-2 rounded-xl text-xs font-display font-semibold transition-colors',
                    selectedBooking.status === s.value ? s.color : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
                    updating && 'opacity-50'
                  ]">
                  {{ s.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <span class="material-symbols-outlined text-4xl text-gray-200 mb-2 block">touch_app</span>
          <p class="text-xs text-gray-400 font-body">Pilih booking untuk melihat detail</p>
        </div>
      </div>
    </div>
  </div>
</template>
