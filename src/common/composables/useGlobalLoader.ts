import { readonly, ref } from 'vue'

const isGlobalLoading = ref(false)

export const useGlobalLoader = () => {
  const setGlobalLoader = (isShow: boolean) => {
    isGlobalLoading.value = isShow
  }

  return {
    isGlobalLoading: readonly(isGlobalLoading),
    setGlobalLoader,
  }
}
