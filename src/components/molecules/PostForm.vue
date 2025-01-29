<template>
  <el-form @submit.prevent="handleSubmit" class="post-form">
    <el-form-item label="Заголовок поста" prop="title" class="elform">
      <a-input v-model="form.title" placeholder="Введите заголовок" class="input-field" />
    </el-form-item>

    <el-form-item label="Описание поста" prop="content" class="elform">
      <a-input type="textarea" v-model="form.content" placeholder="Введите описание" class="input-field" />
    </el-form-item>

    <el-form-item label="Тип поста" prop="type">
      <div class="radio-buttons">
        <label>
          <input type="radio" v-model="form.type" value="news" />
          Новость
        </label>
        <label>
          <input type="radio" v-model="form.type" value="event" />
          Мероприятие
        </label>
      </div>
    </el-form-item>

    <image-upload @upload="handleImageUpload" />
    <a-button class="submit-button" type="submit">Создать пост</a-button>
  </el-form>

  <div v-if="posts.length" class="posts-list">
    <post-card v-for="post in posts" :key="post.id" v-bind="post" @register="handleRegister" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import ImageUpload from './ImageUpload.vue'
import PostCard from './PostCard.vue'
import { authService } from '@/common/utils/AuthService'

const form = ref({
  title: '',
  content: '',
  type: 'news',
  image: null,
  date: new Date().toISOString().split('T')[0]
})

const posts = ref([])

const handleImageUpload = (file) => {
  form.value.image = file
}

const handleSubmit = () => {
  const newPost = { ...form.value, id: Date.now() }
  emit('submit', newPost)
  form.value = { title: '', content: '', type: 'news', image: null, date: new Date().toISOString().split('T')[0] }
}

const handleRegister = async () => {
  try {
    await authService.check()
    ElNotification({ title: 'Успех', message: 'Вы зарегистрированы на мероприятие!', type: 'success' })
  } catch (error) {
    ElNotification({ title: 'Ошибка', message: 'Вы не авторизованы!', type: 'error' })
  }
}
</script>

<style scoped>
.post-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e3e5e4;
  border-radius: 8px;
}

.elform {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  font-size: 1rem;
  padding: 0px;
  margin-top: 8px;
  outline: none;
  resize: vertical;
}

.radio-buttons {
  display: flex;
  gap: 10px;
  margin-top: 0px;
  margin:0 0 0 45px;
}

.radio-buttons label {
  display: flex;
  align-items: center;
}

.submit-button {
  background-color: var(--color-primary);
  color: white;
  padding: 10px 20px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
}
.submit-button:hover,
.submit-button:active {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(90deg, #03ff89, #48f2b9, #6dedc2);
  animation: gradient-shift 4s linear infinite;
}
</style>
