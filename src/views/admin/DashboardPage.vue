<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const stats = ref([
  { label: 'Layanan', value: 0, icon: 'medical_services', bg: 'bg-blue-50', text: 'text-blue-600', change: '' },
  { label: 'Dokter', value: 0, icon: 'people', bg: 'bg-emerald-50', text: 'text-emerald-600', change: '' },
  { label: 'Artikel', value: 0, icon: 'article', bg: 'bg-violet-50', text: 'text-violet-600', change: '' },
  { label: 'Galeri', value: 0, icon: 'photo_library', bg: 'bg-amber-50', text: 'text-amber-600', change: '' },
  { label: 'Reservasi', value: 0, icon: 'calendar_month', bg: 'bg-rose-50', text: 'text-rose-600', change: '' },
  { label: 'Pesan Masuk', value: 0, icon: 'mail', bg: 'bg-cyan-50', text: 'text-cyan-600', change: '' },
])

const recentBookings = ref<any[]>([])
const recentInquiries = ref<any[]>([])
const recentArticles = ref<any[]>([])
const loading = ref(true)

const quickActions = [
  { label: 'Artikel Baru', icon: 'edit_note', to: '/admin/articles/new', color: 'bg-violet-500' },
  { label: 'Layanan Baru', icon: 'add_notes', to: '/admin/services/new', color: 'bg-blue-500' },
  { label: 'Dokter Baru', icon: 'person_add', to: '/admin/doctors/new', color: 'bg-emerald-500' },
  { label: 'Galeri', icon: 'add_photo_alternate', to: '/admin/gallery', color: 'bg-amber-500' },
]

