<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  variant?: 'split' | 'full-image' | 'mosaic' | 'minimal'
  eyebrow?: string
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; to?: string }>
  image?: string
  imageAlt?: string
  badge?: string
  bgImage?: string
}>()

const heroRef = ref<HTMLElement>()

onMounted(async () => {
  if (!heroRef.value) return
  const { default: gsap } = await import('gsap')
  const els = heroRef.value.querySelectorAll('.hero-animate')
  if (!els || els.length === 0) return
  gsap.fromTo(els,
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
  )
  const img = heroRef.value.querySelector('.hero-image')
  if (img) {
    gsap.fromTo(img,
      { scale: 0.97, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.3 }
    )
  }
})
</script>

<template>
  <!-- Variant: Split — Clinical Editorial (Services, Doctors, Articles, About, Locations) -->
  <header
    v-if="variant === 'split'"
    ref="heroRef"
    class="relative overflow-hidden bg-[#F6F8FB]"
  >
    <div class="max-w-[1200px] mx-auto px-5 md:px-6 py-14 md:py-20 lg:py-[72px] w-full">
      <div class="grid grid-cols-1 md:grid-cols-[48%_1fr] gap-8 md:gap-12 lg:gap-16 items-center">
        <!-- Left: Typography -->
        <div>
          <nav v-if="breadcrumbs" class="hero-animate mb-4 md:mb-5 text-[11px] font-body">
            <template v-for="(crumb, i) in breadcrumbs" :key="i">
              <router-link v-if="crumb.to" :to="crumb.to" class="text-on-surface-variant/50 hover:text-primary transition-colors">{{ crumb.label }}</router-link>
              <span v-else class="text-on-surface-variant/50">{{ crumb.label }}</span>
              <span v-if="i < breadcrumbs.length - 1" class="mx-2 text-on-surface-variant/25">/</span>
            </template>
          </nav>
          <p v-if="eyebrow" class="hero-animate font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-2">
            {{ eyebrow }}
          </p>
          <h1 class="hero-animate font-display text-[28px] md:text-[36px] lg:text-[44px] leading-[1.08] font-bold text-[#18327A] mb-3 md:mb-4">
            {{ title }}
          </h1>
          <p v-if="subtitle" class="hero-animate font-body text-[13px] md:text-[15px] leading-[1.7] text-[#64748B] max-w-md mb-5 md:mb-6">
            {{ subtitle }}
          </p>
          <slot />
        </div>

        <!-- Right: Image -->
        <div class="hero-animate relative">
          <div class="hero-image relative z-10 rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(16,36,92,.1)]">
            <img
              v-if="image"
              :src="image"
              :alt="imageAlt || title"
              class="w-full aspect-[4/3] object-cover"
              loading="eager"
            >
            <div v-else class="w-full aspect-[4/3] bg-gradient-to-br from-[#E8F4F8] to-[#D1E8F0] flex items-center justify-center">
              <span class="material-symbols-outlined text-[48px] text-[#18327A]/20">image</span>
            </div>
          </div>
          <!-- Floating badge -->
          <div v-if="badge" class="hero-animate absolute -bottom-3 md:-bottom-4 left-2 md:left-4 z-20 bg-white rounded-full px-4 py-2 shadow-[0_8px_30px_rgba(16,36,92,.08)] flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#19C9D3]"></span>
            <span class="font-display text-[10px] md:text-[11px] font-semibold text-[#18327A] tracking-wide uppercase">{{ badge }}</span>
          </div>
          <!-- Decorative dots -->
          <div class="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-[#19C9D3]/10 hidden md:block"></div>
          <div class="absolute -bottom-6 -right-6 w-8 h-8 rounded-full border border-[#19C9D3]/15 hidden md:block"></div>
        </div>
      </div>
    </div>
  </header>

  <!-- Variant: Full Image — Promo -->
  <header
    v-else-if="variant === 'full-image'"
    ref="heroRef"
    class="relative min-h-[320px] md:min-h-[400px] flex items-center overflow-hidden"
  >
    <div class="absolute inset-0 z-0">
      <img v-if="bgImage" :src="bgImage" alt="" class="absolute inset-0 w-full h-full object-cover" loading="eager">
      <div class="absolute inset-0" style="background: linear-gradient(90deg, rgba(16,36,92,.92) 0%, rgba(16,36,92,.7) 45%, rgba(16,36,92,.15) 100%);"></div>
    </div>
    <div class="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20 relative z-10 w-full">
      <nav v-if="breadcrumbs" class="hero-animate mb-4 text-[11px] text-white/40 font-body">
        <template v-for="(crumb, i) in breadcrumbs" :key="i">
          <router-link v-if="crumb.to" :to="crumb.to" class="hover:text-white/80 transition-colors">{{ crumb.label }}</router-link>
          <span v-else class="text-white/70">{{ crumb.label }}</span>
          <span v-if="i < breadcrumbs.length - 1" class="mx-2 text-white/20">/</span>
        </template>
      </nav>
      <p v-if="eyebrow" class="hero-animate font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-2">
        {{ eyebrow }}
      </p>
      <h1 class="hero-animate font-display text-[28px] md:text-[40px] lg:text-[48px] leading-[1.08] font-bold text-white mb-3">{{ title }}</h1>
      <p v-if="subtitle" class="hero-animate font-body text-[14px] md:text-[16px] leading-[1.7] text-white/60 max-w-xl">{{ subtitle }}</p>
      <slot />
    </div>
  </header>

  <!-- Variant: Mosaic — Gallery -->
  <header
    v-else-if="variant === 'mosaic'"
    ref="heroRef"
    class="relative overflow-hidden bg-[#F6F8FB]"
  >
    <div class="max-w-[1200px] mx-auto px-5 md:px-6 py-14 md:py-20 lg:py-[72px] w-full">
      <div class="grid grid-cols-1 md:grid-cols-[44%_1fr] gap-8 md:gap-12 items-center">
        <!-- Left: Typography -->
        <div>
          <nav v-if="breadcrumbs" class="hero-animate mb-4 text-[11px] font-body">
            <template v-for="(crumb, i) in breadcrumbs" :key="i">
              <router-link v-if="crumb.to" :to="crumb.to" class="text-on-surface-variant/50 hover:text-primary transition-colors">{{ crumb.label }}</router-link>
              <span v-else class="text-on-surface-variant/50">{{ crumb.label }}</span>
              <span v-if="i < breadcrumbs.length - 1" class="mx-2 text-on-surface-variant/25">/</span>
            </template>
          </nav>
          <p v-if="eyebrow" class="hero-animate font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-2">
            {{ eyebrow }}
          </p>
          <h1 class="hero-animate font-display text-[28px] md:text-[36px] lg:text-[44px] leading-[1.08] font-bold text-[#18327A] mb-3 md:mb-4">
            {{ title }}
          </h1>
          <p v-if="subtitle" class="hero-animate font-body text-[13px] md:text-[15px] leading-[1.7] text-[#64748B] max-w-md">
            {{ subtitle }}
          </p>
        </div>

        <!-- Right: Mosaic Grid -->
        <div class="hero-animate relative">
          <div class="hero-image grid grid-cols-[1.4fr_1fr] grid-rows-[1fr_1fr] gap-2.5 rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(16,36,92,.1)] aspect-[16/10]">
            <div class="row-span-2 rounded-[20px] overflow-hidden bg-surface-container">
              <img
                v-if="image"
                :src="image"
                :alt="imageAlt || title"
                class="w-full h-full object-cover"
                loading="eager"
              >
            </div>
            <div class="rounded-[16px] overflow-hidden bg-surface-container">
              <slot name="mosaic-1" />
            </div>
            <div class="rounded-[16px] overflow-hidden bg-surface-container">
              <slot name="mosaic-2" />
            </div>
          </div>
          <!-- Floating badge -->
          <div v-if="badge" class="hero-animate absolute -bottom-3 left-2 md:left-4 z-20 bg-white rounded-full px-4 py-2 shadow-[0_8px_30px_rgba(16,36,92,.08)] flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#19C9D3]"></span>
            <span class="font-display text-[10px] md:text-[11px] font-semibold text-[#18327A] tracking-wide uppercase">{{ badge }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Variant: Minimal — FAQ, Contact, Detail pages -->
  <header
    v-else
    ref="heroRef"
    class="relative overflow-hidden bg-[#F6F8FB]"
  >
    <div class="max-w-[1200px] mx-auto px-5 md:px-6 py-12 md:py-16 pt-22 md:pt-28 w-full">
      <nav v-if="breadcrumbs" class="hero-animate mb-4 text-[11px] font-body">
        <template v-for="(crumb, i) in breadcrumbs" :key="i">
          <router-link v-if="crumb.to" :to="crumb.to" class="text-on-surface-variant/50 hover:text-primary transition-colors">{{ crumb.label }}</router-link>
          <span v-else class="text-on-surface-variant/50">{{ crumb.label }}</span>
          <span v-if="i < breadcrumbs.length - 1" class="mx-2 text-on-surface-variant/25">/</span>
        </template>
      </nav>
      <p v-if="eyebrow" class="hero-animate font-display text-[10px] md:text-[11px] font-semibold tracking-[0.15em] text-[#19C9D3] uppercase mb-2">
        {{ eyebrow }}
      </p>
      <h1 class="hero-animate font-display text-[26px] md:text-[32px] lg:text-[38px] leading-[1.1] font-bold text-[#18327A] mb-3">{{ title }}</h1>
      <p v-if="subtitle" class="hero-animate font-body text-[13px] md:text-[14px] leading-[1.7] text-[#64748B] max-w-2xl">{{ subtitle }}</p>
    </div>
  </header>
</template>
