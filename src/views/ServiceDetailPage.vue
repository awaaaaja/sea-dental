<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import type { Service } from '@/composables/useServices'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

const route = useRoute()
const router = useRouter()
const aboutRef = ref<HTMLElement>()
const symptomsRef = ref<HTMLElement>()
const processRef = ref<HTMLElement>()
const benefitsRef = ref<HTMLElement>()
const service = ref<Service | null>(null)
const otherServices = ref<Service[]>([])

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  const slug = route.params.slug as string
  const { data } = await supabase.from('services').select('*').eq('slug', slug).single()
  service.value = data

  if (!service.value) {
    router.replace('/services')
    return
  }

  useSeo({
    title: service.value.name,
    description: service.value.short_description || service.value.full_description?.substring(0, 160),
    url: `/services/${service.value.slug}`,
  })

  const { data: others } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'published')
    .neq('slug', slug)
    .order('sort_order')
    .limit(3)
  otherServices.value = others || []

  await new Promise(r => setTimeout(r, 100))

  const sectionRefs = [aboutRef, symptomsRef, processRef, benefitsRef]
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
  <div v-if="service">
    <!-- HERO — Split Clinical -->
    <PageHero
      eyebrow="01 / Dental Care"
      :title="service.name"
      :subtitle="service.short_description"
      :image="service.hero_image || service.content_image"
      :imageAlt="service.name"
      :badge="'Expert Care'"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Layanan', to: '/services' },
        { label: service.name },
      ]"
    >
          <a @click.prevent="openBranchModal()"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-display text-[13px] font-semibold hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 active:scale-95">
        <span class="material-symbols-outlined text-[15px]">calendar_month</span>
        Konsultasi Sekarang
      </a>
    </PageHero>

    <!-- ABOUT + STICKY CONSULTATION -->
    <section ref="aboutRef" class="py-12 md:py-20 bg-white">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <div class="animate-item">
              <p class="font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-2">Tentang Perawatan</p>
              <h2 class="font-display text-[22px] md:text-[28px] leading-[1.2] font-bold text-[#18327A] mb-4">Apa itu {{ service.name }}?</h2>
              <p class="font-body text-[15px] md:text-[16px] leading-[1.8] text-[#64748B]">{{ service.full_description }}</p>
            </div>

            <!-- Content Image -->
            <div v-if="service.content_image" class="animate-item rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(16,36,92,.08)]">
              <img :src="service.content_image" :alt="service.name" class="w-full aspect-[16/9] object-cover" loading="lazy">
            </div>
          </div>

          <!-- Sticky Consultation Card -->
          <aside class="hidden lg:block">
            <div class="sticky top-28 animate-item glass-panel rounded-[20px] p-6 border border-[#19C9D3]/10">
              <div class="w-10 h-10 rounded-full bg-[#19C9D3]/10 flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-[20px] text-[#19C9D3]">medical_services</span>
              </div>
              <h3 class="font-display text-[16px] font-bold text-[#18327A] mb-2">Konsultasi {{ service.name }}</h3>
              <p class="font-body text-[13px] leading-[1.6] text-[#64748B] mb-5">Diskusikan kebutuhan perawatan Anda dengan dokter spesialis kami.</p>
      <a @click.prevent="openBranchModal()"
                class="block w-full bg-[#18327A] text-white font-display text-[13px] font-semibold text-center py-3 rounded-full hover:shadow-[0_0_20px_rgba(25,55,125,.3)] transition-all duration-300 active:scale-95 mb-3">
                Buat Janji Temu
              </a>
              <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank"
                class="block w-full border border-[#18327A]/20 text-[#18327A] font-display text-[13px] font-semibold text-center py-3 rounded-full hover:bg-[#18327A]/5 transition-all duration-300 active:scale-95">
                WhatsApp Kami
              </a>
              <div class="mt-5 pt-4 border-t border-gray-100 space-y-2 text-[12px] text-[#64748B] font-body">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[14px] text-[#19C9D3]">location_on</span>
                  <span>Jl. DR. Sutomo No. 4, Simpang Haru, Padang</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[14px] text-[#19C9D3]">schedule</span>
                  <span>Senin-Sabtu 11.00-21.00 WIB</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- SYMPTOMS — Kapan Anda Membutuhkan? -->
    <section v-if="service.symptoms?.length" ref="symptomsRef" class="py-12 md:py-20 bg-[#F6F8FB]">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="text-center mb-10 md:mb-14">
          <p class="animate-item font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-2">Perhatikan Tanda Ini</p>
          <h2 class="animate-item font-display text-[22px] md:text-[30px] lg:text-[36px] leading-[1.15] font-bold text-[#18327A]">Kapan Anda Membutuhkannya?</h2>
        </div>
        <div class="grid grid-cols-2 gap-4 md:gap-5 max-w-2xl mx-auto">
          <div v-for="(s, i) in service.symptoms" :key="i"
            class="animate-item bg-white rounded-[20px] p-5 md:p-6 text-center hover:shadow-[0_12px_40px_rgba(16,36,92,.06)] transition-all duration-300 group">
            <div class="w-12 h-12 rounded-full bg-[#19C9D3]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#19C9D3]/20 transition-colors">
              <span class="material-symbols-outlined text-[22px] text-[#19C9D3]">{{ s.icon }}</span>
            </div>
            <h3 class="font-display text-[13px] md:text-[14px] font-semibold text-[#18327A] mb-1">{{ s.title }}</h3>
            <p v-if="s.description" class="font-body text-[11px] md:text-[12px] leading-[1.6] text-[#64748B]">{{ s.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MID IMAGE — Clinical Photography -->
    <section v-if="service.mid_image" class="py-12 md:py-20 bg-white">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(16,36,92,.08)]">
          <img :src="service.mid_image" :alt="`Perawatan ${service.name}`" class="w-full aspect-[21/9] object-cover" loading="lazy">
        </div>
      </div>
    </section>

    <!-- BENEFITS — Mengapa SEA Dental -->
    <section v-if="service.benefits?.length" ref="benefitsRef" class="py-12 md:py-20 bg-white">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="text-center mb-10 md:mb-14">
          <p class="animate-item font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-2">Keunggulan Kami</p>
          <h2 class="animate-item font-display text-[22px] md:text-[30px] lg:text-[36px] leading-[1.15] font-bold text-[#18327A]">Mengapa SEA Dental?</h2>
        </div>
        <div class="grid grid-cols-2 gap-4 md:gap-5 max-w-2xl mx-auto">
          <div v-for="(b, i) in service.benefits" :key="i"
            class="animate-item bg-[#F6F8FB] rounded-[20px] p-5 md:p-6 hover:shadow-[0_12px_40px_rgba(16,36,92,.06)] transition-all duration-300">
            <div class="w-10 h-10 rounded-full bg-[#19C9D3]/10 flex items-center justify-center mb-3">
              <span class="material-symbols-outlined text-[18px] text-[#19C9D3]">{{ b.icon }}</span>
            </div>
            <h3 class="font-display text-[14px] md:text-[15px] font-semibold text-[#18327A] mb-1.5">{{ b.title }}</h3>
            <p class="font-body text-[13px] leading-[1.6] text-[#64748B]">{{ b.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PROCESS — Proses Perawatan -->
    <section v-if="service.process_steps?.length" ref="processRef" class="py-12 md:py-20 bg-[#F6F8FB]">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <div class="text-center mb-10 md:mb-14">
          <p class="animate-item font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-2">Alur Perawatan</p>
          <h2 class="animate-item font-display text-[22px] md:text-[30px] lg:text-[36px] leading-[1.15] font-bold text-[#18327A]">Proses Perawatan</h2>
        </div>
        <div class="max-w-3xl mx-auto">
          <div v-for="(step, i) in service.process_steps" :key="i"
            class="animate-item flex gap-5 md:gap-8 mb-8 last:mb-0">
            <div class="flex-shrink-0 flex flex-col items-center">
              <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#18327A] text-white font-display text-[14px] md:text-[16px] font-bold flex items-center justify-center">
                {{ i + 1 }}
              </div>
              <div v-if="i < (service.process_steps?.length || 0) - 1" class="w-[1px] flex-1 bg-[#18327A]/10 mt-3"></div>
            </div>
            <div class="pb-8">
              <h3 class="font-display text-[16px] md:text-[18px] font-semibold text-[#18327A] mb-1">{{ step.title }}</h3>
              <p class="font-body text-[14px] leading-[1.7] text-[#64748B]">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OTHER SERVICES -->
    <section v-if="otherServices.length" class="py-12 md:py-20 bg-white">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6">
        <h2 class="font-display text-[22px] md:text-[28px] font-bold text-[#18327A] mb-8 md:mb-10 text-center">Layanan Lainnya</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <router-link
            v-for="svc in otherServices"
            :key="svc.slug"
            :to="`/services/${svc.slug}`"
            class="bg-[#F6F8FB] rounded-[20px] p-5 hover:shadow-[0_12px_40px_rgba(16,36,92,.06)] transition-all duration-300 block group"
          >
            <div class="w-10 h-10 rounded-full bg-[#19C9D3]/10 flex items-center justify-center mb-3 group-hover:bg-[#19C9D3]/20 transition-colors">
              <span class="material-symbols-outlined text-[18px] text-[#19C9D3]">{{ svc.icon }}</span>
            </div>
            <h3 class="font-display text-[15px] font-semibold text-[#18327A] mb-1">{{ svc.name }}</h3>
            <p class="font-body text-[13px] leading-[1.6] text-[#64748B] line-clamp-2">{{ svc.short_description }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-12 md:py-20 bg-[#18327A]">
      <div class="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
        <p class="font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-3">Siap Untuk Senyum Anda?</p>
        <h2 class="font-display text-[22px] md:text-[30px] lg:text-[36px] leading-[1.15] font-bold text-white mb-4">Ready to Care for Your Smile?</h2>
        <p class="font-body text-[14px] md:text-[15px] leading-[1.7] text-white/60 max-w-xl mx-auto mb-8">Konsultasikan kebutuhan {{ service.name }} Anda dengan dokter spesialis kami.</p>
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
    <p class="font-body text-[#64748B] mb-6">Layanan tidak ditemukan.</p>
    <router-link to="/services" class="bg-[#18327A] text-white font-display font-semibold px-6 py-3 rounded-full">
      Kembali ke Layanan
    </router-link>
  </div>
</template>
