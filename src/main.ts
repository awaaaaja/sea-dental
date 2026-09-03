import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { useAuthStore } from './stores/auth'
import './style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(faSquareInstagram)

// ponytail: suppress harmless ad-blocker block for Google Maps CSP test (gen_204)
const _origConsoleError = console.error
console.error = (...args: any[]) => {
  const msg = args.join(' ')
  if (msg.includes('maps.googleapis.com') && msg.includes('gen_204')) return
  _origConsoleError.apply(console, args as any)
}
// also filter network error events from maps
window.addEventListener('error', (e) => {
  const target = e.target as any
  const src = target?.src || target?.href || ''
  if (typeof src === 'string' && src.includes('maps.googleapis.com') && src.includes('gen_204')) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  const msg = (e as ErrorEvent).message || ''
  if (msg.includes('Failed to fetch dynamically imported module') || msg.includes('Loading chunk')) {
    window.location.reload()
  }
}, true)

// ponytail: reveal Material Symbols only after font loads (prevent FOUT)
if ('fonts' in document) {
  (document as any).fonts.ready.then(() => document.documentElement.classList.add('fonts-loaded'))
} else {
  setTimeout(() => document.documentElement.classList.add('fonts-loaded'), 500)
}

window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
  const msg = String(e.reason?.message || e.reason || '')
  if (msg.includes('Failed to fetch dynamically imported module') || msg.includes('Loading chunk')) {
    e.preventDefault()
    window.location.reload()
  }
  // also suppress maps gen_204 promise rejection if any
  if (msg.includes('maps.googleapis.com') && msg.includes('gen_204')) {
    e.preventDefault()
  }
})

const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('FontAwesomeIcon', FontAwesomeIcon)

const auth = useAuthStore()
auth.init()

router.onError((err) => {
  if (err.message.includes('Failed to fetch dynamically imported module')) {
    window.location.reload()
  }
})

app.mount('#app')
