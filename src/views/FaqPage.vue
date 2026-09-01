<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useFaqs } from '@/composables/useFaqs'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'FAQ',
  description: 'Pertanyaan yang sering ditanyakan tentang SEA Dental Aesthetics. Biaya, jadwal, perawatan, dan informasi lainnya.',
  url: '/faq',
})

const listRef = ref<HTMLElement>()
const activeCategory = ref('all')

const { faqs, loadFaqs } = useFaqs()

const categories = computed(() => {
  const cats = new Set(faqs.value.map(f => f.category).filter(Boolean) as string[])
  return ['all', ...Array.from(cats)]
})

const filteredFaqs = computed(() =>
  activeCategory.value === 'all'
    ? faqs.value
    : faqs.value.filter(f => f.category === activeCategory.value)
)

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  await loadFaqs()
  await nextTick()
  if (listRef.value) {
    gsap.fromTo(listRef.value.querySelectorAll('.faq-item'),
      { y: 30, opacity: 0 },
      {
        scrollTrigger: { trigger: listRef.value, start: 'top 85%' },
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      }
    )
  }
})
</script>

<template>
  <div>
    <!-- HERO -->
    <PageHero
      eyebrow="FAQ"
      title="Pertanyaan Umum"
      subtitle="Jawaban cepat untuk pertanyaan yang sering diajukan seputar layanan kami."
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'FAQ' },
      ]"
    />

    <!-- FAQ LIST -->
    <section ref="listRef" class="pt-10 md:pt-14 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <!-- Category filters -->
        <div class="flex flex-wrap gap-2 mb-8 md:mb-12">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-4 py-2 rounded-full font-display text-sm font-semibold transition-all duration-300',
              activeCategory === cat
                ? 'bg-primary text-white'
                : 'bg-surface-container text-on-surface-variant hover:bg-primary/10'
            ]">
            {{ cat === 'all' ? 'Semua' : cat }}
          </button>
        </div>

        <!-- Accordion -->
        <div class="max-w-3xl mx-auto flex flex-col gap-3 md:gap-4">
          <details v-for="(faq, i) in filteredFaqs" :key="i"
            class="faq-item glass-panel rounded-xl md:rounded-2xl p-4 group bg-medical-bg">
            <summary class="flex justify-between items-center font-display text-[15px] md:text-[18px] leading-[1.4] font-semibold text-primary list-none gap-4 cursor-pointer">
              {{ faq.question }}
              <span class="material-symbols-outlined text-xl md:text-2xl transition-transform group-open:rotate-180 flex-shrink-0 text-cyan-tech">expand_more</span>
            </summary>
            <p class="font-body text-[14px] md:text-[16px] leading-[1.7] text-on-surface-variant mt-3 md:mt-4 pt-3 md:pt-4 border-t border-surface-container">
              {{ faq.answer }}
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-10 md:py-16 bg-medical-bg">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6 text-center">
        <h2 class="font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mb-4">
          Masih Punya Pertanyaan?
        </h2>
        <p class="font-body text-[15px] md:text-[16px] leading-[1.6] text-on-surface-variant mb-6 max-w-xl mx-auto">
          Jangan ragu untuk menghubungi kami. Tim kami siap membantu menjawab pertanyaan Anda.
        </p>
        <div class="flex flex-wrap justify-center gap-3 md:gap-4">
          <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank"
            class="bg-primary text-white font-display font-semibold text-[14px] md:text-[16px] px-6 py-3 md:px-8 md:py-4 rounded-full hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">chat_bubble</span>
            Tanya via WhatsApp
          </a>
          <router-link to="/contact"
            class="glass-panel text-primary font-display font-semibold text-[14px] md:text-[16px] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-white/50 transition-all duration-300 active:scale-95 flex items-center gap-2 border-primary/20">
            <span class="material-symbols-outlined text-lg">mail</span>
            Hubungi Kami
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
