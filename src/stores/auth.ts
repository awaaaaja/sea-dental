import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'
import type { User } from '@supabase/supabase-js'

export type UserRole = 'super_admin' | 'editor' | 'staff'

export interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const profile = ref<UserProfile | null>(null)
  const loading = ref(true)

  const isAuthenticated = computed(() => !!user.value)
  const isSuperAdmin = computed(() => profile.value?.role === 'super_admin')
  const isEditor = computed(() => profile.value?.role === 'editor')
  const isStaff = computed(() => profile.value?.role === 'staff')
  const canEdit = computed(() => isSuperAdmin.value || isEditor.value)

  async function init() {
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user ?? null
    if (user.value) await fetchProfile()
    loading.value = false

    supabase.auth.onAuthStateChange((_event: any, session: any) => {
      user.value = session?.user ?? null
      if (user.value) fetchProfile()
      else profile.value = null
    })
  }

  async function fetchProfile() {
    if (!user.value) return
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, role')
      .eq('id', user.value.id)
      .single()
    profile.value = data as UserProfile | null
  }

  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
    await fetchProfile()
    return data
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
    profile.value = null
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    })
    if (error) throw error
  }

  return {
    user,
    profile,
    loading,
    isAuthenticated,
    isSuperAdmin,
    isEditor,
    isStaff,
    canEdit,
    init,
    login,
    logout,
    resetPassword,
    fetchProfile,
  }
})
