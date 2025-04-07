<template>
  <div>
    <div class="post-card" @click="openPost">
      <div class="card-content">
        <!-- Иконка удаления только для постов, не из ВК -->
        <div v-if="isAdmin" class="admin-controls">
        <el-icon class="edit-icon" @click.stop="handleEdit">
          <edit />
        </el-icon>
        <el-icon class="delete-icon" @click.stop="handleDelete">
          <delete />
        </el-icon>
      </div>
        <div class="image-container">
          <img
            v-if="image && image.length > 0"
            :src="image[0]"
            alt="Post Image"
            class="card-image"
           />
          <img
            v-else
            :src="defaultImage"
            alt="Default Image"
            class="card-image"
          />
          <!-- Стрелки переключения изображений -->
          <div v-if="image && image.length > 1" class="carousel-controls">
            <el-icon class="carousel-button prev" @click.stop="prevImage">
              <arrow-left />
            </el-icon>
            <el-icon class="carousel-button next" @click.stop="nextImage">
              <arrow-right />
            </el-icon>
          </div>
        </div>
        <h3 class="card-title">{{ title }}</h3>
        <div class="card-footer">
          <div class="footer-left">
            <p class="card-date">{{ date }}</p>
            <!-- Место проведения для мероприятий -->

            <p v-if="type === 'event' && area" class="card-area">{{ area }}</p>
          </div>
          <div v-if="type === 'event'" class="register-button-container">
            <a-button
              class="register-button"
              :type="isRegistered ? 'default' : 'primary'"
              :disabled="isRegistered"
              @click.stop="handleRegister"
            >
              {{ isRegistered ? 'Зарегистрирован' : 'Записаться' }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <div v-if="isOpen" class="modal-overlay" @click="closePost">
        <div class="modal-content" @click.stop>
          <div class="image-carousel">
            <img :src="currentImage" alt="Post Image" class="modal-image"  />
            <!-- Стрелки переключения изображений -->
            <div v-if="image && image.length > 1" class="carousel-controls">
              <el-icon class="carousel-button prev" @click.stop="prevImage">
                <arrow-left />
              </el-icon>
              <el-icon class="carousel-button next" @click.stop="nextImage">
                <arrow-right />
              </el-icon>
            </div>
          </div>
          <h3 class="modal-title">{{ title }}</h3>
          <p v-if="type === 'event' " class="card-area">Время проведения: {{ time }} {{ eventdate }}</p>
          <p v-if="type === 'event' && area" class="modal-area">Место проведения: {{ area }}</p>
          <div class="modal-content-text">
            <p>{{ content }}</p>
          </div>
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
import { Delete, Close, ArrowLeft, ArrowRight,Edit } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { postService } from '@/common/utils/PostService'
import { authService } from '@/common/utils/AuthService'
import defaultImage from '@/assets/icons/back3.jpg' 

const props = defineProps<{
  id: number
  title: string
  content: string
  image?: string[]
  date?: string
  type: string
  time: string
  eventdate:string
  area?: string // Место проведения
  isFromVK?: boolean // Флаг, указывающий, что пост из ВК
}>()

const isOpen = ref(false)
const isRegistered = ref(false)
const isAdmin = ref(true)
const currentImageIndex = ref(0)
const currentImage = ref(props.image?.[0] || defaultImage)
const emit = defineEmits(['delete', 'edit'])

const openPost = () => {
  isOpen.value = true
}

const closePost = () => {
  isOpen.value = false
}

const prevImage = () => {
  if (props.image && props.image.length > 1) {
    currentImageIndex.value = (currentImageIndex.value - 1 + props.image.length) % props.image.length
    currentImage.value = props.image[currentImageIndex.value]
  }
}

const nextImage = () => {
  if (props.image && props.image.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.image.length
    currentImage.value = props.image[currentImageIndex.value]
  }
}

const checkRegistration = async () => {
  try {
    const [authError, isAuthorized] = await authService.check();
    if (authError || !isAuthorized) return;

    const [error, userResponse] = await postService.axiosCall({
      method: 'GET',
      url: '/user/info',
    });

    if (error) return;

    const userId = userResponse?.data?.id;

    const [isRegisteredError, isRegisteredResponse] = await postService.axiosCall({
      method: 'GET',
      url: `/event/is-registered?userId=${userId}&postId=${props.id}`,
    });

    if (!isRegisteredError && isRegisteredResponse?.data?.isRegistered) {
      isRegistered.value = true;
    }
  } catch (error) {
    console.error(error);
  }
};



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
  checkRegistration()

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

.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 10px;
}

.carousel-button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
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

.card-area {
  font-size: 0.9rem;
  color: #666;
}

.edit-icon,
.delete-icon {
  cursor: pointer;
  font-size: 1.2rem;
  color: #666;
  transition: color 0.2s ease;

}

.edit-icon:hover {
  color: var(--color-primary);
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

.modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
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

.modal-area {
  font-size: 1rem;
  color: #666;
  margin-bottom: 16px;
}

.modal-content-text {
  font-size: 1rem;
  color: #444;
  line-height: 1.5;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 8px;
}

.modal-content-text::-webkit-scrollbar {
  width: 6px;
}

.modal-content-text::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
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