<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSeo, localBusinessSchema } from '@/composables/useSeo'
import PageHero from '@/components/PageHero.vue'
import { useBranchModal } from '@/composables/useBranchModal'

const { open: openBranchModal } = useBranchModal()

useSeo({
  title: 'Tentang Kami',
  description: 'Kenali SEA Dental Aesthetics - Klinik gigi estetik premium di Padang yang berkomitmen pada senyum sempurna Anda.',
  url: '/about',
  structuredData: localBusinessSchema,
})

const missionRef = ref<HTMLElement>()
const teamRef = ref<HTMLElement>()
const valuesRef = ref<HTMLElement>()

const values = [
  { icon: 'precision_manufacturing', title: 'Precision', desc: 'Setiap perawatan dilakukan dengan presisi tinggi menggunakan teknologi terkini.' },
  { icon: 'favorite', title: 'Compassion', desc: 'Kami memahami ketakutan pasien dan memberikan perawatan yang nyaman.' },
  { icon: 'auto_awesome', title: 'Excellence', desc: 'Standar tertinggi dalam setiap aspek perawatan gigi estetik.' },
  { icon: 'groups', title: 'Teamwork', desc: 'Tim dokter spesialis yang bekerja sama untuk hasil terbaik.' },
]

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  if (missionRef.value) {
    gsap.fromTo(missionRef.value,
      { y: 30, opacity: 0 },
      { scrollTrigger: { trigger: missionRef.value, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
    )
  }
  if (valuesRef.value) {
    gsap.fromTo(valuesRef.value?.querySelectorAll('.value-card') || [],
      { y: 30, opacity: 0 },
      { scrollTrigger: { trigger: valuesRef.value, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    )
  }
  if (teamRef.value) {
    gsap.fromTo(teamRef.value,
      { y: 30, opacity: 0 },
      { scrollTrigger: { trigger: teamRef.value, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
    )
  }
})
</script>

<template>
  <div>
    <!-- HERO -->
    <PageHero
      variant="split"
      eyebrow="About Us"
      title="Tentang Kami"
      subtitle="Mengenal lebih dekat SEA Dental Aesthetics dan komitmen kami terhadap kesehatan gigi Anda."
      :image="'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80'"
      :imageAlt="'Interior klinik SEA Dental Aesthetics'"
      :badge="'Modern Dental Aesthetics'"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Tentang Kami' },
      ]"
    />

    <!-- MISSION -->
    <section ref="missionRef" class="pt-12 md:pt-20 pb-16 md:pb-24 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="label-caps text-cyan-tech mb-3 block">Misi Kami</span>
            <h2 class="font-display text-[20px] md:text-[28px] font-bold text-primary leading-tight mb-6">
              Memberikan Senyum Sempurna untuk Setiap Pasien
            </h2>
            <p class="font-body text-[15px] md:text-[16px] leading-[1.8] text-on-surface-variant mb-4">
              SEA Dental Aesthetics didirikan dengan visi untuk menghadirkan perawatan gigi estetik berkualitas tinggi di Padang. Kami percaya bahwa setiap orang berhak mendapatkan senyum yang indah dan sehat.
            </p>
            <p class="font-body text-[15px] md:text-[16px] leading-[1.8] text-on-surface-variant mb-4">
              Dengan menggabungkan teknologi terkini dan keahlian dokter spesialis, kami memberikan perawatan yang presisi, nyaman, dan berhasil. Dari dental implants hingga smile design, setiap prosedur dirancang untuk memberikan hasil terbaik.
            </p>
            <p class="font-body text-[15px] md:text-[16px] leading-[1.8] text-on-surface-variant">
              Kami berkomitmen untuk menjaga standar kebersihan dan keamanan tertinggi, sehingga Anda dapat merasa tenang selama perawatan.
            </p>
          </div>
          <div class="relative">
            <div class="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/10 to-cyan-tech/10 overflow-hidden">
              <img src="/references/logo_footer.png"
                alt="SEA Dental Aesthetics" class="w-full h-full object-contain p-8">
            </div>
            <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-3xl text-cyan-tech">emoji_events</span>
                <div>
                  <p class="font-display text-xl font-bold text-primary">5+</p>
                  <p class="font-body text-xs text-on-surface-variant">Tahun Pengalaman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUES -->
    <section ref="valuesRef" class="pb-16 md:pb-24 bg-medical-bg">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <div class="text-center mb-12">
          <span class="label-caps text-cyan-tech mb-3 block">Nilai Kami</span>
          <h2 class="font-display text-[20px] md:text-[28px] font-bold text-primary">Prinsip yang Kami Junjung</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="v in values" :key="v.title"
            class="value-card glass-panel rounded-2xl p-6 text-center glass-card-hover border-cyan-tech/10">
            <span class="material-symbols-outlined text-4xl text-cyan-tech mb-4 block">{{ v.icon }}</span>
            <h3 class="font-display text-[16px] font-semibold text-primary mb-2">{{ v.title }}</h3>
            <p class="font-body text-[13px] text-on-surface-variant leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TEAM -->
    <section ref="teamRef" class="pb-16 md:pb-24 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <div class="text-center mb-12">
          <span class="label-caps text-cyan-tech mb-3 block">Tim Kami</span>
          <h2 class="font-display text-[20px] md:text-[28px] font-bold text-primary">Dokter Spesialis Kami</h2>
          <p class="font-body text-[15px] text-on-surface-variant mt-3 max-w-xl mx-auto">
            Tim dokter berpengalaman yang berkomitmen pada perawatan terbaik untuk Anda.
          </p>
        </div>
        <div class="text-center">
          <router-link to="/doctors"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors">
            <span class="material-symbols-outlined text-base">people</span>
            Lihat Tim Dokter
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="pb-12 md:pb-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <div class="glass-panel rounded-3xl p-8 md:p-12 text-center bg-gradient-to-br from-primary to-deep-navy">
          <h2 class="font-display text-[20px] md:text-[28px] font-bold text-white mb-4">
            Siap untuk Senyum Sempurna?
          </h2>
          <p class="font-body text-[15px] text-white/70 mb-8 max-w-lg mx-auto">
            Konsultasikan kebutuhan gigi Anda dengan tim dokter kami hari ini.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a @click.prevent="openBranchModal()"
              class="px-8 py-3.5 rounded-xl bg-cyan-tech text-primary font-display font-semibold text-sm hover:bg-cyan-tech/90 transition-colors">
              Buat Janji Temu
            </a>
            <router-link to="/contact"
              class="px-8 py-3.5 rounded-xl border border-white/30 text-white font-display font-semibold text-sm hover:bg-white/10 transition-colors">
              Hubungi Kami
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
