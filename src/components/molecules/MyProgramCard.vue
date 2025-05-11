<template>
    <div class="glass-container" ref="container">
      <div 
        class="glass-card"
        @mousemove="handleTilt"
        @mouseenter="startHover"
        @mouseleave="endHover"
        :style="{
          transform: `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`,
          '--light-x': `${lightX}%`,
          '--light-y': `${lightY}%`
        }"
      >
        <div class="glass-thickness"></div>
        <div class="glass-content">
          <div class="program-header">
            <h2 class="program-title text-3d">
              {{ program.title }}
            </h2>
            <!-- Прогресс только для студентов -->
            <div class="progress-container" v-if="!canEdit && program.progress !== undefined">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: program.progress + '%' }"></div>
              </div>
              <span class="progress-text">{{ program.progress }}% завершено</span>
            </div>
          </div>
  
          <div class="program-body">
            <div class="program-category">
              {{ program.category }}
            </div>
            
            <div class="program-description">
              {{ program.description }}
            </div>
  
            <div class="hours-details">
              <div class="hours-header">
                <h4 class="hours-title">Программа по часам:</h4>
                <el-button 
                  v-if="canEdit"
                  @click="addNewStage"
                  class="add-stage-button"
                  type="primary"
                  size="small"
                  circle
                >
                  <el-icon><Plus /></el-icon>
                </el-button>
              </div>
              
              <ul class="hours-list">
                <li v-for="(item, index) in localHours" :key="index" class="hour-item">
                  <div class="hour-stage-container">
                    <input
                      v-if="editingIndex === index"
                      v-model="editingStage"
                      @blur="saveStageEdit(index)"
                      @keyup.enter="saveStageEdit(index)"
                      class="stage-input"
                      type="text"
                    >
                    <span 
                      v-else
                      class="hour-stage"
                      @dblclick="canEdit ? startEditing(index) : null"
                      :class="{ 'editable': canEdit }"
                    >
                      {{ item.stage }}
                    </span>
                  </div>
                  
                  <div class="hour-value-container">
                    <input
                      v-if="editingIndex === index"
                      v-model.number="editingHours"
                      @blur="saveHoursEdit(index)"
                      @keyup.enter="saveHoursEdit(index)"
                      class="hours-input"
                      type="number"
                      min="0"
                    >
                    <span 
                      v-else
                      class="hour-value"
                      @dblclick="canEdit ? startEditing(index) : null"
                      :class="{ 'editable': canEdit }"
                    >
                      {{ item.hours }} ч
                    </span>
                    
                    <div v-if="canEdit" class="hour-actions">
                      <el-button 
                        @click="startEditing(index)"
                        class="edit-button"
                        type="primary"
                        size="small"
                        circle
                      >
                        <el-icon><Edit /></el-icon>
                      </el-button>
                      <el-button 
                        @click="removeStage(index)"
                        class="delete-button"
                        type="danger"
                        size="small"
                        circle
                      >
                        <el-icon><Delete /></el-icon>
                      </el-button>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="total-hours">
                Всего часов: <strong>{{ totalHours }} ч</strong>
              </div>
            </div>
  
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
                <div class="teacher-name">{{ program.teacher.name }}</div>
                <div class="teacher-position">{{ program.teacher.position }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="glass-reflections">
          <div class="reflection reflection-1"></div>
          <div class="reflection reflection-2"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { gsap } from 'gsap'
  import defaultAvatar from '@/assets/icons/6.png'
  import type { Program } from '@/common/types/Program'
  import { ElButton, ElIcon } from 'element-plus'
  import { Plus, Edit, Delete } from '@element-plus/icons-vue'
  
  const props = defineProps<{
    program: Program,
    canEdit: {
      type: Boolean,
      default: false
    }
  }>()
  
  const emit = defineEmits(['update-hours'])
  
  const container = ref<HTMLElement | null>(null)
  const tiltX = ref(0)
  const tiltY = ref(0)
  const lightX = ref(50)
  const lightY = ref(50)
  const localHours = ref([...(props.program.hours || [])])
  const editingIndex = ref(-1)
  const editingStage = ref('')
  const editingHours = ref(0)
  
  watch(() => props.program.hours, (newHours) => {
    if (editingIndex.value === -1) {
      localHours.value = Array.isArray(newHours) ? [...newHours] : []
    }
  }, { deep: true })
  
  const totalHours = computed(() => {
    return localHours.value.reduce((sum, item) => sum + (item.hours || 0), 0)
  })
  
  const startEditing = (index: number) => {
    editingIndex.value = index
    editingStage.value = localHours.value[index]?.stage || ''
    editingHours.value = localHours.value[index]?.hours || 0
  }
  
  const saveStageEdit = (index: number) => {
    if (editingStage.value.trim()) {
      if (!localHours.value[index]) {
        localHours.value[index] = { stage: '', hours: 0 }
      }
      localHours.value[index].stage = editingStage.value.trim()
      emit('update-hours', localHours.value)
    }
    editingIndex.value = -1
  }
  
  const saveHoursEdit = (index: number) => {
    if (editingHours.value >= 0) {
      if (!localHours.value[index]) {
        localHours.value[index] = { stage: '', hours: 0 }
      }
      localHours.value[index].hours = editingHours.value
      emit('update-hours', localHours.value)
    }
    editingIndex.value = -1
  }
  
  const addNewStage = () => {
    localHours.value.push({
      stage: 'Новый этап',
      hours: 0,
      completed: 0
    })
    editingIndex.value = localHours.value.length - 1
    editingStage.value = 'Новый этап'
    editingHours.value = 0
  }
  
  const removeStage = (index: number) => {
    if (confirm('Удалить этот этап?')) {
      localHours.value.splice(index, 1)
      emit('update-hours', localHours.value)
      if (editingIndex.value === index) {
        editingIndex.value = -1
      }
    }
  }
  
  const handleTilt = (e: MouseEvent) => {
    if (!container.value) return
    
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
    gsap.to('.glass-card', {
      boxShadow: '0 15px 35px rgba(0, 60, 45, 0.4)',
      duration: 0.3
    })
    
    gsap.to('.reflection-1', { opacity: 0.8, duration: 0.3 })
    gsap.to('.reflection-2', { opacity: 0.6, duration: 0.3 })
  }
  
  const endHover = () => {
    tiltX.value = 0
    tiltY.value = 0
    lightX.value = 50
    lightY.value = 50
    
    gsap.to('.glass-card', {
      boxShadow: '0 10px 30px rgba(0, 60, 45, 0.3)',
      duration: 0.3
    })
    
    gsap.to('.reflection-1', { opacity: 0.3, duration: 0.3 })
    gsap.to('.reflection-2', { opacity: 0.2, duration: 0.3 })
  }
  </script>
  
  <style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;600;700;800&display=swap');
  
  $emerald-dark: rgba(0, 80, 60, 0.9);
  $emerald-medium: rgba(20, 160, 120, 0.8);
  $emerald-light: rgba(50, 220, 180, 0.7);
  $glass-thickness: 10px;
  $border-radius: 24px;
  
  .hours-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .add-stage-button {
    background: rgba(50, 220, 180, 0.3) !important;
    border: none !important;
    transition: all 0.3s ease;
    backdrop-filter: blur(4px);
    
    &:hover {
      background: rgba(50, 220, 180, 0.5) !important;
      transform: scale(1.1);
    }
  }
  
  .hour-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px dashed rgba(50, 220, 180, 0.3);
  }
  
  .hour-stage-container,
  .hour-value-container {
    flex: 1;
    display: flex;
    align-items: center;
  }
  
  .hour-value-container {
    justify-content: flex-end;
    gap: 8px;
  }
  
  .hour-stage {
    &.editable {
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        color: $emerald-light;
        text-shadow: 0 0 8px rgba(50, 220, 180, 0.5);
      }
    }
  }
  
  .hour-value {
    &.editable {
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        color: white;
        text-shadow: 0 0 8px rgba(50, 220, 180, 0.8);
      }
    }
  }
  
  .stage-input,
  .hours-input {
    background: rgba(0, 60, 45, 0.5);
    border: 1px solid rgba(50, 220, 180, 0.3);
    border-radius: 8px;
    padding: 4px 8px;
    color: white;
    font-family: 'SF Pro Display', sans-serif;
    width: 100%;
    max-width: 150px;
    backdrop-filter: blur(4px);
    
    &:focus {
      outline: none;
      border-color: $emerald-light;
      box-shadow: 0 0 0 2px rgba(50, 220, 180, 0.3);
    }
  }
  
  .hours-input {
    max-width: 80px;
    text-align: right;
  }
  
  .hour-actions {
    display: flex;
    gap: 4px;
  }
  
  .edit-button {
    background: transparent !important;
    border: none !important;
    
    &:hover {
      color: $emerald-light !important;
    }
  }
  
  .delete-button {
    background: transparent !important;
    border: none !important;
    
    &:hover {
      color: #ff6b6b !important;
    }
  }
  
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
    transform: translate3d(0, 0, 0);
    isolation: isolate;
  }
  

  .hours-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.add-stage-button {
  background: rgba(50, 220, 180, 0.3);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  
  &:hover {
    background: rgba(50, 220, 180, 0.5);
    transform: scale(1.1);
  }
  
  .icon-add::before {
    content: '\f067';
    font-family: 'Font Awesome 6 Free';
    font-weight: 900;
  }
}

