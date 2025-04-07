import 'dayjs/locale/ru'
import '@/common/composables/usePermissions'
import '@/assets/styles/_element-variables.scss'
import 'styles/index.scss'
import { vMaska } from 'maska/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import ElementPlus, { dayjs } from 'element-plus'
import { Motion } from 'vue-motion'


dayjs.locale('ru')

const app = createApp(App)

app.use(ElementPlus)
app.component('Motion', Motion)
const pinia = createPinia()

app.use(pinia)

app.use(router)

app.directive('maska', vMaska)

app.mount('#app')
