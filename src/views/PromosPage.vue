<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { supabase } from '@/utils/supabase'
import { useSeo } from '@/composables/useSeo'
import { usePromos } from '@/composables/usePromos'
import PageHero from '@/components/PageHero.vue'
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

useSeo({
  title: 'Promo',
  description: 'Promo spesial SEA Dental Aesthetics - Diskon, paket perawatan, dan penawaran menarik lainnya untuk senyum sempurna Anda.',
  url: '/promos',
})

const gridRef = ref<HTMLElement>()
const { promos, loading, loadPromos } = usePromos()

const hero = ref<any>(null)
async function loadHero() {
  const { data } = await supabase.from('page_heroes').select('*').eq('page_key', 'promos').single()
  if (data) hero.value = data
}

onMounted(async () => {
  await loadHero()
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  await loadPromos()
  await nextTick()
  if (gridRef.value) {
    gsap.fromTo(gridRef.value?.querySelectorAll('.animate-item') || [],
      { y: 30, opacity: 0 },
      { scrollTrigger: { trigger: gridRef.value, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
    )
  }
})
</script>

<template>
  <div>
    <!-- HERO — Full Image -->
    <PageHero
      :variant="hero?.variant || 'split'"
      :eyebrow="hero?.eyebrow || '05 / Promos'"
      :title="hero?.title || 'Promo Spesial'"
      :subtitle="hero?.subtitle || 'Penawaran terbaik...'"
      :image="hero?.image || 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80'"
      :imageAlt="hero?.image_alt || 'Promo'"
      :badge="hero?.badge || 'Limited Offer'"
      :bgImage="hero?.image || 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80'"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Promo' },
      ]"
    />

    <!-- PROMOS GRID -->
    <section ref="gridRef" class="pt-12 md:pt-16 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <!-- Loading -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="i in 6" :key="i" class="rounded-2xl bg-surface-container animate-pulse h-[280px]"></div>
        </div>

        <!-- Empty -->
        <div v-else-if="promos.length === 0" class="text-center py-16">
          <span class="material-symbols-outlined text-5xl text-gray-200 mb-4 block">local_offer</span>
          <h3 class="font-display text-[18px] font-semibold text-gray-400 mb-2">Belum Ada Promo</h3>
          <p class="font-body text-[13px] text-gray-400">Promo terbaru akan segera hadir. Pantau terus!</p>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <router-link v-for="promo in promos" :key="promo.id" :to="`/promos/${promo.slug}`"
            class="animate-item glass-panel rounded-2xl overflow-hidden glass-card-hover block group">
            <div class="aspect-[16/10] overflow-hidden relative">
              <img :src="promo.image_url" :alt="promo.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                @error="($event.target as HTMLImageElement).src = '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_7.jpeg/screen.png'">
              <div class="absolute top-3 left-3 flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-display font-bold shadow-lg">{{ promo.discount_text }}</span>
                <span v-if="promo.is_featured" class="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-display font-bold shadow-lg">HOT</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-display text-[16px] font-semibold text-primary mb-1.5 group-hover:text-cyan-tech transition-colors">{{ promo.title }}</h3>
              <p class="font-body text-[12px] text-on-surface-variant line-clamp-2 mb-3">{{ promo.short_description }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span v-if="promo.original_price" class="font-body text-[12px] text-gray-400 line-through">Rp {{ promo.original_price.toLocaleString('id-ID') }}</span>
                  <span v-if="promo.promo_price" class="font-display text-[16px] font-bold text-primary">Rp {{ promo.promo_price.toLocaleString('id-ID') }}</span>
                  <span v-else class="font-display text-[16px] font-bold text-cyan-tech">GRATIS</span>
                </div>
                <span class="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- CTA -->
        <div class="mt-10 text-center">
          <div class="glass-panel rounded-2xl p-5 bg-medical-bg">
            <h3 class="font-display text-[18px] md:text-[22px] font-semibold text-primary mb-2">Tertarik dengan Promo Kami?</h3>
            <p class="font-body text-[13px] text-on-surface-variant mb-5 max-w-md mx-auto">Hubungi kami untuk informasi lebih lanjut atau langsung buat janji temu.</p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a @click.prevent="openBranchModal()"
                class="px-5 py-2.5 rounded-full bg-primary text-white font-display text-[13px] font-semibold hover:bg-primary/90 hover:shadow-lg transition-all duration-300">
                Buat Janji Temu
              </a>
              <router-link to="/contact"
                class="px-5 py-2.5 rounded-full border border-outline-variant text-on-surface-variant font-display text-[13px] font-semibold hover:bg-surface-container transition-colors">
                Hubungi Kami
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
