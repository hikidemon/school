import { defineStore } from 'pinia'
import Cookies from 'js-cookie' 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isRightPanelActive: false,
    role: Cookies.get('role') || null,
  }),
  actions: {
    togglePanel(action: 'signUp' | 'signIn') {
      this.isRightPanelActive = action === 'signUp'
    },
    setRole(role: string) {
      this.role = role
      Cookies.set('role', role)
    },
    clearRole() {
      this.role = null
      Cookies.remove('role')
    },
  },
  getters: {
    isAdmin: (state) => state.role === 'admin', 
  },
  
  
})
