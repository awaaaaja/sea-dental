<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase } from '@/utils/supabase'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Kontak',
  description: 'Hubungi SEA Dental Aesthetics. Kirim pesan, telepon, atau WhatsApp untuk informasi dan janji temu.',
  url: '/contact',
})

gsap.registerPlugin(ScrollTrigger)

const formRef = ref<HTMLElement>()
const infoRef = ref<HTMLElement>()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)

function validate() {
  let valid = true
  errors.name = ''
  errors.email = ''
  errors.phone = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = 'Nama wajib diisi'
    valid = false
  }
  if (!form.email.trim()) {
    errors.email = 'Email wajib diisi'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Email tidak valid'
    valid = false
  }
  if (!form.phone.trim()) {
    errors.phone = 'Telepon wajib diisi'
    valid = false
  }
  if (!form.message.trim()) {
    errors.message = 'Pesan wajib diisi'
    valid = false
  }
  return valid
}

async function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  await supabase.from('inquiries').insert({
    name: form.name,
    email: form.email,
    phone: form.phone,
    subject: form.subject,
    message: form.message,
    status: 'new',
  })
  submitting.value = false
  submitted.value = true
}

onMounted(() => {
  if (formRef.value) {
    gsap.fromTo(formRef.value,
      { y: 30, opacity: 0 },
      { scrollTrigger: { trigger: formRef.value, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
    )
  }
  if (infoRef.value) {
    gsap.fromTo(infoRef.value,
      { y: 30, opacity: 0 },
      { scrollTrigger: { trigger: infoRef.value, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: 'power2.out' }
    )
  }
})
</script>

<template>
  <div>
    <!-- HERO -->
    <PageHero
      variant="minimal"
      title="Kontak Kami"
      subtitle="Hubungi kami untuk informasi lebih lanjut atau membuat janji temu."
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Kontak' },
      ]"
    />

    <!-- CONTENT -->
    <section class="pt-10 md:pt-14 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-5 md:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <!-- Form -->
          <div ref="formRef" class="lg:col-span-7">
            <div v-if="submitted" class="glass-panel rounded-2xl p-8 md:p-10 text-center">
              <span class="material-symbols-outlined text-5xl text-cyan-tech mb-4">check_circle</span>
              <h3 class="font-display text-[20px] md:text-[24px] font-semibold text-primary mb-2">Pesan Terkirim!</h3>
              <p class="font-body text-[14px] md:text-[16px] text-on-surface-variant mb-6">
                Terima kasih telah menghubungi kami. Tim kami akan merespons dalam 1x24 jam.
              </p>
              <button @click="submitted = false; form.name = ''; form.email = ''; form.phone = ''; form.subject = ''; form.message = ''"
                class="text-primary font-display text-sm font-semibold hover:text-cyan-tech transition-colors">
                Kirim Pesan Lain
              </button>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="glass-panel rounded-2xl p-4 md:p-6">
              <h3 class="font-display text-[18px] md:text-[22px] font-semibold text-primary mb-6">Kirim Pesan</h3>

              <div class="space-y-4">
                <div>
                  <label class="block font-body text-sm font-medium text-primary mb-1.5">Nama Lengkap *</label>
                  <input v-model="form.name" type="text"
                    class="w-full px-4 py-3 rounded-xl border border-surface-container bg-white font-body text-sm text-on-surface focus:outline-none focus:border-cyan-tech focus:ring-1 focus:ring-cyan-tech transition-colors"
                    placeholder="Masukkan nama Anda">
                  <p v-if="errors.name" class="text-red-500 text-xs font-body mt-1">{{ errors.name }}</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-body text-sm font-medium text-primary mb-1.5">Email *</label>
                    <input v-model="form.email" type="email"
                      class="w-full px-4 py-3 rounded-xl border border-surface-container bg-white font-body text-sm text-on-surface focus:outline-none focus:border-cyan-tech focus:ring-1 focus:ring-cyan-tech transition-colors"
                      placeholder="email@contoh.com">
                    <p v-if="errors.email" class="text-red-500 text-xs font-body mt-1">{{ errors.email }}</p>
                  </div>
                  <div>
                    <label class="block font-body text-sm font-medium text-primary mb-1.5">Telepon *</label>
                    <input v-model="form.phone" type="tel"
                      class="w-full px-4 py-3 rounded-xl border border-surface-container bg-white font-body text-sm text-on-surface focus:outline-none focus:border-cyan-tech focus:ring-1 focus:ring-cyan-tech transition-colors"
                      placeholder="+62 xxx">
                    <p v-if="errors.phone" class="text-red-500 text-xs font-body mt-1">{{ errors.phone }}</p>
                  </div>
                </div>

                <div>
                  <label class="block font-body text-sm font-medium text-primary mb-1.5">Subjek</label>
                  <input v-model="form.subject" type="text"
                    class="w-full px-4 py-3 rounded-xl border border-surface-container bg-white font-body text-sm text-on-surface focus:outline-none focus:border-cyan-tech focus:ring-1 focus:ring-cyan-tech transition-colors"
                    placeholder="Perihal pesan Anda">
                </div>

                <div>
                  <label class="block font-body text-sm font-medium text-primary mb-1.5">Pesan *</label>
                  <textarea v-model="form.message" rows="5"
                    class="w-full px-4 py-3 rounded-xl border border-surface-container bg-white font-body text-sm text-on-surface focus:outline-none focus:border-cyan-tech focus:ring-1 focus:ring-cyan-tech transition-colors resize-none"
                    placeholder="Tuliskan pesan Anda di sini..."></textarea>
                  <p v-if="errors.message" class="text-red-500 text-xs font-body mt-1">{{ errors.message }}</p>
                </div>
              </div>

              <button type="submit" :disabled="submitting"
                class="mt-6 w-full py-3.5 rounded-xl bg-primary text-white font-display font-semibold text-sm hover:bg-primary/90 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50">
                <span v-if="submitting" class="material-symbols-outlined text-base animate-spin">refresh</span>
                <span v-else class="material-symbols-outlined text-base">send</span>
                {{ submitting ? 'Mengirim...' : 'Kirim Pesan' }}
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div ref="infoRef" class="lg:col-span-5">
            <div class="lg:sticky lg:top-24 space-y-5">
              <h3 class="font-display text-[18px] md:text-[22px] font-semibold text-primary mb-5">Informasi Kontak</h3>

              <div class="glass-panel rounded-xl p-5 flex items-start gap-4">
                <span class="material-symbols-outlined text-2xl text-cyan-tech mt-0.5">location_on</span>
                <div>
                  <p class="font-display text-sm font-semibold text-primary mb-1">Alamat</p>
                  <p class="font-body text-[14px] text-on-surface-variant">Jl. DR. Sutomo No. 4, Simpang Haru, Padang, Sumatera Barat</p>
                </div>
              </div>

              <a href="mailto:seadentalaesthetics@gmail.com" class="glass-panel rounded-xl p-5 flex items-start gap-4 block hover:border-cyan-tech/30 transition-colors">
                <span class="material-symbols-outlined text-2xl text-cyan-tech mt-0.5">mail</span>
                <div>
                  <p class="font-display text-sm font-semibold text-primary mb-1">Email</p>
                  <p class="font-body text-[14px] text-on-surface-variant">seadentalaesthetics@gmail.com</p>
                </div>
              </a>

              <a href="tel:+6281366329279" class="glass-panel rounded-xl p-5 flex items-start gap-4 block hover:border-cyan-tech/30 transition-colors">
                <span class="material-symbols-outlined text-2xl text-cyan-tech mt-0.5">call</span>
                <div>
                  <p class="font-display text-sm font-semibold text-primary mb-1">Telepon</p>
                  <p class="font-body text-[14px] text-on-surface-variant">+62 813-6632-9279</p>
                </div>
              </a>

              <a href="https://api.whatsapp.com/send/?phone=6281266971089" target="_blank" class="glass-panel rounded-xl p-5 flex items-start gap-4 block hover:border-cyan-tech/30 transition-colors">
                <span class="material-symbols-outlined text-2xl text-cyan-tech mt-0.5">chat_bubble</span>
                <div>
                  <p class="font-display text-sm font-semibold text-primary mb-1">WhatsApp</p>
                  <p class="font-body text-[14px] text-on-surface-variant">+62 812-6697-1089</p>
                </div>
              </a>

              <div class="glass-panel rounded-xl p-5 flex items-start gap-4">
                <span class="material-symbols-outlined text-2xl text-cyan-tech mt-0.5">schedule</span>
                <div>
                  <p class="font-display text-sm font-semibold text-primary mb-1">Jam Operasional</p>
                  <p class="font-body text-[14px] text-on-surface-variant">Senin-Sabtu: 11.00 - 21.00 WIB</p>
                  <p class="font-body text-[14px] text-on-surface-variant">Minggu: 10.00 - 20.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
