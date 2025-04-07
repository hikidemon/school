import { AxiosService, API_CONFIG } from '@/common/utils/AxiosService';
import type { ServiceResponseType , ApiErrorType, ApiResponseType } from '@/common/utils/AxiosService';
import type { ScheduleItem } from '@/common/types/ScheduleItem';
import { AxiosError } from 'axios';
class ScheduleService extends AxiosService {
  public async getSchedule(): Promise<ServiceResponseType<ApiResponseType<ScheduleItem[]>>> {
    const config = {
      method: 'GET',
      url: '/schedule'
    };
    return this.axiosCall<ApiResponseType<ScheduleItem[]>>(config);
  }

  public async getGroups(): Promise<ServiceResponseType<ApiResponseType<{ groups: string[] }>>> {
    const config = {
      method: 'GET',
      url: '/groups'
    };
    return this.axiosCall<ApiResponseType<{ groups: string[] }>>(config);
  }

  public async getSubjects(): Promise<ServiceResponseType<ApiResponseType<{ subjects: string[] }>>> {
    const config = {
      method: 'GET',
      url: '/subjects'
    };
    return this.axiosCall<ApiResponseType<{ subjects: string[] }>>(config);
  }

  public async getTeachers(): Promise<ServiceResponseType<ApiResponseType<{ teachers: string[] }>>> {
    const config = {
      method: 'GET',
      url: '/teachers'
    };
    return this.axiosCall<ApiResponseType<{ teachers: string[] }>>(config);
  }

  public async updateScheduleItem(item: ScheduleItem): Promise<ServiceResponseType<ApiResponseType<void>>> {
    const config = {
      method: 'PUT',
      url: `/schedule/${item.id}`,
      data: item
    };
    return this.axiosCall<ApiResponseType<void>>(config);
  }

  public async deleteScheduleItem(id: string): Promise<ServiceResponseType<ApiResponseType<void>>> {
    const config = {
      method: 'DELETE',
      url: `/schedule/${id}`
    };
    return this.axiosCall<ApiResponseType<void>>(config);
  }

  public async addScheduleItem(item: ScheduleItem): Promise<ServiceResponseType<ApiResponseType<void>>> {
    const config = {
      method: 'POST',
      url: '/schedule',
      data: item
    };
    return this.axiosCall<ApiResponseType<void>>(config);
  }

  public async getAllData(): Promise<ServiceResponseType<ApiResponseType<{
    schedule: ScheduleItem[];
    groups: string[];
    subjects: string[];
    teachers: string[];
  }>>> {
    try {
      const [scheduleResponse, groupsResponse, subjectsResponse, teachersResponse] = await Promise.all([
        this.getSchedule(),
        this.getGroups(),
        this.getSubjects(),
        this.getTeachers()
      ]);

      if (scheduleResponse[0] || groupsResponse[0] || subjectsResponse[0] || teachersResponse[0]) {
        const error = scheduleResponse[0] || groupsResponse[0] || subjectsResponse[0] || teachersResponse[0];
        return [error as AxiosError<ApiErrorType>];
      }

      return [null, {
        data: {
          schedule: scheduleResponse[1].data.data,
          groups: groupsResponse[1].data.data,
          subjects: subjectsResponse[1].data.data,
          teachers: teachersResponse[1].data.data
        },
        status: scheduleResponse[1].status,
        statusText: scheduleResponse[1].statusText
      }];
    } catch (error) {
      return [error as AxiosError<ApiErrorType>];
    }
  }
}


export const scheduleService = new ScheduleService(API_CONFIG)