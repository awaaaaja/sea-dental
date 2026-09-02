import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { useAuthStore } from './stores/auth'
import './style.css'

// ponytail: auto-reload on chunk load failure (old cached index after deploy)
window.addEventListener('error', (e) => {
  const msg = (e as ErrorEvent).message || ''
  if (msg.includes('Failed to fetch dynamically imported module') || msg.includes('Loading chunk')) {
    window.location.reload()
  }
})
window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
  const msg = String(e.reason?.message || e.reason || '')
  if (msg.includes('Failed to fetch dynamically imported module') || msg.includes('Loading chunk')) {
    e.preventDefault()
    window.location.reload()
  }
})

const app = createApp(App)
app.use(router)
app.use(pinia)

const auth = useAuthStore()
auth.init()

router.onError((err) => {
  if (err.message.includes('Failed to fetch dynamically imported module')) {
    window.location.reload()
  }
})

app.mount('#app')
