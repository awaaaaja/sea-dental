<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: '404 - Halaman Tidak Ditemukan',
  description: 'Halaman yang Anda cari tidak ditemukan.',
  url: '/404',
})
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-5">
    <div class="text-center">
      <div class="relative inline-block mb-8">
        <span class="font-display text-[120px] md:text-[180px] font-bold text-primary/5 leading-none select-none">404</span>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="material-symbols-outlined text-6xl md:text-8xl text-cyan-tech">search_off</span>
        </div>
      </div>
      <h1 class="font-display text-[24px] md:text-[32px] font-bold text-primary mb-3">Halaman Tidak Ditemukan</h1>
      <p class="font-body text-[15px] text-on-surface-variant mb-8 max-w-md mx-auto">
        Sepertinya halaman yang Anda cari sudah dipindahkan atau tidak tersedia.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <router-link to="/"
          class="px-6 py-3 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors">
          Kembali ke Beranda
        </router-link>
        <router-link to="/contact"
          class="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-display text-sm font-semibold hover:bg-gray-50 transition-colors">
          Hubungi Kami
        </router-link>
      </div>
    </div>
  </div>
</template>
