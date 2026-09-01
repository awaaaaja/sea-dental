<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'secondary' | 'cyan'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variantClasses = {
  default: 'bg-surface-container text-on-surface-variant',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  cyan: 'bg-cyan-tech/10 text-primary',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase',
      variantClasses[variant],
    ]"
  >
    <slot />
  </span>
</template>
