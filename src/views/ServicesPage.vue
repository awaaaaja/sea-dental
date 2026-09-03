<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { supabase } from '@/utils/supabase'
import { useServices } from '@/composables/useServices'
import { useSeo } from '@/composables/useSeo'
import PageHero from '@/components/PageHero.vue'
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

useSeo({
  title: 'Layanan',
  description: 'Layanan dental estetik SEA Dental Aesthetics: dental implants, smile design, veneer, teeth whitening, scaling, dan perawatan gigi modern lainnya.',
  url: '/services',
})

const gridRef = ref<HTMLElement>()
const { services, loadServices } = useServices()

const hero = ref<any>(null)
async function loadHero() {
  const { data } = await supabase.from('page_heroes').select('*').eq('page_key', 'services').single()
  if (data) hero.value = data
}

onMounted(async () => {
  await loadHero()
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  await loadServices()
  await nextTick()
  gsap.fromTo(gridRef.value?.querySelectorAll('.service-card') || [],
    { y: 30, opacity: 0 },
    {
      scrollTrigger: { trigger: gridRef.value, start: 'top 85%' },
      y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
    }
  )
})
</script>

<template>
  <div>
    <!-- HERO — Editorial -->
    <PageHero
      :variant="hero?.variant || 'split'"
      :eyebrow="hero?.eyebrow || '03 / Services'"
      :title="hero?.title || 'Layanan Kami'"
      :subtitle="hero?.subtitle || 'Perawatan gigi untuk senyum...'"
      :image="hero?.image || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80'"
      :imageAlt="hero?.image_alt || 'Layanan'"
      :badge="hero?.badge || 'Complete Care'"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Layanan' },
      ]"
    />

    <!-- SERVICES GRID -->
    <section ref="gridRef" class="pt-10 md:pt-14 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <router-link
            v-for="svc in services"
            :key="svc.slug"
            :to="`/services/${svc.slug}`"
            class="service-card glass-panel rounded-2xl p-5 md:p-6 glass-card-hover block group"
          >
            <div class="service-icon mb-4">
              <span class="material-symbols-outlined text-[22px]">{{ svc.icon }}</span>
            </div>
            <h3 class="font-display text-[17px] md:text-[20px] leading-[1.3] font-semibold text-primary mb-2">{{ svc.name }}</h3>
            <p class="font-body text-[13px] md:text-[14px] leading-[1.7] text-on-surface-variant">{{ svc.short_description }}</p>
            <div class="mt-4 flex items-center gap-1 text-primary font-display text-[13px] font-semibold group-hover:text-cyan-tech transition-colors">
              Selengkapnya
              <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-10 md:py-16 bg-medical-bg">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
        <h2 class="headline-md mb-3">
          Butuh Konsultasi?
        </h2>
        <p class="font-body text-[14px] md:text-[15px] leading-[1.7] text-on-surface-variant mb-6 max-w-xl mx-auto">
          Hubungi kami untuk membuat janji temu atau konsultasi gratis mengenai perawatan gigi Anda.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <a @click.prevent="openBranchModal()"
            class="bg-primary text-white font-display font-semibold text-[13px] px-6 py-2.5 rounded-full hover:bg-primary/90 hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px]">calendar_month</span>
            Buat Janji Temu
          </a>
          <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank"
            class="glass-panel text-primary font-display font-semibold text-[13px] px-6 py-2.5 rounded-full hover:bg-white/50 transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px]">chat</span>
            WhatsApp Kami
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
