<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { supabase } from '@/utils/supabase'
import { useDoctors } from '@/composables/useDoctors'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

useSeo({
  title: 'Dokter',
  description: 'Tim dokter gigi spesialis SEA Dental Aesthetics. Berpengalaman dalam dental implants, smile design, dan perawatan estetik.',
  url: '/doctors',
})

const gridRef = ref<HTMLElement>()
const { doctors, loadDoctors } = useDoctors()

const hero = ref<any>(null)
async function loadHero() {
  const { data } = await supabase.from('page_heroes').select('*').eq('page_key', 'doctors').single()
  if (data) hero.value = data
}

onMounted(async () => {
  await loadHero()
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  await loadDoctors()
  await nextTick()
  if (gridRef.value) {
    gsap.fromTo(gridRef.value.querySelectorAll('.doctor-card'),
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
      :variant="hero?.variant || 'split'"
      :eyebrow="hero?.eyebrow || '04 / Doctors'"
      :title="hero?.title || 'Tim Dokter Kami'"
      :subtitle="hero?.subtitle || 'Dokter berpengalaman...'"
      :image="hero?.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80'"
      :imageAlt="hero?.image_alt || 'Dokter'"
      :badge="hero?.badge || 'Expert Team'"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Dokter' },
      ]"
    />

    <!-- DOCTORS GRID -->
    <section ref="gridRef" class="pt-10 md:pt-14 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
          <router-link
            v-for="doc in doctors"
            :key="doc.slug"
            :to="`/doctors/${doc.slug}`"
            class="doctor-card glass-panel rounded-2xl md:rounded-3xl p-6 md:p-10 glass-card-hover block group text-center"
          >
            <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/10 mx-auto mb-5 md:mb-7 overflow-hidden ring-2 ring-outline-variant/20 transition-all">
              <img :src="doc.photo_url" :alt="doc.name" class="w-full h-full object-cover" loading="lazy">
            </div>
            <h2 class="font-display text-[22px] md:text-[28px] leading-[1.3] font-semibold text-primary mb-1">{{ doc.name }}</h2>
            <p class="font-body text-[13px] md:text-sm text-cyan-tech font-medium mb-4">{{ doc.professional_title }}</p>
            <p class="font-body text-[14px] md:text-[15px] leading-[1.6] text-on-surface-variant mb-5">{{ doc.bio }}</p>
            <div class="flex flex-wrap justify-center gap-2 mb-4">
              <span v-for="s in (doc.specialization || '').split(',').slice(0, 3)" :key="s"
                class="px-3 py-1 rounded-full bg-cyan-tech/10 text-primary text-xs font-display font-semibold">
                {{ s.trim() }}
              </span>
            </div>
            <div class="flex items-center justify-center gap-2 text-primary group-hover:text-cyan-tech transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
              <span class="font-body text-sm font-medium">Instagram</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-10 md:py-16 bg-medical-bg">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6 text-center">
        <h2 class="font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mb-4">
          Ingin Konsultasi dengan Dokter Kami?
        </h2>
        <p class="font-body text-[15px] md:text-[16px] leading-[1.6] text-on-surface-variant mb-6 max-w-xl mx-auto">
          Buat janji temu sekarang untuk konsultasi langsung dengan dokter-dokter berpengalaman kami.
        </p>
        <div class="flex flex-wrap justify-center gap-3 md:gap-4">
          <a @click.prevent="openBranchModal()"
            class="bg-primary text-white font-display font-semibold text-[14px] md:text-[16px] px-6 py-3 md:px-8 md:py-4 rounded-full hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">event</span>
            Buat Janji Temu
          </a>
          <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank"
            class="glass-panel text-primary font-display font-semibold text-[14px] md:text-[16px] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-white/50 transition-all duration-300 active:scale-95 flex items-center gap-2 border-primary/20">
            <span class="material-symbols-outlined text-lg">chat_bubble</span>
            WhatsApp Kami
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
