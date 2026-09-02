<script setup lang="ts">
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

const currentYear = new Date().getFullYear()

const quickLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang Kami', to: '/about' },
  { label: 'Layanan', to: '/services' },
  { label: 'Dokter', to: '/doctors' },
]

const services = [
  'Konservasi', 'Prosthodonti', 'Orthodonti', 'Periodonti', 'Paedodonti',
]

const contactInfo = [
  { icon: 'location_on', text: 'Padang: Jl. Dr. Sutomo No.4, Simpang Haru, Kota Padang, Sumatera Barat 25123' },
  { icon: 'location_on', text: 'Pekanbaru: Jl. Tuanku Tambusai Jl. Nangka No.124, Labuh Baru Tim., Kota Pekanbaru, Riau 28123' },
  { icon: 'schedule', text: 'Senin-Sabtu 11.00-21.00 WIB' },
  { icon: 'mail', text: 'seadentalaesthetics@gmail.com', href: 'mailto:seadentalaesthetics@gmail.com' },
  { icon: 'call', text: '+62813 6632 9279', href: 'tel:+6281366329279' },
]

const socials = [
  { icon: 'photo_camera', label: 'Instagram', href: 'https://www.instagram.com/seadentalaesthetics_/' },
  { icon: 'chat', label: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=6281366329279' },
  { icon: 'call', label: 'Telepon', href: 'tel:+6281366329279' },
  { icon: 'map', label: 'Google Maps', href: 'https://www.google.com/maps/place/SEA+dental+Aesthetics+padang/@-0.9448393,100.3738481,17z' },
]
</script>

<template>
  <footer class="mt-auto relative overflow-hidden" style="background: #0E1F4B;">
    <!-- subtle glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.03] blur-[80px] rounded-full pointer-events-none"></div>

    <div class="max-w-[1200px] mx-auto px-5 md:px-6 relative">
      <!-- Main grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6 py-8 md:py-10 border-b border-white/[0.07]">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <img src="/references/logo_footer.png" alt="SEA Dental" class="h-12 md:h-14 mb-2">
          <p class="font-display font-semibold text-white text-[13px] leading-tight">Klinik Gigi Estetik Padang</p>
          <p class="font-body text-[12px] text-white/45 leading-relaxed mt-1.5 max-w-[220px]">Perawatan gigi estetik modern untuk senyum sehat dan percaya diri.</p>
        </div>

        <!-- Navigasi -->
        <div>
          <h4 class="font-display text-[13px] font-semibold text-white tracking-wider uppercase mb-3">Navigasi</h4>
          <div class="flex flex-col gap-2">
            <router-link
              v-for="link in quickLinks"
              :key="link.to"
              :to="link.to"
              class="font-body text-[14px] text-white/60 hover:text-cyan-tech transition-colors leading-tight"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>

        <!-- Layanan -->
        <div>
          <h4 class="font-display text-[13px] font-semibold text-white tracking-wider uppercase mb-3">Layanan</h4>
          <div class="flex flex-col gap-2">
            <span
              v-for="svc in services"
              :key="svc"
              class="font-body text-[14px] text-white/60 leading-tight"
            >
              {{ svc }}
            </span>
          </div>
        </div>

        <!-- Kontak -->
        <div class="col-span-2 md:col-span-1">
          <h4 class="font-display text-[13px] font-semibold text-white tracking-wider uppercase mb-3">Kontak</h4>
          <div class="flex flex-col gap-2.5">
            <component
              v-for="(info, i) in contactInfo"
              :key="i"
              :is="info.href ? 'a' : 'span'"
              :href="info.href"
              :target="info.href?.startsWith('http') ? '_blank' : undefined"
              class="flex items-start gap-2 font-body text-[12px] leading-[1.5] text-white/60 hover:text-cyan-tech transition-colors"
            >
              <span class="material-symbols-outlined text-[16px] mt-0.5 flex-shrink-0 opacity-70">{{ info.icon }}</span>
              <span>{{ info.text }}</span>
            </component>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="py-6 md:py-7 border-b border-white/[0.07]">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
          <div class="flex-1">
            <h4 class="font-display text-[13px] font-semibold text-white tracking-wider uppercase">Hubungi Kami</h4>
            <p class="font-body text-[12px] text-white/45 mt-1">Butuh konsultasi? Kami siap membantu Anda.</p>
            <div class="flex flex-wrap gap-2.5 mt-3">
              <a @click.prevent="openBranchModal()"
                class="inline-flex items-center gap-1.5 bg-cyan-tech text-[#0E1F4B] font-display text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-white transition-colors cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">event</span>
                Reservasi Sekarang
              </a>
              <a href="https://api.whatsapp.com/send/?phone=6281366329279" target="_blank"
                class="inline-flex items-center gap-1.5 bg-white/5 text-white border border-white/15 font-display text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
                <span class="material-symbols-outlined text-[16px]">chat</span>
                WhatsApp Kami
              </a>
            </div>
          </div>
          <div class="flex gap-2 self-start md:self-center">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              :aria-label="social.label"
              class="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.06] border border-white/[0.08] text-white/60 hover:bg-cyan-tech hover:text-[#0E1F4B] hover:border-cyan-tech transition-all duration-200"
            >
              <span class="material-symbols-outlined text-[18px]">{{ social.icon }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="flex flex-col md:flex-row justify-between items-center py-4 gap-2">
        <p class="font-body text-[12px] text-white/35">
          &copy; {{ currentYear }} SEA Dental Aesthetics. All rights reserved.
        </p>
        <p class="font-body text-[12px] text-white/35">
          Made with <span class="text-cyan-tech">&#10084;</span> by
          <a href="https://ciphersinformatika.com/" target="_blank" class="text-cyan-tech hover:underline">Ciphers Informatika</a>
        </p>
      </div>
    </div>
  </footer>
</template>
