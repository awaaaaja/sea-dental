import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { useAuthStore } from './stores/auth'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(pinia)

const auth = useAuthStore()
auth.init()

app.mount('#app')
