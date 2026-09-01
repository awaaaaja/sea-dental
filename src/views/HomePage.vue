<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryImages } from '@/data/gallery'
import { articles } from '@/data/articles'
import GalleryLightbox from '@/components/GalleryLightbox.vue'
import { useSeo, localBusinessSchema } from '@/composables/useSeo'
import { usePromos } from '@/composables/usePromos'

useSeo({
  title: 'Beranda',
  description: 'SEA Dental Aesthetics - Klinik gigi estetik premium di Padang. Dental implants, smile design, veneer, dan perawatan gigi modern dengan teknologi terkini.',
  url: '/',
  structuredData: localBusinessSchema,
})

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref<HTMLElement>()
const statsRef = ref<HTMLElement>()
const whyRef = ref<HTMLElement>()
const servicesRef = ref<HTMLElement>()
const doctorsRef = ref<HTMLElement>()
const promosRef = ref<HTMLElement>()
const galleryRef = ref<HTMLElement>()
const testimonialsRef = ref<HTMLElement>()
const partnersRef = ref<HTMLElement>()
const articlesRef = ref<HTMLElement>()
const faqRef = ref<HTMLElement>()
const locationsRef = ref<HTMLElement>()
const ctaRef = ref<HTMLElement>()

const { promos, loading: promosLoading, loadPromos } = usePromos()

// Hero slideshow
const heroSlides = [
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920&q=80',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920&q=80',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1920&q=80',
  'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1920&q=80',
]
const heroIndex = ref(0)
let heroInterval: ReturnType<typeof setInterval>

function startHeroSlideshow() {
  heroInterval = setInterval(() => {
    heroIndex.value = (heroIndex.value + 1) % heroSlides.length
  }, 4500)
}

const stats = [
  { value: '2', label: 'Dokter' },
  { value: '12', label: 'Layanan' },
  { value: '6', label: 'Departemen' },
  { value: '10', label: 'Dental Labs' },
]

const whyChoose = [
  { icon: 'healing', title: 'Penambalan Estetik', desc: 'Teknik penambalan gigi dengan hasil menyerupai bentuk gigi asli, baik dari segi warna, transparansi dan detail fisik lainnya dengan menggunakan bahan tambalan modern.' },
  { icon: 'straighten', title: 'Perawatan Kawat Gigi', desc: 'Teknik menggerakan gigi dan merapikan susunan gigi dalam lengkung rahang dengan tujuan untuk memperbaiki penampilan dan fungsi gigi.' },
  { icon: 'dentistry', title: 'Pembuatan Gigi Tiruan', desc: 'Alat prostetik yang dirancang untuk menggantikan gigi yang hilang yang didukung oleh jaringan keras dan lunak didalam rongga mulut.' },
]

const services = [
  { icon: 'healing', name: 'Konservasi', desc: 'Mempertahankan dan menjaga gigi baik secara fungsi maupun estetika.' },
  { icon: 'dentistry', name: 'Prosthodonti', desc: 'Penggantian gigi yang hilang atau patah.' },
  { icon: 'straighten', name: 'Orthodonti', desc: 'Perawatan susunan gigi dalam lengkung rahang.' },
  { icon: 'healing', name: 'Periodonti', desc: 'Perawatan jaringan pendukung gigi.' },
  { icon: 'child_care', name: 'Paedodonti', desc: 'Perawatan gigi dan mulut anak.' },
  { icon: 'content_cut', name: 'Oral Surgery', desc: 'Bedah untuk memperbaiki kondisi kesehatan gigi dan mulut.' },
]

