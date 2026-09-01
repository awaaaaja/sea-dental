<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useLocations } from '@/composables/useLocations'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Lokasi',
  description: 'Lokasi klinik SEA Dental Aesthetics di Padang. Simpang Haru dan Baru - mudah dijangkau dengan parkir luas.',
  url: '/locations',
})

const gridRef = ref<HTMLElement>()
const { locations, loadLocations } = useLocations()

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  await loadLocations()
  await nextTick()
  if (gridRef.value) {
    gsap.fromTo(gridRef.value.querySelectorAll('.loc-card'),
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: gridRef.value, start: 'top 85%' },
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
      }
    )
  }
})
</script>

<template>
  <div>
    <!-- HERO -->
    <PageHero
      variant="split"
      eyebrow="04 / Our Clinic"
      title="Lokasi Kami"
      subtitle="Kunjungi klinik kami di lokasi yang strategis di kota Padang."
      :image="'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80'"
      :imageAlt="'Lokasi klinik SEA Dental'"
      :badge="'Find Us Here'"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Lokasi' },
      ]"
    />

    <!-- LOCATIONS GRID -->
    <section ref="gridRef" class="pt-10 md:pt-14 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
          <div v-for="loc in locations" :key="loc.id"
            class="loc-card glass-panel rounded-2xl md:rounded-3xl overflow-hidden glass-card-hover border-cyan-tech/10">
            <!-- Map embed -->
            <div class="h-48 md:h-56 bg-surface-container">
              <iframe
                v-if="loc.google_maps_url !== '#'"
                :src="`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2!2d100.4!3d-0.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjQnMDAuMCJTIDEwMMKwMjQnMDAuMCJF!5e0!3m2!1sid!2sid!4v1`"
                width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy"
                class="grayscale-[30%]">
              </iframe>
              <div v-else class="w-full h-full flex items-center justify-center bg-primary/5">
                <span class="material-symbols-outlined text-5xl text-primary/30">location_on</span>
              </div>
            </div>

            <div class="p-4 md:p-6">
              <h2 class="font-display text-[22px] md:text-[28px] leading-[1.3] font-semibold text-primary mb-2">
                Cabang {{ loc.name }}
              </h2>
              <p class="font-body text-[14px] md:text-[15px] leading-[1.6] text-on-surface-variant mb-5">
                {{ loc.description }}
              </p>

              <div class="space-y-3 mb-6">
                <div class="flex items-start gap-3">
                  <span class="material-symbols-outlined text-xl text-cyan-tech mt-0.5">location_on</span>
                  <p class="font-body text-[14px] text-on-surface-variant">{{ loc.address }}</p>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-xl text-cyan-tech">schedule</span>
                  <p class="font-body text-[14px] text-on-surface-variant">{{ loc.operating_hours }}</p>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-xl text-cyan-tech">call</span>
                  <a :href="`tel:${loc.phone}`" class="font-body text-[14px] text-primary hover:text-cyan-tech transition-colors">
                    {{ loc.phone }}
                  </a>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <a :href="loc.google_maps_url" target="_blank"
                  class="flex-1 py-3 rounded-xl bg-primary text-white font-display font-semibold text-sm text-center hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-base">map</span>
                  Lihat Peta
                </a>
                <a :href="loc.whatsapp" target="_blank"
                  class="flex-1 py-3 rounded-xl border border-primary text-primary font-display font-semibold text-sm text-center hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-base">chat_bubble</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-10 md:py-16 bg-medical-bg">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6 text-center">
        <h2 class="font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mb-4">
          Butuh Bantuan?
        </h2>
        <p class="font-body text-[15px] md:text-[16px] leading-[1.6] text-on-surface-variant mb-6 max-w-xl mx-auto">
          Hubungi kami untuk informasi lebih lanjut atau membuat janji temu.
        </p>
        <div class="flex flex-wrap justify-center gap-3 md:gap-4">
          <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank"
            class="bg-primary text-white font-display font-semibold text-[14px] md:text-[16px] px-6 py-3 md:px-8 md:py-4 rounded-full hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">chat_bubble</span>
            WhatsApp Kami
          </a>
          <a href="tel:+6281366329279"
            class="glass-panel text-primary font-display font-semibold text-[14px] md:text-[16px] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-white/50 transition-all duration-300 active:scale-95 flex items-center gap-2 border-primary/20">
            <span class="material-symbols-outlined text-lg">call</span>
            Telepon
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
