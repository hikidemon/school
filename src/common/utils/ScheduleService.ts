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
}

export const scheduleService = new ScheduleService(API_CONFIG)