import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from "./router/router";
import './assets/styles/styles.scss'
import 'material-design-icons-iconfont'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueGtag from "vue-gtag";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)


Vue.use(VueGtag, {
  config: { id: "269287451" }
});

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