.hour-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(50, 220, 180, 0.3);
}

.hour-stage-container,
.hour-value-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.hour-value-container {
  justify-content: flex-end;
  gap: 8px;
}

.hour-stage {
  &.editable {
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      color: $emerald-light;
      text-shadow: 0 0 8px rgba(50, 220, 180, 0.5);
    }
  }
}

.hour-value {
  &.editable {
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      color: white;
      text-shadow: 0 0 8px rgba(50, 220, 180, 0.8);
    }
  }
}

.stage-input,
.hours-input {
  background: rgba(0, 60, 45, 0.5);
  border: 1px solid rgba(50, 220, 180, 0.3);
  border-radius: 8px;
  padding: 4px 8px;
  color: white;
  font-family: 'SF Pro Display', sans-serif;
  width: 100%;
  max-width: 150px;
  backdrop-filter: blur(4px);
  
  &:focus {
    outline: none;
    border-color: $emerald-light;
    box-shadow: 0 0 0 2px rgba(50, 220, 180, 0.3);
  }
}

.hours-input {
  max-width: 80px;
  text-align: right;
}

.hour-actions {
  display: flex;
  gap: 4px;
}

.edit-button,
.delete-button {
  background: transparent;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;
  font-size: 12px;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
}

.edit-button {
  &:hover {
    color: $emerald-light;
  }
}