const doctors = [
  {
    name: 'drg. Andre Anggara',
    title: 'Aesthetic Dentist & Implantologist',
    bio: 'Kesehatan gigi dan mulut merupakan hal yang sangat penting. Oleh karena itu, menjaga dan merawat gigi sejak dini perlu dilakukan.',
    instagram: '@dakumiss',
    igUrl: 'https://www.instagram.com/dakumiss/',
    photo: '/references/image_from_https_seadentalaesthetics.id_assets_img_doctors_andre_1.png/screen.png',
  },
  {
    name: 'drg. Citra Annesha Pratiwi',
    title: 'Dentist',
    bio: 'Dalam menghadapi berbagai permasalahan gigi dan mulut dibutuhkan pengalaman, keterampilan dan rasa ingin selalu belajar.',
    instagram: '@chitraannesha',
    igUrl: 'https://www.instagram.com/chitraannesha/',
    photo: '/references/image_from_https_seadentalaesthetics.id_assets_img_doctors_citra_2.png/screen.png',
  },
]

const testimonials = [
  { name: 'Silvi Triana Helmi', role: 'Mahasiswa', content: 'Pengalaman saya selama perawatan gigi di SEA Dental Aesthetics dari segi pelayanan disini sangat baik, dilayani oleh dokter yang baik, ramah selama perawatan. Kualitas dari hasil perawatan sampai pemasangan crown bagus. Sangat recommended perawatan gigi disini.', rating: 5 },
  { name: 'Sri Mutmainah', role: 'Pasien Estetik', content: 'Pelayanan memuaskan, tempat juga bersih dan wangi pokoknya terbaik.', rating: 5 },
  { name: 'Lala', role: 'Pasien Scaling', content: 'Seneng banget perawatan disinii, dokter nya the best dan ramah-ramah juga, pelayanannya superr best bangett.', rating: 5 },
]

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

const partners = [
  { name: '3M', svg: `<svg viewBox="0 0 110 36" class="h-6 md:h-8 w-auto"><text x="0" y="28" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="32" fill="currentColor">3M</text></svg>` },
  { name: 'Straumann', svg: `<svg viewBox="0 0 200 36" class="h-6 md:h-8 w-auto"><text x="0" y="22" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="16" letter-spacing="3" fill="currentColor">STRAUMANN</text><line x1="0" y1="30" x2="200" y2="30" stroke="currentColor" stroke-width="1.5"/></svg>` },
  { name: 'Invisalign', svg: `<svg viewBox="0 0 200 36" class="h-6 md:h-8 w-auto"><text x="0" y="24" font-family="Georgia, serif" font-weight="400" font-size="17" letter-spacing="1" fill="currentColor">invisalign</text><circle cx="175" cy="14" r="4" fill="none" stroke="currentColor" stroke-width="1"/><line x1="178" y1="17" x2="182" y2="22" stroke="currentColor" stroke-width="1.2"/></svg>` },
  { name: 'Dentsply', svg: `<svg viewBox="0 0 240 36" class="h-6 md:h-8 w-auto"><text x="0" y="24" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="16" letter-spacing="1.5" fill="currentColor">DENTSPLY SIRONA</text></svg>` },
  { name: 'GC', svg: `<svg viewBox="0 0 80 36" class="h-6 md:h-8 w-auto"><text x="0" y="28" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="32" fill="currentColor">GC</text></svg>` },
  { name: 'Ivoclar', svg: `<svg viewBox="0 0 160 36" class="h-6 md:h-8 w-auto"><text x="0" y="24" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="18" letter-spacing="2" fill="currentColor">IVOCLAR</text><text x="0" y="34" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="8" letter-spacing="1" fill="currentColor">VIVADENT</text></svg>` },
]

const homepageArticles = articles.slice(0, 3)

const faqs = [
  { q: 'Bagaimana cara menjaga kebersihan gigi dan mulut?', a: 'Menjaga kebersihan rongga mulut dapat dilakukan dengan: menyikat gigi 2x sehari, berkumur menggunakan obat kumur, rutin membersihkan karang gigi (6 bulan sekali), kontrol ke dokter gigi minimal 6 bulan sekali.' },
  { q: 'Kapan saja waktu yang tepat untuk menyikat gigi?', a: 'Waktu yang dianjurkan untuk menyikat gigi ialah pada pagi hari setelah sarapan dan malam sebelum tidur.' },
  { q: 'Bagaimana cara menghindari bau mulut?', a: 'Bau mulut dapat dihindari dengan: menyikat gigi 2 kali sehari, rutin mengganti sikat gigi maksimal 2 bulan sekali, berkumur menggunakan obat kumur, rutin membersihkan karang gigi, banyak mengkonsumsi air putih, mengkonsumsi makanan sehat, hindari merokok.' },
]

