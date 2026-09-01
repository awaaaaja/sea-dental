<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
})

const classes: Record<string, string> = {
  primary: 'bg-primary text-white hover:shadow-[0_0_15px_rgba(0,242,255,0.5)] active:bg-deep-navy',
  secondary: 'border border-primary text-primary hover:bg-primary hover:text-white',
  glass: 'glass-panel text-primary hover:bg-white/50',
  ghost: 'text-on-surface-variant hover:text-primary hover:bg-white/20',
}

const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full transition-all duration-300 active:scale-95',
      classes[variant],
      sizes[size],
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
  >
    <slot />
  </component>
</template>
