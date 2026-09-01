<script setup lang="ts">
defineProps<{
  variant?: 'cinematic' | 'editorial' | 'minimal' | 'conversion'
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; to?: string }>
  bgImage?: string
  image?: string
  imageAlt?: string
  badge?: string
}>()
</script>

<template>
  <!-- Variant: Cinematic (Homepage) -->
  <header v-if="variant === 'cinematic'" class="relative pt-28 pb-16 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[80vh] md:min-h-[90vh]">
    <div class="absolute inset-0 z-0">
      <div class="hero-glow-1 absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-cyan-tech/10 blur-[120px]"></div>
      <div class="hero-glow-2 absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px]"></div>
    </div>
    <div class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10 w-full">
      <slot />
    </div>
  </header>

  <!-- Variant: Editorial (Layanan, Dokter, Tentang Kami, Artikel) -->
  <header v-else-if="variant === 'editorial'" class="relative overflow-hidden" style="background: #F6F8FB;">
    <div class="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[280px] md:min-h-[320px]">
        <!-- Left: Typography -->
        <div>
          <nav v-if="breadcrumbs" class="hero-animate mb-5 text-[11px] font-body">
            <template v-for="(crumb, i) in breadcrumbs" :key="i">
              <router-link v-if="crumb.to" :to="crumb.to" class="text-on-surface-variant/60 hover:text-primary transition-colors">{{ crumb.label }}</router-link>
              <span v-else class="text-on-surface-variant/60">{{ crumb.label }}</span>
              <span v-if="i < breadcrumbs.length - 1" class="mx-2 text-on-surface-variant/30">/</span>
            </template>
          </nav>
          <h1 class="hero-animate font-display text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1] font-bold text-[#18327A] mb-4">{{ title }}</h1>
          <p v-if="subtitle" class="hero-animate font-body text-[14px] md:text-[15px] leading-[1.7] text-[#64748B] max-w-md mb-6">{{ subtitle }}</p>
          <div class="hero-animate w-10 h-[3px] bg-[#19C9D3] rounded-full"></div>
        </div>

        <!-- Right: Photo -->
        <div class="hero-animate relative">
          <div class="relative z-10 rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(16,36,92,.1)]">
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
          <div v-if="badge" class="absolute -bottom-4 -left-2 md:left-4 z-20 bg-white rounded-xl px-4 py-2.5 shadow-[0_8px_30px_rgba(16,36,92,.08)] flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#19C9D3]"></span>
            <span class="font-display text-[11px] font-semibold text-[#18327A] tracking-wide">{{ badge }}</span>
          </div>
          <!-- Decorative dot -->
          <div class="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#19C9D3]/15 hidden md:block"></div>
        </div>
      </div>
    </div>
  </header>

  <!-- Variant: Minimal (Kontak, Galeri, FAQ) -->
  <header v-else-if="variant === 'minimal'" class="relative overflow-hidden" style="background: #F6F8FB;">
    <div class="max-w-[1200px] mx-auto px-4 md:px-6 py-14 md:py-16 pt-24 md:pt-28 w-full">
      <nav v-if="breadcrumbs" class="hero-animate mb-4 text-[11px] font-body">
        <template v-for="(crumb, i) in breadcrumbs" :key="i">
          <router-link v-if="crumb.to" :to="crumb.to" class="text-on-surface-variant/60 hover:text-primary transition-colors">{{ crumb.label }}</router-link>
          <span v-else class="text-on-surface-variant/60">{{ crumb.label }}</span>
          <span v-if="i < breadcrumbs.length - 1" class="mx-2 text-on-surface-variant/30">/</span>
        </template>
      </nav>
      <h1 class="hero-animate font-display text-[26px] md:text-[32px] lg:text-[38px] leading-[1.1] font-bold text-[#18327A] mb-3">{{ title }}</h1>
      <p v-if="subtitle" class="hero-animate font-body text-[13px] md:text-[14px] leading-[1.7] text-[#64748B] max-w-2xl">{{ subtitle }}</p>
      <div class="hero-animate w-10 h-[3px] bg-[#19C9D3] rounded-full mt-5"></div>
    </div>
  </header>

  <!-- Variant: Conversion (Promo) — keeps cinematic feel -->
  <header v-else-if="variant === 'conversion'" class="relative min-h-[320px] md:min-h-[380px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img v-if="bgImage" :src="bgImage" alt="" class="absolute inset-0 w-full h-full object-cover" loading="eager">
      <div class="absolute inset-0" style="background: linear-gradient(90deg, rgba(16,36,92,.94) 0%, rgba(16,36,92,.75) 45%, rgba(16,36,92,.20) 100%);"></div>
    </div>
    <div class="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 relative z-10 w-full">
      <nav v-if="breadcrumbs" class="hero-animate mb-4 text-[11px] text-white/50 font-body">
        <template v-for="(crumb, i) in breadcrumbs" :key="i">
          <router-link v-if="crumb.to" :to="crumb.to" class="hover:text-cyan-tech transition-colors">{{ crumb.label }}</router-link>
          <span v-else class="text-cyan-tech font-medium">{{ crumb.label }}</span>
          <span v-if="i < breadcrumbs.length - 1" class="mx-2 text-white/30">/</span>
        </template>
      </nav>
      <h1 class="hero-animate font-display text-[28px] md:text-[40px] lg:text-[48px] leading-[1.1] font-bold text-white mb-4">{{ title }}</h1>
      <p v-if="subtitle" class="hero-animate font-body text-[15px] md:text-[17px] leading-[1.7] text-white/70 max-w-xl">{{ subtitle }}</p>
      <slot />
    </div>
  </header>
</template>
