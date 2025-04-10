<template>
    <div class="programs-page">
      <!-- Заголовок и фильтры -->
      <div class="programs-header">
        <h1 class="page-title">Программы</h1>
        
        <div class="controls">
          <div class="search-box">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Поиск программ..."
              @input="handleSearch"
              class="input"
            >
           
          </div>
          
          <div class="filters">
            <button 
            v-if="authStore.isAuthenticated && !authStore.isAdminAndTeacher"
            class="filter-button"
            :class="{ active: showMyPrograms }"
            @click="toggleMyPrograms"
          >
            Мои программы
          </button>
            <select v-model="selectedCategory" @change="filterPrograms">
              <option value="">Все категории</option>
              <option 
                v-for="category in categories" 
                :key="category" 
                :value="category"
              >
                {{ category }}
              </option>
            </select>
            
            <select v-model="selectedLevel" @change="filterPrograms">
              <option value="">Все уровни</option>
              <option value="Начальный">Начальный</option>
              <option value="Средний">Средний</option>
              <option value="Продвинутый">Продвинутый</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Состояние загрузки -->
      <div v-if="isLoading" class="loading-state">
        <div class="loader"></div>
        <p>Загрузка программ...</p>
      </div>
      
      <!-- Сообщение при отсутствии результатов -->
      <div v-else-if="filteredPrograms.length === 0" class="empty-state">
        
        <h3>Программы не найдены</h3>
        <p>Попробуйте изменить параметры поиска</p>
      </div>
      
      <!-- Список программ -->
      <div v-else class="programs-grid">
    <template v-if="showMyPrograms">
      <MyProgramCard
        v-for="program in authStore.userPrograms"
        :key="program.id"
        :program="program"
      />
    </template>
    <template v-else>
        <template v-if="authStore.isAdminAndTeacher">
          <MyProgramCard
            v-for="program in filteredPrograms"
            :key="program.id"
            :program="program"
            :can-edit="true"
            @update-hours="handleHoursUpdate"
          />
        </template>
        
        <template v-else>
          <ProgramCard
            v-for="program in filteredPrograms"
            :key="program.id"
            :program-id="program.id"
            @enroll="handleEnrollment"
          />
        </template>
    </template>
  </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import ProgramCard from '@/components/molecules/ProgramCard.vue'
  import { programService } from '@/common/utils/ProgramService'
  import type { Program, ProgramEnrollmentResponse } from '@/common/types/Program'
  import MyProgramCard from '@/components/molecules/MyProgramCard.vue'
  import { useAuthStore } from '@/store/AuthStore'
  import { ElMessage } from 'element-plus'

  const authStore = useAuthStore()
  const isLoading = ref(true)
  const showMyPrograms = ref(false)
  const showEditMode = ref(true)
  // Данные программ
  const programs = ref<Program[]>([])
  const filteredPrograms = ref<Program[]>([])
  const myPrograms = ref<Program[]>([])
  // Фильтры и поиск
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const selectedLevel = ref('')
  const categories = ref<string[]>([])
  
  const handleHoursUpdate = async (updatedHours: any[], programId: string) => {
  try {
    // 1. Подготовка данных для отправки
    const updateData = {
      programId,
      hours: updatedHours,
      updatedAt: new Date().toISOString()
    }

    // 2. Отправка запроса на сервер
    const [error, response] = await programService.updateProgramHours(updateData)
    
    if (error) {
      throw error
    }

    // 3. Обновление локального состояния
    ElMessage.success('Изменения часов программы сохранены')
    
    // 4. Опционально: обновление данных в хранилище
    await authStore.fetchUserPrograms()
    
    return response?.data
  } catch (error) {
    console.error('Ошибка при сохранении часов программы:', error)
    ElMessage.error('Не удалось сохранить изменения часов')
    throw error
  }
}

  const toggleEditMode = () => {
  showEditMode.value = !showEditMode.value
  if (showEditMode.value) {
    showMyPrograms.value = false
  }
}
  const toggleMyPrograms = async () => { 
  if (!authStore.isAuthenticated) {
    showMyPrograms.value = !showMyPrograms.value 
    ElMessage.warning('Для просмотра ваших программ необходимо авторизоваться')
    await authStore.fetchUserPrograms()
    return
  }
  
 
  if (showMyPrograms.value) {showMyPrograms.value = !showMyPrograms.value 
    await authStore.fetchUserPrograms()
  }
}


