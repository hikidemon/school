<template>
  <div>
    <div class="post-card" @click="openPost">
      <div class="card-content">
        <img v-if="image" :src="image" alt="Post Image" class="card-image" />
        <h3 class="card-title">{{ title }}</h3>
        <div class="card-footer">
        <p class="card-date">{{ date }}</p>
        <div v-if="type === 'event'" class="register-button-container">
          <a-button class="register-button" type="primary" @click.stop="handleRegister">
            Записаться
          </a-button>
        </div>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="modal-overlay" @click="closePost">
      <div class="modal-content" @click.stop>
        <img v-if="image" :src="image" alt="Post Image" class="modal-image" />
        <h3 class="modal-title">{{ title }}</h3>
        <p class="modal-date">{{ date }}</p>
        <p class="modal-content-text">{{ content }}</p>
        <el-icon class="modal-close" @click="closePost">
          <close />  
        </el-icon>     
       </div>
    
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { PostService } from '@/common/utils/PostService'


const postService = new PostService()

defineProps<{
  title: string
  content: string
  image?: string 
  date?: string
  type: string 
}>()

const isOpen = ref(false)

const openPost = () => {
  isOpen.value = true
}

const closePost = () => {
  isOpen.value = false
}

const handleRegister = async (postId: number): Promise<void> => {
  try {
    const isAuthorized = await PostService.checkUserAuthorization(postService)

    if (!isAuthorized) {
      ElNotification({
        title: 'Ошибка',
        message: 'Вы не авторизованы. Пожалуйста, войдите в систему.',
        type: 'error',
        position: 'bottom-right',
      })
      return
    }

    await PostService.registerUserForEvent(postId, postService)
  } catch (error) {
    console.error(error)

    ElNotification({
      title: 'Ошибка',
      message: 'Произошла ошибка при обработке регистрации.',
      type: 'error',
      position: 'bottom-right',
    })
  }
}

</script>

<style scoped>
.post-card {
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
  background-color: #fff;
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
  align-items: center;
  flex-grow: 1;
  margin-top: auto;
}

.card-title {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 8px;
}

.card-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: auto;
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
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 1.5rem;
  color: #333;
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
  background-color: var(--color-primary);
  color: white;
}
.register-button:hover,
.register-button:active {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(90deg, #03ff89, #48f2b9, #6dedc2);
  animation: gradient-shift 4s linear infinite;
}

</style>