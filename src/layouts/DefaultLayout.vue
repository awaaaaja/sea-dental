<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import BottomNav from '@/components/BottomNav.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main id="main-content" class="flex-1 pb-[72px] md:pb-0">
      <router-view />
    </main>
    <Footer />
    <BottomNav />
  </div>
</template>
