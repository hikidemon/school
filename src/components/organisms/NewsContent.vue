<!-- NewsPage.vue -->
<template>
  <div class="main-content">
    <h1 class="page-title">Новости</h1>

    <div class="post-list">
      <post-card
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :content="post.content"
        :image="post.image"
        :date="post.date"
        type="news"
        @open="handleOpenPost(post)"
        class="fade-in post-card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PostCard from '../molecules/PostCard.vue'
import { postService } from '@/common/utils/PostService'
import type { Post } from '@/common/types/Post'
import { ElNotification } from 'element-plus'

const posts = ref<Post[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const fetchPosts = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const [err, response] = await postService.getVKPosts()

    if (!err && response?.data.data) {
      posts.value = response.data.data.map(post => ({
        ...post,
        type: 'news',
        source: 'vk'
      }))
    } else {
      throw new Error(err?.message || 'Failed to fetch VK posts')
    }
  } catch (err) {
    console.error('Ошибка при загрузке новостей:', err)

   const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
    
    ElNotification({
      title: 'Ошибка',
      message: errorMessage,
      type: 'error',
      position: 'bottom-right'
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchPosts()
})

const handleOpenPost = (post: Post) => {
  console.log('Открыт пост:', post)
}
</script>

<style scoped lang="scss">
.page-title {
  @include glass-text();
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--color-dark-light);
}
.main-content {
  flex: 1;
  padding: 20px;
}

.post-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  overflow-y: auto;
  max-height: 85vh;
}

.post-card {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.post-card.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
}

.post-list::-webkit-scrollbar {
  display: none;
}
</style>