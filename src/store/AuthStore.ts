import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import type { ServiceResponseType } from '@/common/utils/AxiosService'
import { authService } from '@/common/utils/AuthService'
import { Program } from '@/common/types/Program'
import { programService } from '@/common/utils/ProgramService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isRightPanelActive: false,
    role: Cookies.get('role') || null,
    user: null as { id: string, name: string, email: string } | null,
    token: Cookies.get('token') || null,
    userPrograms: [] as Program[] 
  }),
  actions: {
    togglePanel(action: 'signUp' | 'signIn') {
      this.isRightPanelActive = action === 'signUp'
    },
    async fetchUserPrograms() {
      if (!this.user)  this.user = {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
      }
      
      try {
        const [error, response] = await programService.getUserPrograms(this.user.id)
        if (!error && response?.data?.data) {
          this.userPrograms = response.data.data
        }
      } catch (e) {
        console.error('Ошибка загрузки программ пользователя:', e)
        
      }
    },
    
    async login(credentials: { email: string; password: string }) {
      const [error, response] = await authService.login(credentials)
      
      if (error) {
        ElMessage.error(error.response?.data?.message || 'Ошибка авторизации')
        await this.fetchUserPrograms();
        return false
      }
      
      this.token = response?.data?.data.token
      this.user = {
        id: response?.data?.data.userId,
        name: response?.data?.data.name,
        email: credentials.email
      }
      this.role = response?.data?.data.role
      
      Cookies.set('token', this.token)
      Cookies.set('role', this.role)
      
      ElMessage.success('Успешный вход в систему')
      return true
    },
    
    async register(credentials: { email: string; password: string; id_role: string }) {
      const [error, response] = await authService.register(credentials)
      
      if (error) {
        ElMessage.error(error.response?.data?.message || 'Ошибка регистрации')
        await this.fetchUserPrograms();
        return false
      }
      
      ElMessage.success('Регистрация прошла успешно')
      return true
    },
    
    async logout() {
      try {
        await authService.logout()
      } finally {
        this.clearAuth()
        ElMessage.success('Вы успешно вышли из системы')
      }
    },
    
    clearAuth() {
      this.token = null
      this.user = null
      this.role = null
      Cookies.remove('token')
      Cookies.remove('role')
    },
    
    checkAuth() {
      return !!this.token && !!this.user
    }
  },
  getters: {
    isAdmin: (state) => state.role === 'admin',
    isAuthenticated: (state) => !!state.token,
    isAdminAndTeacher:(state)=>state.role==='admin' || 'teacher'
  }
})