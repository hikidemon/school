/**
 * Типы данных для работы с учебными программами
 */

// Преподаватель
export interface Teacher {
    id: string
    name: string
    position: string
    avatar: string | null
    bio: string
    subjects?: string[] // Опционально: какие предметы ведет
    experience?: number // Опционально: стаж в годах
    contacts?: {
      email?: string
      phone?: string
    }
  }
  
  // Учебная программа
  export interface Program {
    id: string
    title: string
    description: string
    fullDescription?: string // Подробное описание (для страницы программы)
    category: string
    duration: number // В месяцах
    hoursPerWeek?: number // Опционально: часов в неделю
    level: 'Начальный' | 'Средний' | 'Продвинутый' | string
    coverImage?: string // URL обложки программы
    teacher: Teacher
    enrolled?: boolean
    startDate?: string // Дата начала в формате ISO
    price?: number // Стоимость (если платная)
    isFree?: boolean // Бесплатная ли программа
    requirements?: string[] // Требования к участникам
    skills?: string[] // Какие навыки получит студент
    syllabus?: { // Программа обучения
      week: number
      topic: string
      description: string
    }[]
    progress?: number // для моих программ
    hours?: {       // для моих программ
      stage: string
      hours: number
    }[]
  }
  
  // Ответ при записи на программу
  export interface ProgramEnrollmentResponse {
    success: boolean
    programId: string
    enrollmentDate?: string // Дата записи в формате ISO
    error?: string // Сообщение об ошибке (если success = false)
    nextStep?: string // Что делать дальше (например, оплатить или ждать подтверждения)
  }
  
  // Параметры фильтрации программ
  export interface ProgramsFilter {
    category?: string
    level?: string
    searchQuery?: string
    isFree?: boolean
    minDuration?: number
    maxDuration?: number
  }
  
  // Пагинация
  export interface Pagination {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
  
  // Ответ API для списка программ
  export interface ProgramsResponse {
    data: Program[]
    pagination: Pagination
    filters?: {
      availableCategories: string[]
      availableLevels: string[]
    }
  }
  
  // Данные для формы записи на программу
  export interface EnrollmentFormData {
    programId: string
    userId: string
    additionalInfo?: {
      experience?: string
      goals?: string
    }
  }
  
  // Тип для статистики программы
  export interface ProgramStats {
    enrolledCount: number
    completionRate?: number // Процент завершивших
    averageRating?: number // Средний рейтинг
  }
  
  // Расширенный тип программы с статистикой
  export interface ProgramWithStats extends Program {
    stats: ProgramStats
  }
  
  // Тип для отзывов о программе
  export interface ProgramReview {
    id: string
    userId: string
    userName: string
    rating: number // 1-5
    comment: string
    date: string
    isVerified?: boolean // Подтвержденный отзыв
  }