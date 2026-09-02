<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const saving = ref(false)
const saved = ref(false)

const settings = ref({
  site_name: 'SEA Dental Aesthetics',
  tagline: 'Senyum Sempurna Anda, Prioritas Kami',
  phone: '+62 813-6632-9279',
  whatsapp: '+62 812-6697-1089',
  email: 'seadentalaesthetics@gmail.com',
  address: 'Jl. DR. Sutomo No. 4, Simpang Haru, Padang, Sumatera Barat',
  instagram: 'https://www.instagram.com/seadental',
  booking_url: 'https://booking.seadentalaesthetics.id/booking/register',
  primary_color: '#112675',
  google_analytics: 'G-TNZMMM7JFT',
  google_ads: 'AW-17374334711',
  showcase_video_url: '/showcase-video.mp4',
})

async function loadSettings() {
  const { data } = await supabase.from('site_settings').select('*')
  if (data) {
    data.forEach((s: any) => {
      if (s.key in settings.value) {
        ;(settings.value as any)[s.key] = s.value
      }
    })
  }
}

async function handleSave() {
  saving.value = true
  const updates = Object.entries(settings.value).map(([key, value]) =>
    supabase.from('site_settings').upsert({ key, value }, { onConflict: 'key' })
  )
  await Promise.all(updates)
  saving.value = false
  saved.value = true
  setTimeout(() => saved.value = false, 2000)
}

onMounted(loadSettings)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-gray-900">Pengaturan</h1>
        <p class="font-body text-sm text-gray-500 mt-1">Kelola pengaturan situs web</p>
      </div>
    </div>

    <div class="max-w-3xl space-y-6">
      <!-- General -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4">
        <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Informasi Umum</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Nama Situs</label>
              <input v-model="settings.site_name"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Tagline</label>
              <input v-model="settings.tagline"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
            </div>
          </div>
          <div>
            <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Alamat</label>
            <textarea v-model="settings.address" rows="2"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"></textarea>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4">
        <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Kontak</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Telepon</label>
            <input v-model="settings.phone"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
          </div>
          <div>
            <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">WhatsApp</label>
            <input v-model="settings.whatsapp"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
          </div>
          <div>
            <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Email</label>
            <input v-model="settings.email" type="email"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
          </div>
          <div>
            <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Instagram URL</label>
            <input v-model="settings.instagram"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
          </div>
        </div>
      </div>

      <!-- Integrations -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4">
        <h2 class="font-display text-[13px] font-semibold text-gray-900 mb-5">Integrasi</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Booking URL</label>
            <input v-model="settings.booking_url"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
          </div>
          <div>
            <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Video Showcase URL</label>
            <input v-model="settings.showcase_video_url" placeholder="/showcase-video.mp4"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
            <p class="text-xs text-gray-400 mt-1">URL video yang ditampilkan di section "Kenapa Memilih Kami"</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Google Analytics ID</label>
              <input v-model="settings.google_analytics"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
            </div>
            <div>
              <label class="block text-sm font-display font-medium text-gray-700 mb-1.5">Google Ads ID</label>
              <input v-model="settings.google_ads"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors">
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 pb-8">
        <button @click="handleSave" :disabled="saving"
          class="px-6 py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2">
          <span v-if="saving" class="material-symbols-outlined text-base animate-spin">refresh</span>
          <span v-else-if="saved" class="material-symbols-outlined text-base">check</span>
          <span v-else class="material-symbols-outlined text-base">save</span>
          {{ saving ? 'Menyimpan...' : saved ? 'Tersimpan!' : 'Simpan Pengaturan' }}
        </button>
      </div>
    </div>
  </div>
</template>
