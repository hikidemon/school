import 'dayjs/locale/ru'
import 'styles/index.scss'
import 'element-plus/dist/index.css'
import '@/common/composables/usePermissions'

import { vMaska } from 'maska/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import ElementPlus, { dayjs } from 'element-plus'

dayjs.locale('ru')

const app = createApp(App)

app.use(ElementPlus)

const pinia = createPinia()

app.use(pinia)

app.use(router)

app.directive('maska', vMaska)

app.mount('#app')
