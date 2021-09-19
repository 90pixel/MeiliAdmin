import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import i18n from '../plugins/i18n'
import VueRouter from 'vue-router'
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueRouter)
Vue.use(new VueSocketIO({
  connection: SocketIO('http://' + window.location.hostname + ':9191'),
  extraHeaders: {
    'Access-Control-Allow-Credentials': true
  },
  allowEIO3: true
}))


//Pages
import Homepage from "./pages/Homepage.vue";
import Indexes from "./pages/Indexes.vue";
import IndexSettings from "./pages/IndexSettings.vue";
import vSelect from 'vue-select'

const routes = [
  { path: '/', component: Homepage },
  { path: '/indexes/:server', component: Indexes },
  { path: '/indexes/:server/:index', component: IndexSettings },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.component('v-select', vSelect)
new Vue({
  render: h => h(App),
  i18n,
  router
}).$mount('#app')
