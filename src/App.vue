<script setup lang="ts">
import BranchModal from '@/components/BranchModal.vue'
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <router-view />
  <BranchModal />
</template>
