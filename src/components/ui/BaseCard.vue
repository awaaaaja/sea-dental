<script setup lang="ts">
interface Props {
  hover?: boolean
  gradient?: boolean
}

withDefaults(defineProps<Props>(), {
  hover: false,
  gradient: false,
})
</script>

<template>
  <div
    :class="[
      'rounded-2xl p-8 glass-panel border-cyan-tech/20',
      hover && 'glass-card-hover',
      gradient && 'bg-gradient-to-br from-white/80 to-medical-bg',
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
.glass-card-hover {
  transition: all 0.3s ease;
}
.glass-card-hover:hover {
  transform: translateY(-4px);
  border-color: var(--color-cyan-tech);
  box-shadow: 0 8px 32px rgba(0, 242, 255, 0.1);
}
</style>
