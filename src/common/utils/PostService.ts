// PostService.ts
import { AxiosService, API_CONFIG } from './AxiosService'
import type { ServiceResponseType } from './AxiosService'
import { ElNotification } from 'element-plus'
import type { Post } from '@/common/types/Post'
import axios from 'axios'
import { authService } from './AuthService'

const VK_ACCESS_TOKEN = '8226288882262888822628886b810c52948822682262888e59105cea123ef13a6f6328e'
const VK_GROUP_ID = 'izumrudnij'

export class PostService extends AxiosService {
  constructor() {
    super(API_CONFIG)
  }

  async getVKPosts(): ServiceResponseType<Post[]> {
    return this.axiosCall<Post[]>({
      method: 'GET',
      url: '/vk/posts'
    })
  }



  async getAllPosts(): Promise<Post[]> {
    let localPosts: Post[] = []

    try {
      const [localError, localResponse] = await this.getPosts()

      if (!localError && localResponse?.data?.data) {
        localPosts = localResponse.data.data
      } else {
        console.warn('Локальные посты не загружены, используем только посты из VK')
      }
    } catch (error) {
      console.error('Ошибка при загрузке локальных постов:', error)
    }

    const vkPosts = await this.getVKPosts()
    if (localPosts.length === 0) {
      return this.getTestPosts()
    }

    return [...localPosts, ...vkPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  private getTestPosts(): Post[] {
    return [
      {
        id: 1,
        title: 'Тестовый пост 1',
        content: 'Это первый тестовый пост. Здесь может быть много текста.',
        image: ['https://via.placeholder.com/300'],
        type: 'event',
        date: '2025-10-01',
        area: 'Москва',
        eventdate: '2025-10-01',
        time: '19:00',
      },
      {
        id: 2,
        title: 'Тестовый пост 2',
        content: 'Это второй тестовый пост. Здесь тоже может быть много текста.',
        image: ['https://via.placeholder.com/300'],
        type: 'event',
        date: '2025-10-02',
        area: 'Санкт-Петербург',
        eventdate: '2025-10-01',
        time: '19:00',
      },
    ]
  }

  async getPostById(id: number): ServiceResponseType<Post> {
    return this.axiosCall<Post>({
      method: 'GET',
      url: `/posts/${id}`
    })
  }

  async createPost(postData: Post): ServiceResponseType<Post> {
    const formData = new FormData()
  
    formData.append('title', postData.title)
    formData.append('content', postData.content)
    formData.append('type', postData.type)
    formData.append('area', postData.area)
    formData.append('date', postData.date)
    formData.append('time', postData.time)
    formData.append('eventDate', postData.eventDate || '')
  
    postData.image.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`image[${index}]`, image)
      } else if (typeof image === 'string') {
        formData.append(`image[${index}]`, image)
      }
    })
  
    return this.axiosCall<Post>({
      method: 'POST',
      url: '/posts',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  
  async updatePost(id: number, postData: Partial<Post>): ServiceResponseType<Post> {
    const formData = new FormData()
  
    if (postData.title) formData.append('title', postData.title)
    if (postData.content) formData.append('content', postData.content)
    if (postData.type) formData.append('type', postData.type)
    if (postData.area) formData.append('area', postData.area)
    if (postData.date) formData.append('date', postData.date)
    if (postData.time) formData.append('time', postData.time)
    if (postData.eventdate) formData.append('eventDate', postData.eventdate)
  
    if (postData.image) {
      postData.image.forEach((image, index) => {
        formData.append(`image[${index}]`, image)
      })
    }
  
    return this.axiosCall<Post>({
      method: 'PUT',
      url: `/posts/${id}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async deletePost(id: number): ServiceResponseType<void> {
    return this.axiosCall<void>({
      method: 'DELETE',
      url: `/posts/${id}`
    })
  }
 
  async registerUserForEvent(postId: number): Promise<void> {
    try {
      const [authError, authResponse] = await authService.check()

      if (authError || !authResponse?.data) {
        ElNotification({
          title: 'Ошибка',
          message: 'Вы не авторизованы. Пожалуйста, войдите в систему.',
          type: 'error',
          position: 'bottom-right'
        })
        return
      }

      const userId = authResponse.data.id

      const [isRegisteredError, isRegisteredResponse] = await this.axiosCall({
        method: 'GET',
        url: `/event/is-registered?userId=${userId}&postId=${postId}`,
      })

      if (isRegisteredError) {
        ElNotification({
          title: 'Ошибка',
          message: 'Не удалось зарегистрироваться на мероприятие!',
          type: 'error',
          position: 'bottom-right'
        })
        return
      }

      if (isRegisteredResponse?.data?.data.isRegistered) {
        ElNotification({
          title: 'Информация',
          message: 'Вы уже зарегистрированы на это мероприятие.',
          type: 'info',
          position: 'bottom-right',
        })
        return
      }
  
      const [registerError] = await this.axiosCall({
        method: 'POST',
        url: '/event/register',
        data: {
          userId,
          postId,
        },
      })
  
      if (registerError) {
        ElNotification({
          title: 'Ошибка',
          message: 'Не удалось зарегистрироваться на мероприятие!',
          type: 'error',
          position: 'bottom-right',
        })
        return
      }
  
      ElNotification({
        title: 'Успех',
        message: 'Вы успешно зарегистрированы на мероприятие!',
        type: 'success',
        position: 'bottom-right',
      })
    } catch (error) {
      console.error(error)
      ElNotification({
        title: 'Ошибка',
        message: 'Произошла ошибка при регистрации!',
        type: 'error',
        position: 'bottom-right',
      })
    }
  }
}

export const postService = new PostService()