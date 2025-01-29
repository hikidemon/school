import type {  ServiceResponseType } from './AxiosService'
import { AxiosService,API_CONFIG  } from './AxiosService'

class UserService extends AxiosService {
  public async getUser(userId: string): ServiceResponseType<{ name: string; email: string }> {
    const config = {
      method: 'GET',
      url: `/users/${userId}`,
    }

    return this.axiosCall(config)
  }

  public async updateUser(userId: string, userData: { name: string; email: string }): ServiceResponseType<void> {
    const config = {
      method: 'PUT',
      url: `/users/${userId}`,
      data: userData,
    }
    
    return this.axiosCall(config)
  }

  public async deleteUser(userId: string): ServiceResponseType<void> {
    const config = {
      method: 'DELETE',
      url: `/users/${userId}`,
    }
    
    return this.axiosCall(config)
  }
}

export const userService = new UserService(API_CONFIG)
