import type { ServiceResponseType } from './AxiosService'
import { AxiosService, API_CONFIG } from './AxiosService'
import { User } from '@/common/types/User'
import Test from '@/assets/icons/6.png'

class UserService extends AxiosService {
  public async getUser(userId: string): ServiceResponseType<User> {
    const config = {
      method: 'GET',
      url: `/users/${userId}`
    }

    return this.axiosCall<User>(config)
  }
  public async getTeachers(): Promise<ServiceResponseType<string[]>> {
    const config = {
      method: 'GET',
      url: '/teachers'
    }

    return this.axiosCall<string[]>(config)
  }

  public async updateUser(userId: string, userData: Partial<User>): ServiceResponseType<User> {
    const config = {
      method: 'PUT',
      url: `/users/${userId}`,
      data: userData
    }

    return this.axiosCall<User>(config)
  }
  public async getStudents(): ServiceResponseType<User[]> {
    const config = {
      method: 'GET',
      url: '/students'
    }

    return this.axiosCall<User[]>(config)
  }

  public async deleteStudent(studentId: string): ServiceResponseType<void> {
    const config = {
      method: 'DELETE',
      url: `/students/${studentId}`
    }

    return this.axiosCall<void>(config)
  }

  public async addStudent(student: User): ServiceResponseType<User> {
    const config = {
      method: 'POST',
      url: '/students',
      data: student
    }

    return this.axiosCall<User>(config)
  }

  public async updateStudent(studentId: string, studentData: Partial<User>): ServiceResponseType<User> {
    const config = {
      method: 'PUT',
      url: `/students/${studentId}`,
      data: studentData
    }

    return this.axiosCall<User>(config)
  }
  public getDefaultUser(): User {
    return {
      id: '1',
      avatarUrl: Test,
      name: 'Иванов Иван Иванович',
      bio: 'Опытный преподаватель с 20-летним стажем. Автор множества научных работ.',
      email: 'ivanov@example.com',
      phone: '+7 (999) 123-45-67',
      address: 'г. Москва, ул. Пушкина, д. 10',
      birthdate: '1980-01-01',
      occupation: 'Профессор математики',
      subjects: ['Математика', 'Алгебра', 'Геометрия']
    }
  }
}

export const userService = new UserService(API_CONFIG)
