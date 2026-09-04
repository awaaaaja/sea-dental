<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import type { Article } from '@/composables/useArticles'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

const route = useRoute()
const router = useRouter()
const contentRef = ref<HTMLElement>()
const article = ref<Article | null>(null)
const relatedArticles = ref<Article[]>([])

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  const slug = route.params.slug as string
  const { data } = await supabase.from('articles').select('*').eq('slug', slug).single()
  article.value = data

  if (!article.value) {
    router.replace('/articles')
    return
  }

  useSeo({
    title: article.value.title,
    description: article.value.excerpt || article.value.content?.replace(/<[^>]*>/g, '').substring(0, 160),
    url: `/articles/${article.value.slug}`,
    type: 'article',
  })

  const { data: rels } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .neq('id', article.value.id)
    .order('created_at', { ascending: false })
    .limit(3)
  relatedArticles.value = rels || []

  if (!contentRef.value) return
  const animateItems = contentRef.value.querySelectorAll('.animate-item')
  if (!animateItems || animateItems.length === 0) return
  gsap.fromTo(animateItems,
    { y: 30, opacity: 0 },
    {
      scrollTrigger: { trigger: contentRef.value, start: 'top 85%' },
      y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
    }
  )
})
</script>

<template>
  <div v-if="article">
    <!-- HERO -->
    <PageHero
      eyebrow="03 / Knowledge Hub"
      :title="article.title"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Artikel', to: '/articles' },
        { label: article.title },
      ]"
    />

    <!-- CONTENT -->
    <section ref="contentRef" class="pt-10 md:pt-14 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <!-- Main content -->
          <article class="lg:col-span-8">
            <div class="mb-6">
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <span class="text-on-surface-variant text-sm font-body">{{ new Date(article.created_at).toLocaleDateString('id-ID') }}</span>
                <span class="text-on-surface-variant text-sm font-body">{{ article.read_time }}</span>
              </div>
              <h1 class="font-display text-[24px] md:text-[32px] lg:text-[40px] leading-[1.2] font-bold text-primary mb-4">
                {{ article.title }}
              </h1>
              <p class="font-body text-[15px] md:text-[17px] leading-[1.7] text-on-surface-variant">
                {{ article.excerpt }}
              </p>
            </div>

            <!-- Featured image -->
            <div class="rounded-2xl overflow-hidden mb-8 bg-surface-container">
              <img :src="article.cover_image" :alt="article.title" class="w-full aspect-[16/9] object-cover" loading="lazy">
            </div>

            <!-- Article body -->
            <div class="prose-custom font-body text-[15px] md:text-[16px] leading-[1.8] text-on-surface-variant"
              v-html="article.content"></div>

            <!-- Author -->
            <div class="mt-8 pt-6 border-t border-surface-container">
              <p class="font-body text-sm text-on-surface-variant">
                Ditulis oleh <span class="text-primary font-semibold">{{ article.author_name }}</span>
              </p>
            </div>

            <!-- CTA -->
            <div class="mt-8 glass-panel rounded-2xl p-4 md:p-6 text-center">
              <h3 class="font-display text-[18px] md:text-[22px] font-semibold text-primary mb-3">
                Tertarik dengan artikel ini?
              </h3>
              <p class="font-body text-[14px] md:text-[15px] text-on-surface-variant mb-5">
                Konsultasi gratis dengan dokter kami untuk mengetahui lebih lanjut.
              </p>
              <div class="flex flex-wrap justify-center gap-3">
                <a @click.prevent="openBranchModal()"
                  class="bg-primary text-white font-display font-semibold text-sm px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2">
                  <span class="material-symbols-outlined text-base">event</span>
                  Konsultasi Gratis
                </a>
                <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank"
                  class="glass-panel text-primary font-display font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/50 transition-all duration-300 active:scale-95 flex items-center gap-2 border-primary/20">
                  <span class="material-symbols-outlined text-base">chat_bubble</span>
                  WhatsApp Kami
                </a>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-4">
            <div class="lg:sticky lg:top-24">
              <h3 class="font-display text-[18px] md:text-[20px] font-semibold text-primary mb-5">Artikel Terkait</h3>
              <div class="flex flex-col gap-4">
                <router-link
                  v-for="rel in relatedArticles"
                  :key="rel.slug"
                  :to="`/articles/${rel.slug}`"
                  class="glass-panel rounded-xl p-4 glass-card-hover block group">
                  <div class="flex gap-3">
                    <div class="w-20 h-20 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                      <img :src="rel.cover_image" :alt="rel.title"
                        class="w-full h-full object-cover" loading="lazy">
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="font-display text-sm font-semibold text-primary mt-1 line-clamp-2 group-hover:text-cyan-tech transition-colors">
                        {{ rel.title }}
                      </h4>
                      <span class="text-xs text-on-surface-variant font-body mt-2 block">{{ new Date(rel.created_at).toLocaleDateString('id-ID') }}</span>
                    </div>
                  </div>
                </router-link>
              </div>

              <!-- Back -->
              <router-link to="/articles"
                class="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-primary/20 text-primary font-display text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                <span class="material-symbols-outlined text-base">arrow_back</span>
                Semua Artikel
              </router-link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.prose-custom :deep(h2) {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
@media (max-width: 768px) {
  .prose-custom :deep(h2) {
    font-size: 18px;
  }
}
.prose-custom :deep(ul),
.prose-custom :deep(ol) {
  margin-left: 1.25rem;
  margin-bottom: 1rem;
  list-style: disc;
}
.prose-custom :deep(ol) {
  list-style: decimal;
}
.prose-custom :deep(li) {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 0.5rem;
}
.prose-custom :deep(strong) {
  color: var(--color-primary);
  font-weight: 600;
}
.prose-custom :deep(p) {
  margin-bottom: 1rem;
}
</style>
