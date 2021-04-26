import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'
import animated from 'animate.css' // npm install animate.css --save安装，再引入
Vue.use(animated)
Vue.config.productionTip = false
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由守卫
import './permission'
Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
