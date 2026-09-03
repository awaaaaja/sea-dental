<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, nextTick } from 'vue'
import GalleryLightbox from '@/components/GalleryLightbox.vue'
import { useSeo, localBusinessSchema } from '@/composables/useSeo'
import { usePromos } from '@/composables/usePromos'
import { useServices } from '@/composables/useServices'
import { useDoctors } from '@/composables/useDoctors'
import { useArticles } from '@/composables/useArticles'
import { useFaqs } from '@/composables/useFaqs'
import { useTestimonials } from '@/composables/useTestimonials'
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons'
const byPrefixAndName = { fab: { 'square-instagram': faSquareInstagram } } as const
import { useGallery } from '@/composables/useGallery'
import { useLocations } from '@/composables/useLocations'
import { useBranchModal } from '@/composables/useBranchModal'
import { supabase } from '@/utils/supabase'

const { open: openBranchModal } = useBranchModal()

useSeo({
  title: 'Beranda',
  description: 'SEA Dental Aesthetics - Klinik gigi estetik premium di Padang. Dental implants, smile design, veneer, dan perawatan gigi modern dengan teknologi terkini.',
  url: '/',
  structuredData: localBusinessSchema,
})

// ponytail: GSAP lazy loaded in onMounted

const heroRef = ref<HTMLElement>()
const statsRef = ref<HTMLElement>()
const whyRef = ref<HTMLElement>()
const doctorsRef = ref<HTMLElement>()
const promosRef = ref<HTMLElement>()
const galleryRef = ref<HTMLElement>()
const testimonialsRef = ref<HTMLElement>()
const testimonialsCarouselRef = ref<HTMLElement>()
const partnersRef = ref<HTMLElement>()
const articlesRef = ref<HTMLElement>()
const faqRef = ref<HTMLElement>()
const locationsRef = ref<HTMLElement>()
const ctaRef = ref<HTMLElement>()

const { promos, loading: promosLoading, loadPromos } = usePromos()
const { services, loadServices } = useServices()
const { doctors, loadDoctors } = useDoctors()
const { articles, loadArticles } = useArticles()
const { faqs, loadFaqs } = useFaqs()
const { testimonials, loadTestimonials } = useTestimonials()
const { items: galleryImages, loadGallery } = useGallery()
const { loadLocations } = useLocations()

const showcaseVideoUrl = ref('/showcase-video.mp4')
const hero = ref<any>(null)
async function loadHero() {
  const { data } = await supabase.from('page_heroes').select('*').eq('page_key', 'beranda').single()
  if (data) hero.value = data
}

// Hero slideshow
const heroSlides = [
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=75',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=75',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=75',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=75',
  'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=75',
]
const heroIndex = ref(0)
let heroInterval: ReturnType<typeof setInterval>

function startHeroSlideshow() {
  heroInterval = setInterval(() => {
    heroIndex.value = (heroIndex.value + 1) % heroSlides.length
  }, 4500)
}

const stats = ref([
  { value: '0', label: 'Dokter', icon: 'group' },
  { value: '0', label: 'Layanan', icon: 'medical_services' },
  { value: '0', label: 'Artikel', icon: 'article' },
  { value: '0', label: 'Galeri', icon: 'photo_library' },
])

const featuredServices = [
  { num: '01', icon: 'healing', title: 'Penambalan Estetik', desc: 'Teknik penambalan gigi dengan hasil menyerupai bentuk gigi asli, baik dari segi warna, transparansi dan detail fisik lainnya dengan menggunakan bahan tambalan modern.' },
  { num: '02', icon: 'straighten', title: 'Perawatan Kawat Gigi', desc: 'Teknik menggerakan gigi dan merapikan susunan gigi dalam lengkung rahang dengan tujuan untuk memperbaiki penampilan dan fungsi gigi.' },
  { num: '03', icon: 'medical_services', title: 'Pembuatan Gigi Tiruan', desc: 'Alat prostetik yang dirancang untuk menggantikan gigi yang hilang yang didukung oleh jaringan keras dan lunak didalam rongga mulut.' },
]

const allServices = computed(() => {
  const dynamicServices = services.value.map((svc, idx) => ({
    num: String(featuredServices.length + idx + 1).padStart(2, '0'),
    icon: svc.icon,
    title: svc.name,
    desc: svc.short_description,
  }))
  return [...featuredServices, ...dynamicServices]
})

const whyChooseSea = [
  { num: '01', icon: 'emoji_events', title: 'Dokter Berpengalaman', desc: 'Tim dokter berpengalaman dengan keahlian dan sertifikasi profesional.' },
  { num: '02', icon: 'precision_manufacturing', title: 'Teknologi Modern', desc: 'Peralatan diagnostik dan perawatan modern untuk hasil yang presisi.' },
  { num: '03', icon: 'favorite', title: 'Pelayanan Personal', desc: 'Perawatan disesuaikan dengan kebutuhan dan kondisi setiap pasien.' },
  { num: '04', icon: 'spa', title: 'Klinik Nyaman', desc: 'Lingkungan bersih, modern, dan dirancang untuk membuat Anda lebih nyaman.' },
]

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

let testimonialAutoScroll: ReturnType<typeof setInterval> | null = null

