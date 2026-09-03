<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { supabase } from '@/utils/supabase'
import { useGallery } from '@/composables/useGallery'
import GalleryLightbox from '@/components/GalleryLightbox.vue'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

useSeo({
  title: 'Galeri',
  description: 'Galeri foto SEA Dental Aesthetics - Lihat hasil perawatan gigi, fasilitas klinik, dan testimoni pasien.',
  url: '/gallery',
})

const gridRef = ref<HTMLElement>()
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const activeCategory = ref('all')

const hero = ref<any>(null)
async function loadHero() {
  const { data } = await supabase.from('page_heroes').select('*').eq('page_key', 'gallery').single()
  if (data) hero.value = data
}

const { items: galleryImages, loadGallery } = useGallery()

const galleryCategories = computed(() => {
  const cats = new Set(galleryImages.value.map(img => img.category).filter(Boolean) as string[])
  return [{ key: 'all', label: 'Semua' }, ...Array.from(cats).map(c => ({ key: c, label: c }))]
})

const filteredImages = computed(() =>
  activeCategory.value === 'all'
    ? galleryImages.value
    : galleryImages.value.filter(img => img.category === activeCategory.value || !img.category)
)

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

onMounted(async () => {
  await loadHero()
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  await loadGallery()
  await nextTick()
  if (gridRef.value) {
    gsap.fromTo(gridRef.value.querySelectorAll('.gallery-item'),
      { y: 40, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: { trigger: gridRef.value, start: 'top 85%' },
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out',
      }
    )
  }
})
</script>

<template>
  <div>
    <!-- HERO -->
    <PageHero
      :variant="hero?.variant || 'mosaic'"
      :eyebrow="hero?.eyebrow || '06 / Gallery'"
      :title="hero?.title || 'Galeri Kami'"
      :subtitle="hero?.subtitle || 'Dokumentasi perawatan...'"
      :image="hero?.image || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80'"
      :imageAlt="hero?.image_alt || 'Galeri'"
      :badge="hero?.badge || 'Precision You Can See'"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Galeri' },
      ]"
    >
      <template #mosaic-1>
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80"
          alt="Perawatan gigi"
          class="w-full h-full object-cover"
          loading="lazy"
        >
      </template>
      <template #mosaic-2>
        <img
          src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80"
          alt="Klinik gigi"
          class="w-full h-full object-cover"
          loading="lazy"
        >
      </template>
    </PageHero>

    <!-- GRID -->
    <section ref="gridRef" class="pt-10 md:pt-14 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <!-- Category filters -->
        <div class="flex flex-wrap gap-2 mb-8 md:mb-12">
          <button
            v-for="cat in galleryCategories"
            :key="cat.key"
            @click="activeCategory = cat.key"
            :class="[
              'px-4 py-2 rounded-full font-display text-sm font-semibold transition-all duration-300',
              activeCategory === cat.key
                ? 'bg-primary text-white'
                : 'bg-surface-container text-on-surface-variant hover:bg-primary/10'
            ]">
            {{ cat.label }}
          </button>
        </div>

        <!-- Image grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <button
            v-for="(img, i) in filteredImages"
            :key="img.id"
            @click="openLightbox(i)"
            class="gallery-item group relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-surface-container cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-tech">
            <img
              :src="img.image_url"
              :alt="img.title"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p class="text-white font-display text-xs md:text-sm font-semibold">{{ img.title }}</p>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-10 md:py-16 bg-medical-bg">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6 text-center">
        <h2 class="font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mb-4">
          Ingin Melihat Langsung?
        </h2>
        <p class="font-body text-[15px] md:text-[16px] leading-[1.6] text-on-surface-variant mb-6 max-w-xl mx-auto">
          Kunjungi klinik kami untuk melihat fasilitas dan teknologi terbaik yang kami gunakan.
        </p>
        <div class="flex flex-wrap justify-center gap-3 md:gap-4">
          <a @click.prevent="openBranchModal()"
            class="bg-primary text-white font-display font-semibold text-[14px] md:text-[16px] px-6 py-3 md:px-8 md:py-4 rounded-full hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">event</span>
            Buat Janji
          </a>
          <router-link to="/locations"
            class="glass-panel text-primary font-display font-semibold text-[14px] md:text-[16px] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-white/50 transition-all duration-300 active:scale-95 flex items-center gap-2 border-primary/20">
            <span class="material-symbols-outlined text-lg">location_on</span>
            Lihat Lokasi
          </router-link>
        </div>
      </div>
    </section>

    <!-- LIGHTBOX -->
    <GalleryLightbox
      :images="filteredImages"
      :current-index="lightboxIndex"
      :open="lightboxOpen"
      @close="lightboxOpen = false"
      @update:index="lightboxIndex = $event"
    />
  </div>
</template>
