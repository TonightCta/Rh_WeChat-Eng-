import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import 'vant/lib/index.css'
import './index.css'
import router from './router';
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)
Vue.use(Vant)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