const partners = [
  { name: '3M', svg: `<svg viewBox="0 0 110 36" class="h-6 md:h-8 w-auto"><text x="0" y="28" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="32" fill="currentColor">3M</text></svg>` },
  { name: 'Straumann', svg: `<svg viewBox="0 0 200 36" class="h-6 md:h-8 w-auto"><text x="0" y="22" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="16" letter-spacing="3" fill="currentColor">STRAUMANN</text><line x1="0" y1="30" x2="200" y2="30" stroke="currentColor" stroke-width="1.5"/></svg>` },
  { name: 'Invisalign', svg: `<svg viewBox="0 0 200 36" class="h-6 md:h-8 w-auto"><text x="0" y="24" font-family="Georgia, serif" font-weight="400" font-size="17" letter-spacing="1" fill="currentColor">invisalign</text><circle cx="175" cy="14" r="4" fill="none" stroke="currentColor" stroke-width="1"/><line x1="178" y1="17" x2="182" y2="22" stroke="currentColor" stroke-width="1.2"/></svg>` },
  { name: 'Dentsply', svg: `<svg viewBox="0 0 240 36" class="h-6 md:h-8 w-auto"><text x="0" y="24" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="16" letter-spacing="1.5" fill="currentColor">DENTSPLY SIRONA</text></svg>` },
  { name: 'GC', svg: `<svg viewBox="0 0 80 36" class="h-6 md:h-8 w-auto"><text x="0" y="28" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="32" fill="currentColor">GC</text></svg>` },
  { name: 'Ivoclar', svg: `<svg viewBox="0 0 160 36" class="h-6 md:h-8 w-auto"><text x="0" y="24" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="18" letter-spacing="2" fill="currentColor">IVOCLAR</text><text x="0" y="34" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="8" letter-spacing="1" fill="currentColor">VIVADENT</text></svg>` },
]

async function loadStats() {
  const [doctors, services, articles, gallery] = await Promise.all([
    supabase.from('doctors').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('services').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('gallery_items').select('id', { count: 'exact', head: true }).eq('status', 'published'),
  ])
  stats.value[0].value = String(doctors.count || 0)
  stats.value[1].value = String(services.count || 0)
  stats.value[2].value = String(articles.count || 0)
  stats.value[3].value = String(gallery.count || 0)
}

async function loadShowcaseVideo() {
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'showcase_video_url').single()
  if (data?.value) showcaseVideoUrl.value = data.value
}

onMounted(async () => {
  // ponytail: don't block initial render on API - load in background
  Promise.all([
    loadStats(),
    loadPromos(),
    loadServices(),
    loadDoctors(),
    loadArticles(),
    loadFaqs(),
    loadTestimonials(),
    loadGallery(),
    loadLocations(),
    loadShowcaseVideo(),
    loadHero(),
  ])
  startHeroSlideshow()
  await nextTick()

  // ponytail: lazy load GSAP
  const gsapModule = await import('gsap')
  const gsap = gsapModule.default || gsapModule.gsap
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Testimonials auto-scroll (mobile)
  if (testimonialsCarouselRef.value) {
    const startTestimonialScroll = () => setInterval(() => {
      const el = testimonialsCarouselRef.value
      if (!el) return
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 280, behavior: 'smooth' })
      }
    }, 3500)
    testimonialAutoScroll = startTestimonialScroll()
    testimonialsCarouselRef.value.addEventListener('mouseenter', () => {
      if (testimonialAutoScroll) clearInterval(testimonialAutoScroll)
    })
    testimonialsCarouselRef.value.addEventListener('mouseleave', () => {
      testimonialAutoScroll = startTestimonialScroll()
    })
  }

  // IntersectionObserver for why-animate (bento + why cards)
  const whyEls = document.querySelectorAll('.why-animate')
  let whyDelay = 0
  const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), whyDelay)
        whyDelay += 80
        whyObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })
  whyEls.forEach(el => whyObserver.observe(el))

  // IntersectionObserver for doc-animate
  const docEls = document.querySelectorAll('.doc-animate')
  const docObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        docObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })
  docEls.forEach(el => docObserver.observe(el))

  // IntersectionObserver for stat-animate
  const statEls = document.querySelectorAll('.stat-card')
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        statObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })
  statEls.forEach(el => statObserver.observe(el))

  const mm = gsap.matchMedia()

  // Hero animation
  if (!heroRef.value) return
  const heroItems = heroRef.value.querySelectorAll('.hero-animate')
  if (!heroItems || heroItems.length === 0) return
  gsap.fromTo(heroItems,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
  )

  // Section reveals
  const sectionRefs = [statsRef, whyRef, doctorsRef, promosRef, galleryRef, testimonialsRef, partnersRef, articlesRef, faqRef, locationsRef, ctaRef]
  sectionRefs.forEach((sectionRef) => {
    if (!sectionRef.value) return
    const items = sectionRef.value.querySelectorAll('.animate-item')
    if (items.length === 0) return
    gsap.fromTo(items,
      { y: 25, opacity: 0 },
      {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 85%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power2.out',
      }
    )
  })

  // Stats counter only (CSS handles reveal)
  mm.add('(min-width: 768px)', () => {
    const statNumbers = statsRef.value?.querySelectorAll('.stat-number')
    if (!statNumbers || statNumbers.length === 0) return
    statNumbers.forEach((el) => {
      const target = parseInt(el.textContent || '0', 10)
      if (target === 0) return
      el.textContent = '0'
      gsap.to(el, {
        scrollTrigger: { trigger: statsRef.value, start: 'top 85%' },
        textContent: target, duration: 1.5, snap: { textContent: 1 }, ease: 'power1.inOut',
      })
    })
  })

  // Gallery mosaic stagger
  mm.add('(min-width: 768px)', () => {
    const galleryItems = galleryRef.value?.querySelectorAll('.gallery-item')
    if (!galleryItems || galleryItems.length === 0) return
    gsap.fromTo(galleryItems,
        { y: 25, opacity: 0, scale: 0.92 },
        { scrollTrigger: { trigger: galleryRef.value, start: 'top 80%' }, y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: { amount: 0.5, from: 'random' }, ease: 'power2.out' }
      )
  })

  // Testimonials perspective flip
  mm.add('(min-width: 768px)', () => {
    const testimonialCards = testimonialsRef.value?.querySelectorAll('.testimonial-card')
    if (!testimonialCards || testimonialCards.length === 0) return
    gsap.fromTo(testimonialCards,
        { rotateY: 12, opacity: 0, transformPerspective: 600 },
        { scrollTrigger: { trigger: testimonialsRef.value, start: 'top 80%' }, rotateY: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      )
  })

  // Partners scrub
  mm.add('(min-width: 768px)', () => {
    const partnersTrack = partnersRef.value?.querySelector('.partners-track')
    if (partnersTrack) {
      gsap.fromTo(partnersTrack,
        { x: '8%' },
        { scrollTrigger: { trigger: partnersRef.value, start: 'top 90%', end: 'bottom top', scrub: 1 }, x: '-8%', ease: 'none' }
      )
    }
  })

  // FAQ slide
  mm.add('(min-width: 768px)', () => {
    const faqItems = faqRef.value?.querySelectorAll('.faq-item')
    if (!faqItems || faqItems.length === 0) return
    gsap.fromTo(faqItems,
        { x: -15, opacity: 0 },
        { scrollTrigger: { trigger: faqRef.value, start: 'top 80%' }, x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out' }
      )
  })

})

