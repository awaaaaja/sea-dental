<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { supabase } from '@/utils/supabase'
import { useArticles } from '@/composables/useArticles'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

useSeo({
  title: 'Artikel',
  description: 'Artikel kesehatan gigi dan mulut dari SEA Dental Aesthetics. Tips perawatan gigi, informasi perawatan, dan berita klinik.',
  url: '/articles',
})

const gridRef = ref<HTMLElement>()
const activeCategory = ref('all')
const showCount = ref(6)
const hero = ref<any>(null)

async function loadHero() {
  const { data } = await supabase.from('page_heroes').select('*').eq('page_key', 'articles').single()
  if (data) hero.value = data
}

const { articles, categories, loadArticles, getCategoryName } = useArticles()

const articleCategories = computed(() => [
  { key: 'all', label: 'Semua' },
  ...categories.value.map(c => ({ key: c.id, label: c.name })),
])

const filteredArticles = computed(() =>
  activeCategory.value === 'all'
    ? articles.value
    : articles.value.filter(a => a.category_id === activeCategory.value)
)

const displayedArticles = computed(() =>
  filteredArticles.value.slice(0, showCount.value)
)

const hasMore = computed(() =>
  showCount.value < filteredArticles.value.length
)

function loadMore() {
  showCount.value += 3
}

onMounted(async () => {
  await Promise.all([loadArticles(), loadHero()])
})

watch(displayedArticles, async () => {
  await nextTick()
  if (gridRef.value) {
    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)
    const cards = gridRef.value.querySelectorAll('.article-card')
    if (cards.length === 0) return
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: gridRef.value, start: 'top 85%' },
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      }
    )
  }
}, { once: true })
</script>

<template>
  <div>
    <!-- HERO -->
    <PageHero
      :variant="hero?.variant || 'split'"
      :eyebrow="hero?.eyebrow || '03 / Knowledge Hub'"
      :title="hero?.title || 'Dental Knowledge'"
      :subtitle="hero?.subtitle || 'Informasi terpercaya untuk membantu Anda memahami dan menjaga kesehatan gigi.'"
      :image="hero?.image || 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80'"
      :imageAlt="hero?.image_alt || 'Artikel kesehatan gigi'"
      :badge="hero?.badge || 'Know Your Smile Better'"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Artikel' },
      ]"
    />

    <!-- ARTICLES GRID -->
    <section ref="gridRef" class="pt-10 md:pt-14 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <!-- Category filters -->
        <div class="flex flex-wrap gap-2 mb-8 md:mb-12">
          <button
            v-for="cat in articleCategories"
            :key="cat.key"
            @click="activeCategory = cat.key; showCount = 6"
            :class="[
              'px-4 py-2 rounded-full font-display text-sm font-semibold transition-all duration-300',
              activeCategory === cat.key
                ? 'bg-primary text-white'
                : 'bg-surface-container text-on-surface-variant hover:bg-primary/10'
            ]">
            {{ cat.label }}
          </button>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <router-link
            v-for="article in displayedArticles"
            :key="article.slug"
            :to="`/articles/${article.slug}`"
            class="article-card glass-panel rounded-2xl overflow-hidden glass-card-hover border-cyan-tech/10 block group">
            <div class="aspect-[16/10] bg-surface-container overflow-hidden">
              <img :src="article.cover_image" :alt="article.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy">
            </div>
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1 rounded-full bg-cyan-tech/10 text-primary text-xs font-display font-semibold">
                  {{ getCategoryName(article.category_id) }}
                </span>
                <span class="text-on-surface-variant text-xs font-body">{{ article.read_time }}</span>
              </div>
              <h3 class="font-display text-[16px] md:text-[18px] leading-[1.4] font-semibold text-primary mb-2 group-hover:text-cyan-tech transition-colors">
                {{ article.title }}
              </h3>
              <p class="font-body text-[13px] md:text-[14px] leading-[1.6] text-on-surface-variant mb-4 line-clamp-2">
                {{ article.excerpt }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-on-surface-variant text-xs font-body">{{ new Date(article.created_at).toLocaleDateString('id-ID') }}</span>
                <span class="text-primary text-sm font-display font-semibold flex items-center gap-1 group-hover:text-cyan-tech transition-colors">
                  Baca Selengkapnya
                  <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Load more -->
        <div v-if="hasMore" class="text-center mt-10 md:mt-14">
          <button @click="loadMore"
            class="glass-panel px-8 py-3 rounded-full text-primary font-display text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 border-primary/20">
            Lihat Semua Artikel
          </button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-10 md:py-16 bg-medical-bg">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6 text-center">
        <h2 class="font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mb-4">
          Tertarik dengan DSD?
        </h2>
        <p class="font-body text-[15px] md:text-[16px] leading-[1.6] text-on-surface-variant mb-6 max-w-xl mx-auto">
          Konsultasi gratis dengan dokter kami untuk mengetahui lebih lanjut tentang Digital Smile Design dan perawatan estetik lainnya.
        </p>
        <div class="flex flex-wrap justify-center gap-3 md:gap-4">
          <a @click.prevent="openBranchModal()"
            class="bg-primary text-white font-display font-semibold text-[14px] md:text-[16px] px-6 py-3 md:px-8 md:py-4 rounded-full hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">event</span>
            Konsultasi Gratis
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
