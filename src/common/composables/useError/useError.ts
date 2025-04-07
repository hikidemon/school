import { ref, readonly } from 'vue'

const isShow = ref<boolean>(false)
const errorMessage = ref<string | null>()

export default function useError() {
  const setErrorShow = (flag: boolean) => {
    isShow.value = flag
  }

  const setErrorMessage = (newMessage: string | null) => {
    errorMessage.value = newMessage
  }

  return {
    isShow: readonly(isShow),
    errorMessage: readonly(errorMessage),
    setErrorShow,
    setErrorMessage
  }
}
