import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

//import { ref } from 'vue'

import axios from 'axios'
import useError from '@/common/composables/useError/useError'

export type ApiResponseType<T = unknown[]> = {
  data: T
}

type ApiErrorType<T = unknown> = {
  data: T,
  message: string
}

export type ServiceResponseType<T, E = unknown> = Promise<
  [null, AxiosResponse<ApiResponseType<T>>] | [AxiosError<ApiErrorType<E>>]
>

//const isRefreshed = ref(false)
const { setErrorShow, setErrorMessage } = useError()

export class AxiosService {
  readonly axiosInstance!: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)

    /** Request handler */
    this.axiosInstance.interceptors.request.use(async (config: any) => {
      config.headers['Accept-Language'] = 'ru'

      return config
    })

    /** Response handler */
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return Promise.resolve(response)
      },
      async (error) => {
        switch (error?.response?.status) {
          case 401:
            return

          case 403:
            setErrorShow(true)

            setErrorMessage(error?.response?.data)

            break

          default:
            setErrorShow(true)

            setErrorMessage(error?.response?.data?.message)

            break
        }

        return Promise.reject(error)
      }
    )
  }

  protected async axiosCall<T = any>(config: AxiosRequestConfig): ServiceResponseType<T> {
    try {
      const response = await this.axiosInstance.request<ApiResponseType<T>>(config)

      return [null, response]
    } catch (error: any) {
      return [error as AxiosError<ApiErrorType>]
    }
  }
}

const getBaseUrl = (): string => {
  return import.meta.env.DEV ? '/api' : [import.meta.env.VITE_BASE_URL, '/api'].join('')
}

export const API_CONFIG: AxiosRequestConfig = {
  baseURL: getBaseUrl(),
  withCredentials: true,
  timeout: 600000,
}