.delete-button {
  &:hover {
    color: #ff6b6b;
  }
}

.icon-edit::before {
  content: '\f044';
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
}

.icon-delete::before {
  content: '\f1f8';
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
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
    opacity: 0.8;
    z-index: 1;
  }
  
  .glass-content {
    padding: 28px;
    backdrop-filter: blur(16px) brightness(1.2);
    -webkit-backdrop-filter: blur(16px) brightness(1.2);
    border-radius: $border-radius;
    background:$iceglass;
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
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: 'SF Pro Display', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: rgba(0, 40, 30, 0.9);
    display: inline-block;
    position: relative;
    margin-bottom: 12px;
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
  
  .progress-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
  }
  
  .progress-bar {
    flex-grow: 1;
    height: 10px;
    background: rgba(0, 60, 45, 0.4);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, $emerald-light, $emerald-medium);
    border-radius: 5px;
    transition: width 0.6s ease;
  }
  
  .progress-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1px 2px rgba(0, 40, 30, 0.6);
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
    margin-bottom: 16px;
  }
  
  .program-description {
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 24px;
    font-family: 'SF Pro Display', sans-serif;
    text-shadow: 0 1px 2px rgba(0, 40, 30, 0.6);
  }
  
  .hours-details {
    margin-bottom: 24px;
  }
  
  .hours-title {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 12px;
    font-weight: 600;
  }
  
  .hours-list {
    list-style: none;
    padding: 0;
    margin: 0 0 16px 0;
  }
  
  .hour-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px dashed rgba(50, 220, 180, 0.3);
  }
  
  .hour-stage {
    color: rgba(255, 255, 255, 0.8);
  }
  
  .hour-value {
    color: $emerald-light;
    font-weight: 600;
  }
  
  .total-hours {
    text-align: right;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 8px;
    
    strong {
      color: $emerald-light;
    }
  }
  
  .teacher-block {
    display: flex;
    align-items: center;
    margin-top: auto;
    padding: 16px;
    background: rgba(0, 60, 45, 0.4);
    border-radius: 12px;
    border: 1px solid rgba(50, 220, 180, 0.2);
    backdrop-filter: blur(8px);
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
    flex-grow: 1;
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
    
    .teacher-avatar-wrapper {
      width: 50px;
      height: 50px;
    }
  }
  </style>