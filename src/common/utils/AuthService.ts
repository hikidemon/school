import type { ServiceResponseType } from './AxiosService'
import { AxiosService, API_CONFIG } from './AxiosService'

class AuthService extends AxiosService {
  public async login(credentials: { email: string; password: string }): ServiceResponseType<{ 
    token: string,
    userId: string,
    name: string,
    role: string  }> {
    const config = {
      method: 'POST',
      url: 'http://localhost:5000/api/identity/login',
      data: credentials
    }

    return this.axiosCall(config)
  }

  public async register(credentials: {
    email: string
    password: string
    id_role: string
  }): ServiceResponseType<{ userId: string }> {
    const config = {
      method: 'POST',
      url: 'http://localhost:5000/api/identity/registration',
      data: credentials
    }

    return this.axiosCall(config)
  }


  public async logout(): ServiceResponseType<void> {
    const config = {
      method: 'POST',
      url: 'http://localhost:5000/api/identity/logout'
    }

    return this.axiosCall(config)
  }
}

export const authService = new AuthService(API_CONFIG)
