<template>
  <div class="main-content ">
    <h1>Новости</h1>
    <div class="post-list">
      <post-card v-for="post in posts" :key="post.id" :id="post.id" :title="post.title" :content="post.content"
        :image="post.image" :date="post.date" :type="post.type" :likes="post.likes"
        :is-liked-by-user="post.isLikedByUser" @open="handleOpenPost(post)" class="fade-in post-card"
        @delete="handleDeletePost" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PostCard from '../molecules/PostCard.vue'
import { postService } from '@/common/utils/PostService'
import { Post } from '@/common/types/Post'
import programsIcon from '@/assets/icons/3.png'
import '@/assets/styles/_dark-theme.scss'

const posts = ref<Post[]>([])

const fetchPosts = async () => {
  try {
    const [error, response] = await postService.getPosts()

    if (error) {
      throw error
    }

    if (response?.data?.data) {
      posts.value = response.data.data
        .map((post: Post) => ({
          ...post,
          image: post.image,
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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

const handleDeletePost = (postId: number) => {
  posts.value = posts.value.filter(post => post.id !== postId)
}

const getTestPosts = (): Post[] => {
  return [
    {
      id: 1,
      title: 'Тестовый пост 1',
      content: 'Это первый тестовый пост. Здесь может быть много текста.',
      image: programsIcon,
      type: 'event',
      date: '2025-10-01',
      likes: 10,
      isLikedByUser: true
    },
    {
      id: 2,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image: programsIcon,
      date: '2025-10-01',
      type: 'news',
      likes: 10,
      isLikedByUser: false
    },
    {
      id: 3,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image: programsIcon,
      date: '2025-10-01',
      type: 'event',
      likes: 10,
      isLikedByUser: false
    },
    {
      id: 4,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image: programsIcon,
      date: '2025-10-01',
      type: 'event',
      likes: 10,
      isLikedByUser: false
    },
    {
      id: 4,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image: programsIcon,
      date: '2025-10-01',
      type: 'event',
      likes: 10,
      isLikedByUser: false
    },
    {
      id: 4,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image: programsIcon,
      date: '2025-10-01',
      type: 'event',
      likes: 10,
      isLikedByUser: false
    },
    {
      id: 4,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image: programsIcon,
      date: '2025-10-01',
      type: 'event',
      likes: 10,
      isLikedByUser: false
    },
    {
      id: 4,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image: programsIcon,
      date: '2025-10-01',
      type: 'event',
      likes: 10,
      isLikedByUser: false
    },
    {
      id: 4,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image: programsIcon,
      date: '2025-10-01',
      type: 'event',
      likes: 10,
      isLikedByUser: false
    },
    {
      id: 4,
      title: 'Тестовый пост 2',
      content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
      image: programsIcon,
      date: '2025-10-01',
      type: 'event',
      likes: 10,
      isLikedByUser: false
    },
  ]
}

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible')
        } else {
          entry.target.classList.remove('fade-in-visible')
        }
      })
    },
    { threshold: 0.3 }
  )

  const postCards = document.querySelectorAll('.post-card')
  postCards.forEach((card) => {
    observer.observe(card)
  })
}


onMounted(() => {
  fetchPosts().then(() => {
    setupIntersectionObserver()
  })
})
</script>

<style scoped lang="scss">
.main-content {
  flex: 1;
  padding: 20px;

}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--color-black)-light;
}

.post-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  overflow-y: auto;
  max-height: 80vh;

}

.post-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.post-card.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
}



.post-list::-webkit-scrollbar {
  display: none;
}
</style>