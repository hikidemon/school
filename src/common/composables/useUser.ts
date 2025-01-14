import { ref } from 'vue'

export const useUser = () => {
  const currentUser = ref({
    name: 'Каролина',
    email: 'exampleUser@example.user',
    phone: '9585899558',
    surname: 'Фантастическая',
    password: 'superpassword',
    phoneCode: '+7',
  })

  return {
    currentUser,
  }
}
