<template>
    <div 
      class="glass-container" 
      :class="{ 'expanded': isExpanded }"
      ref="container"
    >
      <div 
        class="glass-card" 
        @mousemove="handleTilt"
        @mouseenter="startHover"
        @mouseleave="endHover"
        :style="{
          transform: isExpanded ? 'none' : `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`,
          '--light-x': `${lightX}%`,
          '--light-y': `${lightY}%`
        }"
      >
        <div class="glass-thickness"></div>
        <div class="glass-content">
          <!-- Заголовок программы -->
          <div class="program-header">
            <h2 class="program-title text-3d">
              {{ program.title }}
            </h2>
           
          </div>
  
          <!-- Основной контент -->
          <div class="program-body"> <div class="program-category">
              {{ program.category }}
            </div>
            <div class="program-description">
              {{ program.description }}
            </div>
  
            <!-- Блок преподавателя -->
            <div class="teacher-block">
              <div class="teacher-avatar-wrapper">
                <img 
                  :src="program.teacher.avatar || defaultAvatar" 
                  class="teacher-avatar" 
                  alt="Teacher"
                />
                <div class="avatar-halo"></div>
              </div>
              <div class="teacher-info">
                <div class="teacher-name">
                  {{ program.teacher.name }}
                </div>
                <div class="teacher-position">
                  {{ program.teacher.position }}
                </div>
              </div>
            </div>
  
            <!-- Детали программы -->
            <div class="program-details">
              <div class="detail-item">
                <span class="detail-label">Длительность:</span>
                <span class="detail-value">{{ program.duration }} месяцев</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Уровень:</span>
                <span class="detail-value">{{ program.level }}</span>
              </div>
            </div>
          </div>
  
          <!-- Кнопка записи -->
          <button 
            class="enroll-button"
            @click.stop="handleEnroll"
            :disabled="isEnrolling"
          >
            <span v-if="!isEnrolling">Записаться</span>
            <span v-else class="loading-dots">Отправка</span>
          </button>
        </div>
        <div class="glass-reflections">
          <div class="reflection reflection-1"></div>
          <div class="reflection reflection-2"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted,watch } from 'vue'
  import { gsap } from 'gsap'
  import defaultAvatar from '@/assets/icons/6.png'
  import {programService} from '@/common/utils/ProgramService'
  import { useAuthStore } from '@/store/AuthStore'
import { ElMessage } from 'element-plus'

  const authStore = useAuthStore()
  const props = defineProps<{
    programId: string
    isExpanded?: boolean
  }>()
  
  const emit = defineEmits(['enroll'])
  const program = ref({
  id: '',
  title: '',
  description: '',
  category: '',
  duration: 0,
  level: '',
  teacher: {
    id: '',
    name: '',
    position: '',
    avatar: '',
    bio: ''
  },
  enrolled: false
})

  
  const container = ref<HTMLElement | null>(null)
  const tiltX = ref(0)
  const tiltY = ref(0)
  const lightX = ref(50)
  const lightY = ref(50)
  const isExpanded = ref(false)
  const isEnrolling = ref(false)
  
 

const fetchProgramData = async () => {
  
  try {
    const [error, response] = await programService.getProgram(props.programId)
    
    if (error) {
      console.error('Ошибка загрузки программы:', error)
      program.value.title = 'Ошибка загрузки'
      return
    }
    
    // Проверяем структуру ответа
    
    if (response?.data?.data) {
      program.value = response.data.data
    }
  } catch (e) {
    console.error('Неожиданная ошибка:', e)
  }
}

 watch(() => props.programId, (newId) => {
  if (newId) fetchProgramData()
}, { immediate: true })

