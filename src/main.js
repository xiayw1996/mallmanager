import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'
import MyBread from '@/components/cuscom/myBread.vue'

Vue.use(ElementUI)
Vue.use(MyHttpServer)

Vue.config.productionTip = false

// 全局过滤器处理时间格式
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
// 全局自定义组件
Vue.component(MyBread.name, MyBread)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
