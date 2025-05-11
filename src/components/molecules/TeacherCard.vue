<template>
  <div 
    class="glass-container" 
    :class="{ 'expanded': isExpanded, 'collapsed': isCollapsed }"
    @click="toggleExpand"
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
        <div class="user-card__header">
          <div class="avatar-wrapper">
            <img 
              :src="teacher.avatarUrl || Test" 
              class="user-card__avatar" 
              alt="Teacher avatar"
            />
            <div class="avatar-halo"></div>
          </div>
          <div class="user-card__main-info">
            <h3 class="user-card__name">
              <span class="text-3d">{{ teacher.name }}</span>
            </h3>
          </div>
        </div>

        <div class="teacher-bottom">
          <h6 class="teacher-position">
            <span class="text-3d-small">{{ teacher.occupation }}</span>
          </h6>
          <p class="teacher-description">{{ teacher.bio }}</p>
          <div class="teacher-subjects">
            <div 
              v-for="(subject, index) in teacher.subjects" 
              :key="subject" 
              class="subject-tag"
            >
              <span class="text-3d-tag">{{ subject }}</span>
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
import { ref, onMounted, defineEmits, watch, nextTick } from 'vue'
import { userService } from '@/common/utils/UserService'
import { User } from '@/common/types/User'
import { gsap } from 'gsap'
import Test from '@/assets/icons/6.png'

const props = defineProps<{
  userId: string
  isExpanded?: boolean
  isCollapsed?: boolean
}>()

const emit = defineEmits(['expand', 'collapse'])

const teacher = ref<User>(userService.getDefaultUser())
const container = ref<HTMLElement | null>(null)
const tiltX = ref(0)
const tiltY = ref(0)
const lightX = ref(50)
const lightY = ref(50)
const isHovered = ref(false)
const isExpanded = ref(false)
const isCollapsed = ref(false)

const originalPosition = ref({
  top: 0,
  left: 0,
  width: 0,
  height: 0
})

const toggleExpand = (event: MouseEvent) => {
  // Предотвращаем всплытие события, чтобы избежать двойного срабатывания
  event.stopPropagation()
  
  if (!isExpanded.value) {
    emit('expand', props.userId)
  } else {
    emit('collapse', props.userId)
  }
}

watch(() => props.isExpanded, (val) => {
  if (val) expandCard()
  else collapseCard()
})

/*watch(() => props.isCollapsed, (val) => {
  isCollapsed.value = val
  if (val) {
    gsap.to(container.value, {
      width: '100%',
      marginRight: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    })
  }
})*/

const expandCard = () => {
  isExpanded.value = true
  
  const rect = container.value?.getBoundingClientRect()
  const initialTop = rect?.top || 0
  const initialLeft = rect?.left || 0
  
  gsap.fromTo(container.value, 
    {
      position: 'fixed',
      top: initialTop,
      left: initialLeft,
      width: container.value?.offsetWidth,
      height: container.value?.offsetHeight,
      zIndex: 100,
      opacity: 1,
      immediateRender: false,
      background: 'transparent'
    },
    {
      top: '8.4%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '50vw',
      height: '91vh',
      duration: 0.7,
      ease: 'power3.inOut'
    }
  )
  
  gsap.to('.glass-card', {
    borderRadius: 0,
    height: '100%',
    duration: 0.7,
    ease: 'power3.inOut'
  })
}

const collapseCard = () => {
  if (!isExpanded.value) return 
  
  gsap.killTweensOf(container.value)
  gsap.killTweensOf('.glass-card')

  gsap.to(container.value, {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    transform: 'none',
    width: '100%',
    height: 'auto',
    zIndex: 1,
    duration: 0.7,
    ease: 'power3.inOut',
    onComplete: () => {
      isExpanded.value = false
      
      if (container.value) {
        container.value.style.background = ''
        container.value.style.margin = ''
        container.value.style.padding = '20px'
      }
    }
  })
  
  gsap.to('.glass-card', {
    borderRadius: '$border-radius',
    height: 'auto',
    duration: 0.7,
    ease: 'power3.inOut'
  })
}

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
  isHovered.value = true
  
  gsap.to('.subject-tag', {
    y: -5,
    opacity: 1,
    duration: 0.4,
    stagger: 0.05,
    ease: 'back.out(1.7)'
  })
  
  gsap.to('.reflection-1', { opacity: 0.8, duration: 0.3 })
  gsap.to('.reflection-2', { opacity: 0.6, duration: 0.3 })
  
  gsap.to('.text-3d', {
    '--text-hue-rotate': '15deg',
    '--text-brightness': '1.2',
    duration: 0.5
  })
}

const endHover = () => {
  if (isExpanded.value) return
  isHovered.value = false
  tiltX.value = 0
  tiltY.value = 0
  lightX.value = 50
  lightY.value = 50
  
  gsap.to('.subject-tag', {
    y: 0,
    duration: 0.3,
    stagger: 0.02,
    ease: 'power1.out'
  })
  
  gsap.to('.reflection-1', { opacity: 0.3, duration: 0.3 })
  gsap.to('.reflection-2', { opacity: 0.2, duration: 0.3 })
  
  gsap.to('.text-3d', {
    '--text-hue-rotate': '0deg',
    '--text-brightness': '1',
    duration: 0.5
  })
}

onMounted(() => {
  gsap.set('.subject-tag', { y: 20, opacity: 0 })
  
  // Анимация появления тегов
  gsap.to('.subject-tag', {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.3,
    ease: 'elastic.out(1, 0.5)'
  })
})

