<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const sidebarOpen = ref(false)
const profileOpen = ref(false)

const navItems = [
  { to: '/admin', icon: 'dashboard', label: 'Dashboard', exact: true },
  { to: '/admin/heroes', icon: 'view_carousel', label: 'Hero Section' },
  { to: '/admin/services', icon: 'medical_services', label: 'Layanan' },
  { to: '/admin/doctors', icon: 'people', label: 'Dokter' },
  { to: '/admin/articles', icon: 'article', label: 'Artikel' },
  { to: '/admin/gallery', icon: 'photo_library', label: 'Galeri' },
  { to: '/admin/promos', icon: 'local_offer', label: 'Promo' },
  { to: '/admin/locations', icon: 'location_on', label: 'Lokasi' },
  { to: '/admin/faq', icon: 'help', label: 'FAQ' },
  { to: '/admin/testimonials', icon: 'star', label: 'Testimoni' },
  { to: '/admin/bookings', icon: 'calendar_month', label: 'Reservasi' },
  { to: '/admin/inquiries', icon: 'mail', label: 'Pesan Masuk' },
  { to: '/admin/settings', icon: 'settings', label: 'Pengaturan' },
]

function isActive(to: string, exact?: boolean) {
  if (exact) return route.path === to
  return route.path.startsWith(to)
}

async function handleLogout() {
  await auth.logout()
  router.push('/admin/login')
}

watch(() => route.path, () => {
  sidebarOpen.value = false
})
</script>

<template>
  <div class="min-h-screen bg-[#f0f4f8] flex">
    <!-- Mobile overlay -->
    <Transition name="fade">
      <div v-if="sidebarOpen" class="fixed inset-0 bg-black/50 z-40 lg:hidden" @click="sidebarOpen = false"></div>
    </Transition>

    <!-- Sidebar -->
    <aside :class="[
      'fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] flex flex-col transition-transform duration-300 lg:translate-x-0',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
      <!-- Gradient background -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#0a1a4a] via-[#112675] to-[#1A265E]"></div>

      <!-- Content -->
      <div class="relative flex flex-col h-full">
        <!-- Logo -->
        <div class="px-5 py-5 border-b border-white/10">
          <router-link to="/admin" class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-cyan-tech/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-cyan-tech text-xl">dentistry</span>
            </div>
            <div>
              <h1 class="font-display text-[14px] font-bold text-white leading-tight">SEA Dental</h1>
              <p class="font-body text-[10px] text-white/50 leading-tight">Admin Panel</p>
            </div>
          </router-link>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <router-link v-for="item in navItems" :key="item.to" :to="item.to"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-display font-medium transition-all duration-200',
              isActive(item.to, item.exact)
                ? 'bg-white/15 text-white shadow-lg shadow-cyan-tech/10'
                : 'text-white/60 hover:text-white hover:bg-white/8'
            ]">
            <span class="material-symbols-outlined text-xl" :class="isActive(item.to, item.exact) ? 'text-cyan-tech' : ''">
              {{ item.icon }}
            </span>
            {{ item.label }}
          </router-link>
        </nav>

        <!-- User section -->
        <div class="border-t border-white/10 p-3">
          <div class="relative">
            <button @click="profileOpen = !profileOpen"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/8 transition-colors">
              <div class="w-8 h-8 rounded-full bg-cyan-tech/20 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-cyan-tech text-lg">person</span>
              </div>
              <div class="flex-1 text-left min-w-0">
                <p class="text-[13px] font-display font-medium text-white truncate">
                  {{ auth.profile?.full_name || 'Admin' }}
                </p>
                <p class="text-[10px] text-white/50 capitalize">{{ auth.profile?.role?.replace('_', ' ') }}</p>
              </div>
              <span class="material-symbols-outlined text-white/40 text-lg">unfold_more</span>
            </button>

            <!-- Dropdown -->
            <Transition name="dropdown">
              <div v-if="profileOpen" class="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                <router-link to="/" target="_blank"
                  class="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  @click="profileOpen = false">
                  <span class="material-symbols-outlined text-lg text-gray-400">open_in_new</span>
                  Lihat Website
                </router-link>
                <button @click="handleLogout"
                  class="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <span class="material-symbols-outlined text-lg">logout</span>
                  Keluar
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-h-screen min-w-0">
      <!-- Top header -->
      <header class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
        <div class="flex items-center gap-4 px-4 md:px-6 h-16">
          <!-- Mobile menu toggle -->
          <button @click="sidebarOpen = true" class="lg:hidden text-gray-500 hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-2xl">menu</span>
          </button>

          <!-- Search -->
          <div class="flex-1 max-w-md">
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
              <input type="text" placeholder="Cari..."
                class="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 border-0 text-sm font-body text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-tech/30 focus:bg-white transition-all">
            </div>
          </div>

          <div class="flex items-center gap-2 ml-auto">
            <!-- Notifications -->
            <button class="relative p-2 rounded-xl text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors">
              <span class="material-symbols-outlined text-xl">notifications</span>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- User avatar (desktop) -->
            <div class="hidden md:flex items-center gap-2 pl-3 border-l border-gray-200">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-cyan-tech flex items-center justify-center">
                <span class="text-white text-xs font-display font-bold">
                  {{ (auth.profile?.full_name || 'A').charAt(0) }}
                </span>
              </div>
              <span class="text-sm font-display font-medium text-gray-700">{{ auth.profile?.full_name || 'Admin' }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-4 md:p-6 lg:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
