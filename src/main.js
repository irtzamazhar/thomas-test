import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap Vue application with Vuex + Vue Router and mount it to #app
createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
