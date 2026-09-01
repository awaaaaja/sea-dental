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
  { icon: 'location_on', text: 'Jl. DR. Sutomo No. 4, Simpang Haru, Padang' },
  { icon: 'schedule', text: 'Senin-Sabtu 11.00-21.00 WIB' },
  { icon: 'mail', text: 'seadentalaesthetics@gmail.com', href: 'mailto:seadentalaesthetics@gmail.com' },
  { icon: 'call', text: '+62813 6632 9279', href: 'tel:+6281366329279' },
]

const socials = [
  { icon: 'camera', label: 'Instagram', href: 'https://www.instagram.com/seadentalaesthetics_/' },
  { icon: 'chat_bubble', label: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=6281266971089' },
  { icon: 'call', label: 'Telepon', href: 'tel:+6281366329279' },
  { icon: 'map', label: 'Google Maps', href: 'https://goo.gl/maps/LkT48FJyr2uuESkP8' },
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

      <!-- Middle section: Map + Social -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 border-b border-white/10">
        <!-- Map -->
        <div>
          <h4 class="font-display text-[11px] font-semibold text-white uppercase tracking-wider mb-3">Lokasi Kami</h4>
          <div class="rounded-xl overflow-hidden h-[160px] w-full max-w-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3549!2d100.39!3d-0.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b0f0!2sSEA+Dental!5e0!3m2!1sid!2sid!4v1"
              width="100%"
              height="100%"
              style="border:0; border-radius: 12px;"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <!-- Social + CTA -->
        <div class="flex flex-col justify-between">
          <div>
            <h4 class="font-display text-[11px] font-semibold text-white uppercase tracking-wider mb-3">Hubungi Kami</h4>
            <p class="font-body text-[12px] text-white/45 mb-3">Butuh konsultasi? Kami siap membantu Anda.</p>
            <a @click.prevent="openBranchModal()"
              class="inline-flex items-center gap-2 bg-cyan-tech text-primary font-display text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-cyan-tech/90 transition-colors">
              <span class="material-symbols-outlined text-[14px]">event</span>
              Reservasi Sekarang
            </a>
          </div>
          <div class="flex gap-2 mt-4">
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
