import { AxiosService, API_CONFIG } from '@/common/utils/AxiosService'
import type { ServiceResponseType } from '@/common/utils/AxiosService'
import type { ScheduleItem } from '@/common/types/ScheduleItem'

class ScheduleService extends AxiosService {
  public async getSchedule(): Promise<ServiceResponseType<ScheduleItem[]>> {
    const config = {
      method: 'GET',
      url: '/schedule', 
    }

    return this.axiosCall<ScheduleItem[]>(config)
  }

  public async getGroups(): Promise<ServiceResponseType<{ groups: string[] }>> {
    const config = {
      method: 'GET',
      url: '/groups',  
    }

    return this.axiosCall<{ groups: string[] }>(config)
  }

  public async updateScheduleItem(item: ScheduleItem): Promise<ServiceResponseType<void>> {
    const config = {
      method: 'PUT',
      url: `/schedule/${item.id}`,
      data: item,
    }

    return this.axiosCall<void>(config)
  }

  public getDefaultSchedule(): ScheduleItem[] {
    return [
      {
        day: 'Понедельник',
        time: '09:00',
        subject: 'Математика',
        teacher: 'Иванов И.И.',
        group: 'Группа 1',
      },
      {
        day: 'Понедельник',
        time: '10:00',
        subject: 'Физика',
        teacher: 'Петров П.П.',
        group: 'Группа 1',
      },
      {
        day: 'Понедельник',
        time: '09:00',
        subject: 'Химия',
        teacher: 'Сидоров С.С.',
        group: 'Группа 2',
      },
      {
        day: 'Вторник',
        time: '10:00',
        subject: 'Литература',
        teacher: 'Козлов А.А.',
        group: 'Группа 1',
      },
      {
        day: 'Вторник',
        time: '11:00',
        subject: 'История',
        teacher: 'Морозов В.В.',
        group: 'Группа 2',
      },
    ]
  }
}

export const scheduleService = new ScheduleService(API_CONFIG)