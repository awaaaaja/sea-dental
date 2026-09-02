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
  { icon: 'camera', label: 'Instagram', href: 'https://www.instagram.com/seadentalaesthetics_/' },
  { icon: 'chat_bubble', label: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=6281366329279' },
  { icon: 'call', label: 'Telepon', href: 'tel:+6281366329279' },
  { icon: 'map', label: 'Google Maps', href: 'https://www.google.com/maps/place/SEA+dental+Aesthetics+padang/@-0.9448393,100.3738481,17z' },
]
</script>

<template>
  <footer class="mt-auto" style="background: #12265B;">
    <div class="max-w-[1200px] mx-auto px-4 md:px-6 pt-10 md:pt-12 pb-6">
      <!-- Top section: 4 columns -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pb-8 border-b border-white/10">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <img src="/references/logo_footer.png" alt="SEA Dental" class="h-14 mb-3">
          <p class="font-body text-[12px] text-white/45 leading-relaxed">Klinik Gigi Estetik Padang</p>
        </div>

        <!-- Navigasi -->
        <div class="col-span-1">
          <h4 class="font-display text-[11px] font-semibold text-white uppercase tracking-wider mb-3">Navigasi</h4>
          <div class="flex flex-col gap-1.5">
            <router-link
              v-for="link in quickLinks"
              :key="link.to"
              :to="link.to"
              class="font-body text-[13px] text-white/68 hover:text-cyan-tech transition-colors"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>

        <!-- Layanan -->
        <div class="col-span-1">
          <h4 class="font-display text-[11px] font-semibold text-white uppercase tracking-wider mb-3">Layanan</h4>
          <div class="flex flex-col gap-1.5">
            <span
              v-for="svc in services"
              :key="svc"
              class="font-body text-[13px] text-white/68"
            >
              {{ svc }}
            </span>
          </div>
        </div>

        <!-- Kontak -->
        <div class="col-span-1">
          <h4 class="font-display text-[11px] font-semibold text-white uppercase tracking-wider mb-3">Kontak</h4>
          <div class="flex flex-col gap-2">
            <component
              v-for="(info, i) in contactInfo"
              :key="i"
              :is="info.href ? 'a' : 'span'"
              :href="info.href"
              :target="info.href?.startsWith('http') ? '_blank' : undefined"
              class="flex items-start gap-1.5 font-body text-[12px] text-white/68 hover:text-cyan-tech transition-colors"
            >
              <span class="material-symbols-outlined text-[13px] mt-0.5">{{ info.icon }}</span>
              {{ info.text }}
            </component>
          </div>
        </div>
      </div>

      <!-- Middle section: Social -->
      <div class="py-8 border-b border-white/10">
        <!-- Social + CTA -->
        <div class="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h4 class="font-display text-[11px] font-semibold text-white uppercase tracking-wider mb-3">Hubungi Kami</h4>
            <p class="font-body text-[12px] text-white/45 mb-3">Butuh konsultasi? Kami siap membantu Anda.</p>
            <a @click.prevent="openBranchModal()"
              class="inline-flex items-center gap-2 bg-cyan-tech text-primary font-display text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-cyan-tech/90 transition-colors">
              <span class="material-symbols-outlined text-[14px]">event</span>
              Reservasi Sekarang
            </a>
          </div>
          <div class="flex gap-2">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              :aria-label="social.label"
              class="w-8 h-8 rounded-full flex items-center justify-center text-white/68 hover:bg-cyan-tech hover:text-primary transition-all duration-300"
              style="background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.10);"
            >
              <span class="material-symbols-outlined text-[15px]">{{ social.icon }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="flex flex-col md:flex-row justify-between items-center pt-5 gap-2">
        <p class="font-body text-[11px] text-white/45">
          &copy; {{ currentYear }} SEA Dental Aesthetics. All rights reserved.
        </p>
        <p class="font-body text-[11px] text-white/45">
          Made with <span class="text-cyan-tech">&#10084;</span> by
          <a href="https://ciphersinformatika.com/" target="_blank" class="text-cyan-tech hover:underline">Ciphers Informatika</a>
        </p>
      </div>
    </div>
  </footer>
</template>
