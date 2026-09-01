import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        { path: '', name: 'home', component: () => import('@/views/HomePage.vue') },
        { path: 'about', name: 'about', component: () => import('@/views/AboutPage.vue') },
        { path: 'services', name: 'services', component: () => import('@/views/ServicesPage.vue') },
        { path: 'services/:slug', name: 'service-detail', component: () => import('@/views/ServiceDetailPage.vue') },
        { path: 'doctors', name: 'doctors', component: () => import('@/views/DoctorsPage.vue') },
        { path: 'doctors/:slug', name: 'doctor-detail', component: () => import('@/views/DoctorDetailPage.vue') },
        { path: 'gallery', name: 'gallery', component: () => import('@/views/GalleryPage.vue') },
        { path: 'articles', name: 'articles', component: () => import('@/views/ArticlesPage.vue') },
        { path: 'articles/:slug', name: 'article-detail', component: () => import('@/views/ArticleDetailPage.vue') },
        { path: 'locations', name: 'locations', component: () => import('@/views/LocationsPage.vue') },
        { path: 'faq', name: 'faq', component: () => import('@/views/FaqPage.vue') },
        { path: 'promos', name: 'promos', component: () => import('@/views/PromosPage.vue') },
        { path: 'promos/:slug', name: 'promo-detail', component: () => import('@/views/PromoDetailPage.vue') },
        { path: 'contact', name: 'contact', component: () => import('@/views/ContactPage.vue') },
      ],
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/views/admin/LoginPage.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'admin-dashboard', component: () => import('@/views/admin/DashboardPage.vue') },
        { path: 'services', name: 'admin-services', component: () => import('@/views/admin/ServicesAdminPage.vue') },
        { path: 'services/new', name: 'admin-service-new', component: () => import('@/views/admin/ServiceFormPage.vue') },
        { path: 'services/:id/edit', name: 'admin-service-edit', component: () => import('@/views/admin/ServiceFormPage.vue') },
        { path: 'doctors', name: 'admin-doctors', component: () => import('@/views/admin/DoctorsAdminPage.vue') },
        { path: 'doctors/new', name: 'admin-doctor-new', component: () => import('@/views/admin/DoctorFormPage.vue') },
        { path: 'doctors/:id/edit', name: 'admin-doctor-edit', component: () => import('@/views/admin/DoctorFormPage.vue') },
        { path: 'articles', name: 'admin-articles', component: () => import('@/views/admin/ArticlesAdminPage.vue') },
        { path: 'articles/new', name: 'admin-article-new', component: () => import('@/views/admin/ArticleFormPage.vue') },
        { path: 'articles/:id/edit', name: 'admin-article-edit', component: () => import('@/views/admin/ArticleFormPage.vue') },
        { path: 'gallery', name: 'admin-gallery', component: () => import('@/views/admin/GalleryAdminPage.vue') },
        { path: 'promos', name: 'admin-promos', component: () => import('@/views/admin/PromosAdminPage.vue') },
        { path: 'promos/new', name: 'admin-promo-new', component: () => import('@/views/admin/PromoFormPage.vue') },
        { path: 'promos/:id/edit', name: 'admin-promo-edit', component: () => import('@/views/admin/PromoFormPage.vue') },
        { path: 'locations', name: 'admin-locations', component: () => import('@/views/admin/LocationsAdminPage.vue') },
        { path: 'locations/new', name: 'admin-location-new', component: () => import('@/views/admin/LocationFormPage.vue') },
        { path: 'locations/:id/edit', name: 'admin-location-edit', component: () => import('@/views/admin/LocationFormPage.vue') },
        { path: 'faq', name: 'admin-faq', component: () => import('@/views/admin/FaqAdminPage.vue') },
        { path: 'faq/new', name: 'admin-faq-new', component: () => import('@/views/admin/FaqFormPage.vue') },
        { path: 'faq/:id/edit', name: 'admin-faq-edit', component: () => import('@/views/admin/FaqFormPage.vue') },
        { path: 'testimonials', name: 'admin-testimonials', component: () => import('@/views/admin/TestimonialsAdminPage.vue') },
        { path: 'testimonials/new', name: 'admin-testimonial-new', component: () => import('@/views/admin/TestimonialFormPage.vue') },
        { path: 'testimonials/:id/edit', name: 'admin-testimonial-edit', component: () => import('@/views/admin/TestimonialFormPage.vue') },
        { path: 'bookings', name: 'admin-bookings', component: () => import('@/views/admin/BookingsAdminPage.vue') },
        { path: 'inquiries', name: 'admin-inquiries', component: () => import('@/views/admin/InquiriesAdminPage.vue') },
        { path: 'settings', name: 'admin-settings', component: () => import('@/views/admin/SettingsAdminPage.vue') },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const auth = useAuthStore()
    if (auth.loading) await auth.init()
    if (!auth.isAuthenticated) return { name: 'admin-login' }
  }
})

export default router
