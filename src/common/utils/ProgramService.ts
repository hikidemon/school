import { AxiosService, type ServiceResponseType } from '@/common/utils/AxiosService'
import type { Program, ProgramEnrollmentResponse, Teacher } from '@/common/types/Program'

export class ProgramService extends AxiosService {
  constructor() {
    super()
  }

  // Получение программы по ID
  public async getProgram(id: string): ServiceResponseType<Program> {
    // Реальный запрос (раскомментировать для использования)
    // return this.axiosCall<Program>({
    //   method: 'GET',
    //   url: `/programs/${id}`
    // })

    // Тестовые данные
    const testPrograms: Record<string, Program> = {
      '1': {
        id: '1',
        title: 'Программирование на Python',
        description: 'Полный курс по основам программирования на Python с нуля. Изучите синтаксис, ООП, работу с API и создание веб-приложений.',
        category: 'Информатика',
        duration: 6,
        level: 'Начальный',
        teacher: {
          id: '101',
          name: 'Иванова Мария Сергеевна',
          position: 'Старший преподаватель',
          avatar: '',
          bio: 'Опыт преподавания 10 лет. Автор курсов по программированию.'
        },
        enrolled: false
      },
      '2': {
        id: '2',
        title: 'Основы алгоритмов',
        description: 'Изучение фундаментальных алгоритмов и структур данных. Подготовка к олимпиадам по программированию.',
        category: 'Информатика',
        duration: 8,
        level: 'Продвинутый',
        teacher: {
          id: '102',
          name: 'Петров Алексей Владимирович',
          position: 'Доцент',
          avatar: '',
          bio: 'Кандидат технических наук. Тренер сборной по программированию.'
        },
        enrolled: false
      },
      '3': {
        id: '1',
        title: 'Программирование на Python',
        description: 'Полный курс по основам программирования на Python с нуля. Изучите синтаксис, ООП, работу с API и создание веб-приложений.',
        category: 'Информатика',
        duration: 6,
        level: 'Начальный',
        teacher: {
          id: '101',
          name: 'Иванова Мария Сергеевна',
          position: 'Старший преподаватель',
          avatar: '',
          bio: 'Опыт преподавания 10 лет. Автор курсов по программированию.'
        },
        enrolled: false
      },
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const program = testPrograms[id] || testPrograms['1']
        resolve([null, { data: { data: program } } as any])
      }, 500)
    })
  }

  // Запись на программу
  public async enrollToProgram(programId: string, userId: string): ServiceResponseType<ProgramEnrollmentResponse> {
    // Реальный запрос (раскомментировать для использования)
    // return this.axiosCall<ProgramEnrollmentResponse>({
    //   method: 'POST',
    //   url: `/programs/${programId}/enroll`,
    //   data: { userId }
    // })

    // Тестовая реализация
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([null, { 
          data: { 
            data: { 
              success: true,
              programId,
              enrollmentDate: new Date().toISOString()
            } 
          } 
        } as any])
      }, 1000)
    })
  }
  public async getUserPrograms(userId: string): ServiceResponseType<Program[]> {
  /*  return this.axiosCall<Program[]>({
      method: 'GET',
      url: `/users/${userId}/programs`
    })
    
    // Тестовые данные для разработки
      */
    return new Promise((resolve) => {
        setTimeout(() => {
          const testPrograms: Program[] = [
            {
              id: 'user-1',
              title: 'Python для начинающих',
              description: 'Полный курс Python',
              category: 'Информатика',
              duration: 3,
              level: 'Начальный',
              progress: 95,
              hours: [
                { stage: 'Основы', hours: 12 },
                { stage: 'Функции', hours: 10 }
              ],
              teacher: {
                id: '101',
                name: 'Иванова М.С.',
                position: 'Преподаватель',
                avatar: '',
                bio: 'Опытный преподаватель Python'
              },
              enrolled: true
            }
          ];
    
          // Имитация успешного Axios-ответа
          const mockResponse = {
            data: {
              data: testPrograms,
              status: 200,
              statusText: 'OK',
              headers: {},
              config: {}
            }
          };
    
          resolve([null, mockResponse]);
        }, 1000); // Увеличил задержку для наглядности
      });
    
      // Для реального использования - раскомментируйте этот блок
      // return this.axiosCall<Program[]>({
      //   method: 'GET',
      //   url: `/users/${userId}/programs`
      // });
    }

  // Получение списка программ (дополнительно)
  public async getPrograms(): ServiceResponseType<Program[]> {
    // Реальный запрос
    // return this.axiosCall<Program[]>({
    //   method: 'GET',
    //   url: '/programs'
    // })

    // Тестовые данные
    const testPrograms: Program[] = [
      {
        id: '1',
        title: 'Программирование на Python',
        description: 'Курс по основам Python',
        category: 'Информатика',
        duration: 6,
        level: 'Начальный',
        teacher: {
          id: '101',
          name: 'Иванова М.С.',
          position: 'Преподаватель',
          avatar: '',
          bio: ''
        },
        enrolled: false
      },
      {
        id: '2',
        title: 'Основы алгоритмов',
        description: 'Алгоритмы и структуры данных',
        category: 'Информатика',
        duration: 8,
        level: 'Продвинутый',
        teacher: {
          id: '102',
          name: 'Петров А.В.',
          position: 'Доцент',
          avatar: '',
          bio: ''
        },
        enrolled: false
      },{
        id: '2',
        title: 'Основы алгоритмов',
        description: 'Алгоритмы и структуры данных',
        category: 'Информатика',
        duration: 8,
        level: 'Продвинутый',
        teacher: {
          id: '102',
          name: 'Петров А.В.',
          position: 'Доцент',
          avatar: '',
          bio: ''
        },
        enrolled: false
      },
      
    ]

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([null, { data: { data: testPrograms } } as any])
      }, 700)
    })
  }
  public async updateProgramHours(updateData: {
    programId: string;
    hours: any[];
    updatedAt: string;
  }): ServiceResponseType<{ success: boolean; updatedProgram: Program }> {
    // Реальный запрос (раскомментировать для использования)
    // return this.axiosCall({
    //   method: 'PATCH',
    //   url: `/programs/${updateData.programId}/hours`,
    //   data: {
    //     hours: updateData.hours,
    //     updatedAt: updateData.updatedAt
    //   }
    // })
  
    // Тестовая реализация для разработки
    return new Promise((resolve) => {
      setTimeout(() => {
        // Имитация успешного ответа сервера
        const mockResponse = {
          data: {
            data: {
              success: true,
              updatedProgram: {
                id: updateData.programId,
                title: 'Обновленная программа',
                hours: updateData.hours,
                updatedAt: updateData.updatedAt
              }
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
          }
        }
        
        resolve([null, mockResponse])
      }, 800)
    })
  }
}

export const programService = new ProgramService()