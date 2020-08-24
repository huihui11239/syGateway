
import App from './App.vue'
import Vue from 'vue'

import router from './router'
import store from './store'
import './assets/css/public.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VEasy from 'v-easy-components';
import 'v-easy-components/src/theme-chalk/src/index.less';
Vue.use(VEasy);

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import http from './utils/request/http'
Vue.prototype.$axios = http;

import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   if (to.path != '/' && localStorage.getItem('loginName') == '' || to.path != '/' && localStorage.getItem('loginName') === null) {
//     next('/')
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