// Обработка записи на программу
const handleEnroll = async () => {
  if (isEnrolling.value) return
  
  if (!authStore.isAuthenticated) {
    ElMessage.warning('Для записи на программу необходимо авторизоваться')
    return
  }

  isEnrolling.value = true
  
  try {
    const [error, response] = await programService.enrollToProgram(
      program.value.id, 
      authStore.user?.id || ''
    )
    
    if (error) {
      ElMessage.error(error.response?.data?.message || 'Ошибка записи')
      return
    }
    
    if (response?.data?.success) {
      program.value.enrolled = true
      emit('enroll', {
        programId: program.value.id,
        success: true,
        data: response.data
      })
      
      // Обновляем список программ пользователя
      await authStore.fetchUserPrograms()
      
      ElMessage.success('Вы успешно записаны на программу')
      gsap.to('.enroll-button', {
        backgroundColor: 'rgba(50, 200, 150, 0.8)',
        duration: 0.5
      })
    }
  } finally {
    isEnrolling.value = false
  }
}
  
  // Эффекты наведения (аналогично оригиналу)
  const handleTilt = (e: MouseEvent) => {
    if (!container.value || isExpanded.value) return
    
    const rect = container.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    lightX.value = (x / rect.width) * 100
    lightY.value = (y / rect.height) * 100
    
    tiltX.value = ((y - centerY) / centerY) * 5
    tiltY.value = -((x - centerX) / centerX) * 5
  }
  
  const startHover = () => {
    if (isExpanded.value) return
    
    gsap.to('.enroll-button', {
      y: -3,
      boxShadow: '0 6px 20px rgba(50, 220, 180, 0.4)',
      duration: 0.3
    })
    
    gsap.to('.reflection-1', { opacity: 0.8, duration: 0.3 })
    gsap.to('.reflection-2', { opacity: 0.6, duration: 0.3 })
  }
  
  const endHover = () => {
    if (isExpanded.value) return
    
    tiltX.value = 0
    tiltY.value = 0
    lightX.value = 50
    lightY.value = 50
    
    gsap.to('.enroll-button', {
      y: 0,
      boxShadow: '0 4px 15px rgba(50, 220, 180, 0.3)',
      duration: 0.3
    })
    
    gsap.to('.reflection-1', { opacity: 0.3, duration: 0.3 })
    gsap.to('.reflection-2', { opacity: 0.2, duration: 0.3 })
  }
  
  onMounted(() => {
    fetchProgramData()
    
    // Анимация появления
    gsap.from(container.value, {
      opacity: 1,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out'
    })
  })
  </script>
  
  <style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;600;700;800&display=swap');
  
  $emerald-dark: rgba(0, 80, 60, 0.9);
  $emerald-medium: rgba(20, 160, 120, 0.8);
  $emerald-light: rgba(50, 220, 180, 0.7);
  $glass-thickness: 10px;
  $border-radius: 24px;
  
  .glass-container {
    perspective: 1200px;
    padding: 20px;
    position: relative;
    transition: all 0.3s ease;
    will-change: transform;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    height: 100%; 
    display: flex;
    
  }
  
  .glass-card {
    flex-grow: 1;
    position: relative;
    border-radius: $border-radius;
    transform-style: preserve-3d;
    transition: transform 0.1s linear;
    height: auto;
    will-change: transform;
    box-shadow: 0 10px 30px rgba(0, 60, 45, 0.3);
    overflow: hidden;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    width: auto;
  /* Добавьте: */
  transform: translate3d(0, 0, 0);
  /* Изоляция контекста */
  isolation: isolate;
  will-change: transform;
  transform-origin: center;
  
  }
  
  .glass-thickness {
    position: absolute;
    inset: 0;
    border-radius: $border-radius;
    background: linear-gradient(
      145deg,
      transparent 0%,
      $emerald-dark 50%,
      transparent 100%
    );
    transform: translateZ(-$glass-thickness);
    filter: blur(2px);
    opacity: 1;
    z-index: 1;
  }
  
  .glass-content {
    padding: 28px;
    backdrop-filter: blur(16px) brightness(1.2);
    -webkit-backdrop-filter: blur(16px) brightness(1.2);
    border-radius: $border-radius;
    background: linear-gradient(
      145deg,
      rgba(30, 180, 140, 0.3) 0%,
      rgba(10, 100, 80, 0.7) 100%
    );
    transform-style: preserve-3d;
    position: relative;
    z-index: 2;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  
  .program-header {
    margin-bottom: 24px;
    position: relative;
    z-index: 4;
  }
  
  .program-title {
    --text-hue-rotate: 0deg;
    --text-brightness: 1;
    word-break: break-word;
    overflow-wrap: anywhere;
    hyphens: auto;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Ограничение в 2 строки */
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: 'SF Pro Display', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: rgba(0, 40, 30, 0.9);
    display: inline-block;
    position: relative;
    margin-bottom: -15px;
    text-shadow: 
      0 1px 0 rgba(255, 255, 255, 0.3),
      0 -1px 0 rgba(0, 0, 0, 0.7),
      0 2px 4px rgba(0, 0, 0, 0.5),
      0 4px 8px rgba(50, 220, 180, 0.3);
    
    &::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      color: rgba(50, 220, 180, 0.7);
      z-index: -1;
      transform: translateZ(-$glass-thickness/2);
      filter: 
        blur(1px)
        hue-rotate(var(--text-hue-rotate))
        brightness(var(--text-brightness));
      text-shadow: 
        0 0 10px rgba(50, 220, 180, 0.7),
        0 0 20px rgba(50, 220, 180, 0.5);
    }
  }
  
  .program-category {
    display: inline-block;
    padding: 6px 12px;
    background: rgba(0, 60, 45, 0.6);
    border-radius: 16px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    backdrop-filter: blur(4px);
    order: 2; /* Предмет снизу */
    margin-top: -10px;
  }
  
  .program-body {
    flex-grow: 1;
    margin-bottom: 24px;
  }
  
  .program-description {
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 24px;
    font-family: 'SF Pro Display', sans-serif;
    text-shadow: 0 1px 2px rgba(0, 40, 30, 0.6);
  }
  
  .teacher-block {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    padding: 16px;
    background: rgba(0, 60, 45, 0.4);
    border-radius: 12px;
    border: 1px solid rgba(50, 220, 180, 0.2);
    backdrop-filter: blur(8px);
    margin-top: auto;
  }
  
  .teacher-avatar-wrapper {
    position: relative;
    margin-right: 16px;
    width: 60px;
    height: 60px;
  }
  
  .teacher-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 2;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  .avatar-halo {
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(50, 220, 180, 0.7) 180deg,
      rgba(255, 255, 255, 0.9) 360deg
    );
    z-index: 1;
    filter: blur(4px);
    animation: rotate-halo 8s linear infinite;
    opacity: 0.7;
  }
  
  .teacher-info {
    
    order: 1;
  }
  
  .teacher-name {
    font-weight: 700;
    color: white;
    margin-bottom: 4px;
    font-size: 1.1rem;
    text-shadow: 0 1px 2px rgba(0, 40, 30, 0.8);
  }
  
  .teacher-position {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .program-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .detail-item {
    background: rgba(0, 80, 60, 0.4);
    padding: 12px;
    border-radius: 8px;
    border: 1px solid rgba(50, 220, 180, 0.1);
  }
  
  .detail-label {
    display: block;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 4px;
  }
  
  .detail-value {
    font-size: 1rem;
    font-weight: 600;
    color: white;
  }
  
  .enroll-button {
    background: linear-gradient(
      145deg,
      rgba(20, 160, 120, 0.9) 0%,
      rgba(0, 120, 90, 0.9) 100%
    );
    border: none;
    padding: 14px 24px;
    border-radius: 12px;
    color: white;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    z-index: 4;
    box-shadow: 
      0 4px 15px rgba(50, 220, 180, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'SF Pro Display', sans-serif;
    width: 100%;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 6px 20px rgba(50, 220, 180, 0.4),
        inset 0 1px 1px rgba(255, 255, 255, 0.3);
    }
    
    &:active {
      transform: translateY(1px);
    }
    
    &:disabled {
      background: rgba(100, 100, 100, 0.5);
      cursor: not-allowed;
    }
  }
  
  .loading-dots::after {
    content: '.';
    animation: loading-dots 1.5s infinite steps(3, end);
  }
  
  @keyframes loading-dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }
  
  /* Остальные стили (анимации, reflections и т.д. из оригинального кода) */
  .glass-reflections {
    position: absolute;
    inset: 0;
    border-radius: $border-radius;
    overflow: hidden;
    z-index: 1;
  }
  
  .reflection {
    position: absolute;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform-origin: center;
  }
  
  .reflection-1 {
    width: 150%;
    height: 40%;
    top: -20%;
    left: -25%;
    transform: rotate(15deg);
    opacity: 0.3;
    transition: opacity 0.4s ease;
    animation: reflection-shine 8s infinite linear;
  }
  
  .reflection-2 {
    width: 200%;
    height: 30%;
    top: 60%;
    left: -50%;
    transform: rotate(-10deg);
    opacity: 0.2;
    transition: opacity 0.4s ease;
    animation: reflection-shine 12s infinite linear reverse;
  }
  
  @keyframes rotate-halo {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes reflection-shine {
    0% { transform: translateX(-100%) rotate(15deg); }
    100% { transform: translateX(100%) rotate(15deg); }
  }
  
  @media (max-width: 768px) {
    .glass-container {
      padding: 12px;
    }
    
    .glass-content {
      padding: 20px;
    }
    
    .program-title {
      font-size: 1.5rem;
    }
    
    .program-details {
      grid-template-columns: 1fr;
    }
  }
  </style>