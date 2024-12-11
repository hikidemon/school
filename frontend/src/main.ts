import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element-plus'

const app = createApp(App)
installElementPlus(app)
app.mount('#app')
