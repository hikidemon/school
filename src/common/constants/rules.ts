import { type FormItemRule } from 'element-plus'

export const PASSWORD_RULE = (trigger: string | string[] = 'blur') => ({
  min: 6,
  message: 'Пароль должен содержать не менее 6 символов',
  trigger: trigger,
})

export const REQUIRED_RULE = (trigger: string | string[] = 'blur') => ({
  required: true,
  message: 'Обязательное поле',
  trigger: trigger,
})

export const EMAIL_RULE = (trigger: string | string[] = 'blur'): FormItemRule => ({
  type: 'email',
  message: 'Введите корректный email',
  trigger: trigger,
})
