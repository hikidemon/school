<template>
  <div class="create-post-page">
    <h1>Создать новый пост</h1>
    <post-form @submit="handleFormSubmit" />
  </div>
</template>

<script setup lang="ts">
import PostForm from '../molecules/PostForm.vue'
import { postService } from '@/common/utils/PostService'
import type { Post } from '@/common/utils/PostService'
import { ElNotification } from 'element-plus'

const handleFormSubmit = async (post: Post) => {
  try {
    const [error, response] = await postService.createPost(post)

    if (error) {
      ElNotification({
        title: 'Ошибка',
        message: 'Произошла ошибка при создании поста',
        type: 'error',
        duration: 5000
      })
    } else {
      ElNotification({
        title: 'Успех',
        message: 'Пост успешно создан!',
        type: 'success',
        duration: 5000
      })
    }
  } catch (error) {
    console.error('Ошибка:', error)

    ElNotification({
      title: 'Ошибка',
      message: 'Произошла ошибка при отправке данных',
      type: 'error',
      duration: 5000
    })
  }
}
</script>

<style scoped lang="scss">
.create-post-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  color: #4caf50;
  margin-bottom: 20px;
}
</style>
