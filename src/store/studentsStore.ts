import { User } from '@/common/types/User'
import { userService } from '@/common/utils/UserService'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useStudentsStore = defineStore('students', () => {
  // State
  const students = ref<User[]>([])
  const isLoading = ref(false)
  const history = ref<User[][]>([])
  const historyIndex = ref(-1)
  const pendingChanges = ref<Record<string, User>>({})

  // Getters
  const canUndo = computed(() => historyIndex.value > 0)
  const canRedo = computed(() => historyIndex.value < history.value.length - 1)
  const hasChanges = computed(() => Object.keys(pendingChanges.value).length > 0)

  // Actions
  const fetchStudents = async () => {
    try {
      isLoading.value = true
      const [error, response] = await userService.getStudents()
      
      if (!error && response?.data?.data) {
        students.value = response.data.data
      } else {
        students.value = []
      }
      
      saveHistory()
    } catch (error) {
      console.error('Failed to fetch students:', error)
      students.value = []
    } finally {
      isLoading.value = false
    }
  }

  const filteredStudents = (query: string) => {
    if (!query) return students.value
    return students.value.filter(student => 
      student.name?.toLowerCase().includes(query.toLowerCase()))
  }

  const createStudent = async (student: User) => {
    try {
      const [error, response] = await userService.addStudent(student)
      if (error) throw error
      
      students.value.push(response?.data)
      saveHistory()
      return response?.data
    } catch (error) {
      console.error('Create student error:', error)
      throw error
    }
  }
  function getMockStudents(): User[] {
    return [
      {
        id: '1',
        name: 'Иван Иванов',
        avatarUrl: 'https://example.com/avatar1.jpg',
        bio: 'Любит математику и физику.',
        email: 'ivan@example.com',
        phone: '+7 999 123 45 67',
        address: 'Москва, ул. Ленина, 1',
        birthdate: '2005-01-01',
        occupation: 'Студент',
        subjects: ['Математика', 'Физика'],
        vkLink: 'https://vk.com/ivanov'
      }
    ]
  }
  const updateStudent = async (student: User) => {
    try {
      const [error, response] = await userService.updateStudent(student.id, student)
      if (error) throw error
      
      const index = students.value.findIndex(s => s.id === student.id)
      if (index !== -1) {
        students.value[index] = { ...student }
      }
      
      saveHistory()
      return response?.data
    } catch (error) {
      console.error('Update student error:', error)
      throw error
    }
  }

  const deleteStudent = async (studentId: string) => {
    try {
      const [error] = await userService.deleteStudent(studentId)
      if (error) throw error
      
      students.value = students.value.filter(student => student.id !== studentId)
      saveHistory()
    } catch (error) {
      console.error('Delete student error:', error)
      throw error
    }
  }

  const saveAllChanges = async () => {
    try {
      isLoading.value = true
      // Здесь можно добавить логику для массового сохранения изменений
      pendingChanges.value = {}
    } catch (error) {
      console.error('Save all changes error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const cancelAllChanges = () => {
    fetchStudents()
    pendingChanges.value = {}
  }

  const undo = () => {
    if (canUndo.value) {
      historyIndex.value--
      students.value = [...history.value[historyIndex.value]]
    }
  }

  const redo = () => {
    if (canRedo.value) {
      historyIndex.value++
      students.value = [...history.value[historyIndex.value]]
    }
  }

  const saveHistory = () => {
    history.value = history.value.slice(0, historyIndex.value + 1)
    history.value.push([...students.value])
    historyIndex.value++
  }

  return {
    // State
    students,
    isLoading,
    
    // Getters
    canUndo,
    canRedo,
    hasChanges,
    
    // Actions
    fetchStudents,
    filteredStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    saveAllChanges,
    cancelAllChanges,
    undo,
    redo
  }
})