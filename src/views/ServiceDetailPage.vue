<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getServiceBySlug, services } from '@/data/services'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const contentRef = ref<HTMLElement>()

const service = computed(() => getServiceBySlug(route.params.slug as string))

if (service.value) {
  useSeo({
    title: service.value.name,
    description: service.value.shortDescription || service.value.description?.substring(0, 160),
    url: `/services/${service.value.slug}`,
  })
}

const otherServices = computed(() =>
  services.filter(s => s.slug !== route.params.slug).slice(0, 3)
)

onMounted(() => {
  if (contentRef.value) {
    gsap.fromTo(contentRef.value.querySelectorAll('.content-animate'),
      { y: 30, opacity: 0 },
      {
        scrollTrigger: { trigger: contentRef.value, start: 'top 85%' },
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      }
    )
  }
})
</script>

<template>
  <div v-if="service">
    <!-- HERO -->
    <PageHero
      variant="minimal"
      :title="service?.name || 'Detail Layanan'"
      :subtitle="service?.shortDesc"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Layanan', to: '/services' },
        { label: service?.name || 'Detail' },
      ]"
    />

    <!-- CONTENT -->
    <section ref="contentRef" class="pt-10 md:pt-14 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <!-- Main -->
          <div class="lg:col-span-2 space-y-8 md:space-y-12">
            <!-- Description -->
            <div class="content-animate">
              <h2 class="font-display text-[20px] md:text-[28px] leading-[1.3] font-semibold text-primary mb-4">Tentang {{ service.name }}</h2>
              <p class="font-body text-[15px] md:text-[16px] leading-[1.7] text-on-surface-variant">{{ service.fullDesc }}</p>
            </div>

            <!-- Benefits -->
            <div class="content-animate">
              <h2 class="font-display text-[20px] md:text-[28px] leading-[1.3] font-semibold text-primary mb-4">Manfaat</h2>
              <ul class="space-y-3">
                <li v-for="b in service.benefits" :key="b" class="flex items-start gap-3">
                  <span class="material-symbols-outlined text-cyan-tech text-lg mt-0.5">check_circle</span>
                  <span class="font-body text-[15px] md:text-[16px] leading-[1.6] text-on-surface-variant">{{ b }}</span>
                </li>
              </ul>
            </div>

            <!-- Treatments -->
            <div class="content-animate">
              <h2 class="font-display text-[20px] md:text-[28px] leading-[1.3] font-semibold text-primary mb-4">Jenis Perawatan</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div v-for="t in service.treatments" :key="t"
                  class="glass-panel rounded-xl p-4 flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary text-lg">medical_services</span>
                  <span class="font-body text-[14px] md:text-[15px] leading-[1.5] text-on-surface-variant">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-6">
            <!-- CTA Card -->
            <div class="content-animate glass-panel rounded-2xl p-6 sticky top-24">
              <h3 class="font-display text-[18px] md:text-[20px] font-semibold text-primary mb-3">Konsultasi Sekarang</h3>
              <p class="font-body text-[14px] leading-[1.6] text-on-surface-variant mb-5">
                Booking janji temu untuk konsultasi {{ service.name }} di SEA Dental Aesthetics.
              </p>
              <a href="https://booking.seadentalaesthetics.id/booking/register" target="_blank"
                class="block w-full bg-primary text-white font-display font-semibold text-[15px] text-center py-3 rounded-full hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 active:scale-95 mb-3">
                Buat Janji Temu
              </a>
              <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank"
                class="block w-full glass-panel text-primary font-display font-semibold text-[15px] text-center py-3 rounded-full hover:bg-white/50 transition-all duration-300 active:scale-95 border-primary/20">
                WhatsApp Kami
              </a>
              <div class="mt-5 pt-5 border-t border-glass-border space-y-2 text-sm text-on-surface-variant font-body">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-base">location_on</span>
                  <span>Jl. DR. Sutomo No. 4, Simpang Haru, Padang</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-base">schedule</span>
                  <span>Senin-Sabtu 11.00-21.00 WIB</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- OTHER SERVICES -->
    <section v-if="otherServices.length" class="py-12 md:py-20 bg-medical-bg">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <h2 class="font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mb-8 md:mb-12 text-center">
          Layanan Lainnya
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
          <router-link
            v-for="svc in otherServices"
            :key="svc.slug"
            :to="`/services/${svc.slug}`"
            class="glass-panel rounded-2xl p-4 glass-card-hover block group"
          >
            <div class="w-11 h-11 rounded-full bg-cyan-tech/15 flex items-center justify-center text-primary mb-3 group-hover:bg-cyan-tech/25 transition-colors">
              <span class="material-symbols-outlined text-lg">{{ svc.icon }}</span>
            </div>
            <h3 class="font-display text-[16px] md:text-[18px] font-semibold text-primary mb-2">{{ svc.name }}</h3>
            <p class="font-body text-[13px] md:text-[14px] leading-[1.6] text-on-surface-variant line-clamp-2">{{ svc.shortDesc }}</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>

  <!-- 404 -->
  <div v-else class="section-padding text-center">
    <div class="container-sea">
      <h1 class="display-lg text-primary mb-4">404</h1>
      <p class="font-body text-on-surface-variant mb-6">Layanan tidak ditemukan.</p>
      <router-link to="/services" class="bg-primary text-white font-display font-semibold px-6 py-3 rounded-full">
        Kembali ke Layanan
      </router-link>
    </div>
  </div>
</template>
