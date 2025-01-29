<template>
  <div class="main-content">
    <h1>Новости</h1>
    <div class="post-list">
      <post-card
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :content="post.content"
        :image="post.image"
        :date="post.date"
        :type="post.type"
        @open="handleOpenPost(post)"
       
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PostCard from '../molecules/PostCard.vue'
import { postService } from '@/common/utils/PostService'
import { Post } from '@/common/types/Post'
import programsIcon from '@/assets/icons/3.png'

const posts = ref<Post[]>([])

const fetchPosts = async () => {
  try {
    const [error, response] = await postService.getPosts()

    if (error) {
      throw error
    }

    if (response?.data?.data) {
      posts.value = response.data.data.map((post: Post) => ({
        ...post,
        image: post.image
      }))
    } else {
      posts.value = getTestPosts()
    }
  } catch (error) {
    console.error('Ошибка при загрузке новостей:', error)
  }
}

const handleOpenPost = (post: Post) => {
  console.log('Открыт пост:', post)
}

const getTestPosts = (): Post[] => {
  return [
    {
      id: 1,
      title: 'Тестовый пост 1',
      content: 'Это первый тестовый пост. Здесь может быть много текста.',
      image: programsIcon,
      type:'event',
      date:'2025-10-01',
    },
    {
      id: 2,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image:  programsIcon,
      date:'2025-10-01',
      type:'news',
    },
    {
      id: 3,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image: programsIcon,
      date:'2025-10-01',
      type:'event',
    },
    {
      id: 4,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image:  programsIcon,
      date:'2025-10-01',
      type:'event',
    },
  ]
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}
.post-card .date {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #666;
}
.post-card img {
  width: 200px; 
  height: 200px; 
  object-fit: cover; 
}
.post-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 10px; 
}
</style>