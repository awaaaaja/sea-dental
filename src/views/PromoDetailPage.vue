<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSeo } from '@/composables/useSeo'
import PageHero from '@/components/PageHero.vue'
import { usePromos } from '@/composables/usePromos'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()

const { promos, loadPromos } = usePromos()

const promo = computed(() => {
  const slug = route.params.slug as string
  return promos.value.find(p => p.slug === slug)
})

onMounted(async () => {
  await loadPromos()
  if (promo.value) {
    useSeo({
      title: promo.value.title,
      description: promo.value.short_description || promo.value.description?.substring(0, 160),
      url: `/promos/${promo.value.slug}`,
    })
  }


})
</script>

<template>
  <div>
    <!-- HERO -->
    <PageHero
      variant="conversion"
      :title="promo?.title || 'Detail Promo'"
      :subtitle="promo?.short_description"
      bg-image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
      :breadcrumbs="[
        { label: 'Beranda', to: '/' },
        { label: 'Promo', to: '/promos' },
        { label: promo?.title || 'Detail' },
      ]"
    />

    <!-- NOT FOUND -->
    <div v-if="!promo" class="pt-12 md:pt-16 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6 text-center py-16">
        <span class="material-symbols-outlined text-5xl text-gray-200 mb-4 block">local_offer</span>
        <h3 class="font-display text-[18px] font-semibold text-gray-400 mb-2">Promo Tidak Ditemukan</h3>
        <router-link to="/promos" class="text-primary text-[13px] font-display font-semibold hover:text-cyan-tech">← Kembali ke Promo</router-link>
      </div>
    </div>

    <!-- DETAIL -->
    <section v-else class="pt-12 md:pt-16 pb-12 md:pb-20 bg-white">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <!-- Main -->
          <div class="lg:col-span-3">
            <div class="rounded-2xl overflow-hidden mb-6 bg-surface">
              <img :src="promo.image_url" :alt="promo.title" class="w-full aspect-[16/10] object-cover"
                @error="($event.target as HTMLImageElement).src = '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_7.jpeg/screen.png'">
            </div>
            <h1 class="font-display text-[22px] md:text-[28px] font-bold text-primary mb-3">{{ promo.title }}</h1>
            <div class="flex items-center gap-2 mb-5">
              <span class="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-display font-semibold">{{ promo.discount_text }}</span>
              <span v-if="promo.is_featured" class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[11px] font-display font-semibold">Promo Terpopuler</span>
            </div>
            <div class="prose-custom font-body text-[14px] md:text-[15px] leading-[1.8] text-on-surface-variant">
              <p>{{ promo.description }}</p>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-2">
            <div class="lg:sticky lg:top-24 space-y-4">
              <!-- Price Card -->
              <div class="glass-panel rounded-2xl p-4 border-cyan-tech/10">
                <h3 class="font-display text-[13px] font-semibold text-primary mb-3">Harga Promo</h3>
                <div class="flex items-end gap-2 mb-3">
                  <span v-if="promo.promo_price" class="font-display text-[24px] font-bold text-primary">Rp {{ promo.promo_price.toLocaleString('id-ID') }}</span>
                  <span v-else class="font-display text-[24px] font-bold text-cyan-tech">GRATIS</span>
                </div>
                <div v-if="promo.original_price" class="flex items-center gap-2 mb-3">
                  <span class="font-body text-[13px] text-gray-400 line-through">Rp {{ promo.original_price.toLocaleString('id-ID') }}</span>
                  <span class="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-display font-bold">
                    Hemat Rp {{ (promo.original_price - (promo.promo_price || 0)).toLocaleString('id-ID') }}
                  </span>
                </div>
                <div class="space-y-2 text-[12px] font-body text-on-surface-variant border-t border-gray-100 pt-3">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-cyan-tech text-[14px]">calendar_today</span>
                    <span>Berlaku s/d {{ new Date(promo.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
                  </div>
                </div>
                <a href="https://booking.seadentalaesthetics.id/booking/register" target="_blank"
                  class="mt-4 w-full py-2.5 rounded-xl bg-primary text-white font-display text-[13px] font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-[14px]">event</span>
                  Klaim Promo
                </a>
              </div>

              <!-- Terms -->
              <div v-if="promo.terms_conditions" class="glass-panel rounded-2xl p-4">
                <h3 class="font-display text-[13px] font-semibold text-primary mb-2">Syarat & Ketentuan</h3>
                <p class="font-body text-[12px] text-on-surface-variant whitespace-pre-wrap leading-relaxed">{{ promo.terms_conditions }}</p>
              </div>

              <!-- Share -->
              <div class="glass-panel rounded-2xl p-4">
                <h3 class="font-display text-[13px] font-semibold text-primary mb-2">Bagikan Promo</h3>
                <div class="flex items-center gap-2">
                  <a :href="`https://wa.me/?text=${encodeURIComponent(promo.title + ' - SEA Dental Aesthetics')}`" target="_blank"
                    class="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 hover:bg-emerald-500/20 transition-colors">
                    <span class="material-symbols-outlined text-[16px]">chat</span>
                  </a>
                  <a :href="`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(promo.title)}`" target="_blank"
                    class="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 hover:bg-blue-500/20 transition-colors">
                    <span class="material-symbols-outlined text-[16px]">share</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