onMounted(async () => {
  const [error, data] = await userService.getUser(props.userId)

  if (!error && data) {
    teacher.value = data.data.data || userService.getDefaultUser()
  } else {
    console.error('Ошибка при загрузке данных пользователя. Используются тестовые данные.')
    teacher.value = userService.getDefaultUser()
  }
})
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@600;700;800&display=swap');

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
  
  
  &.expanded {
    position: fixed;
    z-index: 100;
    width: 50vw;
    height: 100vh;
    padding: 0;
    overflow: hidden;
    
    .glass-card {
      height: 100%;
      border-radius: 0;
      box-shadow: none;
    }
  }
  
  &.collapsed {
    width: 100%;
    margin-right: 0;
    opacity: 0.7;
    transform: scale(0.98);
    filter: blur(1px);
    transition: all 0.5s ease;
    
    &:hover {
      opacity: 0.9;
      transform: scale(0.99);
      filter: blur(0.5px);
    }
  }
}

.glass-card {
  position: relative;
  border-radius: $border-radius;
  transform-style: preserve-3d;
  transition: 
    transform 0.1s linear,
    border-radius 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  
  height: auto;
  will-change: transform, border-radius;
  box-shadow: 0 10px 30px rgba(0, 60, 45, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;

    opacity: 0.6;
    transition: opacity 0.3s ease;
    z-index: 3;
  }
  
  &:hover::before {
    opacity: 0.9;
  }
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
  background: linear-gradient(145deg, 
    rgba(15, 144, 111, 0.8) 0%, 
    rgba(13, 168, 155, 0.8) 0%, 
    rgba(9, 110, 93, 0.8) 50%, 
    rgba(5, 101, 88, 0.8) 100%);
  transform-style: preserve-3d;
  position: relative;
  z-index: 2;
  height: 100%;
  box-sizing: border-box;
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

.user-card__header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 4;
}

.avatar-wrapper {
  position: relative;
  margin-right: 20px;
  width: 80px;
  height: 80px;
}

.user-card__avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(50, 220, 180, 0.4);
}

.avatar-halo {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(50, 220, 180, 0.7) 180deg,
    rgba(255, 255, 255, 0.9) 360deg
  );
  z-index: 1;
  filter: blur(6px);
  animation: rotate-halo 8s linear infinite;
  opacity: 0.8;
}

.user-card__main-info {
  flex: 1;
}

.text-3d {
  --text-hue-rotate: 0deg;
  --text-brightness: 1;
  
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: rgba(0, 40, 30, 0.9);
  display: inline-block;
  position: relative;
  text-shadow: 
    0 1px 0 rgba(255, 255, 255, 0.3),
    0 -1px 0 rgba(0, 0, 0, 0.7),
    0 2px 4px rgba(0, 0, 0, 0.5),
    0 4px 8px rgba(50, 220, 180, 0.3),
    0 8px 16px rgba(50, 220, 180, 0.2);
  
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
      0 0 20px rgba(50, 220, 180, 0.5),
      0 0 30px rgba(50, 220, 180, 0.3);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -4px;
    background: linear-gradient(
      145deg,
      transparent 0%,
      rgba(50, 220, 180, 0.2) 50%,
      transparent 100%
    );
    border-radius: 50%;
    filter: blur(2px);
    z-index: -2;
    transform: translateZ(-$glass-thickness);
  }
}

.text-3d-small {
  @extend .text-3d;
  font-size: 1.2rem;
  font-weight: 700;
  
  &::before {
    transform: translateZ(-$glass-thickness/3);
    filter: 
      blur(0.5px)
      hue-rotate(var(--text-hue-rotate))
      brightness(var(--text-brightness));
  }
}

.text-3d-tag {
  @extend .text-3d;
  font-size: 0.9rem;
  font-weight: 600;
  
  &::before {
    transform: translateZ(-$glass-thickness/4);
    filter: 
      blur(0.3px)
      hue-rotate(var(--text-hue-rotate))
      brightness(var(--text-brightness));
  }
}

.teacher-bottom {
  position: relative;
  z-index: 4;
}

.teacher-position {
  margin: 5px 0 16px;
}

.teacher-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 24px;
  line-height: 1.7;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  text-shadow: 0 1px 2px rgba(0, 40, 30, 0.6);
}

.teacher-subjects {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.subject-tag {
  padding: 8px 16px;
  border-radius: 18px;
  background: $iceglass;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(50, 220, 180, 0.3);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.1),
    0 0 10px rgba(50, 220, 180, 0.2);
  transform: translateZ(10px);
  transition: 
    transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px) translateZ(15px);
    box-shadow: 
      0 4px 16px rgba(0, 60, 45, 0.4),
      inset 0 1px 1px rgba(255, 255, 255, 0.2),
      0 0 20px rgba(50, 220, 180, 0.3);
  }
}

@keyframes rotate-halo {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes reflection-shine {
  0% { transform: translateX(-100%) rotate(15deg); }
  100% { transform: translateX(100%) rotate(15deg); }
}

@keyframes emerald-glow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@media (max-width: 768px) {
  .glass-container {
    padding: 12px;
    
    &.expanded {
      width: 100vw;
      left: 0 !important;
    }
  }
  
  .glass-content {
    padding: 20px;
  }
  
  .text-3d {
    font-size: 1.8rem;
  }
  
  .avatar-wrapper {
    width: 70px;
    height: 70px;
  }
  
  .teacher-description {
    font-size: 0.95rem;
  }
}
</style>