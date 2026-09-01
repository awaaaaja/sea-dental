<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { GalleryImage } from '@/data/gallery'

const props = defineProps<{
  images: GalleryImage[]
  currentIndex: number
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  'update:index': [val: number]
}>()

function next() {
  const nextIdx = (props.currentIndex + 1) % props.images.length
  emit('update:index', nextIdx)
}

function prev() {
  const prevIdx = (props.currentIndex - 1 + props.images.length) % props.images.length
  emit('update:index', prevIdx)
}

function onKey(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))

watch(() => props.open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div v-if="open" class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
        @click.self="emit('close')">
        <!-- Close -->
        <button @click="emit('close')"
          class="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors z-10">
          <span class="material-symbols-outlined text-3xl md:text-4xl">close</span>
        </button>

        <!-- Prev -->
        <button @click="prev"
          class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-2 backdrop-blur-sm">
          <span class="material-symbols-outlined text-2xl md:text-3xl">chevron_left</span>
        </button>

        <!-- Image -->
        <div class="max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
          <img :src="images[currentIndex]?.src" :alt="images[currentIndex]?.alt"
            class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
        </div>

        <!-- Next -->
        <button @click="next"
          class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-2 backdrop-blur-sm">
          <span class="material-symbols-outlined text-2xl md:text-3xl">chevron_right</span>
        </button>

        <!-- Counter -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 font-body text-sm">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