const bookingStatuses: Record<string, { label: string; color: string }> = {
  new: { label: 'Baru', color: 'bg-blue-100 text-blue-700' },
  confirmed: { label: 'Dikonfirmasi', color: 'bg-emerald-100 text-emerald-700' },
  completed: { label: 'Selesai', color: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-600' },
}

const inquiryStatuses: Record<string, { label: string; color: string }> = {
  new: { label: 'Baru', color: 'bg-blue-100 text-blue-700' },
  read: { label: 'Dibaca', color: 'bg-amber-100 text-amber-700' },
  contacted: { label: 'Dihubungi', color: 'bg-emerald-100 text-emerald-700' },
  resolved: { label: 'Selesai', color: 'bg-gray-100 text-gray-600' },
}

async function loadData() {
  loading.value = true

  const [services, doctors, articles, gallery, bookings, inquiries, recentArt] = await Promise.all([
    supabase.from('services').select('id', { count: 'exact', head: true }),
    supabase.from('doctors').select('id', { count: 'exact', head: true }),
    supabase.from('articles').select('id', { count: 'exact', head: true }),
    supabase.from('gallery_items').select('id', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(5),
    supabase.from('inquiries').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(5),
    supabase.from('articles').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(5),
  ])

  stats.value[0].value = services.count || 0
  stats.value[1].value = doctors.count || 0
  stats.value[2].value = articles.count || 0
  stats.value[3].value = gallery.count || 0
  stats.value[4].value = bookings.count || 0
  stats.value[5].value = inquiries.count || 0

  recentBookings.value = bookings.data || []
  recentInquiries.value = inquiries.data || []
  recentArticles.value = recentArt.data || []

  loading.value = false
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatRelative(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m lalu`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}j lalu`
  const days = Math.floor(hours / 24)
  return `${days}h lalu`
}

onMounted(loadData)
</script>

<template>
  <div>
    <!-- Welcome banner -->
    <div class="bg-gradient-to-r from-[#112675] to-[#1A265E] rounded-2xl p-4 md:p-6 mb-5 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-tech/10 rounded-full blur-[80px]"></div>
      <div class="relative z-10">
        <h1 class="font-display text-[20px] md:text-[24px] font-bold mb-2 text-white">
          Selamat datang, {{ auth.profile?.full_name || 'Admin' }} 👋
        </h1>
        <p class="font-body text-sm md:text-[15px] text-white/80 max-w-lg">
          Kelola konten website SEA Dental Aesthetics dari panel admin ini. Semua data diperbarui secara real-time.
        </p>
      </div>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-5">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-0.5 transition-all duration-300">
        <div :class="[stat.bg, 'w-9 h-9 rounded-lg flex items-center justify-center mb-3']">
          <span :class="['material-symbols-outlined text-lg', stat.text]">{{ stat.icon }}</span>
        </div>
        <p class="font-display text-[22px] font-bold text-gray-900 leading-none">{{ stat.value }}</p>
        <p class="font-body text-[11px] text-gray-500 mt-1">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="mb-5">
      <h2 class="font-display text-[14px] font-semibold text-gray-900 mb-3">Aksi Cepat</h2>
      <div class="flex flex-wrap gap-2">
        <router-link v-for="action in quickActions" :key="action.label" :to="action.to"
          class="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-gray-200 text-xs font-display font-medium text-gray-600 hover:border-primary hover:text-primary hover:shadow-sm transition-all duration-200">
          <span class="material-symbols-outlined text-base text-gray-400">{{ action.icon }}</span>
          {{ action.label }}
        </router-link>
      </div>
    </div>

    <!-- Tables grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Recent Bookings -->
      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div class="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-display text-[13px] font-semibold text-gray-900">Reservasi Terbaru</h3>
          <router-link to="/admin/bookings" class="text-[11px] font-display font-medium text-primary hover:text-cyan-tech transition-colors">
            Lihat Semua →
          </router-link>
        </div>
        <div class="divide-y divide-gray-50">
          <div v-if="recentBookings.length === 0 && !loading" class="px-5 py-10 text-center">
            <span class="material-symbols-outlined text-4xl text-gray-200 mb-2 block">calendar_month</span>
            <p class="text-xs text-gray-400 font-body">Belum ada reservasi</p>
          </div>
          <div v-for="booking in recentBookings" :key="booking.id"
            class="px-5 py-3 flex items-center gap-3 hover:bg-gray-50/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-rose-500 text-base">person</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] font-display font-medium text-gray-900 truncate">{{ booking.name }}</p>
              <p class="text-[11px] text-gray-400 font-body">{{ formatDate(booking.created_at) }}</p>
            </div>
            <span :class="[bookingStatuses[booking.status]?.color || 'bg-gray-100 text-gray-600',
              'text-[10px] font-display font-semibold px-2 py-0.5 rounded-full flex-shrink-0']">
              {{ bookingStatuses[booking.status]?.label || booking.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Recent Inquiries -->
      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div class="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-display text-[13px] font-semibold text-gray-900">Pesan Masuk</h3>
          <router-link to="/admin/inquiries" class="text-[11px] font-display font-medium text-primary hover:text-cyan-tech transition-colors">
            Lihat Semua →
          </router-link>
        </div>
        <div class="divide-y divide-gray-50">
          <div v-if="recentInquiries.length === 0 && !loading" class="px-5 py-10 text-center">
            <span class="material-symbols-outlined text-4xl text-gray-200 mb-2 block">mail</span>
            <p class="text-xs text-gray-400 font-body">Belum ada pesan</p>
          </div>
          <div v-for="inquiry in recentInquiries" :key="inquiry.id"
            class="px-5 py-3 flex items-center gap-3 hover:bg-gray-50/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-cyan-600 text-base">mail</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] font-display font-medium text-gray-900 truncate">{{ inquiry.name }}</p>
              <p class="text-[11px] text-gray-400 font-body truncate">{{ inquiry.subject || inquiry.message }}</p>
            </div>
            <span :class="[inquiryStatuses[inquiry.status]?.color || 'bg-gray-100 text-gray-600',
              'text-[10px] font-display font-semibold px-2 py-0.5 rounded-full flex-shrink-0']">
              {{ inquiryStatuses[inquiry.status]?.label || inquiry.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Recent Articles -->
      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div class="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-display text-[13px] font-semibold text-gray-900">Artikel Terbaru</h3>
          <router-link to="/admin/articles" class="text-[11px] font-display font-medium text-primary hover:text-cyan-tech transition-colors">
            Lihat Semua →
          </router-link>
        </div>
        <div class="divide-y divide-gray-50">
          <div v-if="recentArticles.length === 0 && !loading" class="px-5 py-10 text-center">
            <span class="material-symbols-outlined text-4xl text-gray-200 mb-2 block">article</span>
            <p class="text-xs text-gray-400 font-body">Belum ada artikel</p>
          </div>
          <div v-for="article in recentArticles" :key="article.id"
            class="px-5 py-3 flex items-center gap-3 hover:bg-gray-50/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-violet-500 text-base">article</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] font-display font-medium text-gray-900 truncate">{{ article.title }}</p>
              <p class="text-[11px] text-gray-400 font-body">{{ formatRelative(article.created_at) }}</p>
            </div>
            <span :class="[
              article.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700',
              'text-[10px] font-display font-semibold px-2 py-0.5 rounded-full flex-shrink-0']">
              {{ article.status === 'published' ? 'Published' : 'Draft' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
