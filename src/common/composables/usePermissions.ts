import router from '@/router'

import { ROUTE_NAMES } from '@/common/constants'
import { useGlobalLoader } from '@/common/composables/useGlobalLoader'

const { setGlobalLoader } = useGlobalLoader()

const whiteList: string[] = [ROUTE_NAMES.AuthPage]

export const usePermission = async () => {
  router.beforeEach(async (to, from) => {
    if (from.name !== to.name) setGlobalLoader(true)

    if (!whiteList.includes(to.name as string)) {
      // const [error, response] = await ClientsServiceApi.getClients()
      //
      // if (error) return
      //
      // setAccount(response.data.data)
    }

    setGlobalLoader(false)
  })

  router.afterEach(() => {
    setGlobalLoader(false)
  })
}

await usePermission()