onUnmounted(() => {
  clearInterval(heroInterval)
  if (testimonialAutoScroll) clearInterval(testimonialAutoScroll)
})
</script>

<template>
  <div>
    <!-- HERO — Full Image Slideshow -->
    <header ref="heroRef" class="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      <!-- Slideshow background -->
      <div class="absolute inset-0 z-0">
        <template v-for="(slide, i) in heroSlides" :key="i">
          <div
            class="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            :class="i === heroIndex ? 'opacity-100' : 'opacity-0'"
          >
            <img :src="slide" alt="" class="w-full h-full object-cover" loading="eager">
          </div>
        </template>
        <div class="absolute inset-0 bg-gradient-to-r from-[#10245C]/90 via-[#10245C]/70 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#10245C]/40 via-transparent to-transparent"></div>
      </div>

      <!-- Content -->
      <div class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10 w-full py-20">
        <div class="max-w-xl">
          <div class="hero-animate inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 w-fit mb-5">
            <span class="material-symbols-outlined text-cyan-tech text-xs icon-fill">verified</span>
            <span class="font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-white/90 uppercase">{{ hero?.eyebrow || 'Klinik Gigi Estetik Padang' }}</span>
          </div>
          <h1 class="hero-animate font-display text-[32px] leading-[1.1] font-bold sm:text-[42px] md:text-[56px] md:leading-[1.05] text-white mb-5">
            {{ hero?.title || 'Selamat Datang di' }}<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-tech">SEA Dental Aesthetics</span>
          </h1>
          <p class="hero-animate font-body text-[15px] md:text-[17px] leading-[1.7] text-white/70 max-w-lg mb-7">
            {{ hero?.subtitle || 'Klinik gigi estetik di kota Padang yang berorientasi pada tindakan estetik kedokteran gigi. Mengutamakan pelayanan interaktif dan komunikatif antara dokter dan pasien.' }}
          </p>
          <div class="hero-animate flex flex-wrap gap-3">
            <a @click.prevent="openBranchModal()"
              class="bg-cyan-tech text-[#10245C] font-display font-bold text-[13px] px-6 py-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">calendar_month</span>
              Buat Janji Temu
            </a>
            <a href="/promos"
              class="bg-white/10 backdrop-blur-sm text-white font-display font-semibold text-[13px] px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 active:scale-95 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px]">local_offer</span>
              Promo Kami
            </a>
          </div>
        </div>

        <!-- Slide indicators -->
        <div class="hero-animate absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            v-for="(_, i) in heroSlides"
            :key="i"
            @click="heroIndex = i"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="i === heroIndex ? 'bg-cyan-tech w-6' : 'bg-white/40 hover:bg-white/60'"
          />
        </div>
      </div>
    </header>

    <!-- STATS -->
    <section ref="statsRef" class="py-4 md:py-5 bg-white">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(stat, idx) in stats" :key="stat.label"
            class="stat-card flex items-center justify-center gap-2.5"
            :style="{ '--i': idx }">
            <div class="stat-icon-wrap">
              <span class="material-symbols-outlined">{{ stat.icon }}</span>
            </div>
            <div>
              <p class="stat-number font-display text-[20px] md:text-[24px] leading-[1.1] font-bold text-[#18327A]">{{ stat.value }}</p>
              <p class="font-body text-[11px] text-[#64748B]">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROMOS -->
    <section ref="promosRef" class="py-10 md:py-14 relative overflow-hidden" id="promo" style="background: linear-gradient(135deg, #2A5AA0 0%, #1E3D7A 55%, #10245C 100%);">
      <div class="absolute top-[-15%] right-[5%] w-[40%] h-[60%] rounded-full bg-white/[0.04] blur-[80px] pointer-events-none"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[30%] h-[40%] rounded-full bg-cyan-tech/[0.06] blur-[60px] pointer-events-none"></div>
      <div class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-white">Penawaran Terbaik untuk Senyum Anda</h2>
          <p class="animate-item font-body text-[13px] md:text-[14px] text-white/60 mt-2 max-w-lg mx-auto">Jangan lewatkan promo menarik dari SEA Dental Aesthetics</p>
        </div>

        <div v-if="promosLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" class="rounded-2xl bg-white/10 animate-pulse h-[220px]"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <router-link v-for="promo in promos.slice(0, 4)" :key="promo.id" :to="`/promos/${promo.slug}`"
            class="animate-item group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-cyan-tech/40 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div class="aspect-[16/10] overflow-hidden">
              <img :src="promo.image_url" :alt="promo.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                @error="($event.target as HTMLImageElement).src = '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_7.jpeg/screen.png'">
            </div>
            <div class="p-3">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="px-2 py-0.5 rounded-full bg-cyan-tech/20 text-cyan-tech text-[10px] font-display font-bold uppercase">{{ promo.discount_text }}</span>
                <span v-if="promo.is_featured" class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-display font-bold">HOT</span>
              </div>
              <h3 class="font-display text-[13px] font-semibold text-white mb-1 line-clamp-1">{{ promo.title }}</h3>
              <p class="font-body text-[11px] text-white/50 line-clamp-2">{{ promo.short_description }}</p>
              <div class="flex items-center gap-2 mt-2">
                <span v-if="promo.original_price" class="font-body text-[10px] text-white/30 line-through">Rp {{ promo.original_price.toLocaleString('id-ID') }}</span>
                <span v-if="promo.promo_price" class="font-display text-[12px] font-bold text-cyan-tech">Rp {{ promo.promo_price.toLocaleString('id-ID') }}</span>
                <span v-else class="font-display text-[12px] font-bold text-cyan-tech">GRATIS</span>
              </div>
            </div>
          </router-link>
        </div>

        <div class="text-center mt-6 md:mt-8">
          <router-link to="/promos"
            class="animate-item inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-white/20 text-white font-display text-[12px] font-semibold hover:bg-white/10 transition-colors">
            Lihat Semua Promo
            <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- LAYANAN KAMI — Bento Grid -->
    <section ref="whyRef" class="py-14 md:py-20 bg-white" id="layanan">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="text-center mb-10 md:mb-14">
          <h2 class="why-animate font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.15] font-bold text-[#18327A]">Perawatan Gigi untuk Senyum yang Lebih Sehat</h2>
        </div>
        <!-- Top: Featured bento (1 large + 2 small) -->
        <div class="bento-grid mb-5">
          <router-link to="/services"
            class="bento-card bento-featured group block">
            <span class="bento-num">{{ allServices[0].num }}</span>
            <span class="bento-icon"><span class="material-symbols-outlined">{{ allServices[0].icon }}</span></span>
            <div class="bento-content">
              <h3 class="font-display text-[20px] md:text-[24px] lg:text-[28px] leading-[1.2] font-bold text-[#18327A] mb-3">{{ allServices[0].title }}</h3>
              <p class="font-body text-[14px] md:text-[15px] leading-[1.7] text-[#64748B] mb-6">{{ allServices[0].desc }}</p>
              <span class="bento-link">Pelajari layanan <span class="bento-arrow">→</span></span>
            </div>
          </router-link>
          <div class="bento-stack">
            <router-link v-for="svc in allServices.slice(1, 3)" :key="svc.num" to="/services"
              class="bento-card bento-small group block">
              <span class="bento-num">{{ svc.num }}</span>
              <span class="bento-icon"><span class="material-symbols-outlined">{{ svc.icon }}</span></span>
              <div class="bento-content">
                <h3 class="font-display text-[16px] md:text-[18px] leading-[1.3] font-semibold text-[#18327A] mb-2">{{ svc.title }}</h3>
                <p class="font-body text-[13px] leading-[1.7] text-[#64748B]">{{ svc.desc }}</p>
                <span class="bento-link mt-4">Lihat detail <span class="bento-arrow">→</span></span>
              </div>
            </router-link>
          </div>
        </div>
        <!-- Bottom: 2 services + Lihat Semua -->
        <div class="bento-grid-bottom">
          <router-link v-for="svc in allServices.slice(3, 5)" :key="svc.num" to="/services"
            class="bento-card bento-bottom group block">
            <span class="bento-num">{{ svc.num }}</span>
            <span class="bento-icon"><span class="material-symbols-outlined">{{ svc.icon }}</span></span>
            <div class="bento-content">
              <h3 class="font-display text-[15px] md:text-[17px] leading-[1.3] font-semibold text-[#18327A] mb-1.5">{{ svc.title }}</h3>
              <p class="font-body text-[12px] leading-[1.7] text-[#64748B]">{{ svc.desc }}</p>
            </div>
          </router-link>
          <router-link to="/services"
            class="bento-card bento-see-all group block">
            <span class="material-symbols-outlined bento-see-all-icon">arrow_forward</span>
            <h3 class="font-display text-[15px] md:text-[17px] leading-[1.3] font-semibold text-[#18327A]">Lihat Semua</h3>
            <p class="font-body text-[12px] leading-[1.7] text-[#64748B]">Layanan Kami</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- KENAPA MEMILIH SEA -->
    <section class="py-14 md:py-20 bg-white border-b border-gray-100">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="text-center mb-10 md:mb-14">
          <h2 class="why-animate font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.15] font-bold text-[#18327A]">Perawatan yang Mengutamakan Anda</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 md:gap-8 items-center">
          <!-- Left: Showcase video -->
          <div class="why-animate flex justify-center">
            <div class="w-full max-w-[320px] md:max-w-[360px] rounded-2xl overflow-hidden shadow-xl">
              <video
                :src="showcaseVideoUrl"
                autoplay
                muted
                loop
                playsinline
                preload="none"
                poster="/cta-clinic.png"
                class="w-full aspect-[9/16] object-cover"
              ></video>
            </div>
          </div>
          <!-- Right: Why choose cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="(item, idx) in whyChooseSea" :key="item.num"
              class="why-animate why-card group"
              :class="{ 'why-card-accent': idx === 0 }"
              :data-num="item.num">
              <div class="flex items-center justify-between mb-3">
                <span class="why-num">{{ item.num }}</span>
                <span class="why-card-icon"><span class="material-symbols-outlined">{{ item.icon }}</span></span>
              </div>
              <h3 class="font-display text-[15px] md:text-[16px] leading-[1.3] font-bold text-[#18327A] mb-1.5">{{ item.title }}</h3>
              <p class="font-body text-[12px] leading-[1.6] text-[#64748B] mb-4">{{ item.desc }}</p>
              <span class="why-link">Pelajari <span class="why-arrow">→</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TIM DOKTER KAMI -->
    <section ref="doctorsRef" class="py-14 md:py-20 bg-medical-bg" id="dokter">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="text-center mb-10 md:mb-14">
          <h2 class="doc-animate font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.15] font-bold text-[#18327A]">Dokter Berpengalaman Terbaik</h2>
        </div>
        <!-- Desktop: 1 row horizontal cards -->
        <div class="hidden md:flex gap-5">
          <router-link v-for="(doc, idx) in doctors" :key="doc.id" to="/doctors"
            class="doc-animate doc-card-h group flex overflow-hidden flex-1 min-w-0"
            :style="{ '--i': idx }">
            <div class="doc-card-h-photo">
              <img :src="doc.photo_url" :alt="doc.name" class="w-full h-full object-cover" loading="lazy">
              <div class="doc-card-h-overlay">
                <a v-if="doc.instagram_url" :href="doc.instagram_url" target="_blank"
                  class="doc-card-h-insta" @click.stop>
                  <FontAwesomeIcon :icon="byPrefixAndName.fab['square-instagram']" />
                </a>
              </div>
            </div>
            <div class="doc-card-h-info">
              <h3 class="font-display text-[15px] font-bold text-[#18327A] mb-0.5 truncate">{{ doc.name }}</h3>
              <p class="font-body text-[11px] text-[#19C9D3] font-medium mb-1 truncate">{{ doc.professional_title }}</p>
              <p class="font-body text-[12px] leading-[1.5] text-[#64748B] line-clamp-2">{{ doc.bio }}</p>
            </div>
          </router-link>
        </div>
        <!-- Mobile: auto-scroll carousel -->
        <div class="md:hidden doc-carousel relative">
          <div ref="docCarouselRef" class="flex overflow-x-auto snap-x snap-mandatory gap-3 hide-scrollbar">
            <router-link v-for="doc in doctors" :key="doc.id" to="/doctors"
              class="doc-card group block snap-center flex-shrink-0 w-[240px]">
              <div class="doc-card-photo">
                <img :src="doc.photo_url" :alt="doc.name" class="w-full h-full object-cover" loading="lazy">
                <div class="doc-card-overlay">
                  <a v-if="doc.instagram_url" :href="doc.instagram_url" target="_blank"
                    class="doc-card-insta" @click.stop>
                    <FontAwesomeIcon :icon="byPrefixAndName.fab['square-instagram']" />
                  </a>
                </div>
              </div>
              <div class="doc-card-info">
                <h3 class="font-display text-[13px] font-bold text-[#18327A] mb-0.5">{{ doc.name }}</h3>
                <p class="font-body text-[10px] text-[#19C9D3] font-medium mb-1">{{ doc.professional_title }}</p>
                <p class="font-body text-[10px] leading-[1.5] text-[#64748B] line-clamp-2">{{ doc.bio }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- GALLERY -->
    <section ref="galleryRef" class="py-10 md:py-14 bg-medical-bg overflow-hidden" id="galeri">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary">Hasil Perawatan Kami</h2>
        </div>
      </div>
      <div class="gallery-marquee">
        <div class="gallery-track">
          <template v-for="n in 2" :key="n">
            <button v-for="(img, i) in galleryImages" :key="`${n}-${img.id}`" @click="openLightbox(i)"
              class="gallery-item flex-shrink-0 rounded-2xl overflow-hidden glass-panel p-1 group cursor-pointer">
              <img :src="img.image_url" :alt="img.title"
                class="w-[160px] md:w-[220px] h-[110px] md:h-[160px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                loading="lazy">
            </button>
          </template>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section ref="testimonialsRef" class="py-10 md:py-14 bg-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-cyan-tech/5 blur-[100px]"></div>
      <div class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary">Apa Kata Mereka?</h2>
        </div>
        <div class="animate-item flex overflow-x-auto snap-x snap-mandatory gap-3 px-2 pb-3 hide-scrollbar w-full relative z-10">
          <div v-for="t in testimonials" :key="t.id"
            class="testimonial-card w-[240px] md:w-[300px] flex-shrink-0 snap-center glass-panel rounded-2xl p-4 md:p-5 bg-white/80">
            <div class="flex gap-0.5 mb-2">
              <span v-for="s in t.rating" :key="s" class="material-symbols-outlined text-cyan-tech text-[12px] md:text-[14px] icon-fill">star</span>
            </div>
            <p class="font-body text-[12px] md:text-[13px] leading-[1.7] text-on-surface-variant mb-3">"{{ t.content }}"</p>
            <div>
              <p class="font-display font-semibold text-primary text-[12px] md:text-[13px]">{{ t.patient_name }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PARTNERS -->
    <section ref="partnersRef" class="py-6 md:py-10 bg-medical-bg overflow-hidden">
      <p class="animate-item text-center font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-on-surface-variant uppercase mb-5 md:mb-6">Dipercaya oleh Brand Medis Global</p>
      <div class="partners-marquee">
        <div class="partners-track">
          <template v-for="n in 2" :key="n">
            <div v-for="brand in partners" :key="`${n}-${brand.name}`"
              class="flex-shrink-0 px-6 md:px-10 text-primary/40 hover:text-primary transition-colors duration-300">
              <span v-html="brand.svg"></span>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- ARTICLES -->
    <section ref="articlesRef" class="py-10 md:py-14 bg-medical-bg" id="artikel">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="flex flex-col md:flex-row md:justify-between md:items-end mb-6 md:mb-10 gap-3">
          <div>
            <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mb-1">Artikel & Edukasi</h2>
            <p class="animate-item font-body text-[12px] md:text-[14px] leading-[1.7] text-on-surface-variant">Informasi terbaru seputar kesehatan gigi dan teknologi estetik.</p>
          </div>
          <router-link to="/articles" class="animate-item hidden md:flex items-center gap-2 text-primary font-display font-semibold text-[13px] hover:text-cyan-tech transition-colors">
            Lihat Semua <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
          </router-link>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          <router-link v-for="article in articles.slice(0, 3)" :key="article.id" :to="`/articles/${article.slug}`"
            class="animate-item flex flex-col gap-2 group">
              <div class="aspect-[16/10] rounded-2xl bg-surface-container overflow-hidden">
              <img :src="article.cover_image" :alt="article.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="font-display text-[15px] md:text-[18px] leading-[1.3] font-semibold text-primary group-hover:text-cyan-tech transition-colors">{{ article.title }}</h3>
              <p class="font-body text-[11px] md:text-[13px] leading-[1.7] text-on-surface-variant line-clamp-2">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-[10px] md:text-[11px] text-on-surface-variant">{{ new Date(article.created_at).toLocaleDateString('id-ID') }}</span>
                <span class="text-primary font-display font-semibold text-[10px] md:text-[11px] flex items-center gap-1 group-hover:underline">
                  Baca <span class="material-symbols-outlined text-[9px]">chevron_right</span>
                </span>
              </div>
            </div>
          </router-link>
        </div>
        <router-link to="/articles" class="animate-item md:hidden flex items-center justify-center gap-2 mt-6 text-primary font-display font-semibold text-[13px] hover:text-cyan-tech transition-colors">
          Lihat Semua Artikel <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
        </router-link>
      </div>
    </section>

    <!-- FAQ -->
    <section ref="faqRef" class="py-10 md:py-14 bg-white">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mb-2">FAQ (Pertanyaan Umum)</h2>
          <p class="animate-item font-body text-[12px] md:text-[14px] leading-[1.7] text-on-surface-variant max-w-2xl mx-auto">Jawaban cepat untuk pertanyaan yang sering diajukan seputar layanan kami.</p>
        </div>
        <div class="max-w-3xl mx-auto flex flex-col gap-2">
          <details v-for="faq in faqs" :key="faq.id"
            class="faq-item animate-item glass-panel rounded-xl p-4 group cursor-pointer bg-medical-bg">
            <summary class="flex justify-between items-center font-display text-[13px] md:text-[15px] font-semibold text-primary list-none gap-4">
              {{ faq.question }}
              <span class="material-symbols-outlined text-[16px] md:text-[18px] transition-transform group-open:rotate-180 flex-shrink-0">expand_more</span>
            </summary>
            <p class="font-body text-[11px] md:text-[13px] leading-[1.7] text-on-surface-variant mt-2 pt-2 border-t border-glass-border">
              {{ faq.answer }}
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- LOCATIONS -->
    <section ref="locationsRef" class="py-10 md:py-14 bg-medical-bg" id="kontak">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary">Kunjungi Kami</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <!-- Padang -->
          <div class="animate-item glass-panel rounded-2xl overflow-hidden glass-card-hover">
            <div class="rounded-xl overflow-hidden h-[180px] w-full">
              <iframe
                src="https://maps.google.com/maps?q=SEA+dental+Aesthetics+padang&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
            <div class="p-5 md:p-6">
              <h3 class="font-display text-[16px] md:text-[20px] leading-[1.3] font-semibold text-primary mb-2">Cabang Simpang Haru</h3>
              <p class="font-body text-[12px] md:text-[13px] leading-[1.7] text-on-surface-variant mb-1">Jl. DR. Sutomo No. 4, Simpang Haru, Padang, Sumatera Barat</p>
              <p class="font-body text-[10px] md:text-[12px] text-on-surface-variant mb-3">Senin-Sabtu 11.00-21.00 WIB</p>
              <a href="https://www.google.com/maps/place/SEA+dental+Aesthetics+padang/@-0.9448393,100.3738481,17z" target="_blank"
                class="w-full py-2.5 rounded-xl border border-primary text-primary font-display font-semibold text-[12px] text-center hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[14px]">directions</span>
                Lihat Peta
              </a>
            </div>
          </div>
          <!-- Pekanbaru -->
          <div class="animate-item glass-panel rounded-2xl overflow-hidden glass-card-hover">
            <div class="rounded-xl overflow-hidden h-[180px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3549!2d101.45!3d0.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJl.+Tuanku+Tambusai!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
            <div class="p-5 md:p-6">
              <h3 class="font-display text-[16px] md:text-[20px] leading-[1.3] font-semibold text-primary mb-2">Cabang Baru</h3>
              <p class="font-body text-[12px] md:text-[13px] leading-[1.7] text-on-surface-variant mb-1">Jl. Tuanku Tambusai No 124, Labuh Baru Timur, Kota Pekanbaru, Provinsi Riau</p>
              <p class="font-body text-[10px] md:text-[12px] text-on-surface-variant mb-3">Senin-Minggu 10.00-20.00 WIB</p>
              <a href="https://www.google.com/maps/search/Jl.+Tuanku+Tambusai+No+124+Labuh+Baru+Timur+Pekanbaru" target="_blank"
                class="w-full py-2.5 rounded-xl border border-primary text-primary font-display font-semibold text-[12px] text-center hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[14px]">directions</span>
                Lihat Peta
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section ref="ctaRef" class="py-12 md:py-16 bg-[#F0F4F8] text-primary relative overflow-hidden">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div class="flex-1 text-center md:text-left">
            <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-[#10245C] mb-3">Siap untuk Senyum Impian Anda?</h2>
            <p class="animate-item font-body text-[12px] md:text-[14px] leading-[1.7] text-[#64748B] max-w-2xl mx-auto md:mx-0 mb-5">Konsultasikan kebutuhan gigi Anda dengan dokter kami yang berpengalaman. Kami siap membantu Anda mendapatkan senyum terbaik.</p>
            <div class="animate-item flex flex-wrap justify-center md:justify-start gap-3">
              <a @click.prevent="openBranchModal()"
                class="bg-primary text-white font-display font-semibold text-[12px] px-5 py-2.5 rounded-full hover:bg-primary/90 shadow-md transition-all duration-300 active:scale-95 flex items-center gap-2">
                <span class="material-symbols-outlined text-[14px]">calendar_month</span>
                Buat Janji Sekarang
              </a>
              <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank"
                class="border border-primary/20 bg-white text-primary font-display font-semibold text-[12px] px-5 py-2.5 rounded-full hover:bg-primary/5 transition-all duration-300 active:scale-95 flex items-center gap-2">
                <span class="material-symbols-outlined text-[14px]">chat</span>
                WhatsApp Kami
              </a>
            </div>
          </div>
          <div class="hidden md:block w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex-shrink-0 rotate-2 hover:rotate-0 transition-transform duration-500">
            <img src="/cta-clinic.png" alt="Klinik SEA Dental" class="w-full h-full object-cover" loading="lazy">
          </div>
        </div>
      </div>
    </section>
  </div>

  <GalleryLightbox
    :images="galleryImages"
    :current-index="lightboxIndex"
    :open="lightboxOpen"
    @close="lightboxOpen = false"
    @update:index="lightboxIndex = $event"
  />
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.partners-marquee {
  overflow: hidden;
  width: 100%;
}

.partners-track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: marquee 25s linear infinite;
}

.partners-marquee:hover .partners-track {
  animation-play-state: paused;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ── Gallery Marquee ── */
.gallery-marquee {
  overflow: hidden;
  width: 100%;
}

.gallery-track {
  display: flex;
  align-items: center;
  gap: 12px;
  width: max-content;
  animation: gallery-scroll 22s linear infinite;
  will-change: transform;
}

.gallery-marquee:hover .gallery-track {
  animation-play-state: paused;
}

@keyframes gallery-scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

/* ── Bento Grid ── */
.bento-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 16px;
}

.bento-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bento-grid-bottom {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 640px) {
  .bento-grid-bottom {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .bento-grid-bottom {
    grid-template-columns: repeat(3, 1fr);
  }
}

.bento-bottom {
  min-height: 160px;
}

.bento-see-all {
  border: 2px dashed rgba(25, 196, 212, 0.4);
  background: linear-gradient(135deg, #F0FBFD 0%, #fff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 6px;
  min-height: 160px;
  transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease, background 300ms ease;
}

.bento-see-all:hover {
  transform: translateY(-6px);
  border-color: #18327A;
  border-style: solid;
  background: linear-gradient(135deg, #E6F9FB 0%, #F0FBFD 100%);
  box-shadow: 0 16px 40px rgba(20, 80, 120, 0.08);
}

.bento-see-all-icon {
  font-size: 28px;
  color: #19C9D3;
  transition: transform 300ms ease, color 300ms ease;
}

.bento-see-all:hover .bento-see-all-icon {
  transform: translateX(5px);
  color: #18327A;
}

.bento-card {
  position: relative;
  border: 1px solid #E5E7EB;
  border-radius: 20px;
  padding: 28px 28px 24px;
  background: #fff;
  transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.bento-card:hover {
  transform: translateY(-6px);
  border-color: rgba(25, 196, 212, 0.35);
  box-shadow: 0 16px 40px rgba(20, 80, 120, 0.08);
}

.bento-featured {
  min-height: 380px;
}

.bento-small {
  flex: 1;
}

.bento-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: rgba(25, 196, 212, 0.5);
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  display: block;
}

.bento-icon {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(25, 196, 212, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 300ms ease;
}

.bento-icon .material-symbols-outlined {
  font-size: 18px;
  color: #19C9D3;
}

.bento-card:hover .bento-icon {
  transform: translateY(-3px) scale(1.08);
}

.bento-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.bento-link {
  margin-top: auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #18327A;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.bento-arrow {
  display: inline-block;
  transition: transform 300ms ease;
}

.bento-card:hover .bento-arrow {
  transform: translateX(5px);
}

/* ── Doctor Cards ── */
.doc-card {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
}

.doc-card:hover {
  transform: translateY(-4px);
  border-color: rgba(25, 196, 212, 0.35);
  box-shadow: 0 12px 32px rgba(20, 80, 120, 0.08);
}

.doc-card-photo {
  position: relative;
  aspect-ratio: 3/3.5;
  overflow: hidden;
}

.doc-card-photo img {
  transition: transform 500ms ease;
}

.doc-card:hover .doc-card-photo img {
  transform: scale(1.05);
}

.doc-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(16,36,92,0.6) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 300ms ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
}

.doc-card:hover .doc-card-overlay {
  opacity: 1;
}

.doc-card-insta {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #18327A;
  transition: transform 300ms ease, background 300ms ease;
  transform: translateY(10px);
}

.doc-card:hover .doc-card-insta {
  transform: translateY(0);
}

.doc-card-insta:hover {
  background: #19C9D3;
  color: #fff;
}

.doc-card-info {
  padding: 12px 14px 14px;
}

/* ── Doctor Cards Horizontal (Desktop) ── */
.doc-card-h {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
}

.doc-card-h:hover {
  transform: translateY(-4px);
  border-color: rgba(25, 196, 212, 0.35);
  box-shadow: 0 12px 32px rgba(20, 80, 120, 0.08);
}

.doc-card-h-photo {
  position: relative;
  width: 120px;
  min-height: 140px;
  flex-shrink: 0;
  overflow: hidden;
}

.doc-card-h-photo img {
  transition: transform 500ms ease;
}

.doc-card-h:hover .doc-card-h-photo img {
  transform: scale(1.05);
}

.doc-card-h-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(16,36,92,0.6) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 300ms ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
}

.doc-card-h:hover .doc-card-h-overlay {
  opacity: 1;
}

.doc-card-h-insta {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #18327A;
  transition: transform 300ms ease, background 300ms ease;
  transform: translateY(10px);
}

.doc-card-h:hover .doc-card-h-insta {
  transform: translateY(0);
}

.doc-card-h-insta:hover {
  background: #19C9D3;
  color: #fff;
}

.doc-card-h-info {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* ── Scroll Animation for docs ── */
.doc-animate {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 500ms ease, transform 500ms ease;
  transition-delay: calc(var(--i, 0) * 100ms);
}

.doc-animate.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Stats Section ── */
.stat-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(25, 196, 212, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 300ms ease, background 300ms ease;
}

.stat-icon-wrap .material-symbols-outlined {
  font-size: 18px;
  color: #19C9D3;
}

.stat-card:hover .stat-icon-wrap {
  transform: translateY(-3px) scale(1.08);
  background: rgba(25, 196, 212, 0.2);
}

.stat-card {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: opacity 500ms ease, transform 500ms ease;
  transition-delay: calc(var(--i, 0) * 100ms);
}

.stat-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ── Why Choose Cards ── */
.why-card {
  position: relative;
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 20px;
  transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
  overflow: hidden;
}

.why-card:hover {
  transform: translateY(-5px);
  border-color: rgba(25, 196, 212, 0.35);
  box-shadow: 0 15px 35px rgba(20, 80, 120, 0.08);
}

.why-card-accent {
  background: linear-gradient(135deg, #F0FBFD 0%, #fff 100%);
  border-color: rgba(25, 196, 212, 0.15);
}

.why-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: rgba(25, 196, 212, 0.5);
  letter-spacing: 0.08em;
}

.why-card:hover .why-num {
  color: #19C9D3;
}

.why-card-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(25, 196, 212, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 300ms ease, background 300ms ease;
}

.why-card-icon .material-symbols-outlined {
  font-size: 18px;
  color: #19C9D3;
}

.why-card:hover .why-card-icon {
  transform: translateY(-3px) scale(1.08);
  background: rgba(25, 196, 212, 0.15);
}

.why-link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #18327A;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.why-arrow {
  display: inline-block;
  transition: transform 300ms ease;
}

.why-card:hover .why-arrow {
  transform: translateX(5px);
}

/* Watermark number on hover */
.why-card::after {
  content: attr(data-num);
  position: absolute;
  top: -10px;
  right: -5px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 80px;
  font-weight: 900;
  color: rgba(25, 196, 212, 0.04);
  line-height: 1;
  pointer-events: none;
  transition: color 300ms ease;
}

.why-card:hover::after {
  color: rgba(25, 196, 212, 0.08);
}

/* ── Scroll Animation ── */
.why-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms ease, transform 500ms ease;
}

.why-animate.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-featured {
    min-height: auto;
  }
}
</style>
