<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Tentang Kami', to: '/about' },
  { label: 'Layanan', to: '/services' },
  { label: 'Dokter', to: '/doctors' },
  { label: 'Promo', to: '/promos' },
  { label: 'Galeri', to: '/gallery' },
  { label: 'Artikel', to: '/articles' },
  { label: 'Kontak', to: '/contact' },
]

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  document.body.style.overflow = mobileOpen.value ? 'hidden' : ''
}

function closeMobile() {
  mobileOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
    Skip to content
  </a>

  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 max-md:!bg-white max-md:!backdrop-blur-none max-md:!shadow-[0_2px_12px_rgba(16,36,92,0.08)]',
      scrolled
        ? 'glass-nav scrolled'
        : 'glass-nav',
    ]"
  >
    <div class="flex justify-between items-center px-4 py-3 max-w-[1200px] mx-auto md:px-5">
      <!-- Logo -->
      <router-link to="/" class="flex items-center -my-4" @click="closeMobile">
        <img
          class="h-16 md:h-20 w-auto object-contain"
          alt="SEA Dental Aesthetics Logo"
          src="/references/logo_navbar.png"
        >
      </router-link>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-1">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="font-display text-[13px] leading-none font-medium text-on-surface-variant hover:text-primary transition-all duration-200 px-2.5 py-1.5 rounded-md"
          active-class="!text-primary"
        >
          {{ link.label }}
        </router-link>
        <a
          @click.prevent="openBranchModal()"
          class="ml-2 bg-primary text-white font-display text-[12px] leading-none font-semibold px-4 py-2 rounded-full hover:bg-primary/90 hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[14px]">event</span>
          RESERVASI
        </a>
      </div>

      <!-- Mobile Hamburger -->
      <button
        class="md:hidden p-1.5 text-primary"
        aria-label="Toggle menu"
        @click="toggleMobile"
      >
        <span class="material-symbols-outlined text-[22px]">{{ mobileOpen ? 'close' : 'menu' }}</span>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="slide">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 top-[52px] z-[60] md:hidden"
        @click.self="closeMobile"
      >
        <div class="absolute inset-0 bg-white border-t border-gray-100 shadow-[0_8px_30px_rgba(16,36,92,0.12)]">
          <div class="flex flex-col p-5 gap-1">
            <router-link
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="font-display text-[15px] font-medium text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all duration-200 px-3 py-2.5 rounded-lg"
              active-class="!text-primary"
              @click="closeMobile"
            >
              {{ link.label }}
            </router-link>
            <a
              @click.prevent="openBranchModal(); closeMobile()"
              class="mt-3 bg-primary text-white font-display font-semibold text-[13px] text-center px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span class="material-symbols-outlined text-sm">event</span>
              RESERVASI
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-leave-active {
  pointer-events: none;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