const fetchMyPrograms = async () => {
  if (!authStore.user) return
  
  try {
    isLoading.value = true
    const [error, response] = await programService.getUserPrograms(authStore.user.id)
    
    if (error) throw error
    myPrograms.value = response?.data?.data || []
  } catch (error) {
    console.error('Ошибка загрузки моих программ:', error)
  } finally {
    isLoading.value = false
  }
}
  // Загрузка данных
  const fetchPrograms = async () => {
    try {
      isLoading.value = true
      const [error, response] = await programService.getPrograms()
      
      if (error) {
        console.error('Ошибка загрузки программ:', error)
        return
      }
      
      programs.value = response?.data?.data || []
      filteredPrograms.value = programs.value
      
      // Извлекаем уникальные категории для фильтра
      categories.value = [...new Set(programs.value.map(p => p.category))]
    } finally {
      isLoading.value = false
    }
  }
  
  // Фильтрация программ
  const filterPrograms = () => {
    filteredPrograms.value = programs.value.filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                           program.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      const matchesCategory = selectedCategory.value ? program.category === selectedCategory.value : true
      const matchesLevel = selectedLevel.value ? program.level === selectedLevel.value : true
      
      return matchesSearch && matchesCategory && matchesLevel
    })
    
   
  }
  
  // Поиск с задержкой
  let searchTimeout: number
  const handleSearch = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(filterPrograms, 300)
  }
  
  // Обработка записи на программу
  const handleEnrollment = async (result: ProgramEnrollmentResponse) => {
  if (!authStore.isAuthenticated) {
    ElMessage.warning('Для записи на программу необходимо авторизоваться')
    return
  }

  if (result.success) {
    ElMessage.success('Вы успешно записаны на программу')
    if (authStore.user) {
      await fetchMyPrograms()
    }
  } else {
    ElMessage.error(result.error || 'Ошибка записи на программу')
  }
}
  

  
  onMounted(() => {
    fetchPrograms()
    if (authStore.user) {
    fetchMyPrograms()
  }
  })
  </script>
  
  <style scoped lang="scss">
  $emerald-dark: rgba(0, 80, 60, 0.9);
  $emerald-medium: rgba(20, 160, 120, 0.8);
  $emerald-light: rgba(50, 220, 180, 0.7);
  $glass-thickness: 10px;
  $border-radius: 24px;
.input {
  background: rgba(0, 60, 45, 0.5);
  border: 1px solid rgba(50, 220, 180, 0.3);
  border-radius: 8px;
  padding: 4px 8px;
  color:#ddd;
  font-family: 'SF Pro Display', sans-serif;
  width: 100%;
  max-width: 650px;
  backdrop-filter: blur(4px);
  
  &:focus {
    outline: none;
    border-color: $emerald-light;
    box-shadow: 0 0 0 2px rgba(50, 220, 180, 0.3);
  }
}

    .filter-button {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: #f5f5f5;
    }
    
    &.active {
        background: #42b983;
        color: white;
        border-color: #42b983;
    }
    }
  .programs-page {
    padding: 1rem;
   
    margin: 0 auto;
    overflow: hidden;
  }
  
  .programs-header {
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .page-title {
    @include glass-text();
   
  
    color:var(--color-black)-light;
    margin: 0;
  }
  
  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-between;
    align-items: center;
  }
  
  .search-box {
    position: relative;
    flex-grow: 1;
    max-width: 600px;
    
    input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border-radius: 8px;
      border: 1px solid #ddd;
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        border-color: #42b983;
        box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
        outline: none;
      }
    }
    
    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      opacity: 1;
    }
  }
  
  .filters {
    display: flex;
    gap: 1rem;
    
    select {
      padding: 0.75rem 1rem;
      border-radius: 8px;
      border: 1px solid #ddd;
      font-size: 1rem;
      background-color: white;
      cursor: pointer;
      
      &:focus {
        outline: none;
        border-color: #42b983;
      }
    }
  }
  
  .programs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 2fr));
    gap: 2rem;
    overflow-y: auto;
    max-height:76vh;
    align-items: stretch;
  }
  .programs-grid::-webkit-scrollbar {
  display: none;
}
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    gap: 1rem;
    
    .loader {
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #42b983;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    p {
      font-size: 1.1rem;
      color: #666;
    }
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    gap: 1rem;
    text-align: center;
    
    img {
      width: 150px;
      opacity: 0.7;
      margin-bottom: 1rem;
    }
    
    h3 {
      font-size: 1.5rem;
      color: #2c3e50;
      margin: 0;
    }
    
    p {
      font-size: 1rem;
      color: #666;
      margin: 0;
    }
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
    
    button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: #f5f5f5;
      }
      
      &.active {
        background: #42b983;
        color: white;
        border-color: #42b983;
      }
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .programs-page {
      padding: 1rem;
    }
    
    .programs-grid {
      grid-template-columns: 1fr;
    }
    
    .controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .search-box {
      max-width: 100%;
    }
    
    .filters {
      flex-direction: column;
    }
  }
  </style>