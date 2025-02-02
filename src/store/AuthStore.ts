import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isRightPanelActive: false, 
  }),
  actions: {
    togglePanel(action: 'signUp' | 'signIn') {
      this.isRightPanelActive = action === 'signUp'
    },
  },
})