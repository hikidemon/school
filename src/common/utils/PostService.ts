import { AxiosService, API_CONFIG } from './AxiosService'
import type { ServiceResponseType } from './AxiosService'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import { Post } from '../types/Post'
import { authService } from './AuthService'

export class PostService extends AxiosService {
  constructor() {
    super(API_CONFIG)
  }

  async getPosts(): ServiceResponseType<Post[]> {
    return this.axiosCall<Post[]>({
      method: 'GET',
      url: '/posts',
    })
  }


  async getPostById(id: number): ServiceResponseType<Post> {
    return this.axiosCall<Post>({
      method: 'GET',
      url: `/posts/${id}`,
    })
  }



  async createPost(postData: Post): ServiceResponseType<Post> {
    const formData = new FormData()

    formData.append('title', postData.title)

    formData.append('content', postData.content)

    if (postData.image) {
      formData.append('image', postData.image)
    }

    return this.axiosCall<Post>({
      method: 'POST',
      url: '/posts',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }


  async updatePost(id: number, postData: Partial<Post>): ServiceResponseType<Post> {
    const formData = new FormData()
    
    if (postData.title) formData.append('title', postData.title)
    if (postData.content) formData.append('content', postData.content)
    if (postData.image) formData.append('image', postData.image)

    return this.axiosCall<Post>({
      method: 'PUT',
      url: `/posts/${id}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }


  async deletePost(id: number): ServiceResponseType<void> {
    return this.axiosCall<void>({
      method: 'DELETE',
      url: `/posts/${id}`,
    })
  }
  static async checkUserAuthorization(axiosService: AxiosService): Promise<boolean> {
    try {
      const [error, response] = await axiosService.axiosCall({
        method: 'GET',
        url: '/user/check',
      })

      if (error) {
        ElNotification({
          title: 'Ошибка',
          message: 'Вы не авторизованы!',
          type: 'error',
          position: 'bottom-right',
        })
        return false
      }

      return true
    } catch (error) {
      console.error(error)

      ElNotification({
        title: 'Ошибка',
        message: 'Произошла ошибка при проверке авторизации!',
        type: 'error',
        position: 'bottom-right',
      })
      return false
    }
  }

  async registerUserForEvent(postId: number): Promise<void> {
    try {
      const [authError, isAuthorized] = await authService.check()

      if (authError) {
        ElNotification({
          title: 'Ошибка',
          message: 'Вы не авторизованы. Пожалуйста, войдите в систему.',
          type: 'error',
          position: 'bottom-right',
        })
        return
      }

      const [error, userResponse] = await this.axiosCall({
        method: 'GET',
        url: '/user/info',
      })

      if (error) {
        ElNotification({
          title: 'Ошибка',
          message: 'Не удалось получить информацию о пользователе!',
          type: 'error',
          position: 'bottom-right',
        })
        return
      }

      const userId = userResponse?.data?.id

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
  async likePost(postId: number): ServiceResponseType<void> {
    return this.axiosCall<void>({
      method: 'POST',
      url: `/posts/${postId}/like`,
    })
  }
  async unlikePost(postId: number): ServiceResponseType<void> {
    return this.axiosCall<void>({
      method: 'DELETE',
      url: `/posts/${postId}/like`,
    })
  }
  async checkLike(postId: number): ServiceResponseType<boolean> {
    return this.axiosCall<boolean>({
      method: 'GET',
      url: `/posts/${postId}/like`,
    })
  }
  async getLikeCount(postId: number): ServiceResponseType<number> {
    return this.axiosCall<number>({
      method: 'GET',
      url: `/posts/${postId}/likes`,
    })
  }
}

export const postService = new PostService()