const locations = [
  { name: 'Simpang Haru', address: 'Jl. DR. Sutomo No. 4, Simpang Haru, Padang, Sumatera Barat', hours: 'Senin-Sabtu 11.00-21.00 WIB', maps: 'https://goo.gl/maps/LkT48FJyr2uuESkP8' },
  { name: 'Baru', address: 'Jl. Khatib Sulaiman, Padang, Sumatera Barat', hours: 'Senin-Minggu 10.00-20.00 WIB', maps: '#' },
]

onMounted(() => {
  loadPromos()
  startHeroSlideshow()
  const mm = gsap.matchMedia()

  // Hero animation
  const heroItems = heroRef.value?.querySelectorAll('.hero-animate') || []
  gsap.fromTo(heroItems,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
  )

  // Section reveals
  const sectionRefs = [statsRef, whyRef, servicesRef, doctorsRef, promosRef, galleryRef, testimonialsRef, partnersRef, articlesRef, faqRef, locationsRef, ctaRef]
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

  // Stats scale bounce
  mm.add('(min-width: 768px)', () => {
    const statNumbers = statsRef.value?.querySelectorAll('.stat-number')
    statNumbers?.forEach((el) => {
      const target = parseInt(el.textContent || '0', 10)
      el.textContent = '0'
      gsap.to(el, {
        scrollTrigger: { trigger: statsRef.value, start: 'top 85%' },
        textContent: target, duration: 1.5, snap: { textContent: 1 }, ease: 'power1.inOut',
      })
    })
    const statCards = statsRef.value?.querySelectorAll('.stat-card')
    if (statCards) {
      gsap.fromTo(statCards,
        { scale: 0.85, opacity: 0 },
        { scrollTrigger: { trigger: statsRef.value, start: 'top 85%' }, scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' }
      )
    }
  })

  // Services staggered scale-in
  mm.add('(min-width: 768px)', () => {
    const serviceCards = servicesRef.value?.querySelectorAll('.service-card')
    if (serviceCards) {
      gsap.fromTo(serviceCards,
        { y: 30, opacity: 0, scale: 0.96 },
        { scrollTrigger: { trigger: servicesRef.value, start: 'top 80%' }, y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out' }
      )
    }
  })

  // Doctor slide from sides
  mm.add('(min-width: 768px)', () => {
    const doctorCards = doctorsRef.value?.querySelectorAll('.doctor-card')
    if (doctorCards) {
      gsap.fromTo(doctorCards,
        { x: (i) => i % 2 === 0 ? -30 : 30, opacity: 0 },
        { scrollTrigger: { trigger: doctorsRef.value, start: 'top 80%' }, x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out' }
      )
    }
  })

  // Gallery mosaic stagger
  mm.add('(min-width: 768px)', () => {
    const galleryItems = galleryRef.value?.querySelectorAll('.gallery-item')
    if (galleryItems) {
      gsap.fromTo(galleryItems,
        { y: 25, opacity: 0, scale: 0.92 },
        { scrollTrigger: { trigger: galleryRef.value, start: 'top 80%' }, y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: { amount: 0.5, from: 'random' }, ease: 'power2.out' }
      )
    }
  })

  // Testimonials perspective flip
  mm.add('(min-width: 768px)', () => {
    const testimonialCards = testimonialsRef.value?.querySelectorAll('.testimonial-card')
    if (testimonialCards) {
      gsap.fromTo(testimonialCards,
        { rotateY: 12, opacity: 0, transformPerspective: 600 },
        { scrollTrigger: { trigger: testimonialsRef.value, start: 'top 80%' }, rotateY: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      )
    }
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
    if (faqItems) {
      gsap.fromTo(faqItems,
        { x: -15, opacity: 0 },
        { scrollTrigger: { trigger: faqRef.value, start: 'top 80%' }, x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out' }
      )
    }
  })

})

onUnmounted(() => {
  clearInterval(heroInterval)
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
            <span class="font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-white/90 uppercase">Klinik Gigi Estetik Padang</span>
          </div>
          <h1 class="hero-animate font-display text-[32px] leading-[1.1] font-bold sm:text-[42px] md:text-[56px] md:leading-[1.05] text-white mb-5">
            Selamat Datang di<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-tech">SEA Dental Aesthetics</span>
          </h1>
          <p class="hero-animate font-body text-[15px] md:text-[17px] leading-[1.7] text-white/70 max-w-lg mb-7">
            Klinik gigi estetik di kota Padang yang berorientasi pada tindakan estetik kedokteran gigi. Mengutamakan pelayanan interaktif dan komunikatif antara dokter dan pasien.
          </p>
          <div class="hero-animate flex flex-wrap gap-3">
            <a href="https://booking.seadentalaesthetics.id/booking/register" target="_blank"
              class="bg-cyan-tech text-[#10245C] font-display font-bold text-[13px] px-6 py-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px]">calendar_month</span>
              Buat Janji Temu
            </a>
            <a href="https://www.instagram.com/stories/highlights/17978707913891105/" target="_blank"
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
    <section ref="statsRef" class="py-8 md:py-10 bg-medical-bg border-y border-glass-border">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          <div v-for="stat in stats" :key="stat.label" class="stat-card animate-item">
            <p class="stat-number font-display text-[28px] md:text-[36px] leading-[1.2] font-semibold text-primary">{{ stat.value }}</p>
            <p class="font-body text-[12px] md:text-[14px] leading-[1.6] text-on-surface-variant">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY CHOOSE SEA -->
    <section ref="whyRef" class="py-10 md:py-14 bg-white">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="text-center mb-8 md:mb-12">
          <span class="animate-item font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-cyan-tech uppercase">Kenapa Memilih Kami</span>
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mt-3">Kenapa Memilih SEA?</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div v-for="item in whyChoose" :key="item.title" class="animate-item glass-panel rounded-2xl p-5 md:p-6 glass-card-hover text-center">
            <div class="service-icon mx-auto mb-4">
              <span class="material-symbols-outlined text-[22px]">{{ item.icon }}</span>
            </div>
            <h3 class="font-display text-[16px] md:text-[18px] leading-[1.3] font-semibold text-primary mb-2">{{ item.title }}</h3>
            <p class="font-body text-[13px] md:text-[14px] leading-[1.7] text-on-surface-variant">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section ref="servicesRef" class="py-10 md:py-14 bg-medical-bg" id="layanan">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="text-center mb-8 md:mb-12">
          <span class="animate-item font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-cyan-tech uppercase">Layanan Kami</span>
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mt-3">Layanan kami didukung oleh dokter yang terlatih</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          <router-link v-for="svc in services" :key="svc.name" to="/services"
            class="service-card animate-item glass-panel rounded-2xl p-5 md:p-6 glass-card-hover block">
            <div class="service-icon mb-3">
              <span class="material-symbols-outlined text-[20px]">{{ svc.icon }}</span>
            </div>
            <h3 class="font-display text-[15px] md:text-[17px] font-semibold text-primary mb-1.5">{{ svc.name }}</h3>
            <p class="font-body text-[12px] md:text-[13px] text-on-surface-variant leading-[1.7]">{{ svc.desc }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- DOCTORS -->
    <section ref="doctorsRef" class="py-10 md:py-14 bg-white" id="dokter">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="text-center mb-8 md:mb-12">
          <span class="animate-item font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-cyan-tech uppercase">Tim Dokter Kami</span>
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mt-3">Dokter Berpengalaman Terbaik</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
          <router-link v-for="doc in doctors" :key="doc.name" to="/doctors"
            class="doctor-card animate-item glass-panel rounded-2xl p-5 md:p-6 glass-card-hover text-center block">
            <div class="w-18 h-18 md:w-24 md:h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <img :src="doc.photo" :alt="doc.name" class="w-full h-full object-cover" loading="lazy">
            </div>
            <h3 class="font-display text-[16px] md:text-[20px] leading-[1.3] font-semibold text-primary mb-1">{{ doc.name }}</h3>
            <p class="font-body text-[11px] md:text-[12px] text-cyan-tech mb-2">{{ doc.title }}</p>
            <p class="font-body text-[12px] md:text-[13px] leading-[1.7] text-on-surface-variant">{{ doc.bio }}</p>
            <a :href="doc.igUrl" target="_blank" class="inline-flex items-center gap-2 mt-3 text-primary hover:text-cyan-tech transition-colors text-[12px]"
              @click.stop>
              <span class="material-symbols-outlined text-[13px]">camera</span> {{ doc.instagram }}
            </a>
          </router-link>
        </div>
      </div>
    </section>

    <!-- PROMOS -->
    <section ref="promosRef" class="py-10 md:py-14 bg-gradient-to-br from-primary to-deep-navy relative overflow-hidden" id="promo">
      <div class="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-tech/10 blur-[100px]"></div>
      <div class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div class="text-center mb-8 md:mb-12">
          <router-link to="/promos" class="inline-flex items-center gap-2">
            <span class="material-symbols-outlined text-cyan-tech text-lg">local_offer</span>
            <span class="animate-item font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-cyan-tech uppercase">Promo Spesial</span>
          </router-link>
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-white mt-3">Penawaran Terbaik untuk Senyum Anda</h2>
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

    <!-- GALLERY -->
    <section ref="galleryRef" class="py-10 md:py-14 bg-medical-bg" id="galeri">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="text-center mb-8 md:mb-12">
          <span class="animate-item font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-cyan-tech uppercase">Galeri Kami</span>
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mt-3">Hasil Perawatan Kami</h2>
        </div>
        <div class="animate-item flex overflow-x-auto snap-x snap-mandatory gap-3 px-2 pb-3 hide-scrollbar w-full">
          <button v-for="(img, i) in galleryImages" :key="i" @click="openLightbox(i)"
            class="gallery-item w-[160px] md:w-[220px] flex-shrink-0 snap-center rounded-2xl overflow-hidden glass-panel p-1 group cursor-pointer">
            <img :src="img.src" :alt="img.alt"
              class="w-full h-[110px] md:h-[160px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
              loading="lazy">
          </button>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section ref="testimonialsRef" class="py-10 md:py-14 bg-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-cyan-tech/5 blur-[100px]"></div>
      <div class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div class="text-center mb-8 md:mb-12">
          <span class="animate-item font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-cyan-tech uppercase">Testimoni Pasien</span>
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mt-3">Apa Kata Mereka?</h2>
        </div>
        <div class="animate-item flex overflow-x-auto snap-x snap-mandatory gap-3 px-2 pb-3 hide-scrollbar w-full relative z-10">
          <div v-for="t in testimonials" :key="t.name"
            class="testimonial-card w-[240px] md:w-[300px] flex-shrink-0 snap-center glass-panel rounded-2xl p-4 md:p-5 bg-white/80">
            <div class="flex gap-0.5 mb-2">
              <span v-for="s in t.rating" :key="s" class="material-symbols-outlined text-cyan-tech text-[12px] md:text-[14px] icon-fill">star</span>
            </div>
            <p class="font-body text-[12px] md:text-[13px] leading-[1.7] text-on-surface-variant mb-3">"{{ t.content }}"</p>
            <div>
              <p class="font-display font-semibold text-primary text-[12px] md:text-[13px]">{{ t.name }}</p>
              <p class="font-body text-[10px] md:text-[11px] text-on-surface-variant">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PARTNERS -->
    <section ref="partnersRef" class="py-6 md:py-10 bg-medical-bg border-y border-glass-border overflow-hidden">
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
          <router-link v-for="article in homepageArticles" :key="article.slug" :to="`/articles/${article.slug}`"
            class="animate-item flex flex-col gap-2 group">
              <div class="aspect-[16/10] rounded-2xl bg-surface-container overflow-hidden">
              <img :src="article.image" :alt="article.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-cyan-tech uppercase">{{ article.category }}</span>
              <h3 class="font-display text-[15px] md:text-[18px] leading-[1.3] font-semibold text-primary group-hover:text-cyan-tech transition-colors">{{ article.title }}</h3>
              <p class="font-body text-[11px] md:text-[13px] leading-[1.7] text-on-surface-variant line-clamp-2">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-[10px] md:text-[11px] text-on-surface-variant">{{ article.date }}</span>
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
          <details v-for="(faq, i) in faqs" :key="i"
            class="faq-item animate-item glass-panel rounded-xl p-4 group cursor-pointer bg-medical-bg">
            <summary class="flex justify-between items-center font-display text-[13px] md:text-[15px] font-semibold text-primary list-none gap-4">
              {{ faq.q }}
              <span class="material-symbols-outlined text-[16px] md:text-[18px] transition-transform group-open:rotate-180 flex-shrink-0">expand_more</span>
            </summary>
            <p class="font-body text-[11px] md:text-[13px] leading-[1.7] text-on-surface-variant mt-2 pt-2 border-t border-glass-border">
              {{ faq.a }}
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- LOCATIONS -->
    <section ref="locationsRef" class="py-10 md:py-14 bg-medical-bg" id="kontak">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="text-center mb-8 md:mb-12">
          <span class="animate-item font-display text-[10px] md:text-[11px] leading-[1.0] font-semibold tracking-[0.1em] text-cyan-tech uppercase">Lokasi Kami</span>
          <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-primary mt-3">Kunjungi Kami</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
          <div v-for="loc in locations" :key="loc.name"
            class="animate-item glass-panel rounded-2xl p-5 md:p-6 glass-card-hover">
            <h3 class="font-display text-[16px] md:text-[20px] leading-[1.3] font-semibold text-primary mb-2">Cabang {{ loc.name }}</h3>
            <p class="font-body text-[12px] md:text-[13px] leading-[1.7] text-on-surface-variant mb-1">{{ loc.address }}</p>
            <p class="font-body text-[10px] md:text-[12px] text-on-surface-variant mb-3">{{ loc.hours }}</p>
            <a :href="loc.maps" target="_blank"
              class="w-full py-2.5 rounded-xl border border-primary text-primary font-display font-semibold text-[12px] text-center hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-[14px]">directions</span>
              Lihat Peta
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section ref="ctaRef" class="py-10 md:py-14 bg-gradient-to-br from-primary to-deep-navy text-white relative overflow-hidden">
      <div class="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-tech/10 blur-[120px]"></div>
      <div class="max-w-[1200px] mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 class="animate-item font-display text-[18px] md:text-[24px] lg:text-[28px] leading-[1.2] font-semibold text-white mb-3">Siap untuk Senyum Impian Anda?</h2>
        <p class="animate-item font-body text-[12px] md:text-[14px] leading-[1.7] text-white/80 max-w-2xl mx-auto mb-5">Konsultasikan kebutuhan gigi Anda dengan dokter kami yang berpengalaman. Kami siap membantu Anda mendapatkan senyum terbaik.</p>
        <div class="animate-item flex flex-wrap justify-center gap-3">
          <a href="https://booking.seadentalaesthetics.id/booking/register" target="_blank"
            class="bg-white text-primary font-display font-semibold text-[12px] px-5 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-[14px]">calendar_month</span>
            Buat Janji Sekarang
          </a>
          <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank"
            class="border border-white/30 text-white font-display font-semibold text-[12px] px-5 py-2.5 rounded-full hover:bg-white/10 transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-[14px]">chat</span>
            WhatsApp Kami
          </a>
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
</style>
