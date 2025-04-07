<template>
  <div>
    <div class="post-card" @click="openPost">
      <div class="card-content">
        <el-icon v-if="isAdmin" class="delete-icon" @click.stop="handleDelete">
          <delete />
        </el-icon>
        <img v-if="image" :src="image" alt="Post Image" class="card-image" />
        <h3 class="card-title">{{ title }}</h3>
        <div class="card-footer">
          <div class="footer-left">
            <p class="card-date">{{ date }}</p>
          </div>
          <div v-if="type === 'event' && !isRegistered" class="register-button-container">
            <a-button class="register-button" type="primary" @click.stop="handleRegister"> Записаться </a-button>
          </div>
          <div v-else-if="type === 'event' && isRegistered" class="register-button-container">
            <a-button class="register-button" type="primary" disabled> Записан </a-button>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <div v-if="isOpen" class="modal-overlay" @click="closePost">
        <div class="modal-content" @click.stop>
          <div class="image-carousel">
            <img :src="currentImage" alt="Post Image" class="modal-image" />
            <button class="carousel-button prev" @click.stop="prevImage">‹</button>
            <button class="carousel-button next" @click.stop="nextImage">›</button>
          </div>
          <h3 class="modal-title">{{ title }}</h3>
          <p class="modal-date">{{ date }}</p>
          <p class="modal-content-text">{{ content }}</p>
          <el-icon class="modal-close" @click="closePost">
            <close />
          </el-icon>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Delete, Close } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { postService } from '@/common/utils/PostService'
import { authService } from '@/common/utils/AuthService'

const props = defineProps<{
  id: number
  title: string
  content: string
  images?: string[]
  date?: string
  type: string
}>()

const isOpen = ref(false)
const isRegistered = ref(false)
const isAdmin = ref(false)
const currentImageIndex = ref(0)
const currentImage = ref(props.images?.[0] || '')

const openPost = () => {
  isOpen.value = true
}

const closePost = () => {
  isOpen.value = false
}

const prevImage = () => {
  if (props.images && props.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value - 1 + props.images.length) % props.images.length
    currentImage.value = props.images[currentImageIndex.value]
  }
}

const nextImage = () => {
  if (props.images && props.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length
    currentImage.value = props.images[currentImageIndex.value]
  }
}

const handleRegister = async (): Promise<void> => {
  try {
    const [error] = await authService.check()

    if (error) {
      ElNotification({
        title: 'Ошибка',
        message: 'Вы не авторизованы. Пожалуйста, войдите в систему.',
        type: 'error',
        position: 'bottom-right'
      })
      return
    }

    await postService.registerUserForEvent(props.id)
    isRegistered.value = true
  } catch (error) {
    console.error(error)
    ElNotification({
      title: 'Ошибка',
      message: 'Произошла ошибка при обработке регистрации.',
      type: 'error',
      position: 'bottom-right'
    })
  }
}

const handleDelete = async () => {
  try {
    await postService.deletePost(props.id)
    emit('delete', props.id)
    ElNotification({
      title: 'Успех',
      message: 'Пост успешно удален.',
      type: 'success',
      position: 'bottom-right'
    })
  } catch (error) {
    console.error(error)
    ElNotification({
      title: 'Ошибка',
      message: 'Произошла ошибка при удалении поста.',
      type: 'error',
      position: 'bottom-right'
    })
  }
}

onMounted(async () => {
  const [error, response] = await authService.check<{ id_role: string }>()
  if (!error && response?.data?.data?.id_role === 'admin') {
    isAdmin.value = true
  }
})
</script>

<style scoped lang="scss">
.post-card {
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
  background-color: var(--color-white);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 325px;
}

.post-card:hover {
  transform: scale(1.05);
}

.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
}

.footer-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.card-date {
  font-size: 0.9rem;
  color: #666;
}

.delete-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  font-size: 1.2rem;
  color: #666;
  transition: color 0.2s ease;
}

.delete-icon:hover {
  color: #ff4757;
}

.card-title {
  font-size: 1.2rem;
  color: var(--color-black-light);
  margin-bottom: 8px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--color-white);
  padding: 24px;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  box-shadow: $box-shadow;
  position: relative;
  z-index: 1001;
}

.image-carousel {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 16px;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 1.5rem;
}

.carousel-button.prev {
  left: 10px;
}

.carousel-button.next {
  right: 10px;
}

.modal-title {
  font-size: 1.5rem;
  color: var(--color-black)-light;
  margin-bottom: 8px;
}

.modal-date {
  font-size: 1rem;
  color: #666;
  margin-bottom: 16px;
}

.modal-content-text {
  font-size: 1rem;
  color: #444;
  line-height: 1.5;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  transition: color 0.2s ease;
}

.register-button-container {
  margin-top: 12px;
  text-align: right;
}

.register-button {
  background-color: $color-primary;
  color: var(--color-white);
}

.register-button:hover,
.register-button:active {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(90deg, $color-primary-gradient);
  animation: gradient-shift 4s linear infinite;
}
</style>