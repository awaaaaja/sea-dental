<script setup lang="ts">
import { useBranchModal } from '@/composables/useBranchModal'

const { isOpen, close } = useBranchModal()

const branches = [
  { name: 'Padang', url: 'https://bookingpdg.seadentalaesthetics.id/', icon: 'location_on', address: 'Jl. DR. Sutomo No. 4, Simpang Haru' },
  { name: 'Pekanbaru', url: 'https://bookingpku.seadentalaesthetics.id/', icon: 'location_on', address: 'Pekanbaru, Riau' },
]
</script>

<template>
  <Teleport to="body">
    <Transition name="branch-modal">
      <div v-if="isOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4" @click.self="close">
        <div class="absolute inset-0 bg-[#10245C]/60 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
          <button @click="close" class="absolute top-4 right-4 text-[#64748B] hover:text-[#18327A] transition-colors">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
          <h3 class="font-display text-[18px] font-bold text-[#18327A] mb-1">Pilih Cabang</h3>
          <p class="font-body text-[13px] text-[#64748B] mb-5">Mana yang ingin Anda kunjungi?</p>
          <div class="flex flex-col gap-3">
            <a v-for="b in branches" :key="b.name" :href="b.url" target="_blank"
              class="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#19C9D3] hover:bg-[#F0FBFD] transition-all duration-200 group"
              @click="close">
              <div class="w-10 h-10 rounded-lg bg-[#19C9D3]/10 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-[18px] text-[#19C9D3]">{{ b.icon }}</span>
              </div>
              <div>
                <p class="font-display text-[14px] font-bold text-[#18327A] group-hover:text-[#19C9D3] transition-colors">{{ b.name }}</p>
                <p class="font-body text-[11px] text-[#64748B]">{{ b.address }}</p>
              </div>
              <span class="material-symbols-outlined text-[16px] text-[#64748B] ml-auto group-hover:text-[#19C9D3] group-hover:translate-x-0.5 transition-all">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.branch-modal-enter-active,
.branch-modal-leave-active {
  transition: opacity 250ms ease;
}
.branch-modal-enter-active .relative,
.branch-modal-leave-active .relative {
  transition: transform 250ms ease, opacity 250ms ease;
}
.branch-modal-enter-from,
.branch-modal-leave-to {
  opacity: 0;
}
.branch-modal-enter-from .relative {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
.branch-modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
</style>
