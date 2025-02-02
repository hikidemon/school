import type { ServiceResponseType } from './AxiosService'
import { AxiosService, API_CONFIG } from './AxiosService'
import { User } from '@/common/types/User'

class UserService extends AxiosService {
  public async getUser(userId: string): ServiceResponseType<User> {
    const config = {
      method: 'GET',
      url: `/users/${userId}`,
    }

    return this.axiosCall<User>(config)
  }

  public async updateUser(userId: string, userData: Partial<User>): ServiceResponseType<User> {
    const config = {
      method: 'PUT',
      url: `/users/${userId}`,
      data: userData,
    }

    return this.axiosCall<User>(config)
  }
}

export const userService = new UserService(API_CONFIG)