<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import type { Doctor } from '@/composables/useDoctors'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

const route = useRoute()
const router = useRouter()
const aboutRef = ref<HTMLElement>()
const credentialRef = ref<HTMLElement>()
const doctor = ref<Doctor | null>(null)
const otherDoctors = ref<Doctor[]>([])

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  const slug = route.params.slug as string
  const { data } = await supabase.from('doctors').select('*').eq('slug', slug).single()
  doctor.value = data

  if (!doctor.value) {
    router.replace('/doctors')
    return
  }

  useSeo({
    title: doctor.value.name,
    description: doctor.value.bio || `Dokter spesialis di SEA Dental Aesthetics`,
    url: `/doctors/${doctor.value.slug}`,
  })

  const { data: others } = await supabase
    .from('doctors')
    .select('*')
    .eq('status', 'published')
    .neq('slug', slug)
    .order('sort_order')
  otherDoctors.value = others || []

  await new Promise(r => setTimeout(r, 100))

  const sectionRefs = [aboutRef, credentialRef]
  sectionRefs.forEach(sectionRef => {
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
})
</script>

<template>
  <div v-if="doctor">
    <!-- HERO -->
    <PageHero
      variant="split"
      eyebrow="02 / Expert Team"
      :title="doctor.name"
      :subtitle="doctor.professional_title"
      :image="doctor.photo_url"
      :imageAlt="doctor.name"
      :badge="'Expert Dental Team'"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Dokter', to: '/doctors' },
        { label: doctor.name },
      ]"
    />

    <!-- ABOUT + SIDEBAR -->
    <section ref="aboutRef" class="py-12 md:py-20 bg-white">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <!-- Main -->
          <div class="lg:col-span-2 space-y-8">
            <div class="animate-item">
              <p class="font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-2">Profil Dokter</p>
              <h2 class="font-display text-[22px] md:text-[28px] leading-[1.2] font-bold text-[#18327A] mb-4">Tentang {{ doctor.name }}</h2>
              <p class="font-body text-[15px] md:text-[16px] leading-[1.8] text-[#64748B]">{{ doctor.bio }}</p>
            </div>

            <!-- Specializations -->
            <div v-if="doctor.specialization" class="animate-item">
              <h3 class="font-display text-[16px] font-semibold text-[#18327A] mb-3">Keahlian</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="s in doctor.specialization.split(',')" :key="s"
                  class="px-4 py-1.5 rounded-full bg-[#19C9D3]/10 text-[#18327A] text-[13px] font-display font-semibold">
                  {{ s.trim() }}
                </span>
              </div>
            </div>

            <!-- Content Image -->
            <div v-if="doctor.content_image" class="animate-item rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(16,36,92,.08)]">
              <img :src="doctor.content_image" :alt="doctor.name" class="w-full aspect-[16/9] object-cover" loading="lazy">
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="hidden lg:block">
            <div class="sticky top-28 animate-item glass-panel rounded-[20px] p-6 border border-[#19C9D3]/10">
              <div class="w-48 h-48 rounded-3xl bg-[#19C9D3]/10 overflow-hidden mx-auto mb-5 ring-2 ring-[#19C9D3]/20">
                <img :src="doctor.photo_url" :alt="doctor.name" class="w-full h-full object-cover" loading="lazy">
              </div>
              <h3 class="font-display text-[18px] font-bold text-[#18327A] text-center mb-1">{{ doctor.name }}</h3>
              <p class="font-body text-[13px] text-[#19C9D3] text-center font-medium mb-5">{{ doctor.professional_title }}</p>

              <a @click.prevent="openBranchModal()"
                class="block w-full bg-[#18327A] text-white font-display text-[13px] font-semibold text-center py-3 rounded-full hover:shadow-[0_0_20px_rgba(25,55,125,.3)] transition-all duration-300 active:scale-95 mb-3">
                Buat Janji Temu
              </a>
              <a v-if="doctor.instagram_url" :href="doctor.instagram_url" target="_blank"
                class="block w-full border border-[#18327A]/20 text-[#18327A] font-display text-[13px] font-semibold text-center py-3 rounded-full hover:bg-[#18327A]/5 transition-all duration-300 active:scale-95">
                Instagram
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- CREDENTIALS — Education / Experience / Awards -->
    <section ref="credentialRef" class="py-12 md:py-20 bg-[#F6F8FB]">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="text-center mb-10 md:mb-14">
          <p class="animate-item font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-2">Kredensial</p>
          <h2 class="animate-item font-display text-[22px] md:text-[30px] lg:text-[36px] leading-[1.15] font-bold text-[#18327A]">Pendidikan & Pengalaman</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Education -->
          <div v-if="doctor.education?.length" class="animate-item bg-white rounded-[20px] p-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 rounded-full bg-[#19C9D3]/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px] text-[#19C9D3]">school</span>
              </div>
              <h3 class="font-display text-[16px] font-semibold text-[#18327A]">Pendidikan</h3>
            </div>
            <div class="space-y-4">
              <div v-for="(edu, i) in doctor.education" :key="i" class="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <p class="font-display text-[14px] font-semibold text-[#18327A]">{{ edu.degree }}</p>
                <p class="font-body text-[13px] text-[#64748B]">{{ edu.institution }}</p>
                <p v-if="edu.year" class="font-body text-[11px] text-[#19C9D3] font-medium mt-0.5">{{ edu.year }}</p>
              </div>
            </div>
          </div>

          <!-- Experience -->
          <div v-if="doctor.experience?.length" class="animate-item bg-white rounded-[20px] p-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 rounded-full bg-[#19C9D3]/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px] text-[#19C9D3]">work</span>
              </div>
              <h3 class="font-display text-[16px] font-semibold text-[#18327A]">Pengalaman</h3>
            </div>
            <div class="space-y-4">
              <div v-for="(exp, i) in doctor.experience" :key="i" class="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <p class="font-display text-[14px] font-semibold text-[#18327A]">{{ exp.role }}</p>
                <p class="font-body text-[13px] text-[#64748B]">{{ exp.institution }}</p>
                <p v-if="exp.period" class="font-body text-[11px] text-[#19C9D3] font-medium mt-0.5">{{ exp.period }}</p>
              </div>
            </div>
          </div>

          <!-- Awards -->
          <div v-if="doctor.awards?.length" class="animate-item bg-white rounded-[20px] p-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 rounded-full bg-[#19C9D3]/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px] text-[#19C9D3]">emoji_events</span>
              </div>
              <h3 class="font-display text-[16px] font-semibold text-[#18327A]">Penghargaan</h3>
            </div>
            <div class="space-y-4">
              <div v-for="(award, i) in doctor.awards" :key="i" class="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <p class="font-display text-[14px] font-semibold text-[#18327A]">{{ award.title }}</p>
                <p v-if="award.year" class="font-body text-[11px] text-[#19C9D3] font-medium mt-0.5">{{ award.year }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OTHER DOCTORS -->
    <section v-if="otherDoctors.length" class="py-12 md:py-20 bg-white">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <h2 class="font-display text-[22px] md:text-[28px] font-bold text-[#18327A] mb-8 md:mb-10 text-center">Dokter Lainnya</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <router-link
            v-for="doc in otherDoctors"
            :key="doc.slug"
            :to="`/doctors/${doc.slug}`"
            class="bg-[#F6F8FB] rounded-[20px] p-5 hover:shadow-[0_12px_40px_rgba(16,36,92,.06)] transition-all duration-300 block group text-center"
          >
            <div class="w-24 h-24 rounded-full bg-[#19C9D3]/10 mx-auto mb-4 overflow-hidden ring-2 ring-[#19C9D3]/20">
              <img :src="doc.photo_url" :alt="doc.name" class="w-full h-full object-cover" loading="lazy">
            </div>
            <h3 class="font-display text-[16px] font-semibold text-[#18327A] mb-1">{{ doc.name }}</h3>
            <p class="font-body text-[13px] text-[#19C9D3]">{{ doc.professional_title }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-12 md:py-20 bg-[#18327A]">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
        <p class="font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-3">Siap Untuk Senyum Anda?</p>
        <h2 class="font-display text-[22px] md:text-[30px] lg:text-[36px] leading-[1.15] font-bold text-white mb-4">Konsultasi dengan {{ doctor.name }}</h2>
        <p class="font-body text-[14px] md:text-[15px] leading-[1.7] text-white/60 max-w-xl mx-auto mb-8">Buat janji temu untuk konsultasi dan perawatan gigi Anda.</p>
        <div class="flex flex-wrap justify-center gap-3">
          <a @click.prevent="openBranchModal()"
            class="bg-white text-[#18327A] font-display font-semibold text-[13px] px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-[15px]">calendar_month</span>
            Buat Janji Temu
          </a>
          <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank"
            class="border border-white/30 text-white font-display font-semibold text-[13px] px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-[15px]">chat</span>
            WhatsApp Kami
          </a>
        </div>
      </div>
    </section>
  </div>

  <!-- 404 -->
  <div v-else class="py-32 text-center">
    <h1 class="font-display text-[48px] font-bold text-[#18327A] mb-4">404</h1>
    <p class="font-body text-[#64748B] mb-6">Dokter tidak ditemukan.</p>
    <router-link to="/doctors" class="bg-[#18327A] text-white font-display font-semibold px-6 py-3 rounded-full">
      Kembali ke Dokter
    </router-link>
  </div>
</template>
