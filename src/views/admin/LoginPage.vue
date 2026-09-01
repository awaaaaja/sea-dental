<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ email: '', password: '' })
const error = ref('')
const loading = ref(false)
const showReset = ref(false)
const resetSent = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(form.email, form.password)
    router.push('/admin')
  } catch (e: any) {
    error.value = e.message || 'Login gagal'
  } finally {
    loading.value = false
  }
}

async function handleReset() {
  error.value = ''
  loading.value = true
  try {
    await auth.resetPassword(form.email)
    resetSent.value = true
  } catch (e: any) {
    error.value = e.message || 'Gagal mengirim email reset'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-medical-bg flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-5">
        <router-link to="/" class="inline-block">
          <img src="/references/logo_footer.png"
            alt="SEA Dental Aesthetics" class="h-16 mx-auto mb-4">
        </router-link>
        <h1 class="font-display text-[20px] md:text-[24px] font-bold text-primary">Admin Panel</h1>
        <p class="font-body text-sm text-on-surface-variant mt-1">Masuk untuk mengelola konten website</p>
      </div>

      <!-- Login Form -->
      <div class="glass-panel rounded-2xl p-4 md:p-6">
        <div v-if="resetSent" class="text-center py-4">
          <span class="material-symbols-outlined text-5xl text-cyan-tech mb-3">mark_email_read</span>
          <h3 class="font-display text-base font-semibold text-primary mb-2">Email Terkirim</h3>
          <p class="font-body text-sm text-on-surface-variant mb-4">
            Cek inbox Anda untuk link reset password.
          </p>
          <button @click="showReset = false; resetSent = false"
            class="text-primary font-display text-sm font-semibold hover:text-cyan-tech transition-colors">
            Kembali ke Login
          </button>
        </div>

        <form v-else @submit.prevent="showReset ? handleReset() : handleLogin()">
          <h2 class="font-display text-[18px] font-semibold text-primary mb-5">
            {{ showReset ? 'Reset Password' : 'Masuk' }}
          </h2>

          <div v-if="error" class="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-body">
            {{ error }}
          </div>

          <div class="space-y-4">
            <div>
              <label class="block font-body text-sm font-medium text-primary mb-1.5">Email</label>
              <input v-model="form.email" type="email" required
                class="w-full px-3 py-2.5 rounded-xl border border-surface-container bg-white font-body text-sm text-on-surface focus:outline-none focus:border-cyan-tech focus:ring-1 focus:ring-cyan-tech transition-colors"
                placeholder="admin@seadental.com">
            </div>

            <div v-if="!showReset">
              <label class="block font-body text-sm font-medium text-primary mb-1.5">Password</label>
              <input v-model="form.password" type="password" required
                class="w-full px-3 py-2.5 rounded-xl border border-surface-container bg-white font-body text-sm text-on-surface focus:outline-none focus:border-cyan-tech focus:ring-1 focus:ring-cyan-tech transition-colors"
                placeholder="••••••••">
            </div>
          </div>

          <button v-if="!showReset" type="button"
            @click="showReset = true"
            class="mt-2 text-primary text-xs font-body hover:text-cyan-tech transition-colors">
            Lupa password?
          </button>

          <button type="submit"
            :disabled="loading"
            class="mt-6 w-full py-3.5 rounded-xl bg-primary text-white font-display font-semibold text-sm hover:bg-primary/90 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50">
            <span v-if="loading" class="material-symbols-outlined text-base animate-spin">refresh</span>
            <span v-else class="material-symbols-outlined text-base">login</span>
            {{ showReset ? 'Kirim Reset Link' : 'Masuk' }}
          </button>

          <button v-if="showReset" type="button"
            @click="showReset = false"
            class="mt-3 w-full py-2.5 rounded-xl border border-surface-container text-on-surface-variant font-display text-sm font-semibold hover:bg-surface-container transition-colors">
            Batal
          </button>
        </form>
      </div>

      <p class="text-center mt-6 font-body text-xs text-on-surface-variant">
        <router-link to="/" class="text-primary hover:text-cyan-tech transition-colors">← Kembali ke Website</router-link>
      </p>
    </div>
  </div>
</template>
