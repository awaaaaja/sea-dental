<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useBranchModal } from '@/composables/useBranchModal'

const route = useRoute()
const { open: openBranchModal } = useBranchModal()

const items = [
  { label: 'Beranda', icon: 'home', to: '/' },
  { label: 'Layanan', icon: 'medical_services', to: '/services' },
  { label: 'Reservasi', icon: 'calendar_month', action: 'branch' },
  { label: 'Dokter', icon: 'group', to: '/doctors' },
  { label: 'Lainnya', icon: 'menu', to: '/about' },
]

function isActive(item: { to?: string; action?: string }) {
  if (item.action) return false
  if (item.to === '/') return route.path === '/'
  return route.path.startsWith(item.to!)
}
</script>

<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-bottom">
    <div class="flex items-center justify-around h-[60px] px-1">
      <button
        v-for="item in items"
        :key="item.label"
        class="bottom-nav-item"
        :class="{ 'bottom-nav-active': isActive(item) }"
        @click="item.action === 'branch' ? openBranchModal() : $router.push(item.to!)"
      >
        <span class="material-symbols-outlined text-[22px]">{{ item.icon }}</span>
        <span class="text-[10px] font-medium leading-tight mt-0.5">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  min-width: 56px;
  padding: 6px 4px 4px;
  color: #64748B;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 200ms ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.bottom-nav-item:active {
  transform: scale(0.92);
}

.bottom-nav-active {
  color: #18327A;
}

.bottom-nav-active .material-symbols-outlined {
  font-variation-settings: 'FILL' 1;
}

.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>
