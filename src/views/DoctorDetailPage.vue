<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getDoctorBySlug, doctors } from '@/data/doctors'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const router = useRouter()
const contentRef = ref<HTMLElement>()

const doctor = computed(() => {
  const slug = route.params.slug as string
  return getDoctorBySlug(slug)
})

if (doctor.value) {
  useSeo({
    title: doctor.value.name,
    description: doctor.value.bio || `Dokter spesialis di SEA Dental Aesthetics - ${doctor.value.specialties?.join(', ')}`,
    url: `/doctors/${doctor.value.slug}`,
  })
}

const otherDoctors = computed(() => {
  if (!doctor.value) return []
  return doctors.filter(d => d.slug !== doctor.value!.slug)
})

onMounted(() => {
  if (!doctor.value) {
    router.replace('/doctors')
    return
  }

  if (contentRef.value) {
    gsap.fromTo(contentRef.value,
      { y: 30, opacity: 0 },
      { scrollTrigger: { trigger: contentRef.value, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
    )
  }
})
</script>

<template>
  <div v-if="doctor">
    <!-- HERO -->
    <PageHero
      variant="editorial"
      :title="doctor?.name || 'Detail Dokter'"
      :subtitle="doctor?.title"
      :image="doctor?.photo"
      :imageAlt="doctor?.name"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Dokter', to: '/doctors' },
        { label: doctor?.name || 'Detail' },
      ]"
    />

    <!-- CONTENT -->
    <section ref="contentRef" class="pt-10 md:pt-14 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <div class="max-w-4xl mx-auto">
          <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
            <!-- Photo -->
            <div class="flex-shrink-0">
              <div class="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-primary/10 overflow-hidden ring-2 ring-outline-variant/20 shadow-lg">
                <img :src="doctor.photo" :alt="doctor.name" class="w-full h-full object-cover" loading="lazy">
              </div>
            </div>

            <!-- Info -->
            <div class="flex-1 text-center md:text-left">
              <h1 class="font-display text-[28px] md:text-[40px] lg:text-[48px] leading-[1.1] font-bold text-primary mb-2">
                {{ doctor.name }}
              </h1>
              <p class="font-body text-[15px] md:text-[17px] text-cyan-tech font-medium mb-4">
                {{ doctor.title }}
              </p>
              <p class="font-body text-[15px] md:text-[16px] leading-[1.7] text-on-surface-variant mb-6">
                {{ doctor.fullBio }}
              </p>

              <!-- Specialties -->
              <div class="mb-6">
                <h3 class="font-display text-[16px] md:text-[18px] font-semibold text-primary mb-3">Keahlian</h3>
                <div class="flex flex-wrap justify-center md:justify-start gap-2">
                  <span v-for="s in doctor.specialties" :key="s"
                    class="px-4 py-1.5 rounded-full bg-cyan-tech/10 text-primary text-sm font-display font-semibold">
                    {{ s }}
                  </span>
                </div>
              </div>

              <!-- Social -->
              <div class="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a :href="doctor.igUrl" target="_blank"
                  class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors">
                  <span class="material-symbols-outlined text-base">camera</span>
                  {{ doctor.instagram }}
                </a>
                <a href="https://booking.seadentalaesthetics.id/booking/register" target="_blank"
                  class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-primary text-primary font-display text-sm font-semibold hover:bg-primary hover:text-white transition-all">
                  <span class="material-symbols-outlined text-base">event</span>
                  Buat Janji
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OTHER DOCTORS -->
    <section v-if="otherDoctors.length" class="pb-12 md:pb-20 bg-medical-bg">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <h2 class="font-display text-[18px] md:text-[24px] font-semibold text-primary mb-8 md:mb-12 text-center">Dokter Lainnya</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <router-link
            v-for="doc in otherDoctors"
            :key="doc.slug"
            :to="`/doctors/${doc.slug}`"
            class="glass-panel rounded-2xl p-4 glass-card-hover block group text-center"
          >
            <div class="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 overflow-hidden ring-2 ring-outline-variant/20 transition-all">
              <img :src="doc.photo" :alt="doc.name" class="w-full h-full object-cover" loading="lazy">
            </div>
            <h3 class="font-display text-[18px] md:text-[22px] font-semibold text-primary mb-1">{{ doc.name }}</h3>
            <p class="font-body text-[13px] text-cyan-tech">{{ doc.title }}</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